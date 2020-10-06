/** @jsx jsx */
import { jsx, Button, Label, Input, Box } from "theme-ui";
import { useState } from "react";
import { AUTH_TOKEN, USER_NAME } from "../constants";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

export default function Login(props) {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const _confirm = async (data) => {
    const { token } = login ? data.login : data.signup;
    const { name } = login ? data.login.user : data.signup.user;
    _saveUserData(token, name);
    props.handleViewChange("notes");
  };

  const _saveUserData = (token, name) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USER_NAME, name);
  };

  return (
    <div
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        backgroundColor: "e7d8c9",
      }}
    >
      <div
        sx={{
          backgroundColor: "neutral",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <h1
          sx={{
            color: "danger",
            textAlign: "center",
            dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          Note App
        </h1>
        <h2 sx={{ textAlign: "center", color: "carbon" }}>
          {login ? "Login" : "Sign Up"}
        </h2>
        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          sx={{
            fontSize: 4,
            textAlign: "center",
          }}
        >
          {!login && (
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                name="username"
                id="username"
                mb={3}
              />
            </div>
          )}
          <Label htmlFor="email">Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            placeholder="Your email"
            mb={3}
            sx={{
              boxShadow: "inset 2px 4px 4px rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(0, 0, 0, 0.25)",
            }}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            placeholder="Your password"
            mb={3}
            sx={{
              boxShadow: "inset 2px 4px 4px rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(0, 0, 0, 0.25)",
            }}
          />
          <Button
            type="button"
            variant="primary"
            onClick={() => setLogin(!login)}
            mr={2}
          >
            {login ? "Need to create an account?" : "Already have an account?"}
          </Button>

          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={(data, error) => {
              if (error) {
                return <div>An Error</div>;
              }
              if (data) {
                _confirm(data);
              }
            }}
          >
            {(mutation) => (
              <Button onClick={mutation} variant="secondary">
                {login ? "Log In" : "Create Account"}
              </Button>
            )}
          </Mutation>
        </Box>
      </div>
    </div>
  );
}
