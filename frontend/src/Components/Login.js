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
import { verifyLogin } from "../api/api";
import { useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../App";
import { useForm, Controller } from "react-hook-form";

const Login = () => {
  const { handleSubmit, control } = useForm();

  const navigate = useNavigate();

  const { setIsAuth } = React.useContext(AuthContext);

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
      // set expiration time
      // localStorage.setItem(
      //   "decoded_access_token",
      //   JSON.stringify(jwt(response.data.access_token))
      // );

      // console.log("decoded token: ", jwt(response.data.access_token));
      // navigate to the welcome page
      setIsAuth(true);
      navigate("/welcome");
    },
  });

  const onSubmit = (data) => {
    // send the credentials to the server
    login(data);
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
        Don't have an account? Sign up <Link to="/sign-up-now">here</Link>.
      </Typography>

      {renderLoading()}
      {renderError()}
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
            />
          )}
          rules={{ required: "Password is required", minLength: 4 }}
        />
        <Button variant="contained" type="submit">
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
