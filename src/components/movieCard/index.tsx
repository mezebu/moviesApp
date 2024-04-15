import React, { MouseEvent } from "react";
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
import IconButton from "@mui/material/IconButton";
import img from "../../images/film-poster-placeholder.png";
import { BaseMovie } from "../../types/interfaces";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";

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

interface MovieCardProps extends BaseMovie {
  selectFavourite: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = (props) => {
  const handleAddToFavourite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.selectFavourite(props.id);
  };

  return (
    <Card sx={styles.card} variant="outlined">
      <CardHeader
        avatar={
          props.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={<Typography variant="body1">{props.title} </Typography>}
      />
      <CardMedia
        sx={styles.media}
        image={
          props.poster_path
            ? `https://image.tmdb.org/t/p/w500/${props.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Box sx={styles.content}>
              <CalendarIcon fontSize="small" />
              <Typography variant="subtitle1">{props.release_date}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles.content}>
              <StarRateIcon fontSize="small" />
              <Typography variant="subtitle1">
                {"  "} {props.vote_average}{" "}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favourites"
          onClick={handleAddToFavourite}
        >
          <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
        <Link to={`/movies/${props.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
