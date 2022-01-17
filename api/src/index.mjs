import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import {getAllMoviesFromStudios, logger} from '../src/helpers.mjs'
import {sony, warner, disney, movieAge, sonyImages, studiosMap} from '../constants/studio_constants.mjs'

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.get('/studios', function (req, res) {
  let disneyTemp = {...disney}
  delete disneyTemp.movies
  let warnerTemp = {...warner}
  delete warnerTemp.movies
  let sonyTemp = {...sony}
  delete sonyTemp.movies
  res.json([
    disneyTemp,
    warnerTemp,
    sonyTemp
  ])
});

app.get('/movies', function (req, res) {
  try {
    // Match sony films with their imgs
    const sonyMoviesWithImg = sony.movies
      .map((movie) => {
        return ({
          ...movie,
          img: sonyImages[movie.id],
          url: sonyImages[movie.id],
        })});
    res.json(getAllMoviesFromStudios([disney, warner, {...sony, movies: sonyMoviesWithImg}]))
  } catch (e) {
    res.statusCode(500)
  }
});

app.get('/movieAge', function (req, res) {
  res.json(movieAge)
});

app.put('/movies', function (req, res) {
  const { originStudioId, targetStudioId, movieId, img } = req.body;
  const originStudio = studiosMap[originStudioId];
  const targetStudio = studiosMap[targetStudioId];
  
  // Find movie item and remove from origin studio 
  const movie = originStudio.movies 
    .find((movie) => (movie.id === movieId));
  const moviePositionInOriginStudio = originStudio.movies 
    .findIndex((movie) => (movie.id === movieId));
  originStudio.movies
    .splice(moviePositionInOriginStudio, 1);

  // Insert film in target studio
  targetStudio.movies.push({
    ...movie,
    url: img,
    img,
  });
  res.json();
});

app.listen(3000)
