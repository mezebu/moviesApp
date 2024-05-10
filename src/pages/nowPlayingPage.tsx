import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies, ListedMovie } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import CustomPagination from "../components/pagination";

const filterConfig = [
  { name: "title", value: "", condition: titleFilter },
  { name: "genre", value: "0", condition: genreFilter },
];

const NowPlayingPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", page],
    () => getNowPlayingMovies(page),
    { keepPreviousData: true }
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    filterConfig
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title="Movies Currently Playing in Theaters"
        movies={displayedMovies}
        action={(movie: ListedMovie) => {
          return <AddToFavouritesIcon {...movie} />;
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        onSortChange={function (): void {
          throw new Error("Function not implemented.");
        }}
        currentSort={""}
      />
      <CustomPagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
    </>
  );
};
export default NowPlayingPage;
