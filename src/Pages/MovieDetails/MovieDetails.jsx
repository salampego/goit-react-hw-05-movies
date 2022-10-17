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
  const {
    poster_path,
    original_title,
    vote_average,
    overview,
    genres,
    vote_count,
  } = movie;

  return (
    <>
      <div className={s.container}>
        <Link to={location.state?.from ?? '/'}>
          <button type="button" className={s.buttonBack}>Go back</button>
        </Link>
        <div className={s.container_movie}>
          <div className={s.img}>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              width="400"
              alt={original_title}
            />
          </div>
          <div className={s.movieMore}>
            <h2>{original_title}</h2>
            <p className={s.genres}>
              {genres.map(({ name }) => {
                return `${name.toLowerCase()}, `;
              })}
            </p>
            <p>
              <span>👁{vote_count} </span>
              <span>⭐️{vote_average} </span>
            </p>
            <p>{overview}</p>
          </div>
        </div>
        <div className={s.castReview}>
          <Link
            to="cast"
            className={s.castLink}
            state={{ from: location?.state?.from ?? '/' }}
          >
            Cast
          </Link>

          <Link
            to="reviews"
            className={s.castLink}
            state={{ from: location?.state?.from ?? '/' }}
          >
            Reviews
          </Link>
        </div>
        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
      </div>
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
