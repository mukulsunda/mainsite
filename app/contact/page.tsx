import { MapPin, Phone, Mail, Clock, ArrowRight, MessageSquare, Headphones, FileQuestion, Sparkles, Send } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function Contact() {

  const contactMethods = [
    {
      icon: <MessageSquare size={24} />,
      title: "Live Chat",
      desc: "Chat with our team in real-time",
      action: "Start Chat",
      highlight: true
    },
    {
      icon: <Headphones size={24} />,
      title: "Phone Support",
      desc: "Mon-Fri, 9AM-6PM IST",
      action: "+91 7888601710"
    },
    {
      icon: <FileQuestion size={24} />,
      title: "FAQ",
      desc: "Common questions answered",
      action: "Browse FAQ"
    }
  ];

  const contactInfo = [
    {
      icon: <MapPin size={20} />,
      label: "Address",
      value: "1617 Sector 70, Mohali 160071",
      subtext: "Punjab, India"
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "+91 7888601710",
      subtext: "+91 9835502288 (Alt)"
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "support@boxpox.in",
      subtext: "We reply within 24 hours"
    },
    {
      icon: <Clock size={20} />,
      label: "Working Hours",
      value: "Monday - Friday",
      subtext: "9:00 AM - 6:00 PM IST"
    }
  ];

  return (
    <main className="bg-neo-black min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern-animated opacity-20" />
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-neo-yellow/10 rounded-full blur-[120px]" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="section-label">
              <Send size={14} />
              CONTACT US
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9]">
              Let&apos;s work<br />
              <span className="text-neo-yellow">together</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Have a question, feedback, or an idea for a collaboration? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-16 border-y border-white/10">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className={`p-8 rounded-3xl transition-all ${
                  method.highlight 
                    ? 'bg-neo-yellow text-neo-black' 
                    : 'bg-white/5 border border-white/10 hover:border-neo-yellow/30'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  method.highlight ? 'bg-neo-black text-neo-yellow' : 'bg-neo-yellow text-neo-black'
                }`}>
                  {method.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${method.highlight ? 'text-neo-black' : 'text-white'}`}>
                  {method.title}
                </h3>
                <p className={`mb-4 ${method.highlight ? 'text-neo-black/70' : 'text-white/60'}`}>
                  {method.desc}
                </p>
                <span className={`inline-flex items-center gap-2 font-bold ${
                  method.highlight ? 'text-neo-black' : 'text-neo-yellow'
                }`}>
                  {method.action}
                  <ArrowRight size={18} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div>
              <span className="section-label">
                <MessageSquare size={14} />
                SEND A MESSAGE
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[0.95]">
                Drop us a<br />
                <span className="text-neo-yellow">Line</span>
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <span className="section-label">
                <Sparkles size={14} />
                GET IN TOUCH
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[0.95]">
                Contact<br />
                <span className="text-neo-yellow">Info</span>
              </h2>

              <div className="space-y-4 mb-8">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-neo-yellow/30 transition-all"
                  >
                    <div className="w-12 h-12 bg-neo-yellow rounded-xl flex items-center justify-center text-neo-black flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-1">{info.label}</p>
                      <p className="font-bold text-white text-lg">{info.value}</p>
                      <p className="text-sm text-white/60">{info.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="p-8 bg-neo-gray rounded-3xl border border-white/10">
                <p className="text-white font-bold mb-4 text-lg">Follow us on social media</p>
                <div className="flex flex-wrap gap-3">
                  {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                    <a 
                      key={social}
                      href="#"
                      className="px-5 py-3 rounded-full border border-white/10 text-white/70 text-sm font-medium hover:border-neo-yellow hover:text-neo-yellow transition-all"
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
