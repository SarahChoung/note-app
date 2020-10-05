/** @jsx jsx */
import { jsx } from "theme-ui";
import { Button } from "theme-ui";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { NOTELIST_QUERY } from "./NoteList";

const DELETE_MUTATION = gql`
  mutation DeleteMutation($id: Int!) {
    deleteNote(id: $id) {
      id
      title
      description
    }
  }
`;

export default function DeleteNote(props) {
  const id = Number.parseInt(props.id);
  return (
    <div>
      <Mutation
        mutation={DELETE_MUTATION}
        variables={{ id }}
        update={(store, { data: { deleteNote } }) => {
          const data = store.readQuery({ query: NOTELIST_QUERY });
          const newData = data;
          console.log("old", newData.noteList);

          const deleteIndex = newData.noteList.indexOf(
            newData.noteList.find((element) => element.id === deleteNote.id)
          );
          console.log(deleteIndex);
          newData.noteList.splice(deleteIndex, 1);
          store.writeQuery({
            query: NOTELIST_QUERY,
            data: newData,
          });
          console.log("new", newData.noteList);
          props.updateNotes(newData.noteList);
        }}
      >
        {(deleteMutation) => (
          <Button m={2} onClick={deleteMutation} variant="danger">
            Delete Note
          </Button>
        )}
      </Mutation>
    </div>
  );
}
