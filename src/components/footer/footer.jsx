import { FaGithub, FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p className={styles.copyright}>&copy; 2024 qdoescoding.com</p>
      <div className={styles.socialMediaLinks}>
        <FaInstagram className={styles.icon} />
        <FaGithub className={styles.icon} />
        <FaThreads className={styles.icon} />
        <FaLinkedin className={styles.icon} />
        <BiLogoGmail className={styles.icon} />
      </div>
    </div>
  )
}

export default Footer;