import './App.css'
import React, {useState, useEffect} from 'react'
import {Card, Grid, Typography, Button, Box, Modal, MenuItem, Select, makeStyles, Snackbar} from '@material-ui/core'
import StyledAvatar from './components/StyledAvatar';
import CinemaService from './services/Cinema'
import FormControl from '@material-ui/core/FormControl';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#2196f3',
    },
  },
});

const useStyles = makeStyles(theme => ({
  card: {
    border: '1px solid gray',
    'border-radius': '4px',
    margin: '2px',
    padding: '5px',
    display: 'flex',
    'align-items': 'center',
    [theme.breakpoints.down('sm')]: {
      'flex-direction': 'row',
      'justify-content': 'left',
    },
    [theme.breakpoints.up('sm')]: {
      'flex-direction': 'column',
      'justify-content': 'center',
    },
  },
  stack: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function App() {
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);
  const [selectedStudio, setSelectedStudio] = useState();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const classes = useStyles();

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setOpen(!open);
  }

  const closeModal = () => {
    setSelectedStudio(null);
    setOpen(!open);
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
          .then(movies => { 
            setMovies(movies); 
            setSelectedStudio(null);
            setSnackbarOpen(true);
          });
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
      <ThemeProvider theme={theme}>
        <div className="App-studios App-flex"> 
          <h3>Movies:</h3>
          <Grid container justifyContent="center" alignItems="center">
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
                  <Button onClick={() => {openModal(movie)}} color="primary" variant="outlined">Transfer film for $ {movie.price}</Button>
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
                          <div class={classes.stack}>
                            <Button disabled={!selectedStudio} onClick={() => {transferMovie(selectedStudio)}} color="primary" variant="contained">Sell</Button>
                            <Button onClick={() => {closeModal(!open)}} color="secondary" variant="outlined">Cancel</Button>
                          </div>
                        </Box>
                      </Modal>
                    )
                  }
                </Card>
              </Grid>)}
          </Grid>
          <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
            <Alert severity="success" variant="filled">
              Movie tranfered - Movies have been updated
            </Alert>
          </Snackbar>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
