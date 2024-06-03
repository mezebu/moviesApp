import React from "react";
import { EpisodeDetail } from "../../types/interfaces";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface EpisodeDetailsProps {
  episode: EpisodeDetail;
}

const EpisodeDetails: React.FC<EpisodeDetailsProps> = ({ episode }) => {
  const navigate = useNavigate();
  // Function to format the air date
  const formatAirDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  // Function to format runtime
  const formatRuntime = (runtime: number) => {
    if (!runtime) return "N/A";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const handleActorClick = (actorId: number) => {
    navigate(`/actor/${actorId}`);
  };

  return (
    <Box>
      <Typography variant="subtitle1">{episode.overview}</Typography>
      <Box sx={{ my: 2 }}>
        <Chip label={`Season Number: ${episode.season_number}`} />
        <Chip label={`Runtime: ${formatRuntime(episode.runtime)}`} />
        <Chip label={`Air Date: ${formatAirDate(episode.air_date)}`} />
        <Chip label={`Vote Average: ${episode.vote_average}`} />
        <Chip label={`Vote Count: ${episode.vote_count}`} />
      </Box>

      <Divider>
        <Chip label="Guest Stars" size="medium" color="primary" />
      </Divider>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {episode.guest_stars.map((member) => (
          <Tooltip
            key={member.id}
            title={`${member.name} as ${member.character}`}
            placement="top"
          >
            <List
              sx={{ width: "100%", maxWidth: 250, cursor: "pointer" }}
              onClick={() => handleActorClick(member.id)}
            >
              <ListItem>
                <ListItemAvatar>
                  {member.profile_path ? (
                    <Avatar
                      alt={member.name}
                      src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                  ) : null}
                </ListItemAvatar>
                <ListItemText
                  primary={member.name}
                  secondary={`as ${member.character}`}
                />
              </ListItem>
            </List>
          </Tooltip>
        ))}
      </Stack>

      <Divider>
        <Chip label="Crew" size="medium" color="primary" />
      </Divider>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {episode.crew.map((member) => (
          <Tooltip
            key={member.id}
            title={`${member.name} as ${member.job}`}
            placement="top"
          >
            <List
              sx={{ width: "100%", maxWidth: 250, cursor: "pointer" }}
              onClick={() => handleActorClick(member.id)}
            >
              <ListItem>
                <ListItemAvatar>
                  {member.profile_path ? (
                    <Avatar
                      alt={member.name}
                      src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                  ) : null}
                </ListItemAvatar>
                <ListItemText primary={member.name} secondary={member.job} />
              </ListItem>
            </List>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};

export default EpisodeDetails;
