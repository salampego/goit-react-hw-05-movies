import { Route, Routes } from 'react-router-dom';

import { SharedLayout } from './SharedLayout';
import { Home } from '../Pages/Home';
import { Movies } from '../Pages/Movies';
import { MovieDetails } from '../Pages/MovieDetails';
import { Cast } from './Cast';
import { Reviews } from './Reviews';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:id" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>
    </Routes>
  );
};

// ('keyApi: 60fcd2a553e98d3878a95d0ec6c21c9e');
