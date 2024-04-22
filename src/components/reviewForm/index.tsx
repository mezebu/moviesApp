import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { MoviesContext } from "../../contexts/moviesContext";
import ratings from "./ratingCategories";
import styles from "./styles";
import { Review, MovieT } from "../../types/interfaces";

const ReviewForm: React.FC<MovieT> = (props) => {
  const navigate = useNavigate();
  const context = useContext(MoviesContext);
  const [rating, setRating] = useState(3);
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Review>({
    defaultValues: {
      author: "",
      content: "",
      rating: 3,
      movieId: 0,
    },
  });

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const onSubmit = (review: Review) => {
    review.movieId = props.id;
    review.rating = rating;
    context.addReview(props, review);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/movies/favourites");
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Write a review
      </Typography>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={styles.snack}
      >
        <Alert severity="success" variant="filled" onClose={handleClose}>
          <Typography variant="h4">
            Thank you for submitting a review
          </Typography>
        </Alert>
      </Snackbar>
      <Box
        component="form"
        sx={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          name="author"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              label="Author's name"
              autoFocus
            />
          )}
        />
        {errors.author && (
          <Typography variant="h6">{errors.author.message}</Typography>
        )}
        <Controller
          name="content"
          control={control}
          rules={{
            required: "Review cannot be empty.",
            minLength: { value: 10, message: "Review is too short" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              minRows={10}
              label="Review text"
            />
          )}
        />
        {errors.content && (
          <Typography variant="h6">{errors.content.message}</Typography>
        )}
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              variant="outlined"
              label="Rating Select"
              value={rating}
              onChange={handleRatingChange}
              helperText="Don't forget your rating"
            >
              {ratings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewForm;
