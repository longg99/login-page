import React from "react";
import {
  TextField,
  Typography,
  Divider,
  Grid,
  Container,
  Button,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../api/api";
import { useMutation } from "react-query";

const SignUp = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [retype, setRetype] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const navigate = useNavigate();
  const {
    mutate: signUp,
    isLoading,
    isError,
  } = useMutation((userInfo) => signUpUser(userInfo), {
    onSuccess: (response) => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 3000);
    },
  });

  const handleSignUp = () => {
    const userInfo = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    signUp(userInfo);
  };

  const renderNotification = () => {
    if (!success) return null;
    return (
      <Alert severity="success">
        Welcome abroad! You will be redirected to the login screen shortly.
      </Alert>
    );
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
      <Typography variant="h4">Sign up form</Typography>
      <Typography>
        Already have an account? Sign in <Link to="/login">here</Link>.
      </Typography>

      {renderNotification()}

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
      />

      <TextField
        id="password-retype"
        label="Retype password"
        margin="normal"
        value={retype}
        onChange={(e) => {
          setRetype(e.target.value);
        }}
        type="password"
      />

      <TextField
        id="firstName"
        label="First name"
        margin="normal"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        autoComplete="nope"
      />

      <TextField
        id="lastName"
        label="Last name"
        margin="normal"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        autoComplete="nope"
      />

      <TextField
        id="email"
        label="Email"
        margin="normal"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        autoComplete="nope"
      />

      <Button
        variant="contained"
        sx={{ marginTop: "2vh" }}
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
    </Container>
  );
};

export default SignUp;
