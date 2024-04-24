import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import img from "../../images/film-poster-placeholder.png";
import { BaseTVShow } from "../../types/interfaces";
import { Box } from "@mui/material";

interface TvCardProps {
  show: BaseTVShow;
}

const TvCard: React.FC<TvCardProps> = ({ show }) => {
  return (
    <Card sx={{ height: "100%" }} variant="outlined" elevation={0}>
      <CardHeader
        /*  avatar={
          show.favourite ? (
            <Avatar>
              <FavoriteIcon />
            </Avatar>
          ) : null
        } */
        title={<Typography variant="subtitle1">{show.name}</Typography>}
      />
      <CardMedia
        component="img"
        height="196"
        image={
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
            : img
        }
        alt="Paella dish"
      />
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CalendarIcon fontSize="medium" />
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            {show.first_air_date}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StarRateIcon fontSize="medium" />
          <Typography variant="subtitle1">
            {"  "} {show.vote_average}{" "}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TvCard;
