import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getTvShowImages } from "../../api/tmdb-api";
import { MovieImage, TVShowDetail } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import Box from "@mui/material/Box";
import TvShowHeader from "../headerTvShow";

interface TemplateTvShowPageProps {
  show: TVShowDetail;
  children: React.ReactElement;
}

const TemplateTvShowPage: React.FC<TemplateTvShowPageProps> = (props) => {
  const { show, children } = props;
  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", show.id],
    () => getTvShowImages(show.id)
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
      <TvShowHeader {...show} />

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

export default TemplateTvShowPage;
