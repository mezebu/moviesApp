import React from "react";
import TvCard from "../tvCard";
import Grid from "@mui/material/Grid";
import { BaseTvShowList } from "../../types/interfaces";

const TvList: React.FC<BaseTvShowList> = (props) => {
  const shows = props.shows;
  const tvCards = shows.map((show) => (
    <Grid key={show.id} item xs={12} sm={6} md={4} lg={3}>
      <TvCard key={show.id} show={show} />
    </Grid>
  ));
  return tvCards;
};

export default TvList;
