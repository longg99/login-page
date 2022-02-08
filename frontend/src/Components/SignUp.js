import React, { useRef } from "react";
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
import { useForm, Controller } from "react-hook-form";

const SignUp = () => {
  // for react-hook-form validation
  const { handleSubmit, control, watch } = useForm();
  const [username, setUsername] = React.useState("");
  const password = useRef({});
  password.current = watch("password", "");
  const [retype, setRetype] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  console.log(password.current);

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

  const onSubmit = (data) => {
    // signUp(userInfo);
    console.log(data);
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

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "Username is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              id="username"
              label="Username"
              margin="normal"
              value={value}
              onChange={onChange}
              autoFocus={true}
              error={!!error}
              helperText={error ? error.message : null}
              autoComplete="off"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              id="password"
              label="Password"
              margin="normal"
              value={value}
              onChange={onChange}
              type="password"
              style={{ marginBottom: "2vh" }}
              error={!!error}
              helperText={error ? error.message : null}
              ref={password}
            />
          )}
          rules={{ required: "Password is required", minLength: 4 }}
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

        <Button variant="contained" sx={{ marginTop: "2vh" }} type="submit">
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
