import React from "react";
import {
  Box,
  Chip,
  Stack,
  Divider,
  Grid,
  Typography,
  Link,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { ActorProfileDetails } from "../../types/interfaces";
import { StyledCard, StyledCardMedia } from "./styles";
import { useQuery } from "react-query";
import { getKnownFor } from "../../api/tmdb-api";
import { useNavigate } from "react-router-dom";

interface ActorDetailsProps {
  actor: ActorProfileDetails;
}

interface KnownForItem {
  id: number;
  poster_path: string;
  title: string;
}
const ActorDetails: React.FC<ActorDetailsProps> = ({ actor }) => {
  const navigate = useNavigate();
  const { data: knownFor } = useQuery<KnownForItem[], Error>(
    ["known_for", actor.id],
    () => getKnownFor(`${actor.id}`)
  );

  const handleMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  // Function to compute age
  const getAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Function to format the date
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Handling non-available dates
  const displayBirthday = actor.birthday
    ? `${formatDate(actor.birthday)} (${getAge(actor.birthday)} years old)`
    : "N/A";

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
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontWeight="bold"
              >
                {actor.name}
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                Birthday: {displayBirthday}
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
            <Typography component="span" variant="subtitle2" fontWeight="bold">
              Biography:
            </Typography>{" "}
            {actor.biography}
          </Typography>
        </Box>

        <Box sx={{ p: 2 }}>
          <Box>
            <Typography gutterBottom variant="subtitle2" fontWeight="bold">
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
          <Typography gutterBottom variant="body2" fontWeight="bold">
            Known for:
          </Typography>
          <Stack direction="row" spacing={1}>
            {knownFor &&
              knownFor.slice(0, 5).map((k: KnownForItem) => (
                <Box key={k.id} onClick={() => handleMovieClick(k.id)}>
                  <Card elevation={0}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="190"
                        image={`https://image.tmdb.org/t/p/w500${k.poster_path}`}
                        alt={k.title}
                      />
                    </CardActionArea>
                  </Card>
                  <Typography variant="caption">{k.title}</Typography>
                </Box>
              ))}
          </Stack>

          <Typography gutterBottom variant="body2" fontWeight="bold">
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
