/** @jsx jsx */
import { jsx } from "theme-ui";
import Note from "./Note";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Container, Button } from "theme-ui";
import CreateNote from "./CreateNote";
import { AUTH_TOKEN } from "../constants";

const NEW_NOTES_SUBSCRIPTION = gql`
  subscription {
    newNote {
      id
      title
      description
    }
  }
`;

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
  const _subscribeToNewNotes = (subscribeToMore) => {
    subscribeToMore({
      document: NEW_NOTES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newNote = subscriptionData.data.newNote;

        const exists = prev.noteList.find(({ id }) => id === newNote.id);
        if (exists) return prev;

        console.log(prev);
        console.log(
          Object.assign({}, prev, {
            noteList: [...prev.noteList, newNote],
            __typename: prev.noteList.__typename,
          })
        );

        return Object.assign({}, prev, {
          noteList: [...prev.noteList, newNote],
          __typename: prev.noteList.__typename,
        });
      },
    });
  };

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
            {({ loading, error, data, subscribeToMore }) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;

              _subscribeToNewNotes(subscribeToMore);

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
