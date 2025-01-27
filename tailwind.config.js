import daisyui from "daisyui";

module.exports = {
  content: [
    "./src/**/*.{html,ts}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Add plugins array here
  daisyui: {
    themes: ["light","night"], // Specify the themes here
  },
}
