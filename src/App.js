import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);

  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films', 
       // as a second arg could be an obj you can pass headers, methods, body etc
      // by default a GET request will be sent
      
    ).then( // fetch returns a promise
        response => {
          return response.json();
        }).then( // this block executes after the previous then return
          data => {
            
            const transformedData = data.results.map(movieData => { // creating a new obj to rename the keys in the obj
              return {
                id: movieData.id,
                title: movieData.title,
                openingText: movieData.opening_crawl,
                releaseDate: movieData.release_date
              };
            });
            setMovies(transformedData);
          }
        );
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
