'use client'
import { doc, getDoc } from "firebase/firestore";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import React from 'react'
import { useEffect, useState } from 'react'
import app from "./Share/firebaseConfig";
import Pinlist from "./components/pins/pinlist";
import { useRouter } from 'next/navigation';


export default function Home() {
  const db = getFirestore(app)

  const [Listofpins, setListofpins] = useState([])


  useEffect(() => {
    getUserPins()
  }, [])

  const getUserPins = async () => {
    const q = query(collection(db, "pinterest-post"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setListofpins(Listofpins => [...Listofpins, doc.data()])
    });

  }
  return (
    <>
      <Pinlist Listofpins={Listofpins} className='absolute z-[-10]'/>
    </>
  );
}
