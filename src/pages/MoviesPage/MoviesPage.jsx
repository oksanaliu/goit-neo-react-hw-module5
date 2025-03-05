import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchMovies } from '../../api/api';
import MovieList from '../../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import styles from './MoviesPage.module.css';

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      toast.error('Please enter a search term!');
      return;
    }

    const validQuery = /^[a-zA-Z0-9\s]+$/.test(trimmedQuery);
    if (!validQuery) {
      toast.error('Search term contains invalid characters!');
      return;
    }

    setSearchParams({ query: trimmedQuery });
  };

  useEffect(() => {
    const query = searchParams.get('query');
    if (!query) return;

    setLoading(true);

    searchMovies(query)
      .then((data) => {
        if (data.results.length === 0) {
          setNoResults(true);
          setMovies([]);
        } else {
          setNoResults(false);
          setMovies(data.results);
        }
      })
      .catch(() => {
        setNoResults(true);
        setMovies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

  useEffect(() => {
    setQuery('');
  }, []);

  return (
    <div className={styles.container}>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      {loading && <p className={styles.loading}>Loading...</p>}{' '}
      {noResults && !loading && (
        <p className={styles.noResults}>
          No results found for '{searchParams.get('query')}'
        </p>
      )}
      {!loading && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;
