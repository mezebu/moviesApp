import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MovieT, ListedMovie } from "../../types/interfaces";
import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
};

const MovieHeader: React.FC<MovieT> = (props) => {
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

      <Typography variant="h4" component="h3">
        {props.title}
        {"   "}
        <a href={props.homepage}>
          <HomeIcon color="primary" fontSize="large" />
        </a>
        <br />
        <span>{`${props.tagline}`} </span>
      </Typography>
    </Paper>
  );
};

export default MovieHeader;
