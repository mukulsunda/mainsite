"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What makes BoxPox products different?",
    answer: "Every BoxPox product is built with modular architecture, premium materials, and precision engineering. We design for longevity and upgradability, not planned obsolescence."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes! We ship to over 50 countries worldwide. Shipping times vary by location, typically 5-10 business days for international orders. All orders include tracking."
  },
  {
    question: "What's your return policy?",
    answer: "We offer a 30-day no-questions-asked return policy. If you're not completely satisfied with your purchase, we'll provide a full refund or exchange."
  },
  {
    question: "How long is the warranty?",
    answer: "All BoxPox products come with a 5-year limited warranty covering manufacturing defects. Extended warranty options are available at checkout."
  },
  {
    question: "Can I upgrade my existing products?",
    answer: "Absolutely! Our modular design philosophy means most products can be upgraded with new modules and components. Check each product page for compatible upgrades."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-neo-light-gray">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column - Header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span className="inline-block px-3 py-1 bg-neo-black text-white text-xs font-bold uppercase tracking-wider rounded mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                Questions?<br />
                <span className="text-neo-yellow">Answered.</span>
              </h2>
              <p className="text-neo-black/60 leading-relaxed mb-6 text-sm md:text-base">
                Everything you need to know about BoxPox products and services.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 text-neo-black font-semibold hover:text-neo-yellow transition-colors text-sm"
              >
                Contact Support →
              </a>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-8">
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`bg-white border-2 rounded-xl overflow-hidden ${
                    openIndex === index 
                      ? 'border-neo-black' 
                      : 'border-neo-black/10 hover:border-neo-black/30'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-5 py-4 md:px-6 md:py-5 flex justify-between items-center text-left gap-3"
                  >
                    <span className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold ${
                        openIndex === index ? 'text-neo-yellow' : 'text-neo-black/30'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base md:text-lg font-bold text-neo-black">
                        {faq.question}
                      </span>
                    </span>
                    <ChevronDown 
                      size={20} 
                      className={`flex-shrink-0 text-neo-black/50 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-5 pb-5 md:px-6 md:pb-6">
                      <p className="pl-8 md:pl-9 text-neo-black/70 leading-relaxed text-sm md:text-base border-l-2 border-neo-yellow/30">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
