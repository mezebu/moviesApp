import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TVShowDetail, TvCastMember } from "../../types/interfaces";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/Sort";

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

  return (
    <div>
      <Typography variant="h5" component="h3" align="center">
        Overview
      </Typography>
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
            <Box onClick={() => handleActorClick(member.id)} sx={{ mt: 5 }}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    member.profile_path ? (
                      <Avatar
                        alt={member.name}
                        src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                        sx={{ width: 56, height: 60 }}
                      />
                    ) : null
                  }
                  title={<Typography>{member.name}</Typography>}
                />
              </CardActionArea>
            </Box>
          </Tooltip>
        ))}
      </Stack>
      <Divider>
        <Chip label="Seasons" size="medium" color="primary" />
      </Divider>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {show.seasons.map((season) => (
          <Box key={season.id}>
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
    </div>
  );
};

export default TvShowDetail;
