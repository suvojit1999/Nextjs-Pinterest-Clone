'use client'
import React, { useEffect,  useState } from 'react'
import Image from "next/image";
import { HiSearch, HiBell, HiChat } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react"
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from '@/app/Share/firebaseConfig'
import { useRouter } from 'next/navigation';


const header = () => {
  const { data: session } = useSession()
  const router = useRouter();
  
  const db = getFirestore(app);
  useEffect(() => {
    if (session) {
      saveUserInfo();
      const intervalId = setInterval(() => {
        signOut();
      }, 3600000);

      // Cleanup interval on component unmount or session change
      return () => clearInterval(intervalId);
    }

    // if(!session){
    //   router.push('/')
    // }

    // if(!session){
    //   router.push('/')
    // }      we dont need this because we want to get to the profile even if we are logged out, so that we can visit other people's profiles too
  }, [session]);

  // useEffect(() => {
  //  router.push('/')
  // }, [signOut])

  // const signOutUser = () => {
  //   router.push('/')
  //   signOut()
  // };
  


  const saveUserInfo = async () => {
    if (session?.user) {
      await setDoc(doc(db, "User", session.user.email), {
        name: session.user.name,
        Email: session.user.email,
        image: session.user.image
      });
    }
  }

  function dropDown() {
    let dw = document.querySelector(".dropdown")
    if (dw.style.display == 'flex') {
      dw.style.display = 'none'
    }
    else {
      dw.style.display = 'flex'
      dw.style.flexDirection = 'column'
    }

  }

  const gotoprofile = ()=>{
    router.push('/'+ session.user.email)
    let dw = document.querySelector(".dropdown")
    dw.style.display = 'none'
  }

  const gotoHome = ()=>{
    // if (session) {
    //   router.push("/")
    // }
    router.push("/")
  }
  const handleCreatPin = ()=>{
    if (session) {
      router.push("/pin-builder")
    }
    let dw = document.querySelector(".dropdown")
    dw.style.display = 'none'

  }
  const handleCreatPins = ()=>{
    if (session) {
      router.push("/pin-builder")
    }
    else{
      alert("log in first")
    }

  }



  return (
    <div className='w-[80%] h-[70px] flex justify-center items-center gap-6 m-auto sticky'>
      <Image src='/logo.svg' alt='logo' width={45} height={45} className='hover:bg-gray-300 rounded-full cursor-pointer p-[5px]' />
      <span onClick={()=>{gotoHome()}} className='hidden md:inline p-[7px] bg-black text-zinc-50 font-bold rounded-[20px] w-[70px] text-center cursor-pointer'>Home</span>
      <span onClick={()=>handleCreatPins()} className='hidden md:inline p-[7px] bg-gray-300 font-bold rounded-[20px] w-[80px] text-center cursor-pointer'>Create</span>

      <div className='flex justify-center items-center gap-[5px]  bg-gray-200 p-[3px] rounded-[20px] w-[300px] md:flex-grow'>
        <HiSearch className='mx-2' />
        <input type="text" name="search" id="search" className='w-[160px] md:w-auto bg-gray-200 h-[30px] outline-none flex-grow rounded-[20px]' />
      </div>

      <HiBell className='w-6 h-6 md:w-8 md:h-8 hidden md:inline' />
      <HiChat className='w-6 h-6 md:w-8 md:h-8 hidden md:inline' />


      {session?.user ? <div className='relative'>
        <div className='w-[30px]'><Image src={session?.user?.image} alt='' width={45} height={45} className='hover:bg-gray-300 rounded-full cursor-pointer ' onClick={() => dropDown()} /></div>
        <div className='w-[150px] h-[150px] border-[0.5px] border-solid border-zinc-500 justify-center items-center absolute left-[-50px] top-[50px] hidden dropdown shadow-md shadow-slate-400 gap-1 bg-white'>
          <button onClick={() => gotoprofile()} className='w-[148px] h-[35px]  text-sm hover:bg-gray-300'>My Profile</button>
          <button onClick={() => handleCreatPin()} className='w-[148px] h-[35px] text-sm  hover:bg-gray-300'>Create</button>
          <button onClick={() => signOut()} className='w-[148px] h-[35px]  hover:bg-gray-300'>Logout</button>
        </div>
      </div>
        :
        <button onClick={() => signIn()} className='text-sm font-bold text-center cursor-pointer md:text-lg '>Login</button>}




    </div>
  )
}

export default header
