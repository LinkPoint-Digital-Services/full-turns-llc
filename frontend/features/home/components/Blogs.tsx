"use client";

import {useState} from "react";
import {Calendar, CircleArrowRight} from "lucide-react";
import Image from "next/image";
import SectionHeader from "./ui/SectionHeader";

const blogs = [
  {
    title:
      "Complete Unit Turnover Services: Preparing Your Property for the Next Tenant",
    author: "Jayson Samathy",
    date: "Jan 13, 2026",
    description:
      "When a tenant moves out, the condition of your unit directly affects how fast you can lease it again. Delays, poor finishing, or missed repairs can lead to lost income and negative impressions.",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format", // workspace / office
  },
  {
    title: "Why Preventive Maintenance Saves You More in the Long Run",
    author: "Maria Gonzales",
    date: "Jan 20, 2026",
    description:
      "Preventive maintenance helps property owners avoid costly repairs, unexpected breakdowns, and unhappy tenants by addressing small issues before they become major problems.",
    imageUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format", // tools image
  },
  {
    title: "Renovation vs Repair: Knowing What Your Property Really Needs",
    author: "Daniel Cruz",
    date: "Jan 27, 2026",
    description:
      "Understanding whether your unit needs a full renovation or just targeted repairs can save time, money, and unnecessary downtime between tenants.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092334553-fcb55f9afa29?w=800&auto=format", // renovation/room
  },
  {
    title: "How Professional Cleaning Improves Tenant Retention",
    author: "Angela Reyes",
    date: "Feb 3, 2026",
    description:
      "A professionally cleaned unit creates a strong first impression, boosts tenant satisfaction, and increases the likelihood of long-term occupancy.",
    imageUrl:
      "https://images.unsplash.com/photo-1539186607617-3c3a4fb197f9?w=800&auto=format", // clean interior
  },
];

function PaginationDots({activeIndex}: {activeIndex: number}) {
  return (
    <div className="flex items-center gap-4.75">
      {blogs.map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${
            i === activeIndex ? "bg-[#EAA918]" : "bg-white"
          }`}
        />
      ))}
    </div>
  );
}

export default function Blogs() {
  const [index, setIndex] = useState(0);
  const blog = blogs[index];

  const nextBlog = () => {
    setIndex((prev) => (prev + 1) % blogs.length);
  };

  return (
    <section id="blogs" className="text-white bg-[#262626] py-16 px-4 md:px-10">
      <div className="mx-auto container flex flex-col items-center w-full">
        <SectionHeader title="Latest Insights" style="top-1" />

        <article className="flex flex-col my-10 gap-5">
          <header>
            <h3
              data-aos="fade-right"
              className="text-3xl font-bold text-primary text-center lg:text-left"
            >
              {blog.title}
            </h3>
          </header>

          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 items-center lg:items-start">
            <div className="w-full lg:w-1/3 z-10">
              <Image
                data-aos="zoom-in"
                src={blog.imageUrl}
                alt="blog image"
                width={800}
                height={500}
                className="rounded-md w-full h-[340px] object-cover"
              />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              <h4
                data-aos="fade-right"
                data-aos-delay="200"
                className="text-2xl font-medium text-center lg:text-left"
              >
                {blog.author}
              </h4>
              <p
                data-aos="fade-right"
                data-aos-delay="200"
                className="flex items-center text-primary gap-3 justify-center lg:justify-start"
              >
                <Calendar /> {blog.date}
              </p>
              <p
                data-aos="fade-right"
                data-aos-delay="400"
                className="text-lg mt-3 text-center lg:text-left"
              >
                {blog.description}
              </p>
            </div>

            <div className="flex w-full lg:w-auto justify-center lg:justify-start">
              <div
                data-aos="fade-right"
                data-aos-delay="600"
                className="flex items-center h-full lg:h-60"
              >
                <CircleArrowRight
                  className="text-white cursor-pointer"
                  size={40}
                  onClick={nextBlog}
                />
              </div>
            </div>
          </div>
        </article>

        <div className="mt-10">
          <PaginationDots activeIndex={index} />
        </div>
      </div>
    </section>
  );
}
