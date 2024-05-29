'use client'
import { doc, getDoc } from "firebase/firestore";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import app from "../Share/firebaseConfig";
import Userinfo from '../components/userinfo';
import Pinlist from '../components/pins/pinlist';
import { useRouter } from 'next/navigation';


const page = ({ params }) => {
    const db = getFirestore(app)
    const router = useRouter()
    const [userInfo, setuserInfo] = useState()
    const [Listofpins, setListofpins] = useState([])
    const [ListofSavedpins, setListofSavedpins] = useState([])
    const [isCreate, setisCreate] = useState(true)

    const createbtnref = useRef(null)
    const savedbtnref = useRef(null)

    useEffect(() => {
        console.log(params.userId.replace('%40', '@'))
        if(params){
            getUserInfo(params.userId.replace('%40', '@'))
        }
    }, [params])

    const getUserInfo = async (email) => {
        const docRef = doc(db, "User", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setuserInfo(docSnap.data())
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            alert("This account does not exist!")
            router.push('/')
        }
    }

    useEffect(() => {
        if(userInfo){
            getUserPins()
            getUserSavedPins()
        }
    }, [userInfo])
    

    const getUserPins = async () => {
        const q = query(collection(db, "pinterest-post"), where("email", "==", userInfo.Email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setListofpins(Listofpins=>[...Listofpins, doc.data()])
        });

    }
    const getUserSavedPins = async () => {
        const q = query(collection(db, "saves"), where("email", "==", userInfo.Email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setListofSavedpins(ListofSavedpins=>[...ListofSavedpins, doc.data()])
        });

    }
    const gotosaved = ()=>{
        setisCreate(false)
        createbtnref.current.style.fontWeight = '300'
        savedbtnref.current.style.fontWeight = '900'

    }
    const gotocreate = ()=>{
        setisCreate(true)
        createbtnref.current.style.fontWeight = '900'
        savedbtnref.current.style.fontWeight = '300'

    }


    return (
        <div>
            {userInfo? 
            <>
            <Userinfo  userInfo={userInfo}/>
            <div className="flex justify-center items-center w-[400px] gap-5 m-auto">
                <button ref={createbtnref} className="px-3 py-1 font-extrabold" onClick={()=>gotocreate()}>Created</button>
                <button ref={savedbtnref} className="px-3 py-1" onClick={()=>gotosaved()}>Saved</button>
            </div>
            {isCreate ? <Pinlist  Listofpins={Listofpins}/>:
            <Pinlist  Listofpins={ListofSavedpins}/>}
            
            </>
             : null}
            
        </div>
    )
}

export default page
