import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails } from "../api/tmdb-api"; // You might need to implement this API call
import Spinner from "../components/spinner";
import { Cast } from "../types/interfaces";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";

const ActorProfilePage: React.FC = () => {
  const { id } = useParams();
  const {
    data: actor,
    error,
    isLoading,
    isError,
  } = useQuery<Cast, Error>(["actor", id], () => getActorDetails(id || ""));

  if (isLoading) return <Spinner />;
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      {actor && (
        <Box style={{ margin: 16 }}>
          <Card
            elevation={0}
            variant="outlined"
            style={{ maxWidth: 500, margin: "auto" }}
          >
            <CardMedia
              component="img"
              height="500"
              image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              style={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {actor.name}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Birthday: {actor.birthday || "N/A"}
                  </Typography>
                  <Typography variant="body1">
                    Died: {actor.deathday || "N/A"}
                  </Typography>
                  <Typography variant="body1">
                    Gender: {actor.gender === 1 ? "Female" : "Male"}
                  </Typography>
                  <Typography variant="body1">
                    Popularity: {actor.popularity.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {actor.homepage && (
                    <Button
                      variant="outlined"
                      color="primary"
                      href={actor.homepage}
                      target="_blank"
                    >
                      Visit Homepage
                    </Button>
                  )}
                  <Typography variant="body1">
                    IMDb:{" "}
                    <Link
                      href={`https://www.imdb.com/name/${actor.imdb_id}`}
                      target="_blank"
                    >
                      {actor.imdb_id}
                    </Link>
                  </Typography>
                  <Typography variant="body1">
                    Known For: {actor.known_for_department}
                  </Typography>
                  <Typography variant="body1">
                    Birthplace: {actor.place_of_birth}
                  </Typography>
                  <Typography variant="body1">
                    Also known as: {actor.also_known_as.join(", ")}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" style={{ marginTop: 12 }}>
                Biography: {actor.biography}
              </Typography>
              <Typography variant="body2">
                Adult: {actor.adult ? "Yes" : "No"}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={`https://www.imdb.com/name/${actor.imdb_id}`}
                target="_blank"
              >
                View IMDb Profile
              </Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </div>
  );
};

export default ActorProfilePage;
