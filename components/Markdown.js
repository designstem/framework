import Render from "../components/Render.js";

export default {
  components: { Render },
  props: ["content"],
  methods: { marked },
  template: `
    <Render :t="'<div>'+marked(content, { breaks: true })+'</div>'" />
  `
};