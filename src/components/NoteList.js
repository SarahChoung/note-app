import React from "react";
import Note from "./Note";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Flex, Container, Button } from "theme-ui";
import CreateNote from "./CreateNote";

const NOTELIST_QUERY = gql`
  {
    noteList {
      id
      title
      description
    }
  }
`;

function NoteList(props) {
  return (
    <div>
      <Container sx={{ textAlign: "center" }}>
        <Button
          variant="primary"
          onClick={() => {
            props.handleViewChange("login");
          }}
        >
          Sign Out
        </Button>
        <Flex sx={{ justifyContent: "center" }} mb={2}>
          <Query query={NOTELIST_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;

              const notesToRender = data.noteList;
              return (
                <div>
                  {notesToRender.map((note) => (
                    <Note key={note.id} note={note} />
                  ))}
                </div>
              );
            }}
          </Query>
        </Flex>
        <CreateNote />
      </Container>
    </div>
  );
}

export default NoteList;
