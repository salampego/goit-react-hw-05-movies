import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieTrend } from 'service/API';
import PropTypes from 'prop-types';

export default function Home() {
  const [trending, setTrending] = useState(null);
  const location = useLocation();
  useEffect(() => {
    fetchMovieTrend().then(res => setTrending(res.data.results));
  }, []);

  if (!trending) {
    return null;
  }
  return (
    <ul>
      {trending.map(({ id, original_title }) => {
        return (
          <li key={id}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {original_title}
            </Link>
          </li>
        );
      })}
    </ul>
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
