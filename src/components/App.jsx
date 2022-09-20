import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Home } from './Pages/Home';

export const App = () => {
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=60fcd2a553e98d3878a95d0ec6c21c9e'
    )
      .then(response => response.json())
      .then(data => setTrending(data));
  }, [trending]);

  if (!trending) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home trending={trending} />} />
      </Route>
    </Routes>
  );
};

// ('keyApi: 60fcd2a553e98d3878a95d0ec6c21c9e');
