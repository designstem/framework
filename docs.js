import * as components from "./framework.js";
import { sortedComponents } from "./framework.js";
import { kebabCase } from "./utils.js";
import { docs } from '../utils.js'

// export default {
//   components: { Markdown },
//   data: () => ({ docs: docs() }),
//   template: `
//       <Markdown :content="docs.join('<br><p />')" />
//   `
// }

import Init from "./components/Init.js";

for (const name in components) {
  Vue.component(name, components[name]);
}

new Vue({
  mixins: [Init],
  el: "#app",
  data: () => ({
    files: [{ title: 'Guides', items: [
      { title: "Markdown basics", file: "./content/guides/markdown.md", preview: 0 },
      {
        title: "Interactive slides",
        file: "./content/guides/interactive.md",
        preview: 1
      },
      {
        title: "Component communication",
        file: "./content/guides/communication.md",
        preview: 0
      },
      { title: "Math basics", file: "./content/math.md", preview: 0 },
      {
        title: "Drawing the spirals",
        file: "./content/guides/spirals2.md",
        preview: 1
      },
      {
        title: "Various experiments",
        file: "./content/guides/experiments.md",
        preview: 0
      },
      {
        title: "Building patterns",
        file: "./content/guides/patterns.md",
        preview: 0
      },
    ]},{title: 'Styles', items: [
      {
        title: "Typography",
        file: "./content/styles/typography.md",
        preview: 0
      },
      {
        title: "Grid",
        file: "./content/styles/grid.md",
        preview: 0
      },
      {
        title: "Colors",
        file: "./content/styles/colors.md",
        preview: 0
      },
      {
        title: "Controls",
        file: "./content/styles/controls.md",
        preview: 0
      }
    ]}],
    content: "",
    activeItem: [0, 0],
    previews: [components.FContentDocument, components.FContentSlides],
    activePreview: 0
  }),
  computed: {
    menuItems() {
      return this.files.concat(
        ["2D", "3D", "Data", "Transitions", "Content", "Layout"].map(tag => {
          return {
            title: `${tag} components`,
            tag,
            items: sortedComponents
              .map(c => Object.entries(c)[0])
              .filter(c => c[1].tag == tag)
              .map(c => ({ title: kebabCase(c[0]), name: c[0] }))
          };
        })
      )

    }
  },
  methods: {
    propRows(props) {
      return Object.entries(props).map(p => ({
        Name: `<code>${p[0]}</code>`,
        Default: `<code>${p[1].default}</code>`,
        Type: `<code>${
          Array.isArray(p[1].default) ? "array" : typeof p[1].default
        }</code>`,
        Description: p[1].description ? `${p[1].description}` : p[1].description
      }));
    },
    generateContent(name, c) {
      return `## ${kebabCase(name)}
${c.description ? c.description : ""}
${c.example ? c.example.trim() : ""}

${
        c.props
          ? `<p />

##### Props`
          : ""
      }

${
        c.props
          ? `<f-table :rows='${JSON.stringify(
              this.propRows(c.props),
              null,
              2
            ).replace(/'/g, '\\"')}' style="--lightblue: transparent" />`
          : ""
      }
      `;
    }
  },
  mounted() {
    this.$watch(
      "activeItem",
      activeItem => {
        if (!this.menuItems[activeItem[0]].tag) {
          fetch(this.menuItems[activeItem[0]].items[activeItem[1]].file)
            .then(res => res.text())
            .then(content => {
              this.content = content;
              this.activePreview = this.menuItems[activeItem[0]].items[activeItem[1]].preview;
            });
        } else {
          this.content = this.generateContent(
            this.menuItems[activeItem[0]].items[activeItem[1]].title,
            sortedComponents
              .map(c => Object.entries(c)[0])
              .filter(
                c =>
                  c[0] ==
                  this.menuItems[activeItem[0]].items[activeItem[1]].name
              )
              .map(c => c[1])[0]
          );
          this.activePreview = 0;
        }
      },
      { immediate: true }
    );
  },
  template: `
  <div>
    <header style="background: var(--yellow);">
      <div>
        <a href="https://designstem.github.io/framework">Fachwerk</a>
        → Documentation
      </div>
      <p style="margin: 0;"><kbd>Alt</kbd> + <kbd>F</kbd> for fullscreen, <kbd>Alt</kbd> + <kbd>T</kbd> for dark theme</p>
      <f-buttons :buttons="['As Document','As Slides']" v-model="activePreview" />
    </header>
    <f-theme class="grid" style="--gap: 0; --cols: 200px 1fr; --rows:400vh;">
    <f-menu
      style="overflow-y: auto"
      :items="menuItems"
      v-model="activeItem"
    />
    <f-content-editor
      :content="content"
      :autosave="false"
    >
      <component slot-scope="data"
        :is="previews[activePreview]"
        :content="data.content"
        base="8px"
        style="--gap: var(--base4);"
      />
      </f-content-editor>
    </f-theme>
</div>
  `
});
