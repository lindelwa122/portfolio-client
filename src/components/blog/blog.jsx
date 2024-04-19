import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import extractIntro from '../../utils/extract-info';
import styles from './blog.module.css';
import { banner, mobileAd, mobileAdblock } from '../all_blogs/all-blogs.module.css';
import { useBlogData } from '../../utils/custom-hooks';

const Blog = () => {
  const { id } = useParams();
  const { error, blog, loading } = useBlogData(id);

  return (
    <>
      {blog && 
        <Helmet>
          <title>{blog.title}</title>
          <meta name='description' content={extractIntro(blog.content)} />
        </Helmet>
      }

      <Navbar />
      {loading && <p style={{textAlign: 'center'}}>Loading...</p>}
      {error && <p style={{textAlign: 'center'}}>An error occurred while fetching your blog. Please check your internet connection and try again later.</p>}
      {blog && <main className={styles.main}>
        <aside className={styles.aside}>
        </aside>
        <div className={styles.blogContainer}>
          <h1 className={styles.h1}>{blog.title}</h1>
          <aside className={mobileAd}>
            <div className={mobileAdblock}></div>
          </aside>
          <p className={styles.byline}>{format(blog.published_on, 'PPP')} | <Link to='/about'>Asanda Que</Link></p>
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
        <aside className={mobileAd}>
            <div className={mobileAdblock}></div>
        </aside>
        <aside className={styles.aside}>
          <div className={banner}></div>
        </aside>
      </main>}
      <Footer />
    </>
  )
}

export default Blog;