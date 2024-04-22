import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { MoviesContext } from "../../contexts/moviesContext";
import { ListedMovie } from "../../types/interfaces";

const styles = {
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  media: { height: 0, paddingTop: "56.25%" }, // 16:9 aspect ratio
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
        avatar={
          movie.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
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
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Box sx={styles.content}>
              <CalendarIcon fontSize="small" />
              <Typography variant="subtitle1">{movie.release_date}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles.content}>
              <StarRateIcon fontSize="small" />
              <Typography variant="subtitle1">
                {"  "} {movie.vote_average}{" "}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {props.action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
