import Link from 'next/link';
import { ArrowLeft, Truck, Clock, MapPin, Package, CheckCircle, AlertTriangle, Globe, Calendar, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Shipping Policy | BoxPox',
  description: 'Learn about our shipping methods, delivery times, and shipping costs.',
};

export default function ShippingPolicy() {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '5-7 business days',
      cost: 'Free over ₹999',
      costBelow: '₹99',
      icon: <Package size={24} />,
    },
    {
      name: 'Express Shipping',
      time: '2-3 business days',
      cost: '₹199',
      icon: <Truck size={24} />,
    },
    {
      name: 'Same Day Delivery',
      time: 'Same day (select cities)',
      cost: '₹299',
      icon: <Clock size={24} />,
    },
  ];

  const deliveryZones = [
    { zone: 'Metro Cities', cities: 'Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata', time: '2-4 days' },
    { zone: 'Tier 1 Cities', cities: 'Pune, Ahmedabad, Jaipur, Lucknow, and more', time: '3-5 days' },
    { zone: 'Tier 2 Cities', cities: 'Other major cities', time: '5-7 days' },
    { zone: 'Remote Areas', cities: 'Rural and hard-to-reach areas', time: '7-10 days' },
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
              <Truck size={24} className="text-neo-black" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black">Shipping Policy</h1>
          </div>
          <p className="text-white/60">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            
            {/* Shipping Options Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {shippingOptions.map((option, i) => (
                <div key={i} className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
                  <div className="w-12 h-12 bg-neo-yellow rounded-lg flex items-center justify-center mb-4">
                    {option.icon}
                  </div>
                  <h3 className="font-bold text-neo-black mb-2">{option.name}</h3>
                  <p className="text-neo-black/60 text-sm mb-3">{option.time}</p>
                  <div className="pt-3 border-t border-neo-black/10">
                    <p className="font-bold text-neo-black">{option.cost}</p>
                    {option.costBelow && (
                      <p className="text-xs text-neo-black/50">Below ₹999: {option.costBelow}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-6 rounded-xl mb-8 border-l-4 border-green-500">
              <p className="text-green-800 font-medium m-0 flex items-center gap-2">
                <CheckCircle size={20} />
                Free standard shipping on all orders over ₹999!
              </p>
            </div>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">1. Shipping Coverage</h2>
            <p className="text-neo-black/70 leading-relaxed">
              We currently ship to all states and union territories across India. International 
              shipping is not available at this time but will be coming soon.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <MapPin size={24} className="text-neo-yellow" />
              2. Delivery Zones & Timeframes
            </h2>
            <p className="text-neo-black/70 leading-relaxed mb-4">
              Delivery times vary based on your location. Here are estimated delivery times by zone:
            </p>
            
            <div className="bg-white border-2 border-neo-black rounded-xl overflow-hidden">
              {deliveryZones.map((zone, i) => (
                <div key={i} className={`p-4 ${i !== deliveryZones.length - 1 ? 'border-b border-neo-black/10' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-neo-black">{zone.zone}</h4>
                      <p className="text-sm text-neo-black/60">{zone.cities}</p>
                    </div>
                    <span className="bg-neo-yellow px-3 py-1 rounded-full text-sm font-bold text-neo-black">
                      {zone.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <Calendar size={24} className="text-neo-yellow" />
              3. Order Processing
            </h2>
            <p className="text-neo-black/70 leading-relaxed">
              Orders are processed within 1-2 business days. Processing times do not include 
              weekends or public holidays.
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>Orders placed before 2 PM IST are processed the same day</li>
              <li>Orders placed after 2 PM IST are processed the next business day</li>
              <li>BoxPrint orders may take additional 2-5 days for manufacturing</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">4. BoxPrint Shipping</h2>
            <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-500">
              <p className="text-amber-800 font-medium m-0 flex items-start gap-2">
                <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
                <span>
                  Custom 3D printed items require additional production time of 3-7 business days 
                  before shipping, depending on the complexity and size of your order.
                </span>
              </p>
            </div>
            <p className="text-neo-black/70 leading-relaxed mt-4">
              BoxPrint shipping timeline:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li><strong>Small items (&lt;50g):</strong> 3-4 days production + shipping time</li>
              <li><strong>Medium items (50-200g):</strong> 4-5 days production + shipping time</li>
              <li><strong>Large items (&gt;200g):</strong> 5-7 days production + shipping time</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">5. Shipping Costs</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-neo-light-gray p-4 rounded-xl">
                <h4 className="font-bold text-neo-black mb-2">Standard Shipping</h4>
                <ul className="text-sm text-neo-black/70 space-y-1">
                  <li>• Free for orders ₹999+</li>
                  <li>• ₹99 for orders below ₹999</li>
                  <li>• Additional ₹50 for remote areas</li>
                </ul>
              </div>
              <div className="bg-neo-light-gray p-4 rounded-xl">
                <h4 className="font-bold text-neo-black mb-2">Express Shipping</h4>
                <ul className="text-sm text-neo-black/70 space-y-1">
                  <li>• Flat ₹199 for all orders</li>
                  <li>• Not available for remote areas</li>
                  <li>• Free for orders ₹2999+</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">6. Order Tracking</h2>
            <p className="text-neo-black/70 leading-relaxed">
              Once your order ships, you will receive:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>An email with your tracking number and carrier details</li>
              <li>SMS updates on delivery status (if phone number provided)</li>
              <li>Ability to track your order through your account dashboard</li>
            </ul>
            <p className="text-neo-black/70 leading-relaxed mt-4">
              You can also track your order at any time by logging into your account and 
              viewing your order history.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <Globe size={24} className="text-neo-yellow" />
              7. International Shipping
            </h2>
            <p className="text-neo-black/70 leading-relaxed">
              We currently do not offer international shipping. We are working to expand our 
              shipping coverage and will announce when international shipping becomes available.
            </p>
            <p className="text-neo-black/70 leading-relaxed">
              Sign up for our newsletter to be notified when we start shipping internationally.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">8. Delivery Issues</h2>
            <p className="text-neo-black/70 leading-relaxed">
              If you experience any delivery issues:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li><strong>Package not received:</strong> Contact us within 48 hours of expected delivery</li>
              <li><strong>Damaged package:</strong> Take photos and contact us immediately</li>
              <li><strong>Wrong item:</strong> Contact us within 24 hours with order details</li>
              <li><strong>Missing items:</strong> Check your order confirmation and contact support</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">9. Address Requirements</h2>
            <p className="text-neo-black/70 leading-relaxed">
              To ensure successful delivery, please provide:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>Complete street address with house/apartment number</li>
              <li>Nearby landmark (optional but helpful)</li>
              <li>Correct PIN code</li>
              <li>Active phone number for delivery updates</li>
            </ul>
            <p className="text-neo-black/70 leading-relaxed mt-4">
              We are not responsible for delays or failed deliveries due to incorrect or 
              incomplete address information.
            </p>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">10. Failed Delivery Attempts</h2>
            <p className="text-neo-black/70 leading-relaxed">
              Our delivery partners will make up to 3 delivery attempts. If all attempts fail:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>The package will be returned to our warehouse</li>
              <li>We will contact you to arrange redelivery</li>
              <li>Additional shipping charges may apply for redelivery</li>
              <li>Unclaimed packages after 15 days will be refunded minus shipping costs</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <HelpCircle size={24} className="text-neo-yellow" />
              11. Contact Us
            </h2>
            <p className="text-neo-black/70 leading-relaxed">
              Have questions about shipping? We&apos;re here to help:
            </p>
            <div className="bg-neo-light-gray p-6 rounded-xl mt-4">
              <p className="text-neo-black font-bold mb-2">BoxPox Shipping Support</p>
              <p className="text-neo-black/70">Email: shipping@boxpox.com</p>
              <p className="text-neo-black/70">Response time: Within 24 hours</p>
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
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
