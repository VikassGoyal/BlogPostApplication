"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signup.module.css'; // Correct import
import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup , getUserIdFromToken} from '../api/api';
export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        console.log('Toast error: Passwords do not match');
      return;
    } 
    try{
     const signupResponse = await signup(username,password);
     localStorage.setItem('token', signupResponse.token);
     const token = localStorage.getItem('token');
     if (token) {
      const userId =  getUserIdFromToken(token);
      localStorage.setItem('userId', userId);

      console.log('User ID:', userId);
       }
      router.replace("/main");
    } 
    catch(error){
        toast.error(error.toString());
    }
  };

  return (
    <div className={styles.signupContainer}>
        <ToastContainer autoClose={5000} /> {/* Using the styles object */}
      <div className={styles.card}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input} 
            />
          </div>
          
          <button type="submit" className={styles.button}>Sign Up</button> 
        </form>
      </div>
    </div>
  );
}
