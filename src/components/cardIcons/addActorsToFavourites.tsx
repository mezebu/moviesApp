import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Person } from "../../types/interfaces";
import { Tooltip } from "@mui/material";

const AddActorsToFavouritesIcon: React.FC<Person> = (actor) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavouriteActors(actor);
  };
  return (
    <Tooltip title="Add to favorites">
      <IconButton aria-label="add to favorites" onClick={onUserSelect}>
        <FavoriteIcon
          color={actor.favourite ? "error" : "disabled"}
          fontSize="large"
        />
      </IconButton>
    </Tooltip>
  );
};

export default AddActorsToFavouritesIcon;
