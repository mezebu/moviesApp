import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { SeasonDetail } from "../types/interfaces";
import { getSeasonDetail } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { Avatar, Box, Chip, Grid, Link, Typography } from "@mui/material";

const SeasonDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { showId, seasonNumber } = useParams<{
    showId: string;
    seasonNumber: string;
  }>();

  const {
    data: seasonDetail,
    error,
    isLoading,
    isError,
  } = useQuery<SeasonDetail, Error>(
    ["season detail", showId, seasonNumber],
    () => getSeasonDetail(showId!, seasonNumber!)
  );

  if (isLoading) return <Spinner />;

  if (isError) return <h1>{error.message}</h1>;

  if (!seasonDetail) return <h1>Season details not found.</h1>;

  const handleEpisodeClick = (epiNumber: number) => {
    navigate(`/season/${showId}/${seasonNumber}/${epiNumber}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2">
        {seasonDetail.name}
      </Typography>
      <Typography variant="subtitle1">{seasonDetail.overview}</Typography>
      <Box sx={{ my: 2 }}>
        <Chip label={`Season Number: ${seasonDetail.season_number}`} />
        <Chip label={`Episodes: ${seasonDetail.episodes.length}`} />
        <Chip label={`Air Date: ${seasonDetail.air_date}`} />
      </Box>
      <Grid container spacing={2}>
        {seasonDetail.episodes.map((episode) => (
          <Grid item lg={4} xs={12} sm={6} key={episode.id} sx={{ my: 2 }}>
            <Box>
              {episode.still_path && (
                <Avatar
                  src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                  variant="rounded"
                  sx={{ width: "100%", height: "100%" }}
                />
              )}
            </Box>

            <Typography
              component={Link}
              onClick={() => handleEpisodeClick(episode.episode_number)}
              sx={{ cursor: "pointer" }}
              variant="h6"
            >{`Episode ${episode.episode_number}: ${episode.name}`}</Typography>
            <Typography variant="body2">{episode.overview}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SeasonDetailsPage;
