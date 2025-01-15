import Image from "next/image";
import main  from "./main/page";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import SplashPage from "./splash/page";
export default function Home() {
  return (
    <div>
      <ToastContainer />
      <SplashPage/>
      
    </div>
  );
}
