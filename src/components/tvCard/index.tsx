import React, { useContext } from "react";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import img from "../../images/film-poster-placeholder.png";
import { BaseTVShow } from "../../types/interfaces";
import { Box, Tooltip } from "@mui/material";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router-dom";
import { Content, StyledCard, StyledCardMedia, StyledContent } from "./styles";
import CircularProgressWithLabel from "../circularProgress";

interface TvCardProps {
  show: BaseTVShow;
  action: (m: BaseTVShow) => React.ReactNode;
}

const TvCard: React.FC<TvCardProps> = (props) => {
  const show = { ...props.show, favourite: false };
  const { favouriteShows } = useContext(MoviesContext);

  if (favouriteShows.find((id) => id === show.id)) show.favourite = true;

  // Round the voter average to the nearest whole number
  const roundedVoteAverage = Math.round(show.vote_average);

  // Calculate the percentage based on the rounded voter average
  const percentage = (roundedVoteAverage / 10) * 100;

  // Check if movie.release_date is a valid date string
  const isValidDate = (dateString: string) => {
    return !isNaN(Date.parse(dateString));
  };

  // Parse the release date string into a Date object if it's valid
  const releaseDate = isValidDate(show.first_air_date)
    ? new Date(show.first_air_date)
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
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
            : img
        }
      />
      <Content>
        <Typography
          variant="h6"
          color="white"
          fontWeight="bold"
          sx={{ px: 2 }}
        >{`${show.name}`}</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
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
          {props.action(show)}
          <Link to={`/tv/${show.id}`}>
            <Tooltip title="Tv Show Details">
              <IconButton aria-label="share">
                <InfoIcon fontSize="large" color="primary" />
              </IconButton>
            </Tooltip>
          </Link>
        </CardActions>
      </Content>
    </StyledCard>
  );
};

export default TvCard;
