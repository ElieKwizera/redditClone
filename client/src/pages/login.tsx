import {useState} from 'react' 
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import classnames from 'classnames'
import { useRouter} from 'next/router'

const Login  = () => 
{
  const [email, setEmail] =useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState();
  const [agreement, setAgreement] = useState(false);

  const router  = useRouter();


  const submit =  async (e) => 
  {
    e.preventDefault();
    try 
    {
        await axios.post('/auth/login' , {username, password}, {withCredentials :true} );
        router.push('/');
    } 
    catch (error) 
    {
        setErrors(error.response.data);
    }
  }
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Reddit | Login</title>
      </Head>
      <main className = "w-60 justify-center ">
        <h1 className = "text-lg font-medium  mb-4">Login</h1>
        
        <form className="flex flex-col" onSubmit ={submit}>
          {errors && (<small> <p className= "text-red-600 mb-3 px-2">Login failed. Please check your email and password</p></small>)}
          <input type="text" value={username} onChange={e=> setUsername(e.target.value)} placeholder="Enter your username" className = "w-full px-3 py-2 bg-gray-100 border border-gray-300 mb-3 rounded"/>
          <input type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder="Enter your password"className = "w-full px-3 py-2 bg-gray-100 border border-gray-300 mb-3 rounded mb-2" />
          <div className="flex flex-row mb-2" >
          </div>
          <input type="submit" className="btn px-3 py-2 bg-blue-600 mt-3 rounded text-white" value="Login" />
        </form>
        <div className="mt-3">
        <small className="mt-"><p>New to reddit? <a href="/register" className="text-blue-500 font-medium"> Register</a></p></small>
        </div>
      </main>
    </div>
  )
}
export default Login;
