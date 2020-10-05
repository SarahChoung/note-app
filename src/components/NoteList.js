/** @jsx jsx */
import { jsx } from "theme-ui";
import { useEffect, useState } from "react";
import Note from "./Note";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { Container, Button } from "theme-ui";
import CreateNote from "./CreateNote";
import { AUTH_TOKEN, USER_NAME } from "../constants";
// const NEW_NOTES_SUBSCRIPTION = gql`
//   subscription {
//     newNote {
//       id
//       title
//       description
//     }
//   }
// `;
// const DELETE_NOTE_SUBSCRIPTION = gql`
//   subscription {
//     deleteNote {
//       id
//       title
//       description
//     }
//   }
// `;
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
  const { data, loading, error, subscribeToMore, refetch } = useQuery(
    NOTELIST_QUERY,
    {
      // pollInterval: 500,
      onCompleted: (data) => setNotes(data.noteList),
    }
  );

  function updateNotes(newValue) {
    setNotes(newValue);
  }

  // const _subscribeToNewNotes = (subscribeToMore) => {
  //   subscribeToMore({
  //     document: NEW_NOTES_SUBSCRIPTION,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       const newNote = subscriptionData.data.newNote;
  //       const exists = prev.noteList.find(({ id }) => id === newNote.id);
  //       if (exists) return prev;
  //       setNotes([...prev.noteList, newNote]);
  //       return Object.assign({}, prev, {
  //         noteList: [...prev.noteList, newNote],
  //         __typename: newNote.__typename,
  //       });
  //     },
  //   });
  // };

  useEffect(() => {
    // const _subscribeToDeleteNote = (subscribeToMore) => {
    //   subscribeToMore({
    //     document: DELETE_NOTE_SUBSCRIPTION,
    //     updateQuery: (prev, { subscriptionData }) => {
    //       if (!subscriptionData.data) return prev;
    //       const deletedNote = subscriptionData.data.deleteNote;
    //       const deleteIndex = notes.indexOf(
    //         notes.find((element) => element.id === deletedNote.id)
    //       );
    //       let updatedList = notes;
    //       updatedList.splice(deleteIndex, 1);
    //       console.log("SPLICE", updatedList);
    //       setNotes(updatedList);
    //       console.log(
    //         Object.assign({}, prev, {
    //           noteList: updatedList,
    //         })
    //       );
    //       return Object.assign({}, prev, {
    //         noteList: updatedList,
    //       });
    //     },
    //   });
    // };
    // _subscribeToNewNotes(subscribeToMore);
    // _subscribeToDeleteNote(subscribeToMore);
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
                  <Note key={note.id} note={note} updateNotes={updateNotes} />
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
