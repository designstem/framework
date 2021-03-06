import { THREE, color, parseCoords } from "../../../fachwerk.js"
;
import Object3D from "./internal/Object3D.js";

export default {
  description: `
The key building block of 3D graphics, this component draws a triangle in 3D space. It accepts three 3D coordinates in \`points\` array.

<f-scene3>
  <f-rotation3>
    <f-grid3 />
    <f-triangle3 points="1 1 0, 1 0 1, 1 -1 0" /> 
  </f-rotation3>
</f-scene3>
  `,
  mixins: [Object3D],
  props: {
    x1: { default: 0, type: [Number, String] },
    y1: { default: 0, type: [Number, String] },
    z1: { default: 0, type: [Number, String] },
    x2: { default: 0, type: [Number, String] },
    y2: { default: 0, type: [Number, String] },
    z2: { default: 0, type: [Number, String] },
    x3: { default: 0, type: [Number, String] },
    y3: { default: 0, type: [Number, String] },
    z3: { default: 0, type: [Number, String] },
    points: { default: "", type: [String, Number, Array] },
    fill: { default: "color('primary')", type: String },
    position: { default: "0 0 0", type: [String, Number, Array, Object] },
    rotation: { default: "0 0 0", type: [String, Number, Array, Object] },
    scale: { default: "1 1 1", type: [String, Number, Array, Object] },
    opacity: { default: 1, type: [Number, String] },
    shading: { default: true, type: Boolean }
  },
  data() {
    let curObj = this.obj;
    if (!curObj) {
      var geometry = new THREE.Geometry();
      if (this.points) {
        const points = parseCoords(this.points);
        points.forEach(p => {
          geometry.vertices.push(new THREE.Vector3(...p));
        });
      } else {
        geometry.vertices.push(new THREE.Vector3(this.x1, this.y1, this.z1));
        geometry.vertices.push(new THREE.Vector3(this.x2, this.y2, this.z2));
        geometry.vertices.push(new THREE.Vector3(this.x3, this.y3, this.z3));
      }
      geometry.faces.push(new THREE.Face3(0, 1, 2));
      geometry.computeFaceNormals();
      curObj = new THREE.Mesh(
        geometry,
        this.shading
          ? new THREE.MeshNormalMaterial({
              opacity: this.opacity,
              side: THREE.DoubleSide
            })
            : new THREE.MeshLambertMaterial({
              transparent: true,
              color:
                this.fill == "color('primary')" ? color("primary") : this.fill,
              opacity: this.opacity,
              side: THREE.DoubleSide
            })
      );
    }
    curObj.name = curObj.name || curObj.type;
    return { curObj };
  }
};
