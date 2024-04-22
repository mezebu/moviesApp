import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    "& > * + *": {
      marginLeft: 2,
    },
  },
};

const CircularIndeterminate: React.FC = () => {
  return (
    <Box sx={styles.root}>
      <CircularProgress />
      <CircularProgress />
    </Box>
  );
};

export default CircularIndeterminate;
