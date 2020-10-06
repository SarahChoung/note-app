/** @jsx jsx */
import { jsx } from "theme-ui";
import { useEffect, useState } from "react";
import Note from "./Note";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { Container, Button } from "theme-ui";
import CreateNote from "./CreateNote";
import { AUTH_TOKEN, USER_NAME } from "../constants";

export const NOTELIST_QUERY = gql`
  {
    noteList {
      id
      title
      description
    }
  }
`;
function NoteList(props) {
  const [notes, setNotes] = useState([]);
  const { data, loading, error, refetch } = useQuery(NOTELIST_QUERY, {
    onCompleted: (data) => setNotes(data.noteList),
  });

  function updateNotes(newValue) {
    setNotes(newValue);
  }

  useEffect(() => {
    refetch();
    if (data) {
      setNotes(data.noteList);
    }

    return () => {
      setNotes([]);
    };
  }, [data, notes, refetch]);

  return (
    <div sx={{ height: "97vh" }}>
      <div
        sx={{
          textAlign: "right",
          backgroundColor: "accent",
          padding: "5px 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div sx={{ fontWeight: "bold", fontSize: "1.25rem", color: "neutral" }}>
          Note App
        </div>
        <div>
          <Button
            variant="signout"
            onClick={() => {
              props.handleViewChange("login");
              localStorage.removeItem(AUTH_TOKEN);
              localStorage.removeItem(USER_NAME);
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
      <div sx={{ paddingTop: "1.5%" }}>
        <h1 sx={{ textAlign: "center" }}>
          Welcome,{" "}
          <span sx={{ textDecoration: "underline" }}>{props.userName}</span>!
        </h1>
      </div>
      <Container sx={{ width: "75%", margin: "auto" }}>
        <div
          sx={{ textAlign: "center", justifyContent: "center", margin: "3%" }}
        >
          {loading ? (
            <div>Fetching</div>
          ) : error ? (
            <div>Error</div>
          ) : (
            <div>
              {notes.length > 0 ? (
                notes.map((note) => (
                  <Note
                    key={note.id}
                    note={note}
                    delete
                    updateNotes={updateNotes}
                  />
                ))
              ) : (
                <div
                  sx={{
                    borderRadius: "10px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "10px auto",
                    minHeight: "100px",
                    backgroundColor: "neutral",
                    width: "300px",
                  }}
                >
                  You have no notes
                </div>
              )}
            </div>
          )}
        </div>
        <div sx={{ textAlign: "center", paddingBottom: "20px" }}>
          <CreateNote updateNotes={updateNotes} />
        </div>
      </Container>
    </div>
  );
}
export default NoteList;
