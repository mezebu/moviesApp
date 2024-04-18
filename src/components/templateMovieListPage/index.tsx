import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import { MovieListPageTemplateProps } from "../../types/interfaces";
import { Box } from "@mui/material";

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = (props) => {
  return (
    <Box sx={{ padding: 5 }}>
      <Header title={props.title} />

      <Grid item container spacing={1}>
        <MovieList
          selectFavourite={props.selectFavourite}
          movies={props.movies}
        />
      </Grid>
    </Box>
  );
};
export default MovieListPageTemplate;
