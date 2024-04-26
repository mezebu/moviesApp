import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import UpcomingMoviesPage from "./pages/upcomingMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import AppDrawer from "./components/AppDrawer";
import {
  ThemeContextProvider,
  useThemeContext,
} from "./contexts/ThemeContextProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import TvShowsPage from "./pages/tvShowsPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";

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
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/movies/tv" element={<TvShowsPage />} />
                <Route
                  path="/movies/favourites"
                  element={<FavouriteMoviesPage />}
                />
                <Route
                  path="/movies/upcoming"
                  element={<UpcomingMoviesPage />}
                />
                <Route path="/movies/top" element={<TopRatedMoviesPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/" element={<HomePage />} />
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
