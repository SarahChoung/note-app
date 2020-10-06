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
    <div sx={{ marginBottom: "50px" }}>
      <div sx={{ textAlign: "right" }}>
        <Button
          variant="primary"
          onClick={() => {
            props.handleViewChange("login");
            localStorage.removeItem(AUTH_TOKEN);
            localStorage.removeItem(USER_NAME);
          }}
        >
          Sign Out
        </Button>
      </div>
      <h1 sx={{ textAlign: "center" }}>Welcome, {props.userName}!</h1>
      <Container sx={{ width: "75%", margin: "auto" }}>
        <div
          sx={{ textAlign: "center", justifyContent: "center", margin: "5%" }}
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
                <div>There are no notes</div>
              )}
            </div>
          )}
        </div>
        <div sx={{ textAlign: "center" }}>
          <CreateNote updateNotes={updateNotes} />
        </div>
      </Container>
    </div>
  );
}
export default NoteList;
