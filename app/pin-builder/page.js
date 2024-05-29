'use client'
import React, {useEffect} from 'react'
import UserTag from '../components/userTag'
import ImageImport from '../components/imageImport'
import Form from '../components/form'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

const PinBuilder = ({params}) => {
  const{data:session} = useSession()
  const router = useRouter()
  useEffect(() => {
    if(!session){
      router.push('/')
    }
  }, [session])
  
  return (
    <div>
      <Form/>
    </div>
  )
}

export default PinBuilder
