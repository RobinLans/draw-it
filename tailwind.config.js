module.exports = {
  // mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        caveat: ["Caveat"],
      },
      backgroundImage: {
        drawBg: "url('/src/assets/drawItbg.jpeg')",
        // drawItBg: "url('public/drawItbg.jpeg')",
      },
      height: {
        canvasBig: "720px",
        canvasSmall: "480px",
      },
      width: {
        canvasBig: "1080px",
        canvasSmall: "720px",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["active"],
    },
  },
  plugins: [],
};
