"use client"
import { useState } from 'react';
import styles from './login.module.css';
import { login , getUserIdFromToken} from '../api/api';
import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit =  async(e)  => {
    e.preventDefault();
    try{
        const signupResponse = await login(username,password);
        localStorage.setItem('token', signupResponse.token);
        const token = localStorage.getItem('token');
       if (token) {
        const userId = getUserIdFromToken(token);
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
    
    <div className={styles.container}>
        <ToastContainer  autoClose={5000}/> 
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <input 
              type="text" 
              id="username" 
              className={styles.input} 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input 
              type="password" 
              id="password" 
              className={styles.input} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}
