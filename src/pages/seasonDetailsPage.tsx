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

  if (isError)
    return <Typography variant="h6">Error: {error.message}</Typography>;

  if (!seasonDetail)
    return <Typography variant="h6">Season details not found.</Typography>;

  const handleEpisodeClick = (epiNumber: number) => {
    navigate(`/season/${showId}/${seasonNumber}/${epiNumber}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2">
        {seasonDetail.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {seasonDetail.overview}
      </Typography>
      <Box sx={{ my: 2 }}>
        <Chip label={`Season Number: ${seasonDetail.season_number}`} />
        <Chip label={`Episodes: ${seasonDetail.episodes.length}`} />
        <Chip label={`Air Date: ${seasonDetail.air_date}`} />
      </Box>
      <Grid container spacing={2} mt={3}>
        {seasonDetail.episodes.map((episode) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={episode.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {episode.still_path && (
                <Avatar
                  src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                  alt={`Episode ${episode.episode_number}`}
                  variant="rounded"
                  sx={{ width: "100%", height: "100%", mb: 1 }}
                />
              )}
              <Typography
                component={Link}
                onClick={() => handleEpisodeClick(episode.episode_number)}
                variant="body1"
                align="center"
                sx={{ cursor: "pointer", mb: 1 }}
                underline="hover"
              >
                Episode {episode.episode_number}: {episode.name}
              </Typography>
              <Typography variant="body2" align="center">
                {episode.overview}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SeasonDetailsPage;
