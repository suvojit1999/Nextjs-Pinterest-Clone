'use client'
import React, { useState } from 'react'
import { HiArrowUpCircle } from "react-icons/hi2";

const ImageImport = ({setFile}) => {
  // const [file, setFile] = useState(null);
  const [selectedFile,setSelectedFile]=useState();

  return (
    <div className='w-[400px] h-[500px] bg-[#e9e9e9]
    rounded-lg flex justify-center items-center'>
        
        <label className='mx-auto my-auto flex flex-col justify-center items-center cursor-pointer h-[94%] w-[94%] border-[2px] border-gray-300 border-dashed rounded-lg text-gray-600 '>
           
          {!selectedFile?
          <div className='flex items-center flex-col'>
           <HiArrowUpCircle className='text-[22px]'/>   
            <h2 className=' font-semibold'>Click to Upload</h2>
            </div>
            :null}
            {selectedFile?
            <img src={window.URL.createObjectURL(selectedFile)}
            alt='selected-image'
            width={500}
            height={800}
            className='object-contain h-[90%]'
            />:null}
            <input id="dropzone-file" type="file"
             className="hidden"  
             onChange={(e)=>{setFile(e.target.files[0]);
             setSelectedFile(e.target.files[0])}} />
        
        </label>
    </div>
  )
}

export default ImageImport
