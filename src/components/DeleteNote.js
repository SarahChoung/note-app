/** @jsx jsx */
import { jsx } from "theme-ui";
import { Button } from "theme-ui";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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
      <Mutation mutation={DELETE_MUTATION} variables={{ id }}>
        {(deleteMutation) => (
          <Button m={2} onClick={deleteMutation} variant="danger">
            Delete Note
          </Button>
        )}
      </Mutation>
    </div>
  );
}
