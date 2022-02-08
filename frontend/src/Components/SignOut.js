import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const SignOut = () => {
  const navigate = useNavigate();

  const { setIsAuth } = React.useContext(AuthContext);

  const handleSignOut = () => {
    // remove all tokens
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("decoded_access_token");
    setIsAuth(false);
    // back to the login page
    navigate("/");
  };

  return (
    <Button variant="contained" onClick={handleSignOut}>
      Sign out
    </Button>
  );
};

export default SignOut;
