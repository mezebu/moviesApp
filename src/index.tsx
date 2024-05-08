import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Contexts
// prettier-ignore
import { ThemeContextProvider,  useThemeContext,} from "./contexts/ThemeContextProvider";

import MoviesContextProvider from "./contexts/moviesContext";

// Components
import AppDrawer from "./components/AppDrawer";

// Pages
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import TvShowsPage from "./pages/tvShowsPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import ActorProfilePage from "./pages/actorProfilePage";
import ActorsPage from "./pages/actorsPage";
import SearchPage from "./pages/searchPage";
import ShowDetailPage from "./pages/showDetailPage";
import SimilarMoviesPage from "./pages/similarMoviesPage";
import SeasonDetailsPage from "./pages/seasonDetailsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppDrawer>
            <MoviesContextProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route
                  path="/movies/favourites"
                  element={<FavouriteMoviesPage />}
                />
                <Route
                  path="/movies/upcoming"
                  element={<UpcomingMoviesPage />}
                />
                <Route path="/movies/top" element={<TopRatedMoviesPage />} />
                <Route
                  path="/movies/similar/:id"
                  element={<SimilarMoviesPage />}
                />
                <Route path="/movies/search" element={<SearchPage />} />
                <Route
                  path="/season/:showId/:seasonNumber"
                  element={<SeasonDetailsPage />}
                />
                <Route path="/movies/actors" element={<ActorsPage />} />
                <Route path="/actor/:id" element={<ActorProfilePage />} />
                <Route path="/movies/tv" element={<TvShowsPage />} />
                <Route path="/tv/:id" element={<ShowDetailPage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MoviesContextProvider>
          </AppDrawer>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
);
