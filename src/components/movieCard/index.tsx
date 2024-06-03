import React, { useContext } from "react";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CircularProgressWithLabel from "../circularProgress";
import img from "../../images/film-poster-placeholder.png";
import { MoviesContext } from "../../contexts/moviesContext";
import { ListedMovie } from "../../types/interfaces";
import { Content, StyledCard, StyledCardMedia, StyledContent } from "./styles";

interface MovieListProps {
  movie: ListedMovie;
  action: (m: ListedMovie) => React.ReactNode;
}

const MovieCard: React.FC<MovieListProps> = (props) => {
  const movie = { ...props.movie, favourite: false };
  const { favourites } = useContext(MoviesContext);

  if (favourites.find((id) => id === movie.id)) movie.favourite = true;

  // Round the voter average to the nearest whole number
  const roundedVoteAverage = Math.round(movie.vote_average);

  // Calculate the percentage based on the rounded voter average
  const percentage = (roundedVoteAverage / 10) * 100;

  // Check if movie.release_date is a valid date string
  const isValidDate = (dateString: string) => {
    return !isNaN(Date.parse(dateString));
  };

  // Parse the release date string into a Date object if it's valid
  const releaseDate = isValidDate(movie.release_date)
    ? new Date(movie.release_date)
    : null;

  // Format the date as "15 Dec 2023" if it's valid, otherwise display an error message
  const formattedDate = releaseDate
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(releaseDate)
    : "Invalid Date";

  return (
    <StyledCard>
      <StyledCardMedia
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <Content>
        <Typography variant="h6" color="white" fontWeight="bold">
          {movie.title}{" "}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <StyledContent>
            <Typography variant="subtitle1" fontWeight="bold">
              {formattedDate}
            </Typography>
          </StyledContent>

          <StyledContent>
            <CircularProgressWithLabel thickness={6} value={percentage} />
          </StyledContent>
        </Box>

        <CardActions disableSpacing>
          {props.action(movie)}
          <Link to={`/movies/${movie.id}`}>
            <Tooltip title="More movie info">
              <IconButton aria-label="add to favorites">
                <InfoIcon fontSize="large" color="primary" />
              </IconButton>
            </Tooltip>
          </Link>
        </CardActions>
      </Content>
    </StyledCard>
  );
};

export default MovieCard;
