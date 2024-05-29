'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const UserTagForPin = ({ PinDetail }) => {

  const router = useRouter()

  const gotoprofile = () => {
      router.push('/'+PinDetail.email)
  }

  return (
    <div className='flex justify-start items-center w-[400px] gap-3 my-5 cursor-pointer' onClick={() => gotoprofile()}>
      <div> <Image src={PinDetail.userImage} alt='user Image' width={80} height={80} className='rounded-full border-2 border-gray-500' /> </div>
      <div>
        <h2 className='text-2xl font-semibold text-gray-600'>{PinDetail.userName}</h2>
        <span className='text-sm text-gray-500'>{PinDetail.email}</span>
      </div>
    </div>
  )
}

export default UserTagForPin
