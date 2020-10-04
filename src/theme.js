export default {
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#33e",
    secondary: "green",
    noteBackground: "#ECECEC",
  },
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "text",
        cursor: " pointer",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
      "&:hover": {
        bg: "text",
        cursor: " pointer",
      },
    },
    danger: {
      color: "background",
      bg: "red",
      "&:hover": {
        bg: "text",
        cursor: " pointer",
      },
    },
  },
};
