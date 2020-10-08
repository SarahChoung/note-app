/** @jsx jsx */
import { jsx } from "theme-ui";
import { Box, Grid } from "theme-ui";
import DeleteNote from "./DeleteNote";
import UpdateNote from "./UpdateNote";

export default function Note(props) {
  return (
    <Box
      p={2}
      bg="neutral"
      sx={{
        maxWidth: "600px",
        borderRadius: "10px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "15px auto",
      }}
    >
      <div sx={{ width: "100%" }}>
        <div
          sx={{
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2>{props.note.title}</h2>
          <p sx={{padding: "2%"}}>{props.note.description}</p>
        </div>
        <Grid gap={2} columns={[2]}>
          <UpdateNote note={props.note} />
          <DeleteNote
            id={props.note.id}
            updateNotes={props.updateNotes}
            notes={props.notes}
          />
        </Grid>
      </div>
    </Box>
  );
}
