import './App.css'
import React, {useState, useEffect} from 'react'
import {Card, Grid, Typography} from '@material-ui/core'
import StyledAvatar from './components/StyledAvatar';
import CinemaService from './services/cinema'

function App() {
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);
  const [avatarSize, setAvatarSize] = useState(280);
  const [cardStyle, setCardStyle] = useState('regularCard');

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

  useEffect(() => {
    window.addEventListener('resize', responsiveStyle)
    CinemaService.loadMovies()
      .then(movies => { setMovies(movies); });
    CinemaService.loadStudios()
      .then(studios => { setStudios(studios); });
  }, [])


  return (
    <div className="App">
      <div className="App-studios App-flex"> {
        //TODO: 4 Categorize each image with a title and a description
      }
        <h3>Images:</h3>
        <Grid container justify="center" alignItems="center">
          {movies.map(movie =>
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
                    {movie.name + ' '}
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
              </Card>
            </Grid>)}
        </Grid>
      </div>
    </div>
  )
}

export default App
