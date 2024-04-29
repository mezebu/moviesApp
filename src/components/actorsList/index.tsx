import * as React from "react";
import { Actor } from "../../types/interfaces";
import { Grid } from "@mui/material";
import ActorsCard from "../actorCard";

interface ActorProps {
  actors: Actor[];
  action: (m: Actor) => React.ReactNode;
}

const ActorsList: React.FC<ActorProps> = (props) => {
  const actors = props.actors;

  return (
    <Grid container spacing={2}>
      {actors.map((m) => (
        <Grid item key={m.id} xs={12} sm={6} md={6} lg={4}>
          <ActorsCard actor={m} action={props.action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorsList;
