import React, { MouseEvent, useContext } from "react";
import { ListedMovie } from "../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { IconButton, Tooltip } from "@mui/material";

const AddToMustWatch: React.FC<ListedMovie> = (movie) => {
  const { addToMustWatch } = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToMustWatch(movie);
  };

  return (
    <Tooltip title="Add to must watch">
      <IconButton aria-label="add to must watch" onClick={onUserSelect}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default AddToMustWatch;
