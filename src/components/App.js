import React, { useState } from "react";
import "../styles/App.css";
import NoteList from "./NoteList";
import Login from "./Login";
import theme from "../theme";
import { ThemeProvider } from "theme-ui";

function App() {
  const [view, setView] = useState("login");

  function handleViewChange(newView) {
    setView(newView);
  }

  let viewState;
  if (view === "login") {
    viewState = <Login handleViewChange={handleViewChange} />;
  } else if (view === "notes") {
    viewState = <NoteList handleViewChange={handleViewChange} />;
  }

  return <ThemeProvider theme={theme}>{viewState}</ThemeProvider>;
}

export default App;
