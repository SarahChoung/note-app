/** @jsx jsx */
import { jsx } from "theme-ui";
import Note from "./Note";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Container, Button } from "theme-ui";
import CreateNote from "./CreateNote";
import { AUTH_TOKEN } from "../constants";

const NOTELIST_QUERY = gql`
  {
    noteList {
      id
      title
      description
    }
  }
`;

function NoteList(props) {
  return (
    <div>
      <div sx={{ textAlign: "right" }}>
        <Button
          variant="primary"
          onClick={() => {
            props.handleViewChange("login");
            localStorage.setItem(AUTH_TOKEN, null);
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
          <Query query={NOTELIST_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;

              const notesToRender = data.noteList;
              return (
                <div>
                  {notesToRender.map((note) => (
                    <Note key={note.id} note={note} />
                  ))}
                </div>
              );
            }}
          </Query>
        </div>
        <div sx={{ textAlign: "center" }}>
          <CreateNote />
        </div>
      </Container>
    </div>
  );
}

export default NoteList;
