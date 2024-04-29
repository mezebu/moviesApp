import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { queryResults } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { DiscoverMovies } from "../types/interfaces";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  const { data, isLoading, error, isError } = useQuery<DiscoverMovies, Error>(
    ["search", searchQuery],
    () => queryResults(`${searchQuery}`),
    {
      enabled: !!searchQuery,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  console.log(data);

  return <div>S</div>;
};

export default SearchPage;
