import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      
      if (!response.ok) {
        throw new Error(response.status + ' error');
      }

      const data = await response.json();
      const transformedData = data.results.map(movieData => { // creating a new obj to rename the keys in the obj
        return {
          id: movieData.id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });

      setMovies(transformedData);
    
    } catch(error) {
      setError(error.message);
    }
    
    setIsLoading(false);
  }
      
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>L o a d i n g . . .</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
