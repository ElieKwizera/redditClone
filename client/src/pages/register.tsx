import {useState} from 'react' 
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import classnames from 'classnames'
import { useRouter} from 'next/router'
import Link from 'next/link'

const Register  = () => 
{
  const [email, setEmail] =useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [agreement, setAgreement] = useState(false);

  const router  = useRouter();


  const submit =  async (e) => 
  {
   
     
    e.preventDefault();
    if(!agreement)
    {
      setErrors({...errors, agreement:"you must agree to terms and conditions"});
      return;
    }
      try 
      {
        await axios.post('auth/register', { email , username , password});
        router.push('/login');
      } catch (error) {
        setErrors(error.response.data);
       
      }

  }
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Reddit | Register</title>
      </Head>
      <main className = "w-60 justify-center ">
        <h1 className = "text-lg font-medium  mb-4">Sign Up</h1>
        

        <form className="flex flex-col" onSubmit ={submit}>
         {errors.agreement && (<small> <p className= "text-red-600 mb-3 px-2"> { errors.agreement}</p></small>)} 
          <input type="text" value={email}  onChange={e=> setEmail(e.target.value)} placeholder="Enter your email" className = {classnames("w-full px-3 py-2 bg-gray-100 border border-gray-300 mb-3 rounded")}/>
          {errors.email && (<small> <p className= "text-red-600 mb-3 px-2"> { errors.email}</p></small>)}
          <input type="text" value={username} onChange={e=> setUsername(e.target.value)} placeholder="Enter your username" className = "w-full px-3 py-2 bg-gray-100 border border-gray-300 mb-3 rounded"/>
          {errors.username && (<small> <p className= "text-red-600 mb-3 px-2"> { errors.username}</p></small>)}
          
          <input type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder="Enter your password"className = "w-full px-3 py-2 bg-gray-100 border border-gray-300 mb-3 rounded mb-2" />
          {errors.password && (<small> <p className= "text-red-600 mb-3 px-2"> { errors.password}</p></small>)}
          <div className="flex flex-row mb-2" >
          <input type= "checkbox" checked={agreement} onChange={ e => setAgreement(!agreement)} id="agree" className= "mr-2"></input>
          <label htmlFor="agree" className="text-xs " > I agree to terms and conditions</label>
          </div>
          <input type="submit" className="btn px-3 py-2 bg-blue-600 mt-3 rounded text-white" value="Sign Up" />
        </form>
        <div className="mt-3">
        <small className="mt-"><p>Already have an account? <a href="/login" className="text-blue-500 font-medium"> Login</a></p></small>
        </div>
      </main>
    </div>
  )
}
export default Register;
