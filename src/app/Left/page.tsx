import React from 'react'

const data = [
    {
        profile: '/img/Oval.png',
        name: 'Blockchain',
        day: 'wednesday',
        time: '12.00am'
    },
    {
        profile: '/img/Oval1.png',
        name: 'raffles',
        day: 'friday',
        time: '11.00am'
    },
    {
        profile: '/img/Oval.png',
        name: 'Blockchain',
        day: 'wednesday',
        time: '12.00am'
    },
    {
        profile: '/img/Oval1.png',
        name: 'raffles',
        day: 'friday',
        time: '11.00am'
    },

]

const Left = () => {
    return (
        <div className=' ml-16 text-white'>
            <div>
                <input
                    className=' mt-2 text-xl lg:w-[550px] h-[45px] bg-black bg-opacity-60 rounded-xl border-l border-t  bg-gradient-to-l from-zinc-900  to-zinc-950 pl-5'
                    placeholder='Search by'
                />
            </div>
            <div className='mt-8'>
                <button className='border-2 w-[550px] h-[45px] rounded-[8px]'>Event</button>
            </div>
            <div className='mt-8 w-[600px] border-2 h-fit mb-7 bg-gradient-to-l from-zinc-900  to-zinc-950 rounded-[8px]'>
                <div className='ml-8'>
                    <h3 className='font-quicksand text-[28px] font-medium leading-[160%]'>Group</h3>
                </div>
                <div className='ml-5 '>
                    {data.map((item) => (
                        <div className='flex justify-between pt-[15px] border-b  border-[#C1BEBE] pb-[15px] w-[550px] '>
                            <img
                                src={item.profile}
                                alt="Profile Icon"
                                className="w-10 h-10 rounded-full"
                            />
                            <h3 className='font-quicksand text-[20px] font-normal leading-[160%]'>{item.name}</h3>
                            <div className='flex'>
                                <h3 className='font-quicksand text-[13px] font-normal leading-[160%]'>{item.day}</h3>
                                <h3 className='font-quicksand text-[13px] ml-3 font-normal leading-[160%]'>{item.time}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div></div>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Left