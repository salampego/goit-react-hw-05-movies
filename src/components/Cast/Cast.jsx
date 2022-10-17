import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from 'service/API';
import s from './Cast.module.css';
import morph from '../../images/unknow_actor.jpg';
import PropTypes from 'prop-types';

export default function Cast() {
  const [movieCredits, setMovieCredits] = useState(null);
  const { id } = useParams();
   const baseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetchMovieCredits(id).then(res => setMovieCredits(res.data.cast));
  }, [id]);

  if (!movieCredits) {
    return null;
  }

  return (
    <div className={s.container}>
      <table>
        <tbody>
          {movieCredits.map(
            ({ credit_id, id, profile_path = morph, name, character }) => {
              return (
                <tr key={credit_id} className={s.item}>
                  <td key={id}>
                    <img
                      src={
                        profile_path
                          ? `${baseUrl}${profile_path}`
                          : morph
                      }
                      alt={name}
                      width="60"
                    />
                  </td>
                  <td className={s.actorName} key={name}>
                    {name}
                  </td>
                  <td className={s.character} key={character}>
                    {character}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
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
