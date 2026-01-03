import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | BoxPox',
  description: 'Read our terms of service to understand your rights and responsibilities when using BoxPox services.',
};

export default function TermsOfService() {
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
          <h1 className="text-3xl md:text-4xl font-black mb-4">Terms of Service</h1>
          <p className="text-white/60">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            
            <div className="bg-neo-light-gray p-6 rounded-xl mb-8 border-l-4 border-neo-yellow">
              <p className="text-neo-black font-medium m-0">
                By accessing or using BoxPox services, you agree to be bound by these Terms of Service. 
                Please read them carefully before using our platform.
              </p>
            </div>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-neo-black/70 leading-relaxed">
              By accessing or using the BoxPox website, mobile applications, and services (collectively, the &quot;Services&quot;), 
              you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, 
              you may not access or use our Services.
            </p>
            <p className="text-neo-black/70 leading-relaxed">
              These Terms apply to all visitors, users, and others who access or use the Services. 
              We reserve the right to modify these Terms at any time. We will notify you of any changes 
              by posting the new Terms on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">2. Description of Services</h2>
            <p className="text-neo-black/70 leading-relaxed">
              BoxPox provides an e-commerce platform offering innovative products and 3D printing services 
              (&quot;BoxPrint&quot;). Our Services include but are not limited to:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>Online shopping for BoxPox products</li>
              <li>Custom 3D printing services through BoxPrint</li>
              <li>Order tracking and management</li>
              <li>Customer support and assistance</li>
              <li>Newsletter and promotional communications</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">3. Account Registration</h2>
            <p className="text-neo-black/70 leading-relaxed">
              To access certain features of our Services, you may be required to create an account. 
              When creating an account, you agree to:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
            <p className="text-neo-black/70 leading-relaxed mt-4">
              You must be at least 18 years old to create an account. By creating an account, 
              you represent that you are at least 18 years of age.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">4. Products and Pricing</h2>
            <p className="text-neo-black/70 leading-relaxed">
              All product descriptions, images, and specifications are provided for informational purposes. 
              We strive to display accurate product information, but we do not warrant that descriptions, 
              pricing, or other content is accurate, complete, reliable, current, or error-free.
            </p>
            <p className="text-neo-black/70 leading-relaxed">
              Prices are subject to change without notice. We reserve the right to modify or discontinue 
              any product or service without notice. All prices are displayed in Indian Rupees (₹) unless 
              otherwise specified.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">5. Orders and Payment</h2>
            <p className="text-neo-black/70 leading-relaxed">
              By placing an order, you are making an offer to purchase the products or services at the 
              stated price. We reserve the right to accept or decline your order for any reason.
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>All payments must be made in full at the time of order</li>
              <li>We accept major credit cards, debit cards, UPI, and net banking</li>
              <li>Payment information is processed securely through our payment partners</li>
              <li>Orders are not confirmed until payment is successfully processed</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">6. Shipping and Delivery</h2>
            <p className="text-neo-black/70 leading-relaxed">
              We will make reasonable efforts to deliver your order within the estimated timeframe. 
              Delivery times are estimates only and are not guaranteed. We are not responsible for 
              delays caused by shipping carriers, customs, weather, or other circumstances beyond our control.
            </p>
            <p className="text-neo-black/70 leading-relaxed">
              Risk of loss and title for products pass to you upon delivery to the shipping carrier. 
              Please review our Shipping Policy for detailed information about shipping methods, 
              costs, and delivery areas.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">7. Returns and Refunds</h2>
            <p className="text-neo-black/70 leading-relaxed">
              We want you to be completely satisfied with your purchase. If you are not satisfied, 
              you may return eligible products within the specified return period. Please review our 
              <Link href="/refund" className="text-neo-black font-bold hover:text-neo-yellow"> Refund Policy</Link> for 
              complete details on returns, exchanges, and refunds.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">8. BoxPrint (3D Printing Services)</h2>
            <p className="text-neo-black/70 leading-relaxed">
              BoxPrint services are subject to additional terms:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>You must own or have rights to any designs submitted for printing</li>
              <li>We reserve the right to refuse printing orders that violate laws or our policies</li>
              <li>Custom 3D prints are made to order and may not be eligible for returns</li>
              <li>Print quality may vary based on design complexity and material selection</li>
              <li>Estimated print times are approximations and may vary</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">9. Intellectual Property</h2>
            <p className="text-neo-black/70 leading-relaxed">
              All content on our Services, including text, graphics, logos, images, and software, 
              is the property of BoxPox or our content suppliers and is protected by intellectual 
              property laws. You may not reproduce, distribute, modify, or create derivative works 
              without our prior written consent.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">10. User Conduct</h2>
            <p className="text-neo-black/70 leading-relaxed">
              You agree not to use our Services to:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>Violate any applicable law or regulation</li>
              <li>Infringe upon the rights of others</li>
              <li>Submit false or misleading information</li>
              <li>Upload malicious code or attempt to hack our systems</li>
              <li>Engage in fraudulent activities</li>
              <li>Harass, abuse, or harm others</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">11. Limitation of Liability</h2>
            <p className="text-neo-black/70 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, BOXPOX SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO 
              LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF OUR SERVICES.
            </p>
            <p className="text-neo-black/70 leading-relaxed">
              In no event shall our total liability exceed the amount paid by you for the product or 
              service that gave rise to the claim.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">12. Indemnification</h2>
            <p className="text-neo-black/70 leading-relaxed">
              You agree to indemnify and hold harmless BoxPox, its officers, directors, employees, 
              and agents from any claims, damages, losses, or expenses (including reasonable attorney 
              fees) arising from your use of our Services or violation of these Terms.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">13. Governing Law</h2>
            <p className="text-neo-black/70 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India, 
              without regard to conflict of law principles. Any disputes arising from these Terms 
              shall be subject to the exclusive jurisdiction of the courts in [City], India.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">14. Contact Information</h2>
            <p className="text-neo-black/70 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-neo-light-gray p-6 rounded-xl mt-4">
              <p className="text-neo-black font-bold mb-2">BoxPox</p>
              <p className="text-neo-black/70">Email: legal@boxpox.com</p>
              <p className="text-neo-black/70">Address: India</p>
            </div>

            {/* Navigation Links */}
            <div className="mt-12 pt-8 border-t border-neo-black/10">
              <h3 className="font-bold text-neo-black mb-4">Related Policies</h3>
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/privacy"
                  className="px-4 py-2 bg-neo-light-gray rounded-lg text-neo-black font-medium hover:bg-neo-yellow transition-colors"
                >
                  Privacy Policy
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
