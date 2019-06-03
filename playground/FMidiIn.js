export default {
  props: {
    cc: { default: "all", type: [Number, String] },
    device: { default: 0, type: [Number, String] }
  },
  mounted() {
    WebMidi.enable(() => {
      WebMidi.inputs.forEach(input => {
        input.addListener("controlchange", "all", ({ value, controller }) => {
          console.log(value)
          if (this.cc == "all") {
            this.$emit("cc", value);
          } else {
            if (controller.number == this.cc) {
              this.$emit("cc", value);
            }
          }
        });
        input.addListener("noteon", "all", ({ note }) => {
          const { name, octave, number } = note;
          this.$emit("noteon", name + octave);
        });
        input.addListener("noteoff", "all", ({ note }) => {
          const { name, octave, number } = note;
          this.$emit("noteoff", name + octave);
        });
      });
    });
  },
  template: `
  <div>
    <slot /> 
  </div>
  `
};

/*

export default {
  description: `
Sends and receives messages from websocket.

***Note*** Websocket library socket.io is not included in standard Fachwerk release. Add following line to \`index.html\` to load websocket support:

    <script src="https://unpkg.com/socket.io-client/dist/socket.io.slim.js"></script>

### Example

<f-websocket
  src="https://eka-server.now.sh"
  v-slot="{ send }"
  v-on:message="m => set('m',m)">

  <button v-on:click="send('Hello')">
    Send message "Hello"
  </button>

</f-websocket>

<p />

<output>Received message: {{ get('m') }}</output>

  `,
  props: {
    src: { default: "", type: String, description: 'Websocket server URL' },
    name: { default: 'message', type: String, description: 'Websocket event name' }
  },
  data: () => ({ socket: null }),
  mounted() {
    this.socket = io.connect(this.src);
    this.socket.on(this.name, message => this.$emit(this.name, message));
  },
  methods: {
    onSend(message) {
      this.socket.emit(this.name, message)
    }
  },
  template: `
  <div>
    <slot :send="onSend" /> 
  </div>
  `
};

*/
