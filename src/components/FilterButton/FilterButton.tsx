import React from "react";
import Fab from "@mui/material/Fab";
import FilterListIcon from "@mui/icons-material/FilterList";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface FilterButtonProps {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterButton: React.FC<FilterButtonProps> = ({ setDrawerOpen }) => {
  const handleButtonClick = () => {
    setDrawerOpen(true);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Fab
      sx={{
        position: "fixed",
        bottom: matches ? 20 : 70,
        right: 20,
      }}
      color="primary"
      aria-label="filter"
      onClick={handleButtonClick}
    >
      <FilterListIcon />
    </Fab>
  );
};

export default FilterButton;
