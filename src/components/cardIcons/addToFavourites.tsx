import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ListedMovie } from "../../types/interfaces";
import { Tooltip } from "@mui/material";

const AddToFavouritesIcon: React.FC<ListedMovie> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(movie);
  };
  return (
    <Tooltip title="Add to favorites">
      <IconButton aria-label="add to favorites" onClick={onUserSelect}>
        <FavoriteIcon
          color={movie.favourite ? "error" : "disabled"}
          fontSize="large"
        />
      </IconButton>
    </Tooltip>
  );
};

export default AddToFavouritesIcon;
