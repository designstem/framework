import { Object2d } from "../../mixins.js";
import { range } from "../../utils.js";

export default {
  mixins: [Object2d],
  description: `
Repeats elements along the circle, rotating each towards the center of the circle.

<f-scene grid>
  <f-box />
  <f-spin-pattern>
    <f-box
      slot-scope="data"
      :stroke="color('red')"
    />
  </f-spin-pattern>
</f-scene>
  `,
  props: {
    count: { default: 6, type: [Number, String] },
    r: { default: 1, type: [Number, String] },
    position: { default: () => ({}), type: Object },
    rotation: { default: () => ({}), type: Object },
    scale: { default: () => ({}), type: Object },
    opacity: { default: 1, type: [Number, String] }
  },
  methods: { range },
  template: `
  <f-group
    :transform="transform"
    :opacity="opacity"
  >
    <f-group
      v-for="(a,i) in range(0,360,360 / count)"
      :key="i"
      :rotation="{z: a}"
    >
      <f-group :position="{x: r}">
        <slot :value="i" />
      </f-group>
    </f-group>
  </f-group>  
  `
};