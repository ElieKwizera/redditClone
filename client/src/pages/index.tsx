import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState<any>({});


  useEffect(() => {

    const getPosts = async () => {
      try {
        const res = await axios.get('/posts');
        setPosts(res.data.data);

      }
      catch (error) {
        console.log(error);

        setErrors(error.response.message);
      }
    }
    getPosts();
  }, [])


  return (
    <div className="pt-20 container mx-auto px-10">
      <Head>
        <title>Reddit | Home</title>
      </Head>
      <div className="w-2/3">
        {posts.map(posts => (
          <div key={posts.identifier} className="flex mb-4 bg-white rounded">
            <div className="bg-gray-200 rounded">Vote</div>
            <div className="w-full p-2">
              <p>{posts.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
