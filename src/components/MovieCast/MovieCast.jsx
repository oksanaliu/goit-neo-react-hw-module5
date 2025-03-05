import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieCast } from '../../api/api';
import styles from './MovieCast.module.css';

const defaultImg = 'https://dummyimage.com/150x225/cccccc/000000&text=No+Image';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    setIsLoading(true);

    getMovieCast(movieId)
      .then((data) => {
        setCast(data.cast || []);
      })
      .catch(() => setCast([]))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;

  if (!cast.length)
    return <p className={styles.noData}>No cast information available.</p>;

  return (
    <ul className={styles.castList}>
      {cast.map((actor) => (
        <li key={actor.id} className={styles.castItem}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : defaultImg
            }
            alt={actor.name}
            className={styles.actorImage}
          />
          <p className={styles.actorName}>{actor.name}</p>
          <p className={styles.characterName}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
