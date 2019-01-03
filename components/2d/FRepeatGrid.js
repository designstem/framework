import { Object2D } from "./2d.js";
import { range } from "../../utils.js";

export default {
  mixins: [Object2D],
  tag: `2D`,
  description: `
Repeats the contents in a 2D grid.
  `,
  example: `
<f-scene>
  <f-circle r="0.5" />  
  <f-repeat-grid>
    <f-circle
      slot-scope="data"
      r="0.5"
      opacity="0.25"
      :stroke="color('red')"
    />
  </f-repeat-grid>
</f-scene>
  `,
  props: {
    step: { default: 1, type: [Number,String] },
    width: { default: 4, type: [Number,String] },
    height: { default: 4, type: [Number,String] },
    position: { default: () => ({}), type: Object },
    rotation: { default: () => ({}), type: Object },
    scale: { default: () => ({}), type: Object },
    opacity: { default: 1, type: Number }
  },
  methods: { range },
  template: `
  <f-group
    :transform="transform"
    :opacity="opacity"
  >
    <f-group v-for="(x,i) in range(width / -2, width / 2, step)" :key="i" :position="{x,y:0}">
      <f-group v-for="(y,j) in range(height / -2, height / 2, step)" :key="j" :position="{x:0,y}">
        <slot :value="[i, j, (i * range(height / -2, height / 2, step).length) + j]" />
      </f-group>
    </f-group>
  </f-group>  
  `,
}