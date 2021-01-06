
import type { AppProps /*, AppContext */ } from 'next/app'
import "../styles/globals.css"
import axios from 'axios';
import Navbar from '../components/Navbar'
import {useRouter} from 'next/router'

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) 
{
  const { pathname}  = useRouter();
  const authRoutes = ['/register','/login'];
  const isAuthRoute = authRoutes.includes(pathname);
  return (
    <>
    {!isAuthRoute && <Navbar/>}
    <Component {...pageProps} />
    </>
    
  );
 
 
}


export default MyApp

