import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import styles from '../blog/blog.module.css';
import { banner, mobileAd, mobileAdblock } from '../all_blogs/all-blogs.module.css';
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>More about Asanda</title>
      </Helmet>
      
      <Navbar />
      <main className={styles.main}>
        <aside className={styles.aside}>
        </aside>
        <div className={styles.blogContainer}>
          <aside className={mobileAd}>
            <div className={mobileAdblock}></div>
          </aside>
          <h1 className={styles.h1}>About the Author</h1>
          <p>Asanda is an aspiring software engineer teaching himself how to code and write. He spends his time exploring new subjects and constantly seeking new knowledge. Currently, he is delving into topics like psychology, writing, philosophy, human nature, and entrepreneurship.</p>

          <p>He is also obsessed with personal growth, always exploring ways to improve and make his life better. He is eager to share all that he learns and document his journey in the hope it inspires someone else to take action.</p>

          <h1 className={styles.h1}>About the Blog</h1>
          <p>With this blog, I hope to share my story with the world. I will be documenting my journey as a 20-year-old who is in debt and trying to figure out life.</p>

          <p>As I learn new things, I am eager to share them in digestible blogs that might help someone else. Primarily focusing on growth, philosophy, and entrepreneurship, but I will not limit myself to these topics.</p>

          <p>If that sounds interesting, you&apos;d love the content I share on my <a href='https://threads.net/asanda.que'>Threads account.</a></p>
        </div>
        <aside className={mobileAd}>
            <div className={mobileAdblock}></div>
        </aside>
        <aside className={styles.aside}>
          <div className={banner}></div>
        </aside>
      </main>
      <Footer />
    </>
  )
}

export default About;