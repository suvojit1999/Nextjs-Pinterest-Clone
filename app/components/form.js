'use client'
import React, {useState} from 'react'
import ImageImport from './imageImport'
import UserTag from './userTag'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '@/app/Share/firebaseConfig';
import { useRouter } from 'next/navigation';



const form = () => {
  const { data: session } = useSession()
  const db = getFirestore(app);
  const router = useRouter()

  const [title, setTitle] = useState()
  const [desc, setDesc] = useState() 
  const [link, setLink] = useState()
  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)

  const storage = getStorage(app);
  const postId = Date.now().toString()

  const onSave = ()=>{
    console.log(title , desc, link , file)
    setLoading(true)
    uploadFile()
  }

  const uploadFile = ()=>{
    const storageRef = ref(storage, 'pinterest/'+file.name);
    uploadBytes(storageRef, file).then((snapshot)=>{
      console.log('file uploaded')
    }).then((res) => {
      getDownloadURL(storageRef).then(async (url) =>{
        console.log(url)

        const postData={
          title:title,
          description:desc,
          link:link,
          image:url,
          userName:session.user.name,
          email:session.user.email,
          userImage:session.user.image,
          Id:postId
        }

        await setDoc(doc(db, 'pinterest-post', postId),
        postData).then(res => {
          console.log('data saved to database')
          setLoading(false)
          router.push('/'+session.user.email)
        })
      })
    })
  }


  return (
    <div>
       <div className=' bg-white p-16 rounded-2xl '>
        <div className='flex justify-end mb-6'>
            <button onClick={()=>onSave()}
             className='bg-red-500 p-2
            text-white font-semibold px-3 
            rounded-lg'>
              {loading?  <Image src="/loading-indicator.png" 
                width={30} 
                height={30} 
                alt='loading'
                className='animate-spin'  />:
                <span>Save</span>}</button>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
           
            <ImageImport setFile={(file)=>setFile(file)} />
          
       <div className="col-span-2">
       <div className='w-[100%]'>
        <input type="text" placeholder='Add your title'
            onChange={(e)=>setTitle(e.target.value)}
        className='text-[35px] outline-none font-bold w-full
        border-b-[2px] border-gray-400 placeholder-gray-400'/>
        <h2 className='text-[12px] mb-8 w-full  text-gray-400'>The first 40 Charaters are 
        what usually show up in feeds</h2>
        <UserTag user={session?.user} />
        <textarea type="text"
          onChange={(e)=>setDesc(e.target.value)}
            placeholder='Tell everyone what your pin is about' 
        className=' outline-none  w-full mt-8  text-[14px]
        border-b-[2px] border-gray-400 placeholder-gray-400'/>
          <input type="text"
          onChange={(e)=>setLink(e.target.value)}
           placeholder='Add a Destination Link' 
        className=' outline-none  w-full  pb-4 mt-[90px]
        border-b-[2px] border-gray-400 placeholder-gray-400'/>
    </div>
       </div>
        
        </div>
    </div>
    </div>
  )
}

export default form
