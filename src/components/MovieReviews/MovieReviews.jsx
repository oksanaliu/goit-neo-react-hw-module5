import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../api/api';
import styles from './MovieReviews.module.css';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    setIsLoading(true);

    getMovieReviews(movieId)
      .then((data) => {
        setReviews(data.results || []);
      })
      .catch(() => setReviews([]))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;

  if (!reviews.length)
    return <p className={styles.noData}>No reviews available.</p>;

  return (
    <ul className={styles.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.reviewItem}>
          <h4 className={styles.author}>Author: {review.author}</h4>
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
