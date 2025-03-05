import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getMovieDetails } from '../../api/api';
import styles from './MovieDetailsPage.module.css';
import arrowLeftIcon from '../../assets/lnr-chevron-left.svg';

const defaultImg = 'https://dummyimage.com/250x375/cccccc/000000&text=No+Image';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const goBackLink = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    if (!movieId) return;
    getMovieDetails(movieId)
      .then(setMovie)
      .catch(() => setMovie(null));
  }, [movieId]);

  useEffect(() => {
    if (
      !location.state &&
      performance.getEntriesByType('navigation')[0]?.type === 'reload'
    ) {
      navigate('/movies', { replace: true });
    }
  }, [location.state, navigate]);

  if (!movie) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.container}>
      <Link to={goBackLink.current} className={styles.goBackButton}>
        <img src={arrowLeftIcon} alt="Go Back" className={styles.icon} />
        <span>Go Back</span>
      </Link>

      <div className={styles.details}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
          className={styles.poster}
        />
        <div>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.score}>
            User Score: {Math.round(movie.vote_average * 10)}%
          </p>
          <h3>Overview</h3>
          <p className={styles.overview}>{movie.overview}</p>
          <h3>Genres</h3>
          <p className={styles.genres}>
            {movie.genres?.length > 0
              ? movie.genres.map((genre) => genre.name).join(', ')
              : 'No genres available'}
          </p>
        </div>
      </div>

      <h3 className={styles.additionalInfo}>Additional information</h3>
      <div className={styles.buttonsContainer}>
        <Link
          to="cast"
          state={{ from: goBackLink.current }}
          className={styles.infoButton}
        >
          Cast
        </Link>
        <Link
          to="reviews"
          state={{ from: goBackLink.current }}
          className={styles.infoButton}
        >
          Reviews
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
