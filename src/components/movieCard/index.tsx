import React, { useContext } from "react";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import InfoIcon from "@mui/icons-material/Info";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
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
            <CalendarIcon fontSize="medium" />
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              {movie.release_date}
            </Typography>
          </StyledContent>

          <StyledContent>
            <StarRateIcon fontSize="medium" />
            <Typography variant="subtitle1">
              {"  "} {movie.vote_average}{" "}
            </Typography>
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
