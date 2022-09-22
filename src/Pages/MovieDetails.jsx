import { useEffect, useState, Suspense } from 'react';
import { useParams, Link, useLocation, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMovieMore } from 'service/API';
import s from './MovieDetails.module.css';

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    fetchMovieMore(id).then(res => setMovie(res.data));
  }, [id]);
  if (!movie) {
    return null;
  }
  const { poster_path, original_title, vote_average, overview, genres } = movie;

  return (
    <>
      <Link to={location.state?.from ?? '/'}>
        <button type="button">Go back</button>
      </Link>
      <div className={s.container}>
        <div className={s.img}>
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            alt={original_title}
            width="200"
          />
        </div>

        <div className={s.movieMore}>
          <b>{original_title}</b>
          <p>User score : {Math.round(vote_average * 10)}%</p>
          <b>Overview</b>
          <p>{overview}</p>
          <b>Genres</b>
          <p>
            {genres.map(({ name }) => {
              return `${name}  `;
            })}
          </p>
        </div>
      </div>
      <ul>
        <b>Additional information</b>
        <li>
          <Link to="cast" state={{ from: location?.state?.from ?? '/' }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: location?.state?.from ?? '/' }}>
            Reviews
          </Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string.isRequired,
      original_title: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      overview: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};
