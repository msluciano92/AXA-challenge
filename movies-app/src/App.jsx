import './App.css'
import React, {useState, useEffect} from 'react'
import {Card, Grid, Typography, Button, Box, Modal, MenuItem, Select, makeStyles} from '@material-ui/core'
import StyledAvatar from './components/StyledAvatar';
import CinemaService from './services/Cinema'
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  card: {
    border: '1px solid gray',
    borderRadius: '4px',
    margin: '2px',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      justifyContent: 'left',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
}));

function App() {
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);
  const [selectedStudio, setSelectedStudio] = useState();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setOpen(!open);
  }

  const closeModal = () => {
    setSelectedStudio(null);
    setOpen(!open);
  }

  const transferMovie = (targetStudio) => {
    const {id, img, studioId} = selectedMovie;
    const updateMoviePayload = {
			originStudioId: studioId,
			targetStudioId: targetStudio,
			movieId: id,
			img
		}
    CinemaService.transferMovie(updateMoviePayload)
      .then(() => {
        setOpen(!open);
        CinemaService.loadMovies()
          .then(movies => { setMovies(movies); });
      });
  }

  useEffect(() => {
    CinemaService.loadMovies()
      .then(movies => { setMovies(movies); });
    CinemaService.loadStudios()
      .then(studios => { setStudios(studios); });
  }, [])


  return (
    <div className="App">
      <div className="App-studios App-flex"> 
        <h3>Images:</h3>
        <Grid container justify="center" alignItems="center">
          {movies.map((movie, i) =>
            <Grid item xs={12} sm={6} lg={4}>
              <Card className={classes.card}>
                <StyledAvatar
                  name={movie.name}
                  src={movie.img}
                />
                <div>
                  <Typography className="Movie-information">
                    {movie.name}
                    <Typography className="Movie-position">
                      {movie.position}
                    </Typography>
                  </Typography>
                </div>
                <Typography>{
                  // eslint-disable-next-line
                  studios.map(studio => {
                  if (movie.studioId === studio.id) {
                    return studio.name
                  }
                })}</Typography>
                <Button onClick={() => {openModal(movie)}} variant="contained">Transfer film for $ {movie.price}</Button>
                {
                  selectedMovie && (
                    <Modal
                      aria-labelledby="unstyled-modal-title"
                      aria-describedby="unstyled-modal-description"
                      open={open}
                      onClose={() => {setOpen(!open)}}
                    >
                      <Box className="modal">
                        <h2 id="unstyled-modal-title">Are you sure you want to transfer this movie for $ {selectedMovie.price}</h2>
                        <div>
                          <FormControl>
                            Select a studio
                            <Select
                              labelId="demo-customized-select-label"
                              id="demo-customized-select"
                              className="margin-top"
                              value={selectedStudio}
                              onChange={(e) => {setSelectedStudio(e.target.value)}}
                            >
                              {
                                JSON.parse(JSON.stringify(studios))
                                    .filter((studio) => (selectedMovie && studio.id !== selectedMovie.studioId))
                                    .map((studio) => (<MenuItem value={studio.id}>{studio.shortName}</MenuItem>))
                              }
                            </Select>
                          </FormControl>
                        </div>
                        <div className="margin-top">
                          <Button disabled={!selectedStudio} onClick={() => {transferMovie(selectedStudio)}} className="margin-left" variant="contained">Sell</Button>
                          <Button className="margin-left" onClick={() => {closeModal(!open)}} variant="contained">Cancel</Button>
                        </div>
                      </Box>
                    </Modal>
                  )
                }
              </Card>
            </Grid>)}
        </Grid>
      </div>
    </div>
  )
}

export default App
