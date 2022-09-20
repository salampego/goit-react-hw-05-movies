import { Link } from 'react-router-dom';
// import styled from 'styled-components';
import s from './Header.module.css';
export const Header = () => {
  // const StyledLink = styled(NavLink)`
  //   color: black;

  //   &.active {
  //     color: orange;
  //   }
  // `;

  return (
    <header className={s.header}>
      <nav>
        <ul className={s.list}>
          <li className={s.item}>
            <Link>Home</Link>
          </li>
          <li className={s.item}>
            <Link>Movie</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
