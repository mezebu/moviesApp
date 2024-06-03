import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import NavigationIcon from "@mui/icons-material/Navigation";
import StarRate from "@mui/icons-material/StarRate";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { CastMember, MovieT } from "../../types/interfaces";
import MovieReviews from "../movieReviews";
import { styles } from "./styles";

interface MovieDetailsProps {
  movie: MovieT;
  cast: CastMember[];
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, cast }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false); // New

  const handleActorClick = (actorId: number) => {
    navigate(`/actor/${actorId}`);
  };

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper variant="outlined" component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>
      <Paper variant="outlined" component="ul" sx={styles.chipSet}>
        <li>
          <Chip
            label="Production Country"
            sx={styles.chipLabel}
            color="primary"
          />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>
      <Paper variant="outlined" component="ul" sx={styles.chipSet}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper variant="outlined" sx={styles.chipSet}>
        <Typography component="div" variant="h5" fontWeight="bold">
          Cast
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {cast.map((member) => (
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
      </Paper>
      <Paper variant="outlined" sx={styles.chipSet}>
        <Chip label="Similar Movies" sx={styles.chipLabel} color="primary" />
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Link to={`/movies/similar/${movie.id}`}>
            Go to similar movies...
          </Link>
        </Stack>
      </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews {...movie} />
      </Drawer>
    </>
  );
};
export default MovieDetails;
