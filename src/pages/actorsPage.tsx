import { useQuery } from "react-query";
import { getActors } from "../api/tmdb-api";
import PageTemplate from "../components/templateActorListPage";
import { Actor, ActorResponse } from "../types/interfaces";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import Spinner from "../components/spinner";
import { useState } from "react";
import CustomPagination from "../components/pagination";
import { Tooltip } from "@mui/material";
import AddActorsToFavouritesIcon from "../components/cardIcons/addActorsToFavourites";
import SortIcon from "@mui/icons-material/Sort";

const ActorsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const { data, error, isLoading, isError } = useQuery<ActorResponse, Error>(
    ["actors", page],
    () => getActors(page),
    { keepPreviousData: true }
  );

  const toggleSortOrder = () => {
    setSortAsc(!sortAsc);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  let actors = data ? data.results : [];
  if (sortAsc) {
    actors = [...actors].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    actors = [...actors].sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div>
      <PageTemplate
        actors={actors}
        title="Actors"
        action={(actor: Actor) => {
          return <AddActorsToFavouritesIcon {...actor} />;
        }}
      />
      <CustomPagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
      <Tooltip title="Sort Ascending Order">
        <Fab
          color="primary"
          aria-label="sort"
          onClick={toggleSortOrder}
          style={{
            position: "fixed",
            bottom: matches ? 20 : 70,
            right: 20,
          }}
        >
          <SortIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default ActorsPage;
