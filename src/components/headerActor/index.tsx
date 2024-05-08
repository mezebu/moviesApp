import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ActorProfileDetails, ListedMovie } from "../../types/interfaces";
import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
};

const ActorHeader: React.FC<ActorProfileDetails> = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites: ListedMovie[] = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );
    setIsFavorite(favorites.some((movie) => movie.id === props.id));
  }, [props.id]);

  return (
    <Paper elevation={0} variant="outlined" sx={styles.root}>
      {isFavorite && (
        <Avatar sx={{ bgcolor: red[500] }}>
          <FavoriteIcon />
        </Avatar>
      )}

      <Typography variant="h4" fontWeight="bold" component="h3">
        {props.name}
      </Typography>
    </Paper>
  );
};

export default ActorHeader;
