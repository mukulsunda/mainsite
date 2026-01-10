import { MapPin, Phone, Mail, Clock, ArrowRight, MessageSquare, Headphones, FileQuestion } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function Contact() {

  const contactMethods = [
    {
      icon: <MessageSquare size={20} />,
      title: "Live Chat",
      desc: "Chat with our team",
      action: "Start Chat",
      highlight: true
    },
    {
      icon: <Headphones size={20} />,
      title: "Phone Support",
      desc: "Mon-Fri, 9AM-6PM IST",
      action: "+91 7888601710"
    },
    {
      icon: <FileQuestion size={20} />,
      title: "FAQ",
      desc: "Common questions",
      action: "Browse FAQ"
    }
  ];

  const contactInfo = [
    {
      icon: <MapPin size={18} />,
      label: "Address",
      value: "1617 Sector 70, Mohali 160071",
      subtext: "Punjab, India"
    },
    {
      icon: <Phone size={18} />,
      label: "Phone",
      value: "+91 7888601710",
      subtext: "+91 9835502288 (Alt)"
    },
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: "support@boxpox.in",
      subtext: "We reply within 24 hours"
    },
    {
      icon: <Clock size={18} />,
      label: "Working Hours",
      value: "Monday - Friday",
      subtext: "9:00 AM - 6:00 PM IST"
    }
  ];

  return (
    <main className="pt-[72px] md:pt-[80px] bg-white min-h-screen">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-neo-black text-white">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        
        <div className="container relative z-10 py-10 md:py-16 px-4">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded mb-3 md:mb-4">
              Contact
            </span>
            <h1 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 tracking-tight">
              Let&apos;s <span className="text-neo-yellow">Talk</span>
            </h1>
            <p className="text-sm md:text-lg text-white/60 max-w-lg leading-relaxed">
              Have a question, feedback, or an idea for a collaboration? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods - Horizontal scroll on mobile */}
      <section className="relative z-10 -mt-5 md:-mt-6">
        <div className="container px-4">
          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide">
            <div className="flex gap-2.5" style={{ width: 'max-content' }}>
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className={`p-3.5 rounded-xl border transition-all w-[160px] flex-shrink-0 active:scale-[0.98] ${
                    method.highlight 
                      ? 'bg-neo-yellow border-neo-black shadow-lg' 
                      : 'bg-white border-neo-black/10 shadow-sm'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${
                    method.highlight ? 'bg-neo-black text-white' : 'bg-neo-light-gray text-neo-black'
                  }`}>
                    {method.icon}
                  </div>
                  <h3 className="font-bold text-neo-black mb-0.5 text-sm">{method.title}</h3>
                  <p className="text-[10px] text-neo-black/60 mb-1.5">{method.desc}</p>
                  <span className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                    method.highlight ? 'text-neo-black' : 'text-neo-yellow'
                  }`}>
                    {method.action}
                    <ArrowRight size={14} />
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-3">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border transition-colors ${
                  method.highlight 
                    ? 'bg-neo-yellow border-neo-black' 
                    : 'bg-white border-neo-black/10 hover:border-neo-black/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  method.highlight ? 'bg-neo-black text-white' : 'bg-neo-light-gray text-neo-black'
                }`}>
                  {method.icon}
                </div>
                <h3 className="font-bold text-neo-black mb-1 text-sm">{method.title}</h3>
                <p className="text-xs text-neo-black/60 mb-2">{method.desc}</p>
                <span className={`inline-flex items-center gap-1 font-semibold text-xs ${
                  method.highlight ? 'text-neo-black' : 'text-neo-yellow'
                }`}>
                  {method.action}
                  <ArrowRight size={16} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-5 md:mb-6">
                <span className="inline-block px-3 py-1 bg-neo-black text-white text-xs font-bold uppercase tracking-wider rounded mb-2 md:mb-3">
                  Send a Message
                </span>
                <h2 className="text-xl md:text-3xl font-black tracking-tight">
                  Drop us a <span className="text-neo-yellow">Line</span>
                </h2>
              </div>

              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <div className="mb-5 md:mb-6">
                <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded mb-2 md:mb-3">
                  Get in Touch
                </span>
                <h2 className="text-xl md:text-3xl font-black tracking-tight">
                  Contact <span className="text-neo-yellow">Info</span>
                </h2>
              </div>

              <div className="space-y-2.5 md:space-y-3 mb-5 md:mb-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 md:p-4 bg-neo-light-gray rounded-xl active:scale-[0.99] transition-transform"
                  >
                    <div className="w-8 h-8 md:w-9 md:h-9 bg-neo-yellow rounded-lg flex items-center justify-center text-neo-black flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] md:text-xs font-mono text-neo-black/40 uppercase tracking-wider">{info.label}</p>
                      <p className="font-bold text-neo-black text-sm truncate">{info.value}</p>
                      <p className="text-xs text-neo-black/60">{info.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="p-4 bg-neo-black rounded-xl">
                <p className="text-white font-bold mb-3 text-sm">Follow us on social media</p>
                <div className="flex flex-wrap gap-2">
                  {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                    <a 
                      key={social}
                      href="#"
                      className="px-3 py-2 bg-white/10 text-white text-xs font-medium rounded-lg hover:bg-neo-yellow hover:text-neo-black active:scale-95 transition-all"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
