'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"


const userTag = () => {
    const{data:session} = useSession()


  return (
    <div className='flex justify-start items-center w-[400px] gap-3 my-5'>
      <div> <Image src={session?.user.image} alt='user Image' width={80} height={80} className='rounded-full border-2 border-gray-500'/> </div>
      <div>
        <h2 className='text-2xl font-semibold text-gray-600'>{session?.user.name}</h2>
        <span className='text-sm text-gray-500'>{session?.user.email}</span>
      </div>
    </div>
  )
}

export default userTag
