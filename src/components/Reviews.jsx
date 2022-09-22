import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchMovieReviews } from 'service/API';

export default function Reviews() {
  const [movieReviews, setMovieReviews] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetchMovieReviews(id).then(res => setMovieReviews(res.data.results));
  }, [id]);

  if (!movieReviews) {
    return null;
  }
  return movieReviews.length > 0 ? (
    <ul>
      {movieReviews.map(({ id, author, content }) => {
        return (
          <li key={id}>
            <b>Author : {author}</b>
            <p>{content}</p>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>We don't have any review for this movie</p>
  );
}

Reviews.propTypes = {
  movieReviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
