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

const TvShowsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>(
    ["tv", page],
    () => getTvShows(page),
    { keepPreviousData: true }
  );

  const toggleSortOrder = () => {
    setSortAsc(!sortAsc);
  };

  let shows = data ? data.results : [];
  if (sortAsc) {
    shows = [...shows].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    shows = [...shows].sort((a, b) => b.name.localeCompare(a.name));
  }

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

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

export default TvShowsPage;
