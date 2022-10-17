import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './Reviews.module.css';
import { fetchMovieReviews } from 'service/API';

export default function Reviews() {
  const [movieReviews, setMovieReviews] = useState(null);
  const { id } = useParams();
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetchMovieReviews(id).then(res => setMovieReviews(res.data.results));
  }, [id]);

  if (!movieReviews) {
    return null;
  }
  return movieReviews.length > 0 ? (
    <ul className={s.list}>
      {movieReviews.map(({ id, content, author_details }) => {
        return (
          <li key={id}>
            <span className={s.rate}>
              ⭐️ {!author_details.rating ? 10 : author_details.rating} / 10
            </span>
            <br />
            <img
              src={
                author_details.avatar_path &&
                author_details.avatar_path.includes('gravatar')
                  ? author_details.avatar_path.substring(1)
                  : baseUrl + author_details.avatar_path
              }
              alt={author_details.username}
              className={s.reviewsAvatar}
            />
            <span className={s.reviewsDescription}>{content}</span>
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
