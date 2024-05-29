'use client'
import React, { useEffect } from 'react'
import Pinitem from './pinitem'

const pinlist = ({ Listofpins }) => {
    console.log(Listofpins)




    return (
        <div className='w-[94%] m-auto p-4 space-y-6 md:px-5 columns-2 md:columns-3 lg:columns-4 mb-4 xl:columns-5 '>
            {Listofpins.map((item, index) => (
                <Pinitem item={item} />
            ))}
        </div>
    )
}

export default pinlist
