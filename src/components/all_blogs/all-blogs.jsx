import { FaGithub, FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';

import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import styles from './all-blogs.module.css';
import profileImg from '../../assets/nqabenhle.jpeg';
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
          <p>Helping you get small wins in life.</p>
        </div>

        <div className={styles.aboutAuthor}>
          <div>
            <img
              className={styles.profileImg}
              src={profileImg}
              alt="Q's headshot" />
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