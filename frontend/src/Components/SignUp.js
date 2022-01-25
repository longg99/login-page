import React from "react";
import {
  TextField,
  Typography,
  Divider,
  Grid,
  Container,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

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

      <TextField
        id="outlined-name"
        label="Username"
        margin="normal"
        value={username}
        onChange={() => {}}
      />

      <TextField
        id="outlined-name"
        label="Password"
        margin="normal"
        value={password}
        onChange={() => {}}
        style={{ marginBottom: "2vh" }}
      />

      <Button variant="contained">Sign Up</Button>
    </Container>
  );
};

export default SignUp;
