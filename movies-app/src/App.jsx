import './App.css'
import React, { useState, useEffect } from 'react'
import {Avatar, Card, Grid, Typography} from '@material-ui/core'

//TODO: 2 Move these calls into a proper api layer
const domain = 'http://localhost:3000'
const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

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
    fetch(`${domain}/studios`)
      .then(response => {
        return response.json();
      })
      .then(studios => {
        setStudios(studios)
      });
    fetch(`${domain}/movies`)
      .then(response => {
        return response.json();
      })
      .then(movies => {
        setMovies(movies)
      });
  }, [])


  return (
    <div className="App">
      <div className="App-studios App-flex"> {
        //TODO: 4 Categorize each image with a title and a description
      }
        <h3>Images:</h3>
        <Grid container justify="center" alignItems="center">
          {movies.map(movie =>
            //TODO: 3 move styles into a separate js file and export this class using withStyles or similar or just to css file
            <Grid item xs={12} sm={6} lg={4}>
              <Card className={cardStyle}>
                <Avatar alt={movie.name} src={movie.img ? movie.img : defaultAvatar}
                        style={{margin: 5, width: avatarSize, height: avatarSize}}/>
                <div>
                  <Typography style={{display: 'inline-block'}}>
                    {movie.name + ' '}
                    <Typography style={{fontWeight: 'bold', display: 'inline-block'}}>
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
