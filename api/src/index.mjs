import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import {getAllMoviesFromStudios} from '../src/helpers.mjs'
import {sony, warner, disney, movieAge, sonyImages} from '../constants/studio_constants.mjs'

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
    // TODO move to helper
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

//TODO: 1 add the capability to sell the movie rights to another studio
app.post('/transfer', function (req, res) {
  const originStudio = '';
  const targetStudio = '';
  // if studio is sony -> add img to the node and update
});

// TODO: 2 Add logging capabilities into the movies-app

app.listen(3000)
