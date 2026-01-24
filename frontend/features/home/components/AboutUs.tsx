import teamimg from "@/public/assets/images/about-us/about-us.png";
import Image from "next/image";
import SectionHeader from "./ui/SectionHeader";

export default function AboutUs() {
  return (
    <section
      id="about-us"
      className="flex flex-col px-4 md:flex-row mx-auto container py-40 justify-between gap-15 md:px-10"
    >
      <div className="text-white">
        <SectionHeader title="About Full Turns LLC" style="-top-1" />
        <div className="flex flex-col gap-7 mt-10 md:text-lg">
          <p data-aos="fade-right">
            With over 5 years of experience in the construction industry,{" "}
            <span className="text-primary font-bold">FULL TURNS LLC</span> has
            established itself as a trusted partner for property managers and
            homeowners alike.
          </p>
          <p data-aos="fade-right" data-aos-delay="200">
            Our team of expert craftsmen and project managers are dedicated to
            delivering exceptional results on every project, from small repairs
            to major renovations.
          </p>
          <p data-aos="fade-right" data-aos-delay="200">
            We pride ourselves on our commitment to quality, transparency, and
            customer satisfaction.
          </p>
        </div>
      </div>

      <div>
        <Image
          data-aos="zoom-in"
          src={teamimg}
          alt="team picture"
          className="w-full max-w-250 object-cover rounded-md"
        />
      </div>
    </section>
  );
}
