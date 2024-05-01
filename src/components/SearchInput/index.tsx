import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate(`/movies/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  return (
    <Box component="form" onSubmit={handleSearch}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Search>
    </Box>
  );
};

export default SearchInput;
