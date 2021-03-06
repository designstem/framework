import { Css } from "../../../fachwerk.js";

export default {
  mixins: [Css],
  description: `
Displays an image.

<f-image src="../images/example.jpg" />
  `,
  props: {
    src: { default: "", type: String, description: "Image URL" },
  },
  template: `
    <div 
      :style="{ 
        background: 'url(' + src + ')',
        backgroundSize: 'var(--image-size)', 
        backgroundPosition: 'var(--image-position)', 
        backgroundRepeat: 'var(--image-repeat)',
        height: 'var(--image-height)',
        minHeight: 'var(--image-min-height)'
      }"
      >&nbsp;</div>
  `,
  cssprops: {
    "--image-height": {
      default: "100%",
      description: "Image height"
    },
    "--image-min-height": {
      default: "calc(var(--base) * 30)",
      description: "Image minimum height"
    },
    "--image-size": {
      default: "cover",
      description: "Background size: `cover`, `contain` or other css `value`"
    },
    "--image-position": {
      default: "center",
      description: "Background position: `50% 75%`, `center bottom` or other css `value`"
    },
    "--image-repeat": {
      default: "no-repeat",
      description: "Background repeat: `repeat`, `repeat-x` or other css `value`"
    },
  }
};
