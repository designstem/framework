import { Css } from "../../../mixins.js";
import FMarkdown from "../internal/FMarkdown.js";
import { parseColumns } from "../../../utils.js";

export default {
  mixins: [Css],
  tag: "Layout",
  description: `
Shows Markdown content.

<f-content
  content="## Hello world"
  style="box-shadow: inset 0 0 10px lightgray"
/>
  `,
  components: { FMarkdown },
  props: {
    content: { default: "", type: String },
    index: { default: 0, type: Number },
    autosaveId: { default: "0", type: String },
    type: { default: 'slides', type: String }
  },
  data: () => ({ currentIndex: 0 }),
  computed: {
    preparedContent() {
      return this.content
        .replace(/\n--\n/g, "")
        .split(/\n---\n/)
        .map(parseColumns);
    }
  },
  methods: {
    first() {
      this.currentIndex = 0;
    },
    last() {
      this.currentIndex =  this.preparedContent.length - 1;
    },
    prev() {
      this.currentIndex > 0 && this.currentIndex--;
    },
    next() {
      this.currentIndex < this.preparedContent.length - 1 &&
        this.currentIndex++;
    },
    goto(index) {
      this.currentIndex = index
    },
  },
  mounted() {
    this.$watch(
      "index",
      index => {
        this.currentIndex = index;
      },
      { immediate: true }
    );

    if (this.$global) {
      this.$global.$on("next", () => this.next());
      this.$global.$on("prev", () => this.prev());
      this.$global.$on("first", () => this.first());
      this.$global.$on("last", () => this.last());
      this.$global.$on("goto", index => this.goto(index));
    }
  },
  template: `
  <div class="content">
    <f-theme
      v-for="(slide,i) in preparedContent"
      :key="i"
      :theme="slide.theme || 'light'"
    >
      <div
        v-show="type == 'slides' ? i == currentIndex : true"
        :class="slide.height === 'fit' ? 'fit' : ''"
        :style="{
          display: 'grid',
          height: slide.height === 'fit' ? 'var(--content-height)' : '',
          gridTemplateColumns: 'repeat(' + slide.colCount + ', 1fr)',
          gridTemplateRows: slide.height === 'fit' ? 'repeat(' + slide.rowCount + ', 1fr)' : 'none',
          gridTemplateAreas: slide.areas,
          gridAutoRows: '',
          gridAutoColumns: '',
          overflow: 'hidden',
          gridGap: slide.gap && slide.gap == 'none' ? '' : 'var(--content-gap)',
          padding: slide.padding && slide.padding == 'none' ? '' : 'var(--content-padding)'
        }"
      >
        <FMarkdown
          v-for="(col,i) in slide.content"
          :style="{ gridArea: 'a' + (i + 1) }"
          :key="i"
          :content="col"
          class="cell"
        />
      </div>
    </f-theme>
  </div>
  `,
  cssprops: {
    "--content-height": {
      default: "100vh",
      description: "Content height"
    },
    "--content-padding": {
      default: "4vw 6vw",
      description: "Content padding"
    },
    "--content-gap": {
      default: "var(--base2)",
      description: "Gap between content columns"
    },
    "--content-base": {
      default: "calc(7px + 0.2vw)",
      description: "Gap between content columns"
    }
  },
  css: `
  .content {
    --base: var(--content-base);
  }
  .cell p:last-child {
    margin: 0;
  }
  .fit > .cell > p {
    height: 100%;
  }
  .fit > .cell {
    --image-min-height: 0;
  }
  `
};