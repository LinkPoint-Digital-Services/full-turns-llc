'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {services} from '../data';

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [startWipe, setStartWipe] = useState(false);
  const [lineWipe, setLineWipe] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // start animation
          setLineWipe(true);

          // optional delay for startWipe
          timeoutId = setTimeout(() => setStartWipe(true), 700);
        } else {
          // reset animation when out of view
          setLineWipe(false);
          setStartWipe(false);

          if (timeoutId) clearTimeout(timeoutId);
        }
      },
      {threshold: 0.01}
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full flex flex-col md:flex-row md:justify-end select-none overflow-hidden"
    >
      {/* SECTION WIPE OVERLAY */}
      <div
        className={`absolute inset-0 z-50 bg-[#1a1a1a] flex flex-col items-center justify-center
          ${startWipe ? 'animate-wipe-horizontal' : ''}`}
      >
        <h1 className="text-primary text-4xl md:text-7xl font-bold tracking-wide relative">
          SERVICES
          {/* Line underneath the title */}
          <span
            className={`block h-1 bg-primary mt-2 w-0 transition-all duration-1000 ease-in-out
              ${lineWipe ? 'w-full' : ''}`}
          />
        </h1>
      </div>

      {/* SERVICES CONTENT */}
      {services.map((service, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`${
            activeIndex === index ? 'md:w-full h-120' : ''
          } transition-all duration-500 ease-in-out relative md:h-screen h-25 cursor-pointer  md:w-40 overflow-hidden`}
        >
          <Image
            src={service.image}
            alt={service.alt}
            fill
            className="object-cover brightness-50"
            priority={index === 0}
          />

          <div className="flex flex-col items-center md:items-start md:flex-row justify-between relative p-10 md:px-10 md:p-32">
            <div className="flex md:flex-col leading-none text-3xl md:text-4xl lg:text-5xl items-center font-bold text-primary z-20">
              {service.title
                .toUpperCase()
                .split('')
                .map((char, i) => (
                  <span key={i}>{char}</span>
                ))}
            </div>

            <div
              className={`flex md:w-[35vw] mt-10 md:mt-0 flex-col items-center md:items-end top-20 transition-all duration-800 ease-in-out ${
                activeIndex === index
                  ? 'lg:right-20 right-5 opacity-100'
                  : 'lg:-right-96 opacity-0'
              }`}
            >
              <div className="bg-primary aspect-video w-[80vw] max-w-[60vw]  md:w-full" />
              <p className="w-full text-left text-white text-lg md:3xl lg:text-4xl uppercase font-semibold mt-10">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
