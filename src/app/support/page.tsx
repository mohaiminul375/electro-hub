'use client'
import Image from 'next/image';
import support from '../../../public/support.jpg'
import emailjs from "@emailjs/browser";
import toast from 'react-hot-toast';
import { useRef } from 'react';
const Support = () => {
  console.log(process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID)
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    console.log(form.current)
    console.log(process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID)
    emailjs.sendForm("service_pjee3on", "template_26i91xl", form.current, {
      publicKey: "Z0yHKQ7VzH6QrBIbN",
    })
      .then(
        () => {
          toast.success("Message send successfully", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          console.log("SUCCESS!");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error(error.text)
        }
      );
  };
  return (
    <section className="flex flex-col md:flex-row p-4 md:p-8 gap-6">
      {/* Left Side - Image */}
      <div className="md:w-1/2 w-full  mb-4 md:mb-0">
        <Image className="w-full h-full  rounded-lg" src={support} alt="support_icon" />
      </div>

      {/* Right Side - Form */}
      <div className="md:w-1/2 w-full bg-white dark:bg-darkCard p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name='user_name'
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary "
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name='user_email'
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              name='user_phone'
              type="tel"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+8801xxxxx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name='message'
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"

              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded"
          >
            Submit
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm mb-2">Or message us on WhatsApp</p>
        </div>
      </div>
    </section>

  );
};

export default Support;
