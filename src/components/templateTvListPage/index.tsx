import Header from "../headerMovieList";
import { Box, Grid } from "@mui/material";
import TvList from "../tvList";
import React from "react";
import { TvListPageTemplateProps } from "../../types/interfaces";

const TvListPageTemplate: React.FC<TvListPageTemplateProps> = (props) => {
  return (
    <Box>
      <Header title={props.title} />

      <Grid item container spacing={1}>
        <TvList shows={props.shows} />
      </Grid>
    </Box>
  );
};

export default TvListPageTemplate;
