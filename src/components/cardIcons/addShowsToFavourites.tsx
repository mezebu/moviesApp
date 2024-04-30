import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseTVShow } from "../../types/interfaces";
import { Tooltip } from "@mui/material";

const AddShowsToFavouritesIcon: React.FC<BaseTVShow> = (show) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavouriteShows(show);
  };
  return (
    <Tooltip title="Add to favorites">
      <IconButton aria-label="add to favorites" onClick={onUserSelect}>
        <FavoriteIcon
          color={show.favourite ? "error" : "primary"}
          fontSize="large"
        />
      </IconButton>
    </Tooltip>
  );
};

export default AddShowsToFavouritesIcon;
