"use client"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface HomeCarProps {
    img: string,
    title: string,
    description: string,
    handleClick: () => void,
    className: string,
}

function HomeCard({img, title, description, handleClick, className}: HomeCarProps) {
  return (
    <div className={cn('bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] rounded-[14px] min-h-[260px] cursor-pointer', className)}
    onClick={handleClick}>
        <div className='flex-center glassmorphism w-[56px] h-[56px] rounded-[10px]'>
            <Image src={img} alt='meeting' width={27} height={27} />
        </div>
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-lg font-normal'>{description}</p>
        </div>
    </div>
  )
}

export default HomeCard