import React from "react";
import Fab from "@mui/material/Fab";
import FilterListIcon from "@mui/icons-material/FilterList";

interface FilterButtonProps {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterButton: React.FC<FilterButtonProps> = ({ setDrawerOpen }) => {
  const handleButtonClick = () => {
    setDrawerOpen(true);
  };

  return (
    <Fab
      sx={{ position: "fixed", bottom: 5, right: 2 }}
      variant="extended"
      color="primary"
      aria-label="filter"
      onClick={handleButtonClick}
    >
      <FilterListIcon sx={{ mr: 1 }} />
      Filter
    </Fab>
  );
};

export default FilterButton;
