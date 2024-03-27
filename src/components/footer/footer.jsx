import { FaGithub, FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p className={styles.copyright}>&copy; 2024 qdoescoding.com</p>
      <div className={styles.socialMediaLinks}>
        <Link target='_blank' to='https://instagram.com/q.codes__'>
          <FaInstagram className={styles.icon} />
        </Link>
        <Link target='_blank' to='https://github.com/nqabenhle'>
          <FaGithub className={styles.icon} />
        </Link>
        <Link target='_blank' to='https://threads.net/q.codes__'>
          <FaThreads className={styles.icon} />
        </Link>
        <Link target='_blank' to='https://www.linkedin.com/in/nqabenhle'>
          <FaLinkedin className={styles.icon} />
        </Link>
        <Link target='_blank' to='mailto:nqabenhlemlaba22@gmail.com'>
          <BiLogoGmail className={styles.icon} />
        </Link>
      </div>
    </div>
  )
}

export default Footer;