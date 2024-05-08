import React from "react";
import { ActorProfileDetails, MovieImage } from "../../types/interfaces";
import { getActorImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import { Box, ImageList, ImageListItem } from "@mui/material";
import Spinner from "../spinner";
import { useParams } from "react-router-dom";
import ActorHeader from "../headerActor";

interface TemplateActorPageProps {
  actor: ActorProfileDetails;
  children: React.ReactElement;
}

const TemplateActorPage: React.FC<TemplateActorPageProps> = (props) => {
  const { id } = useParams();
  const { actor, children } = props;
  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", id],
    () => getActorImages(id || "")
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
      <ActorHeader {...actor} />
      <Box sx={{ py: 2 }}>{children}</Box>
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

export default TemplateActorPage;
