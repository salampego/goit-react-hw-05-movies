import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import s from './SharedLayout.module.css';
export const SharedLayout = () => {
  const StyledLink = styled(NavLink)`
    color: black;

    &.active {
      color: orange;
    }
  `;

  return (
    <>
      <header className={s.header}>
        <nav>
          <ul className={s.list}>
            <li className={s.item}>
              <StyledLink to="/" end>
                Home
              </StyledLink>
            </li>
            <li className={s.item}>
              <StyledLink to="/movies">Movie</StyledLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
