import React from 'react'
import Left from '@/app/Left/page'
import Chat from '@/components/Chat'

const First = () => {
    return (
        <div className='flex ml-[260px] bg-black mt-[40px] mr-[40px] mb-[40px] h-[1000px] rounded-[8px]'>
            <div className=' w-[750px]  border-gray-400 mt-5 mb-5 '>
                <Left />
            </div>
            <div className='w-screen mt-8 h-[930px] mr-5 ml-5'>
                <Chat />
            </div>
        </div>
    )
}

export default First