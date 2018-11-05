import { Object2D } from "./2d.js";

export default {
  mixins: [Object2D],
  tag: '2D',
  description: `
  `,
  example: `
<f-scene>
  <f-grid />
  <f-line
    :points="[
      { x: -1.5, y: 0 },
      { x: -1,   y: 0 },
      { x: -1.5, y: 0.5 },
    ]"
  />
  <f-line
    :points="[
      { x: -0.5, y: 0   },
      { x: 0,    y: 0   },
      { x: -0.5, y: 0.5 },
    ]"
    :closed="true"
  />
  <f-line
    :points="[
      { x: 0.5, y: 0   },
      { x: 1,   y: 0   },
      { x: 0.5, y: 0.5 },
    ]"
    :curved="true"
  />
  <f-line
    :points="[
      { x: 1.5, y: 0   },
      { x: 2,   y: 0   },
      { x: 1.5, y: 0.5 },
    ]"
    :closed="true"
    :curved="true"
  />
</f-scene>
  `,
  props: {
    points: { default: [], type: Array },
    stroke: { default: "var(--primary)", type: String },
    strokeWidth: { default: 3, type: Number },
    fill: { default: "none", type: String },
    closed: { default: false, type: Boolean },
    curved: { default: false, type: Boolean },
    tension: { default: false, type: [Number] },
    opacity: { default: 1, type: Number },
    position: { default: () => ({}), type: Object },
    rotation: { default: () => ({}), type: Object },
    scale: { default: () => ({}), type: Object },
  },
  computed: {
    path() {
      if (this.curved && this.closed) {
        return d3.line().x(d => d.x).y(d => d.y).curve(d3.curveCardinalClosed.tension(this.tension || 0))
      }
      if (this.curved && !this.closed) {
        return d3.line().x(d => d.x).y(d => d.y).curve(d3.curveCardinal.tension(this.tension || 0))
      }
      if (!this.curved && this.closed) {
        return d3.line().x(d => d.x).y(d => d.y).curve(d3.curveCardinalClosed.tension(this.tension || 1))
      } 
      return d3.line().x(d => d.x).y(d => d.y)
    }
  },
  template: `
    <g :transform="transform">
      <path
        :d="path(points)"
        :stroke="stroke"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        :fill="fill"
        :opacity="opacity"
      />
    </g>
    `
};
