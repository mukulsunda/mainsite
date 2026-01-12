"use client";
import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import Link from 'next/link';

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
    <section id="faq" className="section-padding bg-neo-black">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span className="section-label">
                <HelpCircle size={14} />
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[0.95]">
                Questions?<br />
                <span className="text-neo-yellow">Answered.</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 text-lg">
                Everything you need to know about BoxPox products and services.
              </p>
              <Link 
                href="/contact" 
                className="robot-btn-outline py-3 px-6"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`rounded-2xl overflow-hidden transition-all ${
                    openIndex === index 
                      ? 'bg-white/10 border border-neo-yellow/30' 
                      : 'bg-white/5 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left gap-4"
                  >
                    <span className="flex items-center gap-4">
                      <span className={`font-mono text-sm font-bold ${
                        openIndex === index ? 'text-neo-yellow' : 'text-white/30'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-lg font-semibold text-white">
                        {faq.question}
                      </span>
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      openIndex === index ? 'bg-neo-yellow text-neo-black' : 'bg-white/10 text-white'
                    }`}>
                      {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-48' : 'max-h-0'
                  }`}>
                    <div className="px-6 pb-6">
                      <p className="pl-10 text-white/60 leading-relaxed border-l-2 border-neo-yellow/30">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
