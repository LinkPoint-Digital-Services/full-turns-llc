'use client';

import {useState} from 'react';
import {Calendar, CircleArrowRight} from 'lucide-react';
import Image from 'next/image';
import SectionHeader from './ui/SectionHeader';
import {useQuery} from '@tanstack/react-query';
import {adminClient} from '@/features/admin/adminClient';
import {GetBlogResponse} from '@/features/shared/types/api.types';

function PaginationDots({
  activeIndex,
  total
}: {
  activeIndex: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-4.75">
      {Array.from({length: total}).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${
            i === activeIndex ? 'bg-[#EAA918]' : 'bg-white'
          }`}
        />
      ))}
    </div>
  );
}

export default function Blogs() {
  const [index, setIndex] = useState(0);

  const {data: blogsData, isLoading} = useQuery<GetBlogResponse>({
    queryKey: ['blogs', '697f5f1f3bbcc503c9cc265f'],
    queryFn: () => adminClient.getBlog('697f5f1f3bbcc503c9cc265f')
  });

  const blogList = blogsData?.data || [];
  const blog = blogList[index];

  const nextBlog = () => {
    if (blogList.length > 0) {
      setIndex(prev => (prev + 1) % blogList.length);
    }
  };

  // Format date from ISO string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <section
        id="blogs"
        className="text-white bg-[#262626] py-40 px-4 md:px-10"
      >
        <div className="mx-auto container flex flex-col items-center w-full">
          <SectionHeader title="Latest Insights" style="top-1" />
          <p className="text-center mt-10">Loading blogs...</p>
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section
        id="blogs"
        className="text-white bg-[#262626] py-40 px-4 md:px-10"
      >
        <div className="mx-auto container flex flex-col items-center w-full">
          <SectionHeader title="Latest Insights" style="top-1" />
          <p className="text-center mt-10">No blogs available.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blogs" className="text-white bg-[#262626] py-40 px-4 md:px-10">
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
                src={blog.featured_image || 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800'}
                alt={blog.title}
                width={800}
                height={500}
                className="rounded-md w-full h-85 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800';
                }}
              />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              <h4
                data-aos="fade-right"
                data-aos-delay="200"
                className="text-2xl font-medium text-center lg:text-left"
              >
                Full Turns LLC
              </h4>
              <p
                data-aos="fade-right"
                data-aos-delay="200"
                className="flex items-center text-primary gap-3 justify-center lg:justify-start"
              >
                <Calendar /> {formatDate(blog.created_at)}
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
          <PaginationDots activeIndex={index} total={blogList.length} />
        </div>
      </div>
    </section>
  );
}
