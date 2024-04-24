import React, { useState } from "react";
import { getTvShows } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import TvListPageTemplate from "../components/templateTvListPage";
import { DiscoverTvShows } from "../types/interfaces";
import CustomPagination from "../components/pagination";

const TvShowsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>(
    ["tv", page],
    () => getTvShows(page),
    { keepPreviousData: true }
  );

  const shows = data ? data.results : [];

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <TvListPageTemplate title="Tv Shows" shows={shows} />
      <CustomPagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default TvShowsPage;
