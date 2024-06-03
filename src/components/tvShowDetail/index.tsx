import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SortIcon from "@mui/icons-material/Sort";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { TVShowDetail, TvCastMember } from "../../types/interfaces";
import Link from "@mui/material/Link";

interface TvShowDetailsProps {
  show: TVShowDetail;
  cast: TvCastMember[];
}

const TvShowDetail: React.FC<TvShowDetailsProps> = ({ show, cast }) => {
  const navigate = useNavigate();
  const [sortAsc, setSortAsc] = useState(true);

  const toggleSortOrder = () => {
    setSortAsc(!sortAsc);
  };

  const sortedCast = sortAsc
    ? [...cast].sort((a, b) => a.name.localeCompare(b.name))
    : [...cast].sort((a, b) => b.name.localeCompare(a.name));

  const handleActorClick = (actorId: number) => {
    navigate(`/actor/${actorId}`);
  };

  const handleSeasonClick = (seasonNumber: number) => {
    navigate(`/season/${show.id}/${seasonNumber}`);
  };

  return (
    <Box sx={{ my: 2 }}>
      <Divider>
        <Chip label="Overview" size="medium" color="primary" />
      </Divider>
      <Typography variant="h6" component="p">
        {show.overview}
      </Typography>
      <Divider>
        <Chip label="Genre" size="medium" color="primary" />
      </Divider>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 2 }}>
        {show.genres.map((g) => (
          <Chip key={g.id} label={g.name} size="medium" />
        ))}
      </Stack>
      <Divider>
        <Chip label="Production Countries" size="medium" color="primary" />
      </Divider>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 2 }}>
        {show.production_countries.map((pc) => (
          <Chip key={pc.iso_3166_1} label={pc.name} size="medium" />
        ))}
      </Stack>
      <Divider>
        <Chip
          label="Production Companies & Networks"
          size="medium"
          color="primary"
        />
      </Divider>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 2 }}>
        {show.production_companies.map((pc) => (
          <Box key={pc.id} sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt={pc.name}
              src={`https://image.tmdb.org/t/p/w400/${pc.logo_path}`}
            />
            <Chip label={pc.name} size="medium" />
          </Box>
        ))}
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 2 }}>
        {show.networks.map((pc) => (
          <Box key={pc.id} sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt={pc.name}
              src={`https://image.tmdb.org/t/p/w400/${pc.logo_path}`}
            />
            <Chip label={pc.name} size="medium" />
          </Box>
        ))}
      </Stack>
      <Divider>
        <Chip label="Air Dates" size="medium" color="primary" />
      </Divider>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ my: 2 }}
      >
        <Typography>First Air date:</Typography>
        <Chip label={show.first_air_date} size="medium" />
        <Typography>Last Air date:</Typography>
        <Chip label={show.last_air_date} size="medium" />
      </Stack>
      <Divider>
        <Chip label="Cast" size="medium" color="primary" />
        <Tooltip title="Sort Cast">
          <IconButton onClick={toggleSortOrder} aria-label="sort cast">
            <SortIcon />
          </IconButton>
        </Tooltip>
      </Divider>

      <Stack direction="row" spacing={1} flexWrap="wrap">
        {sortedCast.map((member) => (
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
        <Chip label="Seasons" size="medium" color="primary" />
      </Divider>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {show.seasons.map((season) => (
          <Box
            component={Link}
            underline="hover"
            onClick={() => handleSeasonClick(season.season_number)}
            key={season.id}
            sx={{ cursor: "pointer" }}
          >
            <CardHeader
              avatar={
                season.poster_path ? (
                  <Avatar
                    alt={season.name}
                    src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`}
                    variant="rounded"
                    sx={{ width: 56, height: 60 }}
                  />
                ) : null
              }
              title={<Typography> {season.name}</Typography>}
              subheader={
                <Typography>
                  Number of episodes: {season.episode_count}
                </Typography>
              }
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TvShowDetail;
