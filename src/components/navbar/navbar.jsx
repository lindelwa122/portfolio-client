import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import logo from '../../assets/logo.svg';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <img className={styles.logo} src={logo} alt='Brand Logo'/>
      </div>
      <div className={styles.linkWrapper}>
        <NavLink to='/about' className={styles.link}>About</NavLink>
        <NavLink to='/blog' className={styles.link}>Blog</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
