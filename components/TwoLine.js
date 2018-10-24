import { Object2D } from "./internal/two.js";

export default {
  mixins: [Object2D],
  description: `
  `,
  example: `
<TwoScene>
  <TwoGrid />
  <TwoLine
    :points="[
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ]"
  />
  <TwoLine
    :position="{ x: 1, y: 1 }"
    :rotation="{ z: 45 }"
    :scale="{ x: 0.2, y: 0.2 }"
    :points="[
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ]"
  />
</TwoScene>
  `,
  props: {
    points: { default: [], type: Array },
    stroke: { default: "var(--primary)", type: String },
    opacity: { default: 1, type: Number },
    position: { default: () => ({}), type: Object },
    rotation: { default: () => ({}), type: Object },
    scale: { default: () => ({}), type: Object }
  },
  computed: {
    svgPoints() {
      return this.points.map(({ x, y }) => `${x},${y}`).join(" ");
    }
  },
  template: `
    <g :transform="transform">
      <polyline
        :points="svgPoints"
        :stroke="stroke"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
        :opacity="opacity"
      />
    </g>
    `
};
