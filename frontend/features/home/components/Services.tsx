'use client'

import { useState } from 'react'
import Image from 'next/image'
import { services } from '../data';

export default function Services() {

  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className='w-full flex flex-col md:flex-row md:justify-end select-none'>
        {services.map((service, index) => (
          <div onClick={() => setActiveIndex(index)} key={index} className={`${activeIndex == index && "md:w-full h-120"} transition-all duration-500 ease-in-out relative md:h-200 h-25 cursor-pointer w-full md:w-40 overflow-hidden`}>
            <Image 
              src={service.image}
              alt={service.alt}
              fill
              className='object-cover brightness-50'
              priority={index === 0}
            />
            <div className='flex flex-col items-center md:items-start md:flex-row justify-between relative p-10'>
                <div className="flex md:flex-col leading-none text-3xl md:text-4xl lg:text-5xl items-center font-bold text-white z-20">
                    {service.title.toUpperCase().split("").map((char, i) => (
                        <span key={i}>{char}</span>
                    ))}
                </div>
                <div className={`flex md:w-[35vw] mt-10 md:mt-0 flex-col items-center md:items-end top-20 transition-all duration-800 ease-in-out ${activeIndex === index ? "lg:right-20 right-5 opacity-100" : "lg:-right-96 opacity-0"}`}>
                    <div className='bg-primary aspect-video w-full md:w-full'></div>
                    <p className='w-full text-left text-white text-lg md:3xl lg:text-4xl font-medium mt-10 '>{service.description}</p>
                </div>
            </div>
          </div>
        ))}
    </section>
  )
}
