import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { TVShowDetail, TvCastMember } from "../types/interfaces";
import { getTvShowCast, getTvShowDetail } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateTvShowPage";
import TvShowDetail from "../components/tvShowDetail";

const ShowDetailPage = () => {
  const { id } = useParams();
  const {
    data: show,
    error: showError,
    isLoading: showLoading,
    isError: showIsError,
  } = useQuery<TVShowDetail, Error>(["Tv show", id], () =>
    getTvShowDetail(id || "")
  );

  const {
    data: cast,
    isLoading: castLoading,
    isError: castIsError,
    error: castError,
  } = useQuery<TvCastMember[], Error>(["Tv show cast", id], () =>
    getTvShowCast(id || "")
  );

  if (showLoading || castLoading) {
    return <Spinner />;
  }

  if (showIsError || castIsError) {
    return <h1>{showError?.message || castError?.message}</h1>;
  }

  return (
    <div>
      {show && cast && (
        <PageTemplate show={show}>
          <TvShowDetail show={show} cast={cast} />
        </PageTemplate>
      )}
    </div>
  );
};

export default ShowDetailPage;
