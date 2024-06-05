import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ListedMovie, ShowT } from "../../types/interfaces";
import { Avatar, IconButton } from "@mui/material";
import { styles } from "./styles";

const TvShowHeader: React.FC<ShowT> = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites: ListedMovie[] = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );
    setIsFavorite(favorites.some((movie) => movie.id === props.id));
  }, [props.id]);

  return (
    <Paper elevation={3} sx={styles.root}>
      {isFavorite && (
        <Avatar sx={styles.favoriteIcon}>
          <FavoriteIcon />
        </Avatar>
      )}

      <Typography variant="h4" component="h3" sx={styles.title}>
        {props.name}
        {props.homepage && (
          <IconButton
            href={props.homepage}
            target="_blank"
            color="primary"
            size="large"
          >
            <HomeIcon />
          </IconButton>
        )}
      </Typography>

      <Typography variant="subtitle1" sx={styles.tagline}>
        {props.tagline}
      </Typography>
    </Paper>
  );
};

export default TvShowHeader;
