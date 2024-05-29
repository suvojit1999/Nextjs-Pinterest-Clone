'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import UserTagForPin from '../userTagForPin'
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import app from '@/app/Share/firebaseConfig';
import { useSession, signIn, signOut } from "next-auth/react"



const PinDisplay = ({ PinDetail }) => {
    const db = getFirestore(app);
    const { data: session } = useSession()
    const router = useRouter()
    const [isSaved, setisSaved] = useState(false)

    useEffect(() => {
        const checkSavedStatus = async () => {
            if (session) {
                const docRef = doc(db, "saves", PinDetail.Id + session.user.email);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setisSaved(true)
                }
            }
        }
        checkSavedStatus();
    }, [session, db, PinDetail.Id])

    const savePin = async () => {
        if (session) {
            try {
                await setDoc(doc(db, "saves", PinDetail.Id + session.user.email), {
                    email: session.user.email,
                    Id: PinDetail.Id,
                    image: PinDetail.image,
                    title: PinDetail.title
                });
                setisSaved(true)
                console.log("i am clicked")
            } catch {
                console.log('Error: post not saved')
            }
        }
        else {
            alert("log in first")
        }

    }




    return (
        <div className=' w-auto h-auto mx-auto shadow-xl inline-block rounded-[20px]'>
            <div className='h-[50px] flex justify-start items-center relative left-[-50px] cursor-pointer'><FaArrowLeft onClick={() => { router.back() }} /></div>
            <div className='flex justify-center items-start m-[20px] gap-5 '>
                <div><Image src={PinDetail.image} width={400} height={400} className='rounded-l-[20px]' /></div>
                <div className=' flex-col justify-start items-start'>
                    <div className='flex justify-end m-[20px] mb-[25px]'>
                        {isSaved ? <button className='bg-red-600 text-white px-3 py-1 font-bold rounded-md'> Saved!</button> :
                            <button className='bg-red-600 text-white px-3 py-1 font-bold rounded-md' onClick={() => { savePin() }}>Save</button>}
                    </div>
                    <div className='h-[100px]'><h2 className='font-bold text-3xl mb-[20px]'>{PinDetail.title}</h2></div>
                    <UserTagForPin PinDetail={PinDetail} />
                    <div className='mt-[20px] h-[100px] flex justify-center items-end'><a href={'https://' + PinDetail.link} target="_blank"><button className=' px-[40px] py-[5px] rounded-lg font-semibold bg-gray-300 text-gray-700'>Go To Source</button></a></div>
                </div>
            </div>
        </div>
    )
}

export default PinDisplay
