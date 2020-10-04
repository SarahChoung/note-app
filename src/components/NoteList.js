import React, { Component } from "react";
import Note from "./Note";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Flex } from "theme-ui";

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
      <Flex>
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
      <button
        onClick={() => {
          props.handleViewChange("login");
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default NoteList;
