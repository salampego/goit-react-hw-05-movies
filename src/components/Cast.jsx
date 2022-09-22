import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from 'service/API';
import morph from '../images/unknow_actor.jpg';
import PropTypes from 'prop-types';

export default function Cast() {
  const [movieCredits, setMovieCredits] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchMovieCredits(id).then(res => setMovieCredits(res.data.cast));
  }, [id]);

  if (!movieCredits) {
    return null;
  }

  return (
    <ul>
      {movieCredits.map(({ id, profile_path = morph, name, character }) => {
        return (
          <li key={id}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w300/${profile_path}`
                  : morph
              }
              alt={name}
              width="100"
            />
            <h3>{name}</h3>
            <p>Character: {character}</p>
          </li>
        );
      })}
    </ul>
  );
}

Cast.propTypes = {
  movieCredits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      profile_path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    })
  ),
};
