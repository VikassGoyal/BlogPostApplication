import Link from 'next/link';
import styles from './splash.module.css'; // Make sure to create a CSS module for styling
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function SplashPage() {
  return (
     <>
    <ToastContainer autoClose={5000}/>
    <div className={styles.container}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Welcome to the Blog</h1>
        <p className={styles.description}>Share your thoughts with the world</p>
        
        <div className={styles.buttons}>
          <Link href="/login">
            <button className={styles.button}>Login</button>
          </Link>
          <Link href="/signup">
            <button className={styles.button}>Signup</button>
          </Link>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src="/pexels-pixabay-261662.jpg" alt="Blog" className={styles.image} />
      </div>
    </div>
    </>
  );
}
