import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import SignOut from "./SignOut";

const Welcome = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      mt={2}
    >
      <Typography variant="h4">Hello There!</Typography>
      <SignOut />
    </Box>
  );
};

export default Welcome;
