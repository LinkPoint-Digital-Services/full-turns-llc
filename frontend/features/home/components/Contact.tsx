'use client';

import Image from 'next/image';
import {useForm} from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import SectionHeader from './ui/SectionHeader';
import bathroom from '@/public/assets/images/contact/bathroom.png';
import livingroom from '@/public/assets/images/contact/living-room.png';
import {Phone, Mail} from 'lucide-react';

export default function Contact() {
  const form = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      message: ''
    }
  });

  return (
    <section
      id="contacts"
      className="py-30 px-4 relative overflow-hidden md:px-10"
    >
      {/* Background images */}
      <div
        data-aos="zoom-in"
        className="absolute -left-20 -bottom-10 w-70 lg:w-100 z-0"
      >
        <Image src={livingroom} alt="Living room" />
      </div>
      <div
        data-aos="zoom-in"
        className="absolute -right-16 -top-10 w-72 lg:w-100 z-0"
      >
        <Image src={bathroom} alt="Bathroom" />
      </div>

      <div className="mx-auto container relative z-10">
        <div className="text-center mb-16">
          <SectionHeader title="Get In Touch" style="top-1" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Form Section */}
          <div className="w-full lg:flex-1 lg:max-w-lg order-2">
            <div
              data-aos="zoom-in"
              className=" backdrop-blur-md bg-white/90 p-6 md:p-8 rounded-lg shadow-lg relative z-10"
            >
              <Form {...form}>
                <form className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="surname"
                    render={({field}) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="johndoe@email.com"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({field}) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="I’d like to get in touch regarding your services…"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant={'default'}>
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <div className="flex flex-col gap-8 order-1 md:max-w-xl h-full backdrop-blur-md bg-[#1a1a1a]/20 p-7 rounded-md">
            <div data-aos="fade-right">
              <h3 className="text-white font-bold text-5xl">
                Let’s Work Together on Your Next{' '}
                <span className="text-primary">Unit Turnover</span>.
              </h3>
            </div>

            <div
              data-aos="fade-right"
              data-aos-delay="200"
              className="flex gap-3 text-primary rounded-full w-fit items-center"
            >
              <Phone className="w-5 text-primary fill-primary stroke-0" />
              <span className="font-medium text-primary text-[18px]">
                +1 (443) 683-9520
              </span>
            </div>

            <div
              data-aos="fade-right"
              data-aos-delay="300"
              className="flex items-center gap-3 text-primary rounded-full w-fit"
            >
              <Phone className="w-5 h-5 text-primary fill-primary stroke-0" />
              <span className="font-medium text-primary text-[18px]">
                (443) 481-0809
              </span>
            </div>

            <div
              data-aos="fade-right"
              data-aos-delay="300"
              className="flex items-center gap-3 text-primary rounded-full w-fit"
            >
              <Mail className="w-5 h-5 text-primary " />
              <span className="font-medium text-primary text-[18px]">
                david@fullturns.com
              </span>
            </div>

            <div
              data-aos="fade-right"
              data-aos-delay="400"
              className="flex items-center gap-3 text-primary rounded-full w-fit"
            >
              <Mail className="w-5 h-5 text-primary " />
              <span className="font-medium text-primary text-[18px]">
                fullturnsllc@gmail.com
              </span>
            </div>
          </div>

          {/* Toolboxman Image Section */}
          {/* <div className="hidden lg:flex w-full lg:flex-1 items-center justify-center relative z-10">
        <div className="w-full rounded-lg flex items-center justify-center">
          <Image data-aos="zoom-in" src={toolboxman} alt="toolboxman" width={500} priority />
        </div>
      </div>
       */}
        </div>
      </div>
    </section>
  );
}
