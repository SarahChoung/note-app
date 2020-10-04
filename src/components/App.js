import React, { useState } from "react";
import "../styles/App.css";
import NoteList from "./NoteList";
import Login from "./Login";
import theme from "../theme";
import { ThemeProvider } from "theme-ui";
import { AUTH_TOKEN, USER_NAME } from "../constants";

function App() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const userName = localStorage.getItem(USER_NAME);

  const [view, setView] = useState("login");

  function handleViewChange(newView) {
    setView(newView);
  }

  let viewState;
  if (view === "login") {
    viewState = <Login handleViewChange={handleViewChange} />;
  } else if (authToken && view === "notes") {
    viewState = (
      <NoteList handleViewChange={handleViewChange} userName={userName} />
    );
  }

  return <ThemeProvider theme={theme}>{viewState}</ThemeProvider>;
}

export default App;
