import Css from "../../mixins/Css.js";

export default {
  mixins: [Css],
  name: "TwoSceneScope",
  description: `
**🔬 This component is experimental.**

<code>TwoScene</code> with mouse tracking!
`,
  example: `
<TwoSceneScope>  
  <g slot-scope="{ value }">
    <circle
      :r="value.mousePressed ? 1.1 : 1"
      opacity="0.1"
      style="transition: all 100ms"
    />
    <circle
      :r="value.mousePressed ? 0.8 : 1"
      style="transition: all 100ms"
    />
    <circle
      :cx="value.mouseX"
      :cy="value.mouseY"
      :r="value.mousePressed ? 0.2 : 0.1"
      fill="var(--color-red)"
      style="transition: all 100ms"
    />
  </g>
</TwoSceneScope>
  `,
  props: {
    size: { default: 250, type: Number }
  },
  computed: {
    viewBox() {
      return `-2 -2 4 4`;
    }
  },
  data: () => ({ mouseX: 0, mouseY: 0, mousePressed: false }),
  methods: {
    onSceneMousemove(e) {
      let svg = this.$refs.svg;
      let point = svg.createSVGPoint();
      point.x = e.clientX;
      point.y = e.clientY;
      let ctm = this.$refs.container.getScreenCTM();
      if ((ctm = ctm.inverse())) {
        point = point.matrixTransform(ctm);
      }
      this.mouseX = point.x;
      this.mouseY = point.y;
    }
  },
  template: `
    <svg
        :width="size"
        :height="size"
        :view-box.camel="viewBox"
        class="two"
        @mousemove="onSceneMousemove"
        @mousedown="mousePressed = true"
        @mouseup="mousePressed = false"
        ref="svg"
    >
      <g transform="scale(1,-1)" ref="container">
        <slot name="content" />
        <slot :value="{ mouseX, mouseY, mousePressed }" />
      </g>
    </svg>
  `,
  css: `
    .two * {
      vector-effect: non-scaling-stroke;
    }
  `
};