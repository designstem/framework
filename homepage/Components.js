import Render from "../components/Render.js";
import Editor from "../components/Editor.js"
import Markdown from "../components/Markdown.js";

import { sortedComponents } from "../framework.js";

const Props = {
  props: { props: { type: [Object, Array] } }, // Arrays are Objects in JS
  methods: {
    formatDefault(prop) {
      if (prop.hasOwnProperty('default')) {
        if (prop.default instanceof Object && !(prop.default instanceof Array)) {
          return '{}'
        }
        return prop.default.length == 0 ? '[]' : String(prop.default)
      }
      return null;
    },
    formatType(prop) {
      if (prop.hasOwnProperty('type')) {
        const t = prop.type instanceof Array ? (prop.type[0])() : (prop.type)()
        return (t instanceof Array) ? 'array' : typeof t
      }
      return null;
    }
  },
  computed: {
    propsData() {
      if (this.props) {
        return this.props instanceof Array
          ? this.props.map(p => ({ name: p }))
          : Object.entries(this.props).map(p => ({
              name: p[0],
              default: this.formatDefault(p[1]),
              type: this.formatType(p[1])
            }));
      } else {
        return [];
      }
    }
  },
  template: `
    <div style="font-size: 0.9rem">
    <table>
      <thead>
        <th>Name</th>
        <th>Default</th>
        <th>Type</th>
      </thead>
      <tbody>
        <tr v-for="prop in propsData">
          <td><code style="background: none">:{{ prop.name }}</code></td>
          <td><code v-if="prop.default" style="background: none">{{ prop.default }}</code></td>
          <td>
            <code
              v-if="prop.type"
              style="background: none; color: var(--color-gray-medium)">
                {{ prop.type }}
            </code>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  `
};

export default {
  components: { Render, Editor, Markdown, Props },
  data: () => ({
    componentData: sortedComponents
      .map(c => Object.entries(c)[0])
      .map(c => ({ name: c[0], ...c[1]}))
      .filter(c => c.example)
      .map(({ name, example, description, props }) => ({
        name,
        example: example ? example.trim() : "",
        description: description || "",
        props
      }))
  }),
  template: `
    <div>
        <div v-for="(c,i) in componentData" :style="{
          padding: '2rem 0',
          borderTop: i > 0 ? '0px solid var(--color-gray-light)' : '',
          minHeight: '15rem'
        }"
        >
          <h2>{{ c.name }}</h2>
          <div style="display: flex">
            <div style="width: 300px;">
              <Markdown :content="c.description" />
              <br>
              <template v-if="c.props">
                <h3>Props</h3>
                <Props :props="c.props" />
              </template>
            </div>
            <div style="width: 500px; margin-left: 2rem;">
              <Editor style="border: 3px solid var(--color-gray-light)" v-model="c.example" />
            </div>
            <Render :t="'<div>'+c.example+'</div>'" style="flex: 1; align-items: flex-start; margin-left: 2rem;" />
          </div>
        </div>
    </div>
  `
};