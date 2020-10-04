/** @jsx jsx */
import { jsx } from "theme-ui";
import { useState } from "react";
import { Button, Label, Input, Box } from "theme-ui";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const UPDATE_MUTATION = gql`
  mutation UpdatetMutation($id: Int!, $description: String!, $title: String!) {
    updateNote(id: $id, description: $description, title: $title) {
      id
      title
      description
    }
  }
`;

export default function UpdateNote(props) {
  const id = Number.parseInt(props.note.id);
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div>
      <Button m={2} onClick={() => setIsUpdating(!isUpdating)}>
        {isUpdating ? "Cancel" : "Update Note"}
      </Button>
      <Box m={"auto"} sx={{ width: "50%" }}>
        {isUpdating && (
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="Title"
              id="Title"
              placeholder={props.note.title}
              mb={3}
            />
            <Label htmlFor="description">Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              id="description"
              placeholder={props.note.description}
              mb={3}
            />
            <Mutation
              mutation={UPDATE_MUTATION}
              variables={{ id, title, description }}
            >
              {(updateMutation) => (
                <Button
                  onClick={() => {
                    updateMutation();
                    setIsUpdating(!isUpdating);
                    setTitle("");
                    setDescription("");
                  }}
                >
                  Update Note
                </Button>
              )}
            </Mutation>
          </div>
        )}
      </Box>
    </div>
  );
}
