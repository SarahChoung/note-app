/** @jsx jsx */
import { jsx, Button, Label, Input, Box } from "theme-ui";
import { useState } from "react";

export default function Login(props) {
  return (
    <div
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <h1 sx={{ color: "primary", textAlign: "center" }}>Fart Notes</h1>
        <h3>Sign In</h3>
        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            props.handleViewChange("notes");
          }}
          sx={{
            fontSize: 4,
            backgroundColor: "background",
            textAlign: "center",
          }}
        >
          <Label htmlFor="email">Email</Label>
          <Input name="email" id="email" mb={3} />
          <Label htmlFor="password">Password</Label>
          <Input name="password" id="password" mb={3} />
          <Button variant="secondary">Login</Button>
        </Box>
      </div>
    </div>
  );
}
