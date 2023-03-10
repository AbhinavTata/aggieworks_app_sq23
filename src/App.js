import React, { useState, useRef, useEffect } from 'react';
import MovieList from './MovieList';
import './App.css';
import { v4 as uuid } from 'uuid';

const local_storage_key = 'movies.key';

function App() {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const movieRef = useRef();

  useEffect(() => {
    localStorage.setItem(local_storage_key, JSON.stringify(movies));
    console.log("1" + JSON.parse(localStorage.getItem(local_storage_key)));
  }, [movies]);

  useEffect(() => {
    const stored_movies = JSON.parse(localStorage.getItem(local_storage_key));
    console.log("2" + stored_movies);
    if (stored_movies) setMovies(stored_movies);
  }, []);

  function handleMovieSearch(e) {
    const name = movieRef.current.value;
    if (name === '') return;
    const newMovie = { id: uuid(), name: name };
    setMovies(prevMovies => [...prevMovies, newMovie]);
    setCurrentMovie(newMovie);
    movieRef.current.value = null;
  }

  return (
    <body style={{
      fontFamily: "Gill Sans",
      fontSize: "1rem",
      fontWeight: 1.5,
      lineHeight: 1.5,
      color: "#f0f0f0",
      padding: "0 2em"
    }}>
      <h1 style={{
        textAlign: "center",
        maxWidth: "950px",
        margin: "0 auto",
        padding: "2% 25px",
        marginTop: "0px"}}>Please enter a movie or TV show name:</h1>
      <div style={{textAlign: "center", marginBottom: "5%"}}>
        <input ref={movieRef} type="text" style={{
          fontFamily: "Gill Sans",
          fontWeight: 1.5,
          color: "#192b58"}}/>
        <button onClick={handleMovieSearch} style={{
          fontFamily: "Gill Sans",
          fontWeight: 1.5,
          color: "#192b58"}}>Search</button>
      </div>
      <div style={{textAlign: "center", display: "inline-block", width: "100%"}}>
        <MovieList
          movies={movies}
          currentMovie={currentMovie}
        />
      </div>
    </body>
  );
}

export default App;