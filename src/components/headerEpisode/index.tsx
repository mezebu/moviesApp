import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { EpisodeDetail } from "../../types/interfaces";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: 2,
  },
};

const EpisodeHeader: React.FC<EpisodeDetail> = (props) => {
  return (
    <Paper elevation={0} variant="outlined" sx={styles.root}>
      <Typography variant="h5" component="h5">
        Season: {props.season_number} Episode: {props.episode_number}
      </Typography>
      <Typography variant="h5" component="h5">
        Title: {props.name}
      </Typography>
    </Paper>
  );
};

export default EpisodeHeader;
