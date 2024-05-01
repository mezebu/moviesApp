import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { queryResults } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import {
  MovieResult,
  MultiSearchResponse,
  MultiSearchResult,
  PersonResult,
  TVShowResult,
  ListedMovie,
  BaseTVShow,
  Actor,
} from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddShowsToFavouritesIcon from "../components/cardIcons/addShowsToFavourites";
import AddActorsToFavouritesIcon from "../components/cardIcons/addActorsToFavourites";
import MovieCard from "../components/movieCard";
import { Grid } from "@mui/material";
import TvCard from "../components/tvCard";
import ActorsCard from "../components/actorCard";
import { useState } from "react";
import CustomPagination from "../components/pagination";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isError } = useQuery<
    MultiSearchResponse,
    Error
  >(["search", searchQuery, page], () => queryResults(`${searchQuery}`, page), {
    enabled: !!searchQuery,
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const renderResult = (result: MultiSearchResult) => {
    switch (result.media_type) {
      case "movie":
        // eslint-disable-next-line no-case-declarations
        const movie = result as MovieResult;
        return (
          <>
            <MovieCard
              movie={movie}
              action={(movie: ListedMovie) => {
                return <AddToFavouritesIcon {...movie} />;
              }}
            />
          </>
        );
      case "tv":
        // eslint-disable-next-line no-case-declarations
        const tvShow = result as TVShowResult;
        return (
          <div>
            <TvCard
              show={tvShow}
              action={(tvShow: BaseTVShow) => {
                return <AddShowsToFavouritesIcon {...tvShow} />;
              }}
            />
          </div>
        );
      case "person":
        // eslint-disable-next-line no-case-declarations
        const person = result as PersonResult;
        return (
          <div>
            <ActorsCard
              actor={person}
              action={(actor: Actor) => (
                <AddActorsToFavouritesIcon {...actor} />
              )}
            />
          </div>
        );
      default:
        return null; // Handle unexpected types or undefined
    }
  };

  return (
    <>
      {data && data.results.length > 0 ? (
        <Grid item container spacing={1}>
          {data.results.map((result) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={result.id}>
              {renderResult(result)}
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No results found.</p>
      )}
      <CustomPagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
    </>
  );
};

export default SearchPage;
