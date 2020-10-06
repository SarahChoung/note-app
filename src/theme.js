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
        bg: "darkerBase",
        cursor: " pointer",
      },
    },
    secondary: {
      color: "text",
      bg: "accent",
      transition: "0.3s",
      "&:hover": {
        bg: "darkerAccent",
        cursor: "pointer",
      },
    },
    danger: {
      color: "background",
      bg: "danger",
      transition: "0.3s",
      "&:hover": {
        bg: "darkerDanger",
        cursor: "pointer",
      },
    },
    signout: {
      color: "text",
      bg: "neutral",
      transition: "0.3s",
      "&:hover": {
        bg: "base",
        cursor: "pointer",
      },
    },
  },
};
