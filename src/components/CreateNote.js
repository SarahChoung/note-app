import React, { useState } from "react";
import { Button, Label, Input, Box } from "theme-ui";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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
  console.log(title, description);
  return (
    <div>
      <Button onClick={() => setIsCreating(!isCreating)}>
        {isCreating ? "Cancel" : "Create New Note"}
      </Button>
      <Box m={"auto"} sx={{ width: "50%" }}>
        {isCreating && (
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="Title"
              id="Title"
              placeholder="Note Title"
              mb={3}
            />
            <Label htmlFor="description">Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              id="description"
              placeholder="Note Description"
              mb={3}
            />
            <Mutation
              mutation={POST_MUTATION}
              variables={{ title, description }}
            >
              {(postMutation) => (
                <Button onClick={postMutation}>Submit New Note</Button>
              )}
            </Mutation>
          </div>
        )}
      </Box>
    </div>
  );
}
