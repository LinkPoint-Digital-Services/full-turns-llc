import teamimg from '@/public/assets/images/about-us/about-us.png'
import Image from 'next/image'

export default function AboutUs() {
  return (
    <section className='flex flex-col px-4 md:px-0 md:flex-row mx-auto container py-30 justify-between gap-15'>
        <div className='text-white'>
            <h2 className='text-4xl font-medium'>About Full Turns LLC</h2>
            <div className='flex flex-col gap-7 mt-10 md:text-lg'>
                <p>With over 5 years of experience in the construction industry, <span className='text-primary font-bold'>FULL TURNS LLC</span> has established itself as a trusted partner for property managers and homeowners alike.</p>
                <p>Our team of expert craftsmen and project managers are dedicated to delivering exceptional results on every project, from small repairs to major renovations.</p>
                <p>We pride ourselves on our commitment to quality, transparency, and customer satisfaction.</p>
            </div>
        </div>

        <div>
            <Image src={teamimg} alt='team picture' className='w-full max-w-250 object-cover rounded-md'/>
        </div>
    </section>
  )
}
