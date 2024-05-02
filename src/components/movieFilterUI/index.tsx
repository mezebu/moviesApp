import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Drawer from "@mui/material/Drawer";
import { ListedMovie } from "../../types/interfaces";
import FilterButton from "../FilterButton/FilterButton";

// eslint-disable-next-line react-refresh/only-export-components
export const titleFilter = function (movie: ListedMovie, value: string) {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

// eslint-disable-next-line react-refresh/only-export-components
export const genreFilter = function (movie: ListedMovie, value: string) {
  const genreId = Number(value);
  return genreId > 0 ? movie.genre_ids.includes(genreId) : true;
};

interface MovieFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  onSortChange: (newSort: string) => void;
  currentSort: string;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
  onFilterValuesChange,
  titleFilter,
  genreFilter,
  onSortChange,
  currentSort,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <FilterButton setDrawerOpen={setDrawerOpen} />
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          onSortChange={onSortChange}
          currentSort={currentSort}
        />
      </Drawer>
    </>
  );
};

export default MovieFilterUI;
