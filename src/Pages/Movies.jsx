import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchSearchMovie } from 'service/API';

export default function Movies() {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();

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

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="searchBar" onChange={onHandleChange} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies &&
          movies.map(({ id, original_title }) => {
            return (
              <li key={id}>
                <Link to={`/movies/${id}`} state={{ from: location }}>
                  {original_title}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
