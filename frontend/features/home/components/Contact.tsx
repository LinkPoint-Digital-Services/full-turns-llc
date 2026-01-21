"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toolboxman from "@/public/assets/images/contact/toolboxman.png";
import SectionHeader from "./ui/SectionHeader";
import bathroom from "@/public/assets/images/contact/bathroom.png";
import livingroom from "@/public/assets/images/contact/living-room.png";

export default function Contact() {
  const form = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section className="py-30 px-4 relative overflow-hidden">
  {/* Background images */}
  <div className="absolute -left-20 -bottom-10 w-70 lg:w-100 z-0">
    <Image src={livingroom} alt="Living room" />
  </div>
  <div className="absolute -right-16 -top-10 w-72 lg:w-100 z-0">
    <Image src={bathroom} alt="Bathroom" />
  </div>

  <div className="mx-auto container relative z-10">
    <div className="text-center mb-16">
      <SectionHeader title="Get In Touch" style="top-1" />
    </div>

    <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-center">
      {/* Form Section */}
      <div className="w-full lg:flex-1 lg:max-w-lg">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg relative z-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Value" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input placeholder="Value" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Value" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Value" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant={"default"}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Toolboxman Image Section */}
      <div className="hidden lg:flex w-full lg:flex-1 items-center justify-center relative z-10">
        <div className="w-full rounded-lg flex items-center justify-center">
          <Image src={toolboxman} alt="toolboxman" width={350} priority />
        </div>
      </div>
    </div>
  </div>
</section>

  );
}
