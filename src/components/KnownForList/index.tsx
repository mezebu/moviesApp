import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { KnownFor } from "../../types/interfaces";

interface KnownForProps {
  movies: KnownFor[];
}

const KnownForList: React.FC<KnownForProps> = ({ movies }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {movies.map((movie) => (
        <ListItem key={movie.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Movie Poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          </ListItemAvatar>
          <ListItemText
            primary={movie.original_title}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Release Date:{" "}
                </Typography>
                {movie.release_date}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default KnownForList;
