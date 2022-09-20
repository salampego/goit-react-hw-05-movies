import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Header/Header';
import { Trending } from './Pages/trending';

export const App = () => {
  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=60fcd2a553e98d3878a95d0ec6c21c9e'
    )
      .then(response => response.json())
      .then(console.log);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Trending />} />
      </Route>
    </Routes>
  );
};

// ('keyApi: 60fcd2a553e98d3878a95d0ec6c21c9e');
