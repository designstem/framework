## Importing 2D graphics

### Using regular SVG tags

In several cases you might need to bring in regular SVG tags, such as `<image>` etc that do not have a counterpart in Fachwerk component library. Also, you might want to use existing SVG code.

Here are some tips how to use regular SVG tags in `<f-scene>` and `<f-artboard>`.

### SVG tags in f-scene 

Using SVG elements in `f-scene` *works*, but there are several caveats to consider.

Drawings elements like `<rect>` they are drawn flipped around X axis and start from the center.

<f-scene grid>
	<rect x="0" y="0" width="1" height="1" fill="red" />
	<rect x="0" y="0" width="0.5" height="0.5" fill="black" />
</f-scene>

When specifing **strokes widths** you have to specity the border with in current coordinates, not pixel-like values such as `1` / `2` / `3`.

Play around with the stroke width below to see how the how it affects the scene.

<code>stroke-width="{{ get('s',0.01) }}"</code>

<f-slider value="0.01" from="0.01" to="3" set="s" />

<f-scene grid>
	<rect x="0" y="0" width="1" height="1" fill="red"  stroke="black" :stroke-width="get('s',0.01)" />
</f-scene>

But how to get the right stroke width to "look like 3px"? You can use a specific slot `{ svgscale }` to get that value. Fachwerk builtin components use the same technique.

<f-scene grid v-slot="{ svgscale }">
	<rect
    x="0"
    y="0"
    width="1"
    height="1"
    fill="red"
    stroke="black"
    :stroke-width="svgscale * 3"
  />
  <f-box x="-0.5" y="-0.5" fill="red" />
</f-scene>

#### Images in f-scene

Using `<image>` you have to consider the `<f-scene>` coordinate system: images are positioned by the top left corner and are flipped around X axis by default.

<f-scene grid>
  <image
  	href="../images/example_square.jpg"
    x="0"
    y="0"
    width="2"
    height="2"
  />
</f-scene>

For practical use you can adjust SVG `x` and `y` properties to and `transform` property to flip the image.

<f-scene grid>
  <image
  	href="../images/example_square.jpg"
    x="-1"
    y="-1"
    width="2"
    height="2"
    transform="scale(1,-1)"
  />
</f-scene>

This allows to use images for symmetrical compositions, such as various pattern components, such as `<f-slice-pattern />`

<f-scene grid>
	<f-slice-pattern>
  <image
  	href="../images/example_square.jpg"
    x="-1"
    y="-1"
    width="2"
    height="2"
    transform="scale(1,-1)"
  />
  </f-slice-pattern>
</f-scene>

#### Regular SVG tags with f-artboard

`<f-artboard>` is very close to `<svg>` tag so most SVG tags will work here without modification.

<f-artboard grid width="300" height="300">
  <rect
  	x="0"
    y="0"
    width="150"
    height="150"
   />
</f-artboard>

<f-artboard grid width="300" height="300">
  <image
    x="0"
    y="0"
  	href="../images/example_square.jpg"
    width="150"
    height="150"
  />
</f-artboard>

### Download a SVG file 

To download a single SVG file from `f-scene` or `f-artboard`, you will have to set a `download` prop on the component.

The downloaded file will be named `scene.svg`. To override a filename, provide a `id` prop.

<f-scene grid download>
  <f-box  />
</f-scene>

<f-scene grid download id="kreis">
  <f-circle  />
</f-scene>


### Download SVG file on an event

Sometimes you want to trigger a download from somewhere else in the document. In this case, you will need to `send` a `download` event with `id` argument.

<f-inline>
  <button v-on:click="send('download', 'kreis')">Download kreis.svg</button>
</f-inline>



























