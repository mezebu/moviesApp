import React from "react";
import MovieHeader from "../headerMovie";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieImage, MovieT } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import Box from "@mui/material/Box";

interface TemplateMoviePageProps {
  movie: MovieT;
  children: React.ReactElement;
}

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = (props) => {
  const { movie, children } = props;
  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", movie.id],
    () => getMovieImages(movie.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data as MovieImage[];
  return (
    <Box>
      <MovieHeader {...movie} />

      <Box>{children}</Box>

      <ImageList cols={3}>
        {images.map((image: MovieImage) => (
          <ImageListItem key={image.file_path}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
              alt={"Image alternative"}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default TemplateMoviePage;
