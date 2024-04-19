import { FaGithub, FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';

import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import styles from './all-blogs.module.css';
import profileImg from '../../assets/nqabenhle.jpeg';
import extractIntro from '../../utils/extract-info';
import { useBlogsData } from '../../utils/custom-hooks';

const BlogContainer = () => {
  const { error, blogs, loading } = useBlogsData();
  const navigate = useNavigate();

  let blogList;
  if (blogs) {
    blogList = blogs.map(blog => {
      return (
        <div 
          key={nanoid()} 
          className={styles.blog} 
          onClick={() => navigate(blog.url)}>
            <p className={styles.blogDate}>{format(blog.published_on, 'PPP')}</p>
            <h2 className={styles.blogTitle}>{blog.title}</h2>
            <p className={styles.blogDescr}>{extractIntro(blog.content)}</p>
        </div>
      )
    });
  }

  return (
    <>
      <Helmet>
        <title>Asanda Que - Helping you get small wins in life</title>
        <meta name='description' content='Discover life-changing ideas with bite-sized advice every week. Conquer the small challenges you face and transform your life.' />
      </Helmet>

      <Navbar />
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{textAlign: 'center'}}>An error occurred while fetching your blog. Please check your internet connection and try again later.</p>}
      {blogs && <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.h1}>Thoughts Worth Sharing</h1>
          <p>Helping you get small wins in life.</p>
        </div>

        <div className={styles.aboutAuthor}>
          <div>
            <img
              className={styles.profileImg}
              src={profileImg}
              alt="Asanda's headshot" />
          </div>
          <div>
            <h3>asanda.que</h3>
            <p>Creator at heart, constantly exploring new subjects. I spend my time learning how to write and coding some magical stuff. I am obsessed with building beautiful things, and I am starting to share my journey online.</p>
          </div>
        </div>

        <div className={styles.socialMediaLinks}>
          <Link target='_blank' to='https://instagram.com/asanda.que'>
            <FaInstagram className={styles.logo} />
          </Link>
          <Link target='_blank' to='https://github.com/lindelwa122'>
            <FaGithub className={styles.logo} />
          </Link>
          <Link target='_blank' to='https://threads.net/asanda.que'>
            <FaThreads className={styles.logo} />
          </Link>
          <Link target='_blank' to='https://www.linkedin.com/in/nqabenhle'>
            <FaLinkedin className={styles.logo} />
          </Link>
          <Link target='_blank' to='mailto:nqabenhlemlaba22@gmail.com'>
            <BiLogoGmail className={styles.logo} />
          </Link>
        </div>

        <aside className={styles.mobileAd}>
          <div className={styles.mobileAdblock}></div>
        </aside>

        <div className={styles.outlet}>
          {blogList}
        </div>

        <aside className={styles.aside}>
          <div className={styles.banner}></div>
        </aside>
      </main>}
      <Footer />
    </>
  );
}

export default BlogContainer;