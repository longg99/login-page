import {
  TextField,
  Typography,
  Container,
  Button,
  Alert,
  LinearProgress,
} from "@mui/material";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { verifyLogin } from "./api";
import { useMutation, useQueryClient } from "react-query";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  // get the client
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading,
    isError,
  } = useMutation((credentials) => verifyLogin(credentials), {
    onSuccess: (response) => {
      // save access token and refresh token to the local storage
      // just for demonstration purposes, not good in practice
      console.log(response.data);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      // navigate to the welcome page
      navigate("/welcome");
    },
  });

  const handleLogin = () => {
    console.log("user name is", username, "password is", password);
    // send the credentials to the server
    login({ username: username, password: password });
  };

  // on error from useMutation
  const renderError = () => {
    if (!isError) return null;
    return (
      <Alert severity="error">
        Username or password is incorrect. Please try again.
      </Alert>
    );
  };

  // render the progress bar
  const renderLoading = () => {
    if (!isLoading) return null;
    return <LinearProgress />;
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2vh",
      }}
    >
      <Typography variant="h4" textAlign="center">
        Hello! Please sign in or sign up to continue.
      </Typography>
      <Typography textAlign="center">
        Don't have an account? Sign up <Link to="/sign-up">here</Link>.
      </Typography>

      {renderLoading()}
      {renderError()}

      <TextField
        id="username"
        label="Username"
        margin="normal"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        autoFocus={true}
        autoComplete="off"
      />

      <TextField
        id="password"
        label="Password"
        margin="normal"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        style={{ marginBottom: "2vh" }}
      />

      <Button variant="contained" onClick={handleLogin}>
        Sign In
      </Button>
    </Container>
  );
};

export default Login;
