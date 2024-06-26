import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews, getMyMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";

import { DynamoReview, MovieT, Review } from "../../types/interfaces";
import { useQuery } from "react-query";

const MovieReviews: React.FC<MovieT> = (props) => {
  const [reviews, setReviews] = useState([]);
  const { data } = useQuery("dynamo review", getMyMovieReviews);

  const movie = props;
  useEffect(() => {
    getMovieReviews(movie.id).then((reviews) => {
      setReviews(reviews);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r: Review) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell>{excerpt(r.content)}</TableCell>
              <TableCell>
                <Link
                  to={`/reviews/${r.id}`}
                  state={{
                    review: r,
                    movie: movie,
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {data?.map((r: DynamoReview) => (
            <TableRow key={r.content}>
              <TableCell component="th" scope="row">
                {r.reviewer_name}
              </TableCell>
              <TableCell>{excerpt(r.content)}</TableCell>
              <TableCell>
                <Link
                  to={`/reviews/${r.movieId}`}
                  state={{
                    review: r,
                    movie: movie,
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieReviews;
