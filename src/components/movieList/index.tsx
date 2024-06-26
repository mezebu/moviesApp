import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import { ListedMovie } from "../../types/interfaces";

interface MovieListProps {
  movies: ListedMovie[];
  action: (m: ListedMovie) => React.ReactNode;
}

const MovieList: React.FC<MovieListProps> = (props) => {
  const movies = props.movies;
  const movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={6} lg={4}>
      <Movie key={m.id} movie={m} action={props.action} />
    </Grid>
  ));
  return movieCards;
};

export default MovieList;
