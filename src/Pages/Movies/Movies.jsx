import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchSearchMovie } from 'service/API';
import s from './Movies.module.css';

export default function Movies() {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    if (query !== null) {
      setSearchValue(query);
      fetchSearchMovie(query).then(res => setMovies(res.data.results));
    }
  }, [query]);

  const onSubmit = e => {
    e.preventDefault();
    if (searchValue.trim() === '') {
      return;
    }

    setSearchParams(`query=${searchValue}`);

    fetchSearchMovie(searchValue).then(res => {
      setMovies(res.data.results);
    });
  };

  const onHandleChange = e => {
    setSearchValue(e.currentTarget.value);
  };
  console.log(movies);

  return (
    <>
      <div className={s.container}>
        <form onSubmit={onSubmit} className={s.form}>
          <button type="submit" className={s.btnSubmit}>
            <span className={s.searchBtn}></span>
          </button>
          <input
            type="text"
            name="searchBar"
            onChange={onHandleChange}
            className={s.searchInput}
          />
        </form>
        <ul className={s.list}>
          {movies &&
            movies.map(({ id, original_title, poster_path, vote_average }) => {
              return (
                <li key={id} className={s.item}>
                  <Link
                    to={`/movies/${id}`}
                    className={s.link}
                    state={{ from: location }}
                  >
                    <img
                      src={`${baseUrl}${poster_path}`}
                      alt={original_title}
                      width="200"
                    />
                    <h2 className={s.movies_title}> {original_title}</h2>
                    <p>
                      <span className={s.rate}>⭐️{vote_average} </span>
                    </p>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
