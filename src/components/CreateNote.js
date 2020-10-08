import React, { useState } from "react";
import { Button, Label, Input, Box } from "theme-ui";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { NOTELIST_QUERY } from "./NoteList";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $title: String!) {
    postNote(description: $description, title: $title) {
      id
      title
      description
    }
  }
`;

export default function CreateNote(props) {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <Button
        onClick={() => setIsCreating(!isCreating)}
        variant={isCreating ? "primary" : "secondary"}
      >
        {isCreating ? "Cancel" : "Create New Note"}
      </Button>
      <Box m={"auto"} sx={{ width: "50%" }}>
        {isCreating && (
          <div>
            <Label htmlFor="title" color="white">
              Title
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="Title"
              id="Title"
              placeholder="Note Title"
              mb={3}
              backgroundColor="white"
            />
            <Label htmlFor="description" color="white">
              Description
            </Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              id="description"
              placeholder="Note Description"
              mb={3}
              backgroundColor="white"
            />
            <Mutation
              mutation={POST_MUTATION}
              variables={{ title, description }}
              onCompleted={(data) => {
                props.updateNotes(props.notes.push(data.postNote));
              }}
            >
              {(postMutation) => (
                <Button
                  variant="secondary"
                  onClick={() => {
                    postMutation();
                    setTitle("");
                    setDescription("");
                  }}
                >
                  Submit New Note
                </Button>
              )}
            </Mutation>
          </div>
        )}
      </Box>
    </div>
  );
}
