import React, { useState, useEffect } from 'react';

export default function Movie({ movie }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [actors, setActors] = useState([]);
  const [year, setYear] = useState('');
  const [q, setType] = useState('');
  
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '865bbb2945mshb90c36e8130bdc1p1e91c4jsn99888a9fb6b5',
        'X-RapidAPI-Host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
      }
    };
    fetch(`https://imdb-movies-web-series-etc-search.p.rapidapi.com/${movie}.json`, options)
      .then(response => response.json())
      .then(data => {
        const movie_info = data.d[0];
        if (movie_info.l) setName(movie_info.l);
        if (movie_info.i.imageUrl) setImage(movie_info.i.imageUrl);
        if (movie_info.q) setType(movie_info.q);
        if (movie_info.s) setActors(movie_info.s.split(", "))
        if (movie_info.y) setYear(movie_info.y)
      })
      .catch(err => console.error(err));
  }, [movie]);
  
  var media_string = "";
  if (q.includes("mini")) {
    media_string = "TV Mini-Series";
  } else if (q.includes("feature")) {
    media_string = "Movie";
  } else {
    media_string = "TV Show";
  }
  
  var actor_string = "";
  if(actors.length === 1){ 
    actor_string = "starring " + actors[0];
  } else {
    actor_string = "starring " + actors[0] + " and " + actors[1];
  }

  var year_string = "";
  if (year) 
    year_string = `(${year})`;

  if (name != "Awards Central") {return (
    <>
      <h2>Current {media_string}: {name} {year_string}, {actor_string}</h2>
      <div>
        <img src={image} alt={name} width="400px" />
      </div>
    </>
  )} else return(
    <h2>{movie} was not found in the IMDB database, sorry!</h2>
  );
}
