import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Person } from "../../types/interfaces";
import { Grid } from "@mui/material";
import KnownForList from "../KnownForList";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean | number;
}

interface ActorProps {
  actors: Person[];
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ActorsList: React.FC<ActorProps> = ({ actors }) => {
  const [expanded, setExpanded] = React.useState<boolean | number>(false);

  const handleExpandClick = (id: boolean | number) => {
    setExpanded(expanded === id ? false : id);
  };

  return (
    <Grid container spacing={2}>
      {actors.map((actor) => (
        <Grid item key={actor.id} xs={12} sm={6} md={6} lg={4}>
          <Card variant="outlined" elevation={0}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: actor.gender === 1 ? red[500] : blue[500] }}
                  aria-label="recipe"
                >
                  {actor.gender === 1 ? "F" : "M"}
                </Avatar>
              }
              title={`${actor.name}`}
              subheader={`Popularity: ${actor.popularity}`}
            />
            <CardMedia
              component="img"
              height="194"
              image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt="Paella dish"
            />
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded === actor.id}
                onClick={() => handleExpandClick(actor.id)}
                aria-expanded={expanded === actor.id}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded === actor.id} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Known For:</Typography>
                <KnownForList movies={actor.known_for} />
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorsList;
