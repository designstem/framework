import Object2D from "./internal/Object2D.js";
import { color } from "../../../fachwerk.js"


export default {
  mixins: [Object2D],
  example: `
Displays a closed polygon based on points.

<f-scene>
  <f-polygon points="0 0, 1 0, 0 1" />
  <f-polygon
    points="0 0, 1 0, 0 1"
    position="1 1"
    rotation="180"
    scale="0.25"
    :stroke="color('red')"
  />
</f-scene>
  `,
  props: {
    points: { default: "", type: [String, Number, Array] },
    stroke: { default: "color('primary')", type: String},
    strokeWidth: { default: 3, type: Number },
    fill: { default: "none", type: String },
    position: { default: '0 0', type: [String, Number, Object, Array] },
    rotation: { default: '0', type: [String, Number, Object, Array] },
    scale: { default: '1', type: [String, Number, Object, Array] },
    opacity: { default: 1, type: [Number,String] },
  },
  computed: {
    currentStrokeColor() {
      return this.stroke == "color('primary')" ? color('primary') : this.stroke
    },
  },
  template: `
    <f-line
      :points="points"
      :stroke="currentStrokeColor"
      :stroke-width="currentStrokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      :fill="fill"
      :transform="transform"
      :opacity="opacity"
      :closed="true"
      :scale="scale"
    />
  `
};
