'use clint'
import React, {useRef} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const pinitem = ({item}) => {
    const router = useRouter()
    const imageRef = useRef(null);
    const textRef = useRef(null);

    const hoveractive= ()=>{
        imageRef.current.style.filter = 'brightness(50%)'
        textRef.current.style.display = 'block'
    }
    
    const hoverdeactive= ()=>{
        imageRef.current.style.filter = 'brightness(100%)'
        textRef.current.style.display = 'none'
    }

    const GotoPin = ()=>{
        router.push('/pin/'+item.Id)
    }


  return (
    <div className='flex flex-col gap-[10px] relative' onMouseEnter={()=> hoveractive()} onMouseLeave={()=>hoverdeactive()} onClick={()=>{GotoPin() }}>
        <Image src={item.image} width={300} height={300} ref={imageRef} className='rounded-[20px] cursor-pointer' />
        <h2 ref={textRef} className='text-ellipsis font-semibold text-white absolute top-3 left-3 hidden'>{item.title}</h2>
    </div>
  )
}

export default pinitem
