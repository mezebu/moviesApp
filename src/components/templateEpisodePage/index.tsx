import React from "react";
import { EpisodeDetail, MovieImage } from "../../types/interfaces";
import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import EpisodeHeader from "../headerEpisode";
import Spinner from "../spinner";
import { useQuery } from "react-query";
import { getEpisodeImages } from "../../api/tmdb-api";
import { useParams } from "react-router-dom";

interface TemplateEpisodePageProps {
  episode: EpisodeDetail;
  children: React.ReactElement;
}

const TemplateEpisodePage: React.FC<TemplateEpisodePageProps> = (props) => {
  const { episode, children } = props;
  const { showId, seasonNumber, episodeNumber } = useParams<{
    showId: string;
    seasonNumber: string;
    episodeNumber: string;
  }>();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", showId],
    () => getEpisodeImages(showId!, seasonNumber!, episodeNumber!)
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
      <EpisodeHeader {...episode} />
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

export default TemplateEpisodePage;
