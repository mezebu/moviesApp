import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { blue, red } from "@mui/material/colors";

import { Actor } from "../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

interface ActorListProps {
  actor: Actor;
  action: (m: Actor) => React.ReactNode;
}

const ActorsCard: React.FC<ActorListProps> = (props) => {
  const actor = { ...props.actor, favourite: false };

  const { favouriteActors } = useContext(MoviesContext);

  if (favouriteActors.find((id) => id === actor.id)) actor.favourite = true;

  return (
    <Card variant="outlined" elevation={0}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: actor.gender === 1 ? red[500] : blue[500] }}
            aria-label="recipe"
          >
            {actor.gender === 1 ? "F" : "M"}
          </Avatar>
        }
        title={`${actor.name}`}
        subheader={`Popularity: ${actor.popularity}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        {props.action(actor)}
        <Link to={`/actor/${actor.id}`}>
          <Tooltip title="Actor Details">
            <IconButton aria-label="share">
              <InfoIcon fontSize="large" color="primary" />
            </IconButton>
          </Tooltip>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ActorsCard;
