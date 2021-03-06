import { THREE, parseCoords } from "../../../fachwerk.js"
;
import Object3D from "./internal/Object3D.js";

export default {
  description: `
Displays 3D lathe geometry.

<f-scene3 webgl>
  <f-rotation3>
    <f-grid3 />
    <f-lathe3
      scale="0.5"
      count="12"
      :points="range(-Math.PI,Math.PI,0.25).map(y => [Math.sin(y),y])"
    />
  </f-rotation3>
</f-scene3>
  `,
  mixins: [Object3D],
  props: {
    count: { default: 12, type: [String, Number] },
    points: { default: "", type: [String, Number, Array, Object] },
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
      const points = parseCoords(this.points).map(p => {
        return new THREE.Vector2(...p);
      });
      var geometry = new THREE.LatheGeometry(points, this.count);
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

// var points = [];
// for ( var i = 0; i < 10; i ++ ) {
// 	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
// }
// var geometry = new THREE.LatheGeometry( points );
// var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// var lathe = new THREE.Mesh( geometry, material );
// scene.add( lathe );
