import React from 'react';
import Image from 'next/image';
import loading_icon from '@/public/assets/images/loading/loading_icon.png';

export default function Loading() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#262626]">
      <p className="text-3xl text-red-500 font-semibold">
        Full Turn Is on the way
        <span className="animate-pulse ml-1">...</span>
      </p>

      <Image
        src={loading_icon}
        alt="Loading"
        width={128}
        height={128}
        className="mt-6"
        priority
      />
    </div>
  );
}
