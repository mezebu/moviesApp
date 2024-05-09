import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { ActorProfileDetails } from "../../types/interfaces";
import { StyledCard, StyledCardMedia } from "./styles";

interface ActorDetailsProps {
  actor: ActorProfileDetails;
}

const ActorDetails: React.FC<ActorDetailsProps> = ({ actor }) => {
  return (
    <Grid container>
      <Grid item lg={6} xs={12}>
        <StyledCard>
          <StyledCardMedia
            image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          />
        </StyledCard>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography gutterBottom variant="h5" fontWeight="bold">
                {actor.name}
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                Birthday: {actor.birthday || "N/A"}
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                IMDb:{" "}
                <Link
                  href={`https://www.imdb.com/name/${actor.imdb_id}`}
                  target="_blank"
                >
                  {actor.imdb_id}
                </Link>
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                Died: {actor.deathday || "N/A"}
              </Typography>
            </Box>

            <Box>
              <Typography gutterBottom variant="subtitle2">
                Gender: {actor.gender === 1 ? "Female" : "Male"}
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                Popularity: {actor.popularity.toFixed(2)}
              </Typography>
              {actor.homepage && (
                <Typography gutterBottom variant="subtitle2">
                  <Link color="primary" href={actor.homepage} target="_blank">
                    Visit website
                  </Link>
                </Typography>
              )}
              <Typography gutterBottom variant="subtitle2">
                Known For: {actor.known_for_department}
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                Birthplace: {actor.place_of_birth}
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <Typography variant="body2" style={{ marginTop: 12 }}>
            Biography: {actor.biography}
          </Typography>
        </Box>

        <Box sx={{ p: 2 }}>
          <Box>
            <Typography gutterBottom variant="subtitle2">
              Also known as: {actor.also_known_as.join(", ")}
            </Typography>
          </Box>
          <Typography gutterBottom variant="subtitle2">
            <Link
              color="primary"
              href={`https://www.imdb.com/name/${actor.imdb_id}`}
              target="_blank"
            >
              View IMDb Profile
            </Link>
          </Typography>
          <Typography gutterBottom variant="body2">
            Adult
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              color="primary"
              label={`${actor.adult ? "Yes" : "No"}`}
              size="small"
            />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ActorDetails;
