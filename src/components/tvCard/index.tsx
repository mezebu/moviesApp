import React, { useContext } from "react";
import CardActions from "@mui/material/CardActions";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import img from "../../images/film-poster-placeholder.png";
import { BaseTVShow } from "../../types/interfaces";
import { Box, Tooltip } from "@mui/material";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router-dom";
import { Content, StyledCard, StyledCardMedia, StyledContent } from "./styles";

interface TvCardProps {
  show: BaseTVShow;
  action: (m: BaseTVShow) => React.ReactNode;
}

const TvCard: React.FC<TvCardProps> = (props) => {
  const show = { ...props.show, favourite: false };
  const { favouriteShows } = useContext(MoviesContext);

  if (favouriteShows.find((id) => id === show.id)) show.favourite = true;

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
            <CalendarIcon fontSize="medium" />
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              {show.first_air_date}
            </Typography>
          </StyledContent>

          <StyledContent>
            <StarRateIcon fontSize="medium" />
            <Typography variant="subtitle1">
              {"  "} {show.vote_average}{" "}
            </Typography>
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
