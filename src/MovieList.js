import React from 'react';
import Movie from './Movie';

function MovieList({ movies, currentMovie }) {
  return (
    <>
      {currentMovie && (
        <div style={{textAlign: "center", display: "inline-block", width: "50%", verticalAlign: "top"}}>
          <Movie movie={currentMovie.name} />
        </div>
      )}
      <div style={{textAlign: "center", display: "inline-block", width: "50%", verticalAlign: "top"}}>
        <h2>Previous Searches</h2>
        {movies.map(movie => {
            return(
                <h3 key={movie.id}>
                {movie.name}
                </h3>
            )
        })}
      </div>
    </>
  );
}

export default MovieList;
