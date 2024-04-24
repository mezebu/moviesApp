import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import InfoIcon from "@mui/icons-material/Info";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import { MoviesContext } from "../../contexts/moviesContext";
import { ListedMovie } from "../../types/interfaces";

const styles = {
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  media: { height: 0, paddingTop: "60%" },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

interface MovieListProps {
  movie: ListedMovie;
  action: (m: ListedMovie) => React.ReactNode;
}

const MovieCard: React.FC<MovieListProps> = (props) => {
  const movie = { ...props.movie, favourite: false };
  const { favourites } = useContext(MoviesContext);

  if (favourites.find((id) => id === movie.id)) movie.favourite = true;

  return (
    <Card sx={styles.card} variant="outlined">
      <CardHeader
        title={<Typography variant="body1">{movie.title} </Typography>}
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={styles.content}>
          <CalendarIcon fontSize="medium" />
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            {movie.release_date}
          </Typography>
        </Box>

        <Box sx={styles.content}>
          <StarRateIcon fontSize="medium" />
          <Typography variant="subtitle1">
            {"  "} {movie.vote_average}{" "}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        {props.action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Tooltip title="More info">
            <IconButton aria-label="add to favorites">
              <InfoIcon fontSize="large" color="primary" />
            </IconButton>
          </Tooltip>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
