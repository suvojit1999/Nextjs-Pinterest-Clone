'use client'
import React, { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from '@/app/Share/firebaseConfig';
import PinDisplay from '@/app/components/pins/pinDisplay';


const Page = ({ params }) => {
    const db = getFirestore(app)
    const [PinDetail, setPinDetail] = useState([])

    useEffect(() => {
        console.log(params.pinId)
        getPinDetails()
    }, [params])

    const getPinDetails = async () => {
        const docRef = doc(db, "pinterest-post", params.pinId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            setPinDetail(docSnap.data())
            console.log(docSnap.data())
        }
        else{
            alert('no such pin exists')
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <PinDisplay PinDetail={PinDetail}/>
        </div>
    )
}

export default Page
