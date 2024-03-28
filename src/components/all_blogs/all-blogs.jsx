import { FaGithub, FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';

import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import styles from './all-blogs.module.css';
import { useBlogsData } from '../../utils/custom-hooks';

const removeHTMLTags = (str) => {
  const arr = str.split('');

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '<') {
      let delCount = 0;
      let j = 0;
      while (true) {
        if (arr[i + j] !== '>') {
          delCount++;
          j++;
        } else {
          delCount++;
          break;
        }
      }
      arr.splice(i, delCount);
    }
  }

  return arr.join('');
}

const limitWords = (str, wordCount) => {
  const arr = str.split(' ');
  const newArr = [];

  if (wordCount >= arr.length) {
    return arr.join(' ');
  }

  for (let i = 0; i < wordCount; i++) {
    newArr.push(arr[i]);
  }

  return newArr.join(' ');
}

const extractIntro = (content) => {
  const firstP = content.split('</p>')[0].slice(3);
  const cleanP = removeHTMLTags(firstP);
  return limitWords(cleanP, 30) + '...';
}

const BlogContainer = () => {
  const { error, blogs, loading } = useBlogsData();
  const navigate = useNavigate();

  let blogList;
  if (blogs) {
    blogList = blogs.map(blog => {
      console.log(extractIntro(blog.content));

      return (
        <div 
          key={nanoid()} 
          className={styles.blog} 
          onClick={() => navigate('/blog/' + blog.id)}>
            <p className={styles.blogDate}>{format(blog.published_on, 'PPP')}</p>
            <h2 className={styles.blogTitle}>{blog.title}</h2>
            <p className={styles.blogDescr}>{extractIntro(blog.content)}</p>
        </div>
      )
    });
  }

  return (
    <>
      <Navbar />
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{textAlign: 'center'}}>An error occurred while fetching your blog. Please check your internet connection and try again later.</p>}
      {blogs && <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.h1}>Thoughts Worth Sharing</h1>
          <p>Stay informed with out bit sized articles</p>
        </div>

        <div className={styles.aboutAuthor}>
          <div>
            <img
              className={styles.profileImg}
              src='data:image/jpeg;base64,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'
            alt='Q . codes social media profile picture.' />
          </div>
          <div>
            <h3>justqueue</h3>
            <p>Creator at heart, constantly exploring new subjects. I spend my time learning how to write and coding some magical stuff. I am obsessed with building beautiful things, and I am starting to share my journey online.</p>
          </div>
        </div>

        <div className={styles.socialMediaLinks}>
          <Link target='_blank' to='https://instagram.com/q.codes__'>
            <FaInstagram className={styles.logo} />
          </Link>
          <Link target='_blank' to='https://github.com/nqabenhle'>
            <FaGithub className={styles.logo} />
          </Link>
          <Link target='_blank' to='https://threads.net/q.codes__'>
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