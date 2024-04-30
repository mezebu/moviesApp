import React, { useState } from "react";
import { useQuery } from "react-query";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import Spinner from "../components/spinner";
import TvListPageTemplate from "../components/templateTvListPage";
import CustomPagination from "../components/pagination";
import AddShowsToFavouritesIcon from "../components/cardIcons/addShowsToFavourites";
import SortIcon from "@mui/icons-material/Sort";
import { BaseTVShow, DiscoverTvShows } from "../types/interfaces";
import { getTvShows } from "../api/tmdb-api";
import { Tooltip } from "@mui/material";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import SortDialog from "../components/SortDialog";

const TvShowsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [sortCriteria, setSortCriteria] = useState("name");
  const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>(
    ["tv", page],
    () => getTvShows(page),
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
    { label: "Vote Average", value: "vote_average" },
    { label: "First Air Date", value: "first_air_date" },
  ];

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const shows = data ? data.results : [];
  // Function to compare based on the sort criteria
  const compareShows = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    a: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    b: any,
    criteria: string,
    ascending: boolean
  ): number => {
    if (
      criteria === "vote_average" &&
      typeof a.vote_average === "number" &&
      typeof b.vote_average === "number"
    ) {
      return ascending
        ? a.vote_average - b.vote_average
        : b.vote_average - a.vote_average;
    } else if (
      criteria === "name" &&
      typeof a.name === "string" &&
      typeof b.name === "string"
    ) {
      return ascending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (criteria === "first_air_date") {
      const dateA = new Date(a.first_air_date);
      const dateB = new Date(b.first_air_date);
      // Check if dateA or dateB is invalid (Invalid Date will give NaN when calling getTime())
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        return 0; // Could not compare dates, perhaps return 0 or handle differently
      }
      return ascending
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }
    return 0; // Default case to handle unexpected criteria or data types
  };

  // Sorting the shows based on the selected criteria and order
  shows.sort((a, b) => compareShows(a, b, sortCriteria, sortAsc));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <TvListPageTemplate
        title="Tv Shows"
        shows={shows}
        action={(show: BaseTVShow) => {
          return <AddShowsToFavouritesIcon {...show} />;
        }}
      />
      <CustomPagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
      <Tooltip title="Sort Tv Shows">
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
        title="Sort Tv Shows"
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

export default TvShowsPage;
