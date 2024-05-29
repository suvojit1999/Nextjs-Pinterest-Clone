'use client'
import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import copy from 'clipboard-copy';
import { FaArrowLeft } from "react-icons/fa";

const Userinfo = ({userInfo}) => {
    console.log(userInfo)
    const [currentUrl, setCurrentUrl] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const router = useRouter();

    const sharelink = async ()=>{
      setCurrentUrl(window.location.href);
      await copy(currentUrl);
      setIsCopied(true);
      setInterval(()=>{
        setIsCopied(false);
      },10000)
    }

  return (
    <div className=' flex flex-col justify-center items-center gap-2 w-350px] h-[400px] m-auto '>
      <div className='w-[80%] h-[50px] flex justify-start items-center cursor-pointer '><FaArrowLeft onClick={()=>{router.back()}}/></div>
      <Image src={userInfo.image} alt='Profile Picture' width={200} height={200} className='rounded-full border-[5px] border-gray-300 hover:border-gray-400 cursor-pointer'/>
      <h2 className='text-3xl font-semibold '>{userInfo.name}</h2>
      {/* <h2>{userInfo.Email.split('@')[0]}</h2> */}
      <h2 className='text-gray-500'>{userInfo.Email}</h2>
      <button className='bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full w-[200px] mb-7' onClick={()=>sharelink()}>{isCopied ? 'Copied!' : 'Share'}</button>
    </div>
  )
}

export default Userinfo
