import { useState } from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './Components/MovieCard';


const API_URL = 'http://www.omdbapi.com/?apikey=6498fed0';
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data);
    if(data.Response === 'True'){
      setMovies(data.Search);
    }
    else{
      if(data.Error === 'Movie not found!'){
        setMovies([]);
      }
    }
  }
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    searchMovie(event.target.value);
  }

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={()=> searchMovie(searchTerm)}
        />
      </div>
        {movies.length > 0 ?(
          <div className="Container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie}/>
          ))}
          </div>
        ):(
        <div className='empty'>
          <h2>No movies found</h2>
        </div>)}
      
    </div>
  )
}

export default App
