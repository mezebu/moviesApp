import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import { ActorListPageTemplateProps } from "../../types/interfaces";
import { Box } from "@mui/material";
import ActorsList from "../actorsList";

const ActorListPageTemplate: React.FC<ActorListPageTemplateProps> = (props) => {
  return (
    <Box sx={{ my: 2 }}>
      <Header title={props.title} />
      <Box sx={{ p: 1 }}>
        <Grid item container spacing={1}>
          <ActorsList action={props.action} actors={props.actors} />
        </Grid>
      </Box>
    </Box>
  );
};
export default ActorListPageTemplate;
