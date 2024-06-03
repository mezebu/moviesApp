import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { EpisodeDetail } from "../types/interfaces";
import { getEpisodeDetail } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { Box } from "@mui/material";
import TemplateEpisodePage from "../components/templateEpisodePage";
import EpisodeDetails from "../components/episodeDetail";

const EpisodeDetailPage: React.FC = () => {
  const { showId, seasonNumber, episodeNumber } = useParams<{
    showId: string;
    seasonNumber: string;
    episodeNumber: string;
  }>();

  const {
    data: episode,
    error,
    isLoading,
    isError,
  } = useQuery<EpisodeDetail, Error>(
    ["episode detail", showId, seasonNumber, episodeNumber],
    () => getEpisodeDetail(showId!, seasonNumber!, episodeNumber!)
  );

  if (isLoading) return <Spinner />;

  if (isError) return <h1>{error.message}</h1>;

  if (!episode) return <h1>Episode details not found.</h1>;

  return (
    <Box>
      {episode && (
        <TemplateEpisodePage episode={episode}>
          <EpisodeDetails episode={episode} />
        </TemplateEpisodePage>
      )}
    </Box>
  );
};

export default EpisodeDetailPage;
