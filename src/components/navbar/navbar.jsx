import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import logo from '../../../public/vite.svg';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <img src={logo} alt='Brand Logo'/>
      </div>
      <div className={styles.linkWrapper}>
        <NavLink className={styles.link}>About</NavLink>
        <NavLink className={styles.link}>Blog</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
