import { Vue, Css, send, randomid } from "../../../../fachwerk.js";

export default {
  mixins: [Css],
  props: {
    width: { default: 300, type: [Number, String] },
    height: { default: 300, type: [Number, String] },
    innerX: { default: 0, type: [Number, String] },
    innerY: { default: 0, type: [Number, String] },
    innerWidth: { default: null, type: [Number, String] },
    innerHeight: { default: null, type: [Number, String] },
    flipX: { default: false, type: Boolean },
    flipY: { default: false, type: Boolean },
    responsive: { default: false, type: Boolean },
    id: { default: "", type: String },
    download: { default: false, type: Boolean }
  },
  slots: {
    mouse: {
      type: "object",
      description: "Mouse data as `mouse.x` `mouse.y` `mouse.pressed`"
    }
  },
  data: function() {
    return { mouseX: 0, mouseY: 0, mousePressed: false, defaultid: randomid() };
  },
  methods: {
    send,
    onMousemove(e) {
      let svg = this.$refs.f_svg;
      let container = this.$refs.f_svg_g;
      if (svg && container) {
        let point = svg.createSVGPoint();
        point.x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        point.y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
        let ctm = container.getScreenCTM();
        if ((ctm = ctm.inverse())) {
          point = point.matrixTransform(ctm);
        }
        this.mouseX = point.x;
        this.mouseY = point.y;
      }
    },
    onDownload() {
      const svg = document.getElementById(this.id || this.defaultid).outerHTML;
      const svgBlob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${this.id || 'scene'}.svg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  },
  computed: {
    viewBox() {
      return `${this.innerX} ${this.innerY} ${this.innerWidth ||
        this.width} ${this.innerHeight || this.height}`;
    },
    transform() {
      return `scale(${this.flipX ? -1 : 1},${this.flipY ? -1 : 1})`;
    }
  },
  mounted() {
    Vue.prototype.$global.$on("download", id => {
      if (id && this.id == id) {
        this.onDownload();
      }
    });
  },
  template: `
  <div
    class="f-svg"
    :style="{ display: responsive ? 'block' : 'inline-flex', lineHeight: 0}"
  >
    <div>
      <svg
          xmlns="http://www.w3.org/2000/svg"
          :width="width"
          :height="height"
          :view-box.camel="viewBox"
          ref="f_svg"
          :id="id || defaultid"
          @mousemove="onMousemove"
          @touchmove="onMousemove"
          @mousedown="mousePressed = true"
          @touchstart="mousePressed = true"
          @mouseup="mousePressed = false"
          @touchend="mousePressed = false"
          :style="{ display: 'block', width: responsive ? '100%' : width, height: responsive ? 'auto' : height}"
      >
        <g :transform="transform" ref="f_svg_g">
          <slot :mouse="{x:mouseX,y:mouseY,pressed: mousePressed}" />
        </g>
      </svg>
      <!-- @TODO: Remove this / 2 hack -->
      <button v-if="download" style="margin-top: var(--base); display: block" class="quaternary" @click="onDownload">⤓ Download</button>
    </div>
  </div>
  `,
  css: `
    .f-svg + * {
      margin-top: var(--base2);
    }
    .f-svg + .f-svg,
    .f-svg + .f-svg + .f-svg,
    .f-svg + .f-svg + .f-svg + .f-svg {
      margin: 0;
    }
    .f-svg text {
      fill: var(--primary);
      font-family: var(--font-mono);
      font-size: var(--text-size);
      transform: var(--text-transform);
      pointer-events: none;
    }
    
  `
};