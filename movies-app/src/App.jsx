import './App.css'
import React, {useState, useEffect} from 'react'
import {Card, Grid, Typography, Button, Box, Modal, MenuItem, Select} from '@material-ui/core'
import StyledAvatar from './components/StyledAvatar';
import CinemaService from './services/cinema'
import FormControl from '@material-ui/core/FormControl';

function App() {
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);
  const [avatarSize, setAvatarSize] = useState(280);
  const [cardStyle, setCardStyle] = useState('regularCard');
  const [selectedStudio, setSelectedStudio] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = React.useState(false);

  const responsiveStyle = () => {
    //TODO: produce a better resize strategy
    if (window.innerWidth < 601) {
      console.log(window.innerWidth)
      setAvatarSize(60)
      setCardStyle('smallCard')
    } else {
      setAvatarSize(280)
      setCardStyle('regularCard')
    }
  }

  const openModal = (movie) => {
    setSelectedMovie(movie);
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
    window.addEventListener('resize', responsiveStyle)
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
              <Card className={cardStyle}>
                <StyledAvatar
                  name={movie.name}
                  src={movie.img}
                  width={avatarSize}
                  height={avatarSize}
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
                <Button onClick={() => {openModal(movie)}} variant="contained">Sell film for $ {movie.price}</Button>
                <Modal
                  aria-labelledby="unstyled-modal-title"
                  aria-describedby="unstyled-modal-description"
                  open={open}
                  onClose={() => {setOpen(!open)}}
                >
                  <Box className="modal">
                    <h2 id="unstyled-modal-title">Are you sure you want to sell this movie for $ {movie.price}</h2>
                    <div>
                      <FormControl>
                        Select a company
                        <Select
                          labelId="demo-customized-select-label"
                          id="demo-customized-select"
                          className="margin-top"
                          value={selectedStudio}
                          onChange={(e) => {setSelectedStudio(e.target.value)}}
                          // input={<BootstrapInput />}
                        >
                          <MenuItem value={1}>Disney</MenuItem>
                          <MenuItem value={2}>Warner</MenuItem>
                          <MenuItem value={3}>Sony</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="margin-top">
                      <Button onClick={() => {transferMovie(selectedStudio)}} className="margin-left" variant="contained">Sell</Button>
                      <Button className="margin-left" onClick={() => {setOpen(!open)}} variant="contained">Cancel</Button>
                    </div>
                  </Box>
                </Modal>
              </Card>
            </Grid>)}
        </Grid>
      </div>
    </div>
  )
}

export default App
