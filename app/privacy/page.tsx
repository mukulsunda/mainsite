import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Bell, Database, Share2, Trash2, Mail } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | BoxPox',
  description: 'Learn how BoxPox collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
  const highlights = [
    { icon: <Eye size={20} />, text: 'We collect only necessary data' },
    { icon: <Lock size={20} />, text: 'Your data is encrypted and secure' },
    { icon: <Share2 size={20} />, text: 'We never sell your information' },
    { icon: <Trash2 size={20} />, text: 'You can delete your data anytime' },
  ];

  return (
    <main className="pt-[72px] md:pt-[80px] bg-white min-h-screen">
      {/* Header */}
      <section className="bg-neo-black text-white py-12 md:py-16">
        <div className="container">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-neo-yellow rounded-xl flex items-center justify-center">
              <Shield size={24} className="text-neo-black" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black">Privacy Policy</h1>
          </div>
          <p className="text-white/60">Last updated: January 2025</p>
          
          {/* Quick Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {highlights.map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
                <div className="text-neo-yellow">{item.icon}</div>
                <p className="text-sm text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            
            <div className="bg-neo-light-gray p-6 rounded-xl mb-8 border-l-4 border-neo-yellow">
              <p className="text-neo-black font-medium m-0">
                At BoxPox, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our services.
              </p>
            </div>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <Database size={24} className="text-neo-yellow" />
              1. Information We Collect
            </h2>
            
            <h3 className="text-xl font-bold text-neo-black mt-6 mb-3">Personal Information</h3>
            <p className="text-neo-black/70 leading-relaxed">
              We collect information you provide directly to us when you:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li><strong>Create an account:</strong> Name, email address, password</li>
              <li><strong>Make a purchase:</strong> Billing address, shipping address, payment information</li>
              <li><strong>Contact us:</strong> Email, phone number, message content</li>
              <li><strong>Subscribe to newsletter:</strong> Email address, preferences</li>
              <li><strong>Use BoxPrint:</strong> 3D model files you upload</li>
            </ul>

            <h3 className="text-xl font-bold text-neo-black mt-6 mb-3">Automatically Collected Information</h3>
            <p className="text-neo-black/70 leading-relaxed">
              When you access our Services, we automatically collect:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
              <li><strong>Log Information:</strong> IP address, access times, pages viewed</li>
              <li><strong>Location Data:</strong> Approximate location based on IP address</li>
              <li><strong>Cookies:</strong> Session data, preferences, analytics</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <Eye size={24} className="text-neo-yellow" />
              2. How We Use Your Information
            </h2>
            <p className="text-neo-black/70 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Personalize your experience</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
              <li>Analyze website traffic and usage patterns</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <Share2 size={24} className="text-neo-yellow" />
              3. Information Sharing
            </h2>
            <p className="text-neo-black/70 leading-relaxed">
              <strong>We do not sell your personal information.</strong> We may share your information with:
            </p>
            
            <div className="bg-white border-2 border-neo-black rounded-xl overflow-hidden mt-4">
              <div className="p-4 border-b border-neo-black/10">
                <h4 className="font-bold text-neo-black">Service Providers</h4>
                <p className="text-sm text-neo-black/60">Payment processors, shipping partners, cloud hosting providers</p>
              </div>
              <div className="p-4 border-b border-neo-black/10">
                <h4 className="font-bold text-neo-black">Analytics Partners</h4>
                <p className="text-sm text-neo-black/60">To help us understand how our Services are used</p>
              </div>
              <div className="p-4 border-b border-neo-black/10">
                <h4 className="font-bold text-neo-black">Legal Requirements</h4>
                <p className="text-sm text-neo-black/60">When required by law or to protect our rights</p>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-neo-black">Business Transfers</h4>
                <p className="text-sm text-neo-black/60">In connection with a merger, acquisition, or sale of assets</p>
              </div>
            </div>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <Lock size={24} className="text-neo-yellow" />
              4. Data Security
            </h2>
            <p className="text-neo-black/70 leading-relaxed">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>SSL/TLS encryption for data in transit</li>
              <li>Encrypted storage for sensitive data</li>
              <li>Regular security audits and assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure payment processing through certified providers</li>
            </ul>
            <p className="text-neo-black/70 leading-relaxed mt-4">
              While we strive to protect your information, no method of transmission over the Internet 
              is 100% secure. We cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <Bell size={24} className="text-neo-yellow" />
              5. Your Rights and Choices
            </h2>
            <p className="text-neo-black/70 leading-relaxed">
              You have the following rights regarding your personal information:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-neo-light-gray p-4 rounded-xl">
                <h4 className="font-bold text-neo-black mb-2">Access</h4>
                <p className="text-sm text-neo-black/60">Request a copy of your personal data</p>
              </div>
              <div className="bg-neo-light-gray p-4 rounded-xl">
                <h4 className="font-bold text-neo-black mb-2">Correction</h4>
                <p className="text-sm text-neo-black/60">Update or correct inaccurate information</p>
              </div>
              <div className="bg-neo-light-gray p-4 rounded-xl">
                <h4 className="font-bold text-neo-black mb-2">Deletion</h4>
                <p className="text-sm text-neo-black/60">Request deletion of your account and data</p>
              </div>
              <div className="bg-neo-light-gray p-4 rounded-xl">
                <h4 className="font-bold text-neo-black mb-2">Opt-out</h4>
                <p className="text-sm text-neo-black/60">Unsubscribe from marketing communications</p>
              </div>
            </div>

            <p className="text-neo-black/70 leading-relaxed mt-4">
              To exercise these rights, contact us at privacy@boxpox.com or through your account settings.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">6. Cookies and Tracking</h2>
            <p className="text-neo-black/70 leading-relaxed">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand usage patterns</li>
              <li><strong>Marketing Cookies:</strong> Used for personalized advertising (with consent)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
            </ul>
            <p className="text-neo-black/70 leading-relaxed mt-4">
              You can manage cookie preferences through your browser settings. Note that disabling 
              cookies may affect website functionality.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">7. Third-Party Links</h2>
            <p className="text-neo-black/70 leading-relaxed">
              Our Services may contain links to third-party websites. We are not responsible for 
              the privacy practices of these sites. We encourage you to review their privacy 
              policies before providing any personal information.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-neo-black/70 leading-relaxed">
              Our Services are not intended for individuals under 18 years of age. We do not 
              knowingly collect personal information from children. If we become aware that we 
              have collected information from a child, we will take steps to delete it promptly.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">9. Data Retention</h2>
            <p className="text-neo-black/70 leading-relaxed">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>Provide our Services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce our agreements</li>
            </ul>
            <p className="text-neo-black/70 leading-relaxed mt-4">
              When you delete your account, we will delete or anonymize your personal information 
              within 30 days, except where retention is required by law.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">10. International Data Transfers</h2>
            <p className="text-neo-black/70 leading-relaxed">
              Your information may be transferred to and processed in countries other than your 
              own. We ensure appropriate safeguards are in place to protect your information 
              in accordance with applicable data protection laws.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">11. Changes to This Policy</h2>
            <p className="text-neo-black/70 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any 
              material changes by posting the new policy on this page and updating the 
              &quot;Last updated&quot; date. Your continued use of our Services after changes 
              indicates acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <Mail size={24} className="text-neo-yellow" />
              12. Contact Us
            </h2>
            <p className="text-neo-black/70 leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-neo-light-gray p-6 rounded-xl mt-4">
              <p className="text-neo-black font-bold mb-2">BoxPox Privacy Team</p>
              <p className="text-neo-black/70">Email: privacy@boxpox.com</p>
              <p className="text-neo-black/70">Address: India</p>
            </div>

            {/* Navigation Links */}
            <div className="mt-12 pt-8 border-t border-neo-black/10">
              <h3 className="font-bold text-neo-black mb-4">Related Policies</h3>
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/terms"
                  className="px-4 py-2 bg-neo-light-gray rounded-lg text-neo-black font-medium hover:bg-neo-yellow transition-colors"
                >
                  Terms of Service
                </Link>
                <Link 
                  href="/refund"
                  className="px-4 py-2 bg-neo-light-gray rounded-lg text-neo-black font-medium hover:bg-neo-yellow transition-colors"
                >
                  Refund Policy
                </Link>
                <Link 
                  href="/shipping"
                  className="px-4 py-2 bg-neo-light-gray rounded-lg text-neo-black font-medium hover:bg-neo-yellow transition-colors"
                >
                  Shipping Policy
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
