import React, { useState } from "react";
import { Button, Label, Input, Box } from "theme-ui";

export default function CreateNote(props) {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
            <Button>Submit New Note</Button>
          </div>
        )}
      </Box>
    </div>
  );
}
