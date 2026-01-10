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
        
        <div className="container relative z-10 py-12 md:py-16">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded mb-4">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Let&apos;s <span className="text-neo-yellow">Talk</span>
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed">
              Have a question, feedback, or an idea for a collaboration? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="relative z-10 -mt-6">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border transition-colors ${
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
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-neo-black text-white text-xs font-bold uppercase tracking-wider rounded mb-3">
                  Send a Message
                </span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                  Drop us a <span className="text-neo-yellow">Line</span>
                </h2>
              </div>

              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded mb-3">
                  Get in Touch
                </span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                  Contact <span className="text-neo-yellow">Info</span>
                </h2>
              </div>

              <div className="space-y-3 mb-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-neo-light-gray rounded-lg"
                  >
                    <div className="w-9 h-9 bg-neo-yellow rounded-lg flex items-center justify-center text-neo-black flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs font-mono text-neo-black/40 uppercase tracking-wider">{info.label}</p>
                      <p className="font-bold text-neo-black text-sm">{info.value}</p>
                      <p className="text-xs text-neo-black/60">{info.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-6 p-4 bg-neo-black rounded-lg">
                <p className="text-white font-bold mb-3 text-sm">Follow us on social media</p>
                <div className="flex flex-wrap gap-2">
                  {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                    <a 
                      key={social}
                      href="#"
                      className="px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded hover:bg-neo-yellow hover:text-neo-black transition-colors"
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
