"use client";

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <main className="pt-[100px]">
      {/* Page Header */}
      <div className="py-20 px-[5%] pb-8 text-center relative bg-neo-yellow border-b-3 border-black">
        <div className="animate-fade-in-up">
          <h1 className="text-[clamp(3rem,6vw,5rem)] mb-4 uppercase text-black drop-shadow-[4px_4px_0px_white] [-webkit-text-stroke:2px_black]">
            Get In Touch
          </h1>
          <p className="text-xl max-w-[600px] mx-auto font-bold bg-white inline-block py-1.5 px-4 border-2 border-black shadow-[4px_4px_0px_black] rotate-1">
            Have a question or an unusual idea? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-20 px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="animate-fade-in-up">
            <div className="text-left mb-12">
              <h2 className="text-4xl uppercase mb-4">Contact <br /><span className="text-white drop-shadow-[2px_2px_0px_black] [-webkit-text-stroke:1px_black]">Information</span></h2>
              <p className="font-bold">Reach out to us through any of these channels.</p>
            </div>
            
            <div className="neo-card flex items-center gap-6 mb-8 p-6 bg-white">
              <div className="bg-black p-2.5 rounded-full text-white border-2 border-black">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-xl mb-2">Our Location</h4>
                <p className="font-medium">1617 sector 70 mohali 160071</p>
              </div>
            </div>
            
            <div className="neo-card flex items-center gap-6 mb-8 p-6 bg-neo-yellow">
              <div className="bg-black p-2.5 rounded-full text-white border-2 border-black">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-xl mb-2">Phone Number</h4>
                <p className="font-medium">7888601710</p>
              </div>
            </div>
            
            <div className="neo-card flex items-center gap-6 mb-8 p-6 bg-white">
              <div className="bg-black p-2.5 rounded-full text-white border-2 border-black">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-xl mb-2">Email Address</h4>
                <p className="font-medium">hello@boxpox.com</p>
              </div>
            </div>

            <div className="neo-card flex items-center gap-6 mb-8 p-6 bg-neo-yellow">
              <div className="bg-black p-2.5 rounded-full text-white border-2 border-black">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="text-xl mb-2">Working Hours</h4>
                <p className="font-medium">Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="animate-fade-in-up [animation-delay:0.2s]">
            <div className="neo-card p-8 md:p-12 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-neo-yellow rounded-bl-full border-l-3 border-b-3 border-black z-0"></div>
              
              <h3 className="text-3xl mb-8 relative z-10">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-bold ml-1">Your Name</label>
                  <input type="text" id="name" className="neo-input" placeholder="John Doe" required />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-bold ml-1">Your Email</label>
                  <input type="email" id="email" className="neo-input" placeholder="john@example.com" required />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="font-bold ml-1">Subject</label>
                  <input type="text" id="subject" className="neo-input" placeholder="Project Inquiry" required />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-bold ml-1">Message</label>
                  <textarea id="message" rows={5} className="neo-input resize-y" placeholder="Tell us about your project..." required></textarea>
                </div>
                
                <button type="submit" className="neo-btn w-full text-center justify-center mt-4 hover:bg-neo-yellow">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
