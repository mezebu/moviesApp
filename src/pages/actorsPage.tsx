import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useTheme, Tooltip, Fab } from "@mui/material";
import { getActors } from "../api/tmdb-api";
import { Actor, ActorResponse } from "../types/interfaces";
import useMediaQuery from "@mui/material/useMediaQuery";
import PageTemplate from "../components/templateActorListPage";
import Spinner from "../components/spinner";
import CustomPagination from "../components/pagination";
import AddActorsToFavouritesIcon from "../components/cardIcons/addActorsToFavourites";
import SortIcon from "@mui/icons-material/Sort";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import SortDialog from "../components/SortDialog";

const ActorsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [sortCriteria, setSortCriteria] = useState("name");
  const { data, error, isLoading, isError } = useQuery<ActorResponse, Error>(
    ["actors", page],
    () => getActors(page),
    { keepPreviousData: true }
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSortCriteriaChange = (criteria: string) => {
    setSortCriteria(criteria);
    handleClose();
  };
  const toggleSortOrder = () => setSortAsc(!sortAsc);

  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Popularity", value: "popularity" },
    { label: "Gender", value: "gender" },
  ];

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data ? data.results : [];
  console.log(actors);

  actors.sort((a, b) => {
    switch (sortCriteria) {
      case "popularity":
        return sortAsc
          ? a.popularity - b.popularity
          : b.popularity - a.popularity;
      case "gender":
        return sortAsc ? a.gender - b.gender : b.gender - a.gender;
      default:
        return sortAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
    }
  });

  return (
    <div>
      <PageTemplate
        actors={actors}
        title="Actors"
        action={(actor: Actor) => <AddActorsToFavouritesIcon {...actor} />}
      />
      <CustomPagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
      <Tooltip title="Sort Actors">
        <Fab
          color="primary"
          aria-label="sort"
          onClick={handleOpen}
          style={{ position: "fixed", bottom: matches ? 90 : 140, right: 20 }}
        >
          <SortIcon />
        </Fab>
      </Tooltip>
      <SortDialog
        title="Sort Actors By"
        open={open}
        onClose={handleClose}
        onSortChange={handleSortCriteriaChange}
        sortOptions={sortOptions}
      />
      <Tooltip title="Toggle Sort Order">
        <Fab
          color="primary"
          aria-label="toggle sort"
          onClick={toggleSortOrder}
          style={{ position: "fixed", bottom: matches ? 20 : 70, right: 20 }}
        >
          <UnfoldLessIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default ActorsPage;
