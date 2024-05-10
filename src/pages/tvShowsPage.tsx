import React, { useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import TvListPageTemplate from "../components/templateTvListPage";
import CustomPagination from "../components/pagination";
import AddShowsToFavouritesIcon from "../components/cardIcons/addShowsToFavourites";
import { BaseTVShow, DiscoverTvShows } from "../types/interfaces";
import { getTvShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TvFilterUI, { genreFilter, titleFilter } from "../components/tvFilterUI";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const TvShowsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>(
    ["tv", page, sortBy],
    () => getTvShows(page, sortBy),
    { keepPreviousData: true }
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const handleSortChange = (newSort: string): void => {
    setSortBy(newSort);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const shows = data ? data.results : [];
  const displayedShows = filterFunction(shows);

  return (
    <div>
      <TvListPageTemplate
        title="Tv Shows"
        shows={displayedShows}
        action={(show: BaseTVShow) => {
          return <AddShowsToFavouritesIcon {...show} />;
        }}
      />
      <TvFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        onSortChange={handleSortChange}
        currentSort={sortBy}
      />
      <CustomPagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default TvShowsPage;
