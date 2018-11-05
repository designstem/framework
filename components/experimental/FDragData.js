import { snapToGrid } from "../../utils.js"
import FSceneScope from "../2d/FScene.js"

const Drag = {
  props: ['mouse', 'points', 'snap' ],
  data: function() {
    return { draggedPoints: this.points }
  },
  methods: {
    handleMove(p) {
      if (p.pressed) {
        p.x = this.snap ? snapToGrid(this.mouse.x, 0.25) : this.mouse.x
        p.y = this.snap ? snapToGrid(this.mouse.y, 0.25) : this.mouse.y
      }
    }
  },
  template: `
    <g>
      <slot :draggedPoints="draggedPoints" />
      <g v-for="(p,i) in draggedPoints">
        <circle
          :cx="p.x"
          :cy="p.y"
          :r="p.active ? 0.22 : 0.2"
          stroke-width="3"
          stroke="var(--primary)"
          :fill="p.pressed ? 'var(--primary)' : 'var(--secondary)'"
          style="transition: fill r 100ms"
        />
        <circle
          :cx="p.x"
          :cy="p.y"
          r="1.25"
          fill="rgba(0,0,0,0)"
          @mouseout="p.pressed = false; p.active = false"
        />
        <circle
          :cx="p.x"
          :cy="p.y"
          r="0.5"
          fill="rgba(0,0,0,0)"
          style="cursor: pointer"
          @mouseover="p.active = true"
          @mouseout="p.active = false"
          @mousedown="p.pressed = true"
          @mouseup="p.pressed = false; p.active = false"
          @mousemove="handleMove(p)"
        />
      </g>
    </g>
  `,
};

export default {
  tag: 'Experimental',
  description: `
  `,
  example: `
  <f-drag-data
  :points="[
    { x:  0, y:  0.5 },
    { x:  1, y: -1 },
    { x: -1, y: -1 }
  ]"
  :snap="true"
>
  <f-group slot-scope="data">
    <f-grid />
    <f-polygon :points="data.points" />
  </f-group>
</f-drag-data>
  `,
  components: { Drag, FSceneScope },
  props: ['points', 'snap' ],
  data: function() {
    return { draggedPoints: this.points }
  },
  methods: {
    handleMove(p) {
      if (p.pressed) {
        p.x = this.snap ? snapToGrid(this.mouse.x, 0.25) : this.mouse.x
        p.y = this.snap ? snapToGrid(this.mouse.y, 0.25) : this.mouse.y
      }
    }
  },
  template: `
  <f-scene-scope>  
    <Drag
      slot-scope="mouseData"
      :mouse="mouseData.mouse"
      :points="points"
      :snap="snap"
    >
      <template slot-scope="data">
        <slot :points="data.draggedPoints" :mouse="mouseData.mouse" />
      </template>
    </Drag>
    </f-scene-scope>
  `,
};
