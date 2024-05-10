import { FilterOption } from "../../types/interfaces";

export const sortOptions = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "first_air_date.desc", label: "Air Date Newest" },
  { value: "first_air_date.asc", label: "Air Date Oldest" },
  { value: "name.asc", label: "Name (A-Z)" },
  { value: "name.desc", label: "Name (Z-A)" },
  { value: "vote_count.asc", label: "Vote Count Descending(A-Z)" },
  { value: "vote_count.desc", label: "Vote Count Descending(Z-A)" },
  { value: "vote_average.asc", label: "Vote Average (A-Z)" },
  { value: "vote_average.desc", label: "Vote Average (Z-A)" },
];

export interface FilterTvShowsCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  onSortChange: (newSort: string) => void;
  currentSort: string;
}
