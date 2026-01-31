import maintenance from "@/public/assets/images/fullturns-services/maintenance.jpg";
import painting from "@/public/assets/images/fullturns-services/painting.jpeg";
import michelangelo from "@/public/assets/images/fullturns-services/pexels-michelangelo-buonarroti-4176413.jpg";
import renovation from "@/public/assets/images/fullturns-services/renovation.jpg";
import varnishing from "@/public/assets/images/fullturns-services/varnishing.jpg";

export const services = [
  {
    image: painting,
    video: "/assets/videos/painting-vid.mp4",
    alt: "Painting service",
    title: "Painting",
    description:
      "Professional interior and exterior painting for residential and commercial spaces.",
  },
  {
    image: maintenance,
    video: "/assets/videos/maintenance-vid.mp4",
    alt: "Maintenance service",
    title: "Maintenance",
    description:
      "Routine property maintenance to keep your home or unit in excellent condition.",
  },
  {
    image: michelangelo,
    video: "/assets/videos/cleaning-vid.mp4",
    alt: "Cleaning service",
    title: "Cleaning",
    description:
      "Deep and post-turnover cleaning services that leave spaces spotless and ready.",
  },
  {
    image: renovation,
    video: "/assets/videos/unit-upgrade.mp4",
    alt: "Unit Upgrade service",
    title: "Unit-Upgrade",
    description:
      'Minor to major renovation work to refresh and improve your unit.'
  },
  {
    image: varnishing,
    alt: 'Varnishing service',
    title: 'Reglazing',
    description: 'High-quality varnishing to protect and enhance wood surfaces.'
  }
];


export const stats = [
  {
    value: '1000+',
    label: 'Projects Completed'
  },
  {
    value: '550+',
    label: 'Happy Clients'
  },
  {
    value: "5",
    label: "Years of Quality Services",
  },
  {
    value: "50+",
    label: "Expert Team",
  },
];
