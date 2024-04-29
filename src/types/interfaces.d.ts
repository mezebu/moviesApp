export type FilterOption = "title" | "genre";

export interface BaseMovie {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
}

export interface BaseMovieList {
  movies: BaseMovie[];
}

export interface MovieT extends BaseMovie {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface ListedMovie extends BaseMovie {
  genre_ids: number[];
}

export interface MovieListPageTemplateProps {
  movies: ListedMovie[];
  title: string;
  action: (m: ListedMovie) => React.ReactNode;
}

export interface Review {
  id: string;
  content: string;
  author: string;
}

export interface GenreData {
  genres: {
    id: string;
    name: string;
  }[];
}

interface DiscoverMovies {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseMovie[];
}

export interface Review {
  author: string;
  content: string;
  agree: boolean;
  rating: number;
  movieId: number;
}

// Tv Shows

export interface BaseTVShow {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

interface DiscoverTvShows {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseTVShow[] | Actor[] | BaseTVShow;
}

export interface BaseTvShowList {
  shows: BaseTVShow[];
}

export interface ListedTvShow extends BaseTVShow {
  genre_ids: number[];
}

export interface ShowT extends BaseTVShow {
  genres: {
    id: number;
    name: string;
  }[];
}

export interface TvListPageTemplateProps {
  title: string;
  shows: ListedTvShow[];
  action: (m: ShowT) => void;
}

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Cast {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
  favourite?: boolean;
  known_for: KnownFor[];
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
}

export interface Actor {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownFor[];
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  favourite?: boolean;
}

export interface ActorResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: Actor[];
}

export interface ActorListPageTemplateProps {
  actors: Actor[];
  title: string;
  action: (m: Actor) => React.ReactNode;
}

export interface KnownFor {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
