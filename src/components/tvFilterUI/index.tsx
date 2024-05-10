import React, { useState } from "react";
import FilterCard from "../filterTvShowsCard";
import Drawer from "@mui/material/Drawer";
import { ListedTvShow } from "../../types/interfaces";
import FilterButton from "../FilterButton/FilterButton";

// eslint-disable-next-line react-refresh/only-export-components
export const titleFilter = function (show: ListedTvShow, value: string) {
  return show.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

// eslint-disable-next-line react-refresh/only-export-components
export const genreFilter = function (show: ListedTvShow, value: string) {
  const genreId = Number(value);
  return genreId > 0 ? show.genre_ids.includes(genreId) : true;
};

interface TvFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  onSortChange: (newSort: string) => void;
  currentSort: string;
}

const TvFilterUI: React.FC<TvFilterUIProps> = ({
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

export default TvFilterUI;
