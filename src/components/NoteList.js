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

const DELETE_NOTE_SUBSCRIPTION = gql`
  subscription {
    deleteNote {
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

        return Object.assign({}, prev, {
          noteList: [...prev.noteList, newNote],
          __typename: newNote.__typename,
        });
      },
    });
  };

  const _subscribeToDeleteNote = (subscribeToMore) => {
    subscribeToMore({
      document: DELETE_NOTE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const deletedNote = subscriptionData.data.deleteNote;

        let deleteIndex = prev.noteList.indexOf(
          prev.noteList.find((element) => element.id === deletedNote.id)
        );
        let updatedList = prev.noteList;
        updatedList.splice(deleteIndex, 1);

        console.log(
          Object.assign({}, prev, {
            noteList: updatedList,
            __typename: deletedNote.__typename,
          })
        );
        return Object.assign({}, prev, {
          noteList: updatedList,
          __typename: deletedNote.__typename,
        });
      },
    });
  };

  return (
    <div sx={{ marginBottom: "50px" }}>
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

              _subscribeToDeleteNote(subscribeToMore);
              _subscribeToNewNotes(subscribeToMore);

              const notesToRender = data.noteList;
              return (
                <div>
                  {notesToRender.length > 0 ? (
                    notesToRender.map((note) => (
                      <Note key={note.id} note={note} />
                    ))
                  ) : (
                    <div>There are no notes</div>
                  )}
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
