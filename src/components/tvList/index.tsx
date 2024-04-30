import React from "react";
import TvCard from "../tvCard";
import Grid from "@mui/material/Grid";
import { BaseTVShow } from "../../types/interfaces";

interface ShowProps {
  shows: BaseTVShow[];
  action: (m: BaseTVShow) => React.ReactNode;
}

const TvList: React.FC<ShowProps> = (props) => {
  const shows = props.shows;
  const tvCards = shows.map((show) => (
    <Grid key={show.id} item xs={12} sm={6} md={6} lg={4}>
      <TvCard key={show.id} show={show} action={props.action} />
    </Grid>
  ));
  return tvCards;
};

export default TvList;
