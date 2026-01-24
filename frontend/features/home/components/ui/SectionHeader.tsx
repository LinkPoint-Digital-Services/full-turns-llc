"use client";

import stroke from "@/public/assets/images/about-us/about-us-paintstroke.png";
import Image from "next/image";

export default function SectionHeader({
  title,
  style,
}: {
  title: string;
  style?: string;
}) {
  return (
    <div className="relative inline-block">
      {/* Brush stroke background */}
      <div
        data-aos="fade-right"
        className={`absolute ${style} flex items-center justify-center`}
      >
        <Image src={stroke} alt="Brush stroke" />
      </div>

      {/* Text on top */}
      <h2
        data-aos="fade-right"
        className="relative text-3xl px-3 whitespace-nowrap md:text-4xl md:px-5 font-medium text-white text-center"
      >
        {title}
      </h2>
    </div>
  );
}
