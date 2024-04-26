import { useQuery } from "react-query";
import { getTopRatedMovies } from "../api/tmdb-api";
import MovieFilterUI, {
  genreFilter,
  titleFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies, ListedMovie } from "../types/interfaces";
import useFiltering from "../hooks/useFiltering";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";

const filterConfig = [
  { name: "title", value: "", condition: titleFilter },
  { name: "genre", value: "0", condition: genreFilter },
];

const TopRatedMoviesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    "top_rated",
    getTopRatedMovies
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    filterConfig
  );

  const changeFilterValues = (type: string, value: string) => {
    const newFilters = filterValues.map((filter) =>
      filter.name === type ? { ...filter, value } : filter
    );
    setFilterValues(newFilters);
  };

  const movies = data?.results || [];
  const displayedMovies = filterFunction(movies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
      <PageTemplate
        title="Top Rated Movies"
        movies={displayedMovies}
        action={(movie: ListedMovie) => {
          return <AddToFavouritesIcon {...movie} />;
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues.find((f) => f.name === "title")?.value || ""}
        genreFilter={filterValues.find((f) => f.name === "genre")?.value || ""}
      />
    </div>
  );
};

export default TopRatedMoviesPage;
