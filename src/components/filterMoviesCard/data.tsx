import { FilterOption } from "../../types/interfaces";

export const sortOptions = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "release_date.desc", label: "Release Date Newest" },
  { value: "release_date.asc", label: "Release Date Oldest" },
  { value: "title.asc", label: "Title (A-Z)" },
  { value: "title.desc", label: "Title (Z-A)" },
  { value: "revenue.asc", label: "Revenue (A-Z)" },
  { value: "revenue.desc", label: "Revenue (Z-A)" },
  { value: "vote_average.asc", label: "Vote Average (A-Z)" },
  { value: "vote_average.desc", label: "Vote Average (Z-A)" },
];

export interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  onSortChange: (newSort: string) => void;
  currentSort: string;
}
