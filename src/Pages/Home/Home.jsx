import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieTrend } from 'service/API';
import s from './Home.module.css';
import PropTypes from 'prop-types';

export default function Home() {
  const [trending, setTrending] = useState(null);
  const location = useLocation();
  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  useEffect(() => {
    fetchMovieTrend().then(res => setTrending(res.data.results));
  }, []);

  if (!trending) {
    return null;
  }
  return (
    <div className={s.container}>
      <h1>Trending today</h1>
      <ul className={s.list}>
        {trending.map(({ id, original_title, poster_path }) => {
          return (
            <li key={id} className={s.item}>
              <Link
                to={`/movies/${id}`}
                state={{ from: location }}
                className={s.link}
              >
                <img
                  src={`${baseUrl}${poster_path}`}
                  alt={original_title}
                  className={s.item_image}
                />
                <h2 className={s.item_title}> {original_title}</h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Home.propTypes = {
  trending: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string.isRequired,
    })
  ),
};
