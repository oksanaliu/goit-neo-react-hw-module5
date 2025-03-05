import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
const Navigation = lazy(
  () => import('../src/components/Navigation/Navigation')
);
const HomePage = lazy(() => import('../src/pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../src/pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(
  () => import('../src/pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('../src/components/MovieCast/MovieCast'));
const MovieReviews = lazy(
  () => import('../src/components/MovieReviews/MovieReviews')
);
const NotFoundPage = lazy(
  () => import('../src/pages/NotFoundPage/NotFoundPage')
);
import './App.css';

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
