import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import { MovieListPageTemplateProps } from "../../types/interfaces";

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = (props) => {
  return (
    <>
      <Header title={props.title} />

      <Grid item container spacing={1}>
        <MovieList
          selectFavourite={props.selectFavourite}
          movies={props.movies}
        ></MovieList>
      </Grid>
    </>
  );
};
export default MovieListPageTemplate;
