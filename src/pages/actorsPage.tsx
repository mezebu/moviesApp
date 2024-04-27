import { useQuery } from "react-query";
import { getActors } from "../api/tmdb-api";
import ActorsList from "../components/actorsList";
import { PersonResponse } from "../types/interfaces";
import Spinner from "../components/spinner";
import { useState } from "react";
import CustomPagination from "../components/pagination";

const ActorsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<PersonResponse, Error>(
    ["actors", page],
    () => getActors(page),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data ? data.results : [];

  return (
    <div>
      <ActorsList actors={actors} />
      <CustomPagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ActorsPage;
