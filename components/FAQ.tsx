"use client";
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What exactly is BoxPox?",
    answer: "We are a design agency that thinks outside the box. We provide subscription-based design services, meaning you get unlimited design requests for a flat monthly fee."
  },
  {
    question: "How does the subscription work?",
    answer: "It's simple. You subscribe, you add design requests to your queue, and we knock them out one by one. You can pause or cancel anytime."
  },
  {
    question: "What is the turnaround time?",
    answer: "Typically, you'll receive your designs within 48 hours. Complex requests might take a bit longer, but we'll keep you in the loop."
  },
  {
    question: "Do you offer refunds?",
    answer: "Due to the high-quality nature of our work, we don't offer refunds. However, we'll revise the designs until you're 100% satisfied."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-[5%] bg-neo-yellow border-y-3 border-black">
      <div className="container max-w-[1000px]">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4">Frequently Asked <br /> Questions</h2>
          <p className="font-bold text-xl">Got questions? We've got answers.</p>
        </div>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`neo-card p-0 cursor-pointer transition-all duration-300 ${openIndex === index ? 'bg-black text-white' : 'bg-white text-black'}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="p-6 md:p-8 flex justify-between items-center">
                <h3 className="text-xl md:text-2xl font-bold pr-8">{faq.question}</h3>
                <div className={`min-w-[40px] h-[40px] rounded-full border-2 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'border-white rotate-45' : 'border-black rotate-0'}`}>
                  {openIndex === index ? <Plus size={24} /> : <Plus size={24} />}
                </div>
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 md:p-8 pt-0 text-lg opacity-90 leading-relaxed border-t border-gray-700">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
