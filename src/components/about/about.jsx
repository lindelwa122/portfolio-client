import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import styles from '../blog/blog.module.css';
import { banner, mobileAd, mobileAdblock } from '../all_blogs/all-blogs.module.css';

const About = () => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <aside className={styles.aside}>
        </aside>
        <div className={styles.blogContainer}>
          <aside className={mobileAd}>
            <div className={mobileAdblock}></div>
          </aside>
          <h1 className={styles.h1}>About the Author</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae doloribus officiis beatae pariatur maiores nostrum, facere, impedit illum voluptates est, exercitationem assumenda quae. Dolore voluptate ab reiciendis nobis magni minima. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae doloribus officiis beatae pariatur maiores nostrum, facere, impedit illum voluptates est, exercitationem assumenda quae. Dolore voluptate ab reiciendis nobis magni minima.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam consectetur tenetur expedita itaque sequi mollitia illo dignissimos sunt omnis repudiandae assumenda quod quo, nulla explicabo inventore dolorum totam. Nulla, numquam enim omnis et tempora dolorum voluptatum dolor nobis quis pariatur minima deleniti! Vel, officia blanditiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam consectetur tenetur expedita itaque sequi mollitia illo dignissimos sunt omnis repudiandae assumenda quod quo, nulla explicabo inventore dolorum totam. Nulla, numquam enim omnis et tempora dolorum voluptatum dolor nobis quis pariatur minima deleniti! Vel, officia blanditiis!</p>

          <h1 className={styles.h1}>About the Blog</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam consectetur tenetur expedita itaque sequi mollitia illo dignissimos sunt omnis repudiandae assumenda quod quo, nulla explicabo inventore dolorum totam. Nulla, numquam enim omnis et tempora dolorum voluptatum dolor nobis quis pariatur minima deleniti! Vel, officia blanditiis!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam fuga cum nihil sunt eveniet! Consequuntur non, nam tempore molestiae ad provident saepe consectetur earum ratione.</p>
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