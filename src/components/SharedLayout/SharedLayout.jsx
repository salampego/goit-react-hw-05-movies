import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import s from './SharedLayout.module.css';
export function SharedLayout() {
  const StyledLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    &.active {
      color: #28dab3;
    }
  `;

  return (
    <>
      <header className={s.header}>
        <nav>
          <div className={s.container}>
            <ul className={s.list}>
              <li className={s.item}>
                <StyledLink to="/" end>
                  Home
                </StyledLink>
              </li>
              <li className={s.item}>
                <StyledLink to="/movies">Movies</StyledLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
