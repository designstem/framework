export default {
  description: `
A playground for generative vector graphics. Compared to the \`<f-scene>\` it is a standard \`svg\` document so the coordinate system and sizing is working in the expected way.

<f-artboard width="400" height="400" grid>
  <f-circle
    v-for="(r,i) in range(0,300,10).reverse()"
    :key="i"
    x="200"
    y="200"
    :r="r"
    :fill="hsl(r)"
  />
</f-artboard>
  `,
  props: {
    width: { default: 600, type: [Number, String] },
    height: { default: 600, type: [Number, String] },
    grid: { default: false, type: Boolean },
    dots: { default: false, type: Boolean },
    step: { default: 25, type: [Number, String] },
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
  provide() {
    return {
      svgScale: () => 1
    };
  },
  template: `
  <f-svg 
    :width="width"
    :height="height"
    class="f-artboard"
    v-slot="{ mouse }"
    :responsive="responsive"
    :id="id"
    :download="download"
  >
    <f-group>
      <f-basegrid 
        v-if="grid"
        :inner-width="width"
        :inner-height="height"
        :step="step"
      />
      <f-dots 
        v-if="dots"
        :inner-width="width"
        :inner-height="height"
        :step="step"
      />
      <slot :mouse="mouse" />
    </f-group>
  </f-svg>
  `
};
