'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useForm} from 'react-hook-form';
import emailjs from 'emailjs-com';
import {toast} from 'sonner';
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
import {Mail} from 'lucide-react';
import whatsapplogo from "@/public/assets/images/contact/whatsapp-logo-yellow.svg";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID!;
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID!;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;

  const form = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = async (data: {
    name: string;
    surname: string;
    email: string;
    message: string;
  }) => {
    try {
      setIsSending(true);
      await emailjs.send(
        serviceId,
        templateId,
        {
          fname: data.name,
          name: `${data.name} ${data.surname}`,
          email: data.email,
          message: data.message
        },        
        publicKey
      );
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you soon.");
      setTimeout(() => {
        setSubmitted(false);
        form.reset();
      }, 3000);
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSending(false);
    }
  };

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
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-green-600 w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-slate-600">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{required: 'First name is required.'}}
                      render={({field}) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" required {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="surname"
                      rules={{required: 'Last name is required.'}}
                      render={({field}) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" required {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{required: 'Email is required.'}}
                      render={({field}) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="johndoe@email.com"
                              required
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      rules={{required: 'Message is required.'}}
                      render={({field}) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="I'd like to get in touch regarding your services..."
                              required
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      variant={"default"}
                      disabled={isSending}
                    >
                      {isSending ? "Sending..." : "Submit"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8 order-1 md:max-w-xl h-full backdrop-blur-md bg-[#1a1a1a]/20 p-7 rounded-md">
            <div data-aos="fade-right">
              <h3 className="text-white font-bold text-5xl">
                Let&apos;s Work Together on Your Next{" "}
                <span className="text-primary">Unit Turnover</span>.
              </h3>
            </div>

            <div
              data-aos="fade-right"
              data-aos-delay="300"
              className="flex items-center gap-3 text-primary rounded-full w-fit"
            >
              <Image
                src={whatsapplogo}
                alt="whatsapp logo"
                color="#e8a72e"
                width={20}
                height={20}
              ></Image>
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
