import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails } from "../api/tmdb-api";
import { ActorProfileDetails } from "../types/interfaces";

import Spinner from "../components/spinner";

import TemplateActorPage from "../components/templateActorPage";
import ActorDetails from "../components/actorDetails";

const ActorProfilePage: React.FC = () => {
  const { id } = useParams();
  const {
    data: actor,
    error,
    isLoading,
    isError,
  } = useQuery<ActorProfileDetails, Error>(["actor", id], () =>
    getActorDetails(id || "")
  );

  if (isLoading) return <Spinner />;
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      {actor && (
        <TemplateActorPage actor={actor}>
          <ActorDetails actor={actor} />
        </TemplateActorPage>
      )}
    </div>
  );
};

export default ActorProfilePage;
