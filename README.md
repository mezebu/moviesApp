# Assignment 2 - Movie Fans Web App

**Name:** Uchechukwu Henry Ezeigwe

**Video demonstration:** [\[URL of YouTube video demonstration\]](https://youtu.be/te6A21TtrAc?si=U6x1szZ5wFvVNa8q)

This repository contains an implementation of the Movie Fans Web Application using the ReactJS library.

### Features

- UI:

  - Extensive data hyperlinking.
  - Pagination - for all-listing pages.
  - Premium functionality (Sorting and Filtering).
  - MUI Theming(Light and Dark Mode)

- Functionality:
  - Favourite Actors/TV series/Movies.
  - Multi-criteria Search.
  - Storybook support.

### Setup requirements

To run the app locally, you need to install dependencies and start the development server.

First, install the required dependencies using npm:

```bash
npm install
npm run dev


### API endpoints

[List the additional TMDB endpoints used, giving the description and pathname for each one.]

+ Discover list of movies - `discover/movie`
+ Movie details - `movie/:id`
+ Movie genres - `/genre/movie/list`
+ Discover list of TV shows - `discover/tv`
+ TV show details - `tv/:id`
+ TV show genres - `/genre/tv/list`
+ Similar movies - `movie/:id/similar`
+ Top rated movies - `movie/top_rated`
+ Actor details - `person/:id`
+ Actor images - `person/:id/images`
+ Search for movies, TV shows, and actors - `search/multi`
+ Upcoming movies page - `/movies/upcoming`
+ Now playing movies page - `/movies/nowplaying`

### Routing

[List the new routes supported by your app and state the associated page.]

+ `/` - Home page
+ `/movies/:id` - Movie details page
+ `/movies/favourites` - Favourite movies page
+ `/movies/upcoming` - Upcoming movies page
+ `/movies/nowplaying` - Now playing movies page
+ `/movies/top` - Top rated movies page
+ `/movies/similar/:id` - Similar movies page
+ `/movies/search` - Search page
+ `/season/:showId/:seasonNumber` - Season details page
+ `/movies/actors` - Actors page
+ `/actor/:id` - Actor profile page
+ `/movies/tv` - TV shows page
+ `/tv/:id` - TV show detail page
+ `/reviews/:id` - Movie review page
+ `/reviews/form` - Add movie review page
+ `*` - Navigate to Home page for any other routes

### Assignment 1 integration

- Frontend deployment to AWS S3.
- Display dynamo movie reviews.
- Frontend CDN deployment to AWS (CloudFront).
- Fullstack deployment - (Automated) Backend Auth and App API integration.

### Independent learning (If relevant)

I explored deploying a React app with AWS CDK using the guide provided in the following blog post:

[Deploy React App with AWS CDK](https://blog.mikaeels.com/deploy-react-app-with-aws-cdk)

```
