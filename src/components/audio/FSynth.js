export default {
  description: `
Polyphonic synthesizer emitting basic analog waves.

<f-buttons :buttons="['sine','square','triangle','sawtooth']" set="o" />

<f-synth :osc="['sine','square','triangle','sawtooth'][get('o',0)]" v-slot="{ noteon, noteoff }">
  <button
    @mousedown="() => noteon('C4')"
    @mouseup="() => noteoff('C4')"
  >
    Play C4
  </button>
  <button
    @mousedown="() => noteon('D4')"
    @mouseup="() => noteoff('D4')"
  >
    Play D4
  </button>
  <button
    @mousedown="() => noteon('E4')"
    @mouseup="() => noteoff('E4')"
  >
    Play E4
  </button>
</f-synth>

<p />

<blockquote>

Music libraries are not included with default Fachwerk installation. This component requires adding following libraries to your HTML file:

<p />

    <script src="https://unpkg.com/tone"></script>
    <script src="https://unpkg.com/webmidi"></script>
    
You will also need to set [Chrome autoplay policy](chrome://flags/#autoplay-policy) to *No user gesture is required*.

</blockquote>
`,
  props: {
    osc: {
      default: "sine",
      type: String,
      description:
        "Oscillator type, either `sine`, `square`, `triangle` or `sawtooth`"
    }
  },
  data: () => ({ synth: null }),
  mounted() {
    this.synth = new Tone.PolySynth(10, Tone.MonoSynth).toMaster();
    this.$watch(
      "osc",
      osc => {
        this.synth.set({
          oscillator: {
            type: osc
          }
        });
      },
      { immediate: true }
    );
    // filter: {
    //   type: "highpass"
    // },
    // envelope: {
    //   attack: 0.25
    // }
  },
  methods: {
    onNoteon(note = "C4") {
      this.synth.triggerAttack(note);
    },
    onNoteoff(note = "C4") {
      this.synth.triggerRelease(note);
    }
  },
  template: `
<div>
  <slot :noteon="onNoteon" :noteoff="onNoteoff" /> 
</div>
`
};
