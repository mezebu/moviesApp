import { useQuery } from "react-query";
import { getActors } from "../api/tmdb-api";
import PageTemplate from "../components/templateActorListPage";
import { Actor, ActorResponse } from "../types/interfaces";
import Spinner from "../components/spinner";
import { useState } from "react";
import CustomPagination from "../components/pagination";
import AddActorsToFavouritesIcon from "../components/cardIcons/addActorsToFavourites";

const ActorsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<ActorResponse, Error>(
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
    </div>
  );
};

export default ActorsPage;
