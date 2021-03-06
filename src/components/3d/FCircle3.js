import { THREE, color } from "../../../fachwerk.js"

import Object3D from "./internal/Object3D.js";

export default {
  mixins: [Object3D],
  description: `
Displays a 2D circle in 3D space

<f-scene3>
  <f-rotation3>
    <f-grid3 />
    <f-circle3 opacity="0.5" />
  </f-rotation3>
</f-scene3>
  `,
  props: {
    r: { default: 1, type: [String, Number] },
    stroke: { default: "color('primary')", type: String },
    strokeWidth: { default: 3, type: [String, Number] },
    fill: { default: "", type: String },
    position: { default: () => ({}), type: Object },
    rotation: { default: () => ({}), type: Object },
    scale: { default: () => ({}), type: [Object, Number] },
    opacity: { default: 1, type: [Number,String] },
    shading: { default: true, type: Boolean },
  },
  computed: {
    strokeColor() {
      return this.stroke == "color('primary')" ? color('primary') : this.stroke
    }
  },
  template: `
    <f-regularpolygon3
      :r="r"
      :count="64"
      :stroke="strokeColor"
      :strokeWidth="strokeWidth"
      :fill="fill"
      :opacity="opacity"
    />
  `
}