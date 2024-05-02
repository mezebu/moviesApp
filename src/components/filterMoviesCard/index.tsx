import React, { ChangeEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import { Box, SelectChangeEvent } from "@mui/material";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FilterOption, GenreData } from "../../types/interfaces";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { FilterMoviesCardProps, sortOptions } from "./data";

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = (props) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>(
    "genres",
    getGenres
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (
    e: SelectChangeEvent,
    type: FilterOption,
    value: string
  ) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value);
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FilterAltIcon fontSize="large" />

            <Typography variant="h5" component="h1">
              Filter the movies.
            </Typography>
          </Box>

          <Box sx={{ p: 1 }}>
            <TextField
              fullWidth
              id="filled-search"
              label="Search field"
              type="search"
              value={props.titleFilter}
              variant="filled"
              onChange={handleTextChange}
              sx={{ my: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                id="genre-select"
                label="Genre"
                value={props.genreFilter}
                onChange={handleGenreChange}
              >
                {genres.map((genre) => {
                  return (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <SortIcon fontSize="large" />
            <Typography variant="h5" component="h1">
              Sort the movies.
            </Typography>
          </Box>

          <FormControl fullWidth>
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={props.currentSort}
              label="Sort By"
              onChange={(e: SelectChangeEvent) =>
                props.onSortChange(e.target.value as string)
              }
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;
