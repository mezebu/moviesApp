import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import CardActions from "@mui/material/CardActions";
import { MoviesContext } from "../../contexts/moviesContext";
import { Actor } from "../../types/interfaces";
import { Content, StyledCard, StyledCardMedia } from "./styles";

interface ActorListProps {
  actor: Actor;
  action: (m: Actor) => React.ReactNode;
}

const ActorsCard: React.FC<ActorListProps> = (props) => {
  const actor = { ...props.actor, favourite: false };

  const { favouriteActors } = useContext(MoviesContext);

  if (favouriteActors.find((id) => id === actor.id)) actor.favourite = true;

  return (
    <StyledCard variant="outlined" elevation={0}>
      <StyledCardMedia
        image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
      />
      <Content>
        <Typography
          variant="h6"
          fontWeight="bold"
          color="white"
        >{`${actor.name}`}</Typography>
        <Typography
          variant="subtitle2"
          color="white"
        >{`Popularity: ${actor.popularity}`}</Typography>
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
      </Content>
    </StyledCard>
  );
};

export default ActorsCard;
