import { Calendar, CircleArrowRight } from "lucide-react";
import imgArticle from "@/public/assets/images/blogs/blog1.png";
import Image from "next/image";
import SectionHeader from "./ui/SectionHeader";

function PaginationDots() {
  return (
    <div className="flex items-center gap-4.75">
      <div className="w-2.5 h-2.5 rounded-full bg-[#EAA918]" />
      <div className="w-2.5 h-2.5 rounded-full bg-white" />
      <div className="w-2.5 h-2.5 rounded-full bg-white" />
      <div className="w-2.5 h-2.5 rounded-full bg-white" />
    </div>
  );
}

export default function Blogs() {
  return (
    <section className="text-white bg-[#262626] py-16 px-4">
      <div className="mx-auto container flex flex-col items-center w-full">
        <SectionHeader title="Latest Insights" style="top-1" />

        <article className="flex flex-col my-10 gap-5">
          <header>
            <h3 data-aos="fade-right" className="text-3xl font-bold text-primary text-center lg:text-left">
              Complete Unit Turnover Services: Preparing Your Property for the
              Next Tenant
            </h3>
          </header>

          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 items-center lg:items-start">
            {/* Image */}
            <div className="w-full lg:w-1/3">
              <Image
              data-aos="zoom-in"
                src={imgArticle}
                alt="alt text"
                className="rounded-md w-full h-auto"
              />
            </div>

            {/* Text */}
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              <h4 data-aos="fade-right" data-aos-delay="200" className="text-2xl font-medium text-center lg:text-left">
                Jayson Samathy
              </h4>
              <p data-aos="fade-right" data-aos-delay="200" className="flex items-center text-primary gap-3 justify-center lg:justify-start">
                <Calendar /> Jan 13, 2026
              </p>
              <p data-aos="fade-right" data-aos-delay="400" className="text-lg mt-3 text-center lg:text-left">
                When a tenant moves out, the condition of your unit directly
                affects how fast you can lease it again. Delays, poor finishing,
                or missed repairs can lead to lost income and negative
                impressions. That’s where a professional unit turnover company
                comes in.
              </p>
            </div>

            {/* Arrow vertically centered */}
            <div className="flex w-full lg:w-auto justify-center lg:justify-start">
              <div data-aos="fade-right" data-aos-delay="600" className="flex items-center h-full lg:h-60">
                <CircleArrowRight className="text-white" size={40} />
              </div>
            </div>
          </div>
        </article>

        {/* Pagination */}
        <div className="mt-10">
          <PaginationDots />
        </div>
      </div>
    </section>
  );
}
