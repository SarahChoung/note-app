export default {
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  colors: {
    text: "#000",
    background: "white",
    base: "#A9A9A9",
    darkerBase: "grey",
    accent: "#2a9df4",
    darkerAccent: "#187bcd",
    neutral: "#EFEFEF",
    danger: "#CA0101",
    darkerDanger: "#7d0000",
  },
  buttons: {
    primary: {
      color: "text",
      bg: "base",
      transition: "0.3s",
      "&:hover": {
        bg: "lightgrey",
        cursor: " pointer",
      },
    },
    secondary: {
      color: "white",
      bg: "accent",
      transition: "0.3s",
      "&:hover": {
        bg: "#4fc3f7",
        cursor: "pointer",
      },
    },
    danger: {
      color: "background",
      bg: "danger",
      transition: "0.3s",
      "&:hover": {
        bg: "#FF0000",
        cursor: "pointer",
      },
    },
    signout: {
      color: "text",
      bg: "neutral",
      transition: "0.3s",
      "&:hover": {
        bg: "white",
        cursor: "pointer",
      },
    },
  },
};
