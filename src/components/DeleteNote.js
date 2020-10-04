import React, { useState } from "react";
import { Button, Label, Input, Box } from "theme-ui";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const DELETE_MUTATION = gql`
  mutation DeleteMutation($id: Int!) {
    deleteNote(id: $id) {
      id
      title
      description
    }
  }
`;

export default function DeleteNote(props) {
  const id = Number.parseInt(props.id);
  return (
    <Mutation mutation={DELETE_MUTATION} variables={{ id }}>
      {(deleteMutation) => (
        <Button onClick={deleteMutation}>Delete Note</Button>
      )}
    </Mutation>
  );
}
