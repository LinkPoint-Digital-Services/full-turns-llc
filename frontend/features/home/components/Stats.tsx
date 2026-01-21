import {stats} from "../data";

export default function Stats() {
  return (
    <section className="bg-primary w-full min-h-40 flex items-center py-5 px-4">
      <div className="mx-auto container px-2 sm:px-0 flex flex-row flex-wrap items-center justify-center md:justify-between h-full text-white gap-6">
        {stats.map((stat, i: number) => (
          <div data-aos-duration="600" data-aos="zoom-in" data-aos-delay={i * 50} key={i} className="text-center">
            <h3 className="text-2xl md:text-5xl font-bold">{stat.value}</h3>
            <p className="whitespace-nowrap mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
