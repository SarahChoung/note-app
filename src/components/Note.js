import React from "react";
import { Box, Grid } from "theme-ui";
import DeleteNote from "./DeleteNote";
import UpdateNote from "./UpdateNote";

export default function Note(props) {
  return (
    <Box p={2} bg="noteBackground" m={1}>
      <div>
        <h2>{props.note.title}</h2>
        <p>{props.note.description}</p>
      </div>
      <Grid gap={2} columns={[2]}>
        <UpdateNote note={props.note} />
        <DeleteNote id={props.note.id} />
      </Grid>
    </Box>
  );
}
