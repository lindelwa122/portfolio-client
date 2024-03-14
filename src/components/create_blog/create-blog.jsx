import { Outlet }from  'react-router-dom';
 import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import styles from './create-blog.module.css';

const CreateBlog = () => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default CreateBlog;
