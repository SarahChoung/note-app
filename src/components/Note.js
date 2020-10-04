import React, { Component } from "react";
import { Box } from "theme-ui";

class Note extends Component {
  render() {
    return (
      <Box p={2} bg="noteBackground" m={1} sx={{ width: "25%" }}>
        <div>
          {this.props.note.description} ({this.props.note.title})
        </div>
      </Box>
    );
  }
}

export default Note;
