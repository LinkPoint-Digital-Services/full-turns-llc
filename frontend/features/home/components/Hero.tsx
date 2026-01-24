import bg from "@/public/assets/images/homepage/hero-bg.png";
import man from "@/public/assets/images/homepage/man-waving.png"
import ladderMan from "@/public/assets/images/homepage/ladderman.png"
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section
    id="hero"
      className="h-screen min-h-140 md:min-h-230 md:px-10 bg-cover bg-center flex items-center relative before:absolute before:inset-0 before:bg-black/30 overflow-hidden"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="mx-auto container flex flex-col md:flex-row text-center md:text-left items-center justify-between relative z-10">
        <div className="mx-5 text-white max-w-200 flex gap-15 flex-col items-center md:items-start justify-between">
          <span className="flex flex-col gap-5">
            <h1  data-aos="fade-right" className="text-5xl md:text-6xl lg:text-8xl font-bold">
              Every Unit. <span className="text-primary">Fully Turned.</span>
            </h1>
            <p data-aos="fade-right" data-aos-delay="200" className="max-w-165 text-xl">
              Professional cleaning, painting, refinishing, maintenance, and renovations delivering fast, reliable, rent-ready results for property owners and managers.
            </p>
          </span>

          <Button data-aos="fade-right" data-aos-delay="400" variant={"default"} className="w-fit h-12">Get Started Now</Button>
        </div>

        <div className="relative w-85 h-96 md:flex hidden items-center justify-center">
          <Image 
            data-aos="zoom-in"
            data-aos-delay="200"
            className="object-contain absolute bottom-7 right-0 w-45 h-auto" 
            src={ladderMan} 
            alt={"man with ladder"}
            priority
          />
          <Image 
            data-aos="zoom-in"
            className="object-contain absolute bottom-0 right-12 w-full h-auto z-10" 
            src={man} 
            alt={"man waving"}
            priority
          />
        </div>
      </div>
    </section>
  );
}
