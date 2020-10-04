import React from "react";
import { Box } from "theme-ui";

export default function Note(props) {
  return (
    <Box p={2} bg="noteBackground" m={1}>
      <div>
        {props.note.description} ({props.note.title})
      </div>
    </Box>
  );
}
