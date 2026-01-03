import Link from 'next/link';
import { ArrowLeft, RefreshCcw, Clock, CheckCircle, XCircle, AlertCircle, Package, CreditCard, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Refund Policy | BoxPox',
  description: 'Learn about our refund and return policies for BoxPox products and services.',
};

export default function RefundPolicy() {
  const returnTimeline = [
    { day: 'Day 1-7', status: 'Full refund available', color: 'green' },
    { day: 'Day 8-15', status: 'Exchange or store credit', color: 'yellow' },
    { day: 'Day 16-30', status: 'Store credit only', color: 'orange' },
    { day: 'After 30 days', status: 'No returns accepted', color: 'red' },
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
              <RefreshCcw size={24} className="text-neo-black" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black">Refund & Return Policy</h1>
          </div>
          <p className="text-white/60">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            
            <div className="bg-green-50 p-6 rounded-xl mb-8 border-l-4 border-green-500">
              <p className="text-green-800 font-medium m-0 flex items-center gap-2">
                <CheckCircle size={20} />
                We offer a 7-day full refund guarantee on all eligible products. Your satisfaction is our priority!
              </p>
            </div>

            {/* Return Timeline Visual */}
            <div className="bg-neo-light-gray p-6 rounded-xl mb-8">
              <h3 className="font-bold text-neo-black mb-4 flex items-center gap-2">
                <Clock size={20} />
                Return Timeline
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {returnTimeline.map((item, i) => (
                  <div key={i} className="text-center">
                    <div className={`w-full h-2 rounded-full mb-3 ${
                      item.color === 'green' ? 'bg-green-500' :
                      item.color === 'yellow' ? 'bg-yellow-500' :
                      item.color === 'orange' ? 'bg-orange-500' : 'bg-red-500'
                    }`} />
                    <p className="font-bold text-neo-black text-sm">{item.day}</p>
                    <p className="text-xs text-neo-black/60">{item.status}</p>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">1. Return Eligibility</h2>
            <p className="text-neo-black/70 leading-relaxed">
              To be eligible for a return, items must meet the following conditions:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white border-2 border-green-500 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-600 font-bold mb-3">
                  <CheckCircle size={20} />
                  Eligible for Return
                </div>
                <ul className="text-sm text-neo-black/70 space-y-2">
                  <li>• Unused and in original condition</li>
                  <li>• In original packaging</li>
                  <li>• All tags and labels attached</li>
                  <li>• Within 30 days of delivery</li>
                  <li>• Accompanied by proof of purchase</li>
                </ul>
              </div>
              <div className="bg-white border-2 border-red-500 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-600 font-bold mb-3">
                  <XCircle size={20} />
                  Not Eligible for Return
                </div>
                <ul className="text-sm text-neo-black/70 space-y-2">
                  <li>• Custom or personalized items</li>
                  <li>• Damaged due to misuse</li>
                  <li>• Items without original packaging</li>
                  <li>• Clearance or final sale items</li>
                  <li>• Items past the return window</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">2. BoxPrint (3D Printing) Returns</h2>
            <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-500">
              <p className="text-amber-800 font-medium m-0 flex items-start gap-2">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <span>
                  Custom 3D printed items through BoxPrint are made-to-order and are <strong>non-refundable</strong> unless 
                  there is a defect in printing or the item doesn&apos;t match the specifications you provided.
                </span>
              </p>
            </div>
            <p className="text-neo-black/70 leading-relaxed mt-4">
              We will offer a replacement or refund for BoxPrint orders only if:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>The print has significant defects (warping, layer separation, incorrect dimensions)</li>
              <li>Wrong material was used</li>
              <li>Color does not match the selected option</li>
              <li>Item was damaged during shipping</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <Package size={24} className="text-neo-yellow" />
              3. How to Initiate a Return
            </h2>
            <p className="text-neo-black/70 leading-relaxed">
              Follow these steps to return an item:
            </p>
            
            <div className="space-y-4 mt-4">
              <div className="flex gap-4 items-start bg-neo-light-gray p-4 rounded-xl">
                <div className="w-8 h-8 bg-neo-black text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-neo-black">Contact Our Support</h4>
                  <p className="text-sm text-neo-black/60">Email returns@boxpox.com with your order number and reason for return</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-neo-light-gray p-4 rounded-xl">
                <div className="w-8 h-8 bg-neo-black text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-neo-black">Receive Return Authorization</h4>
                  <p className="text-sm text-neo-black/60">We&apos;ll send you a Return Merchandise Authorization (RMA) number and instructions</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-neo-light-gray p-4 rounded-xl">
                <div className="w-8 h-8 bg-neo-black text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-neo-black">Pack and Ship</h4>
                  <p className="text-sm text-neo-black/60">Securely pack the item in its original packaging and ship to the provided address</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-neo-light-gray p-4 rounded-xl">
                <div className="w-8 h-8 bg-neo-black text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-neo-black">Receive Refund</h4>
                  <p className="text-sm text-neo-black/60">Once inspected and approved, your refund will be processed within 5-7 business days</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <CreditCard size={24} className="text-neo-yellow" />
              4. Refund Methods
            </h2>
            <p className="text-neo-black/70 leading-relaxed">
              Refunds will be processed to the original payment method:
            </p>
            
            <div className="bg-white border-2 border-neo-black rounded-xl overflow-hidden mt-4">
              <div className="p-4 border-b border-neo-black/10 flex justify-between items-center">
                <span className="font-bold text-neo-black">Credit/Debit Card</span>
                <span className="text-neo-black/60 text-sm">5-7 business days</span>
              </div>
              <div className="p-4 border-b border-neo-black/10 flex justify-between items-center">
                <span className="font-bold text-neo-black">UPI</span>
                <span className="text-neo-black/60 text-sm">2-3 business days</span>
              </div>
              <div className="p-4 border-b border-neo-black/10 flex justify-between items-center">
                <span className="font-bold text-neo-black">Net Banking</span>
                <span className="text-neo-black/60 text-sm">5-7 business days</span>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="font-bold text-neo-black">Store Credit</span>
                <span className="text-neo-black/60 text-sm">Instant</span>
              </div>
            </div>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">5. Return Shipping Costs</h2>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li><strong>Defective/Damaged Items:</strong> We cover all return shipping costs</li>
              <li><strong>Change of Mind:</strong> Customer is responsible for return shipping</li>
              <li><strong>Wrong Item Shipped:</strong> We cover all return shipping costs and provide free replacement shipping</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">6. Exchanges</h2>
            <p className="text-neo-black/70 leading-relaxed">
              We offer exchanges for items of equal or lesser value. For exchanges with a higher-value item, 
              you&apos;ll need to pay the difference. To request an exchange:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>Contact us within 15 days of receiving your order</li>
              <li>Specify the item you&apos;d like to exchange for</li>
              <li>Return the original item in unused condition</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">7. Damaged or Defective Items</h2>
            <p className="text-neo-black/70 leading-relaxed">
              If you receive a damaged or defective item:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li>Contact us within 48 hours of delivery</li>
              <li>Provide photos of the damage/defect</li>
              <li>Keep all original packaging</li>
              <li>We&apos;ll arrange a pickup and send a replacement or full refund</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4">8. Cancellation Policy</h2>
            <p className="text-neo-black/70 leading-relaxed">
              You may cancel your order under the following conditions:
            </p>
            <ul className="list-disc list-inside text-neo-black/70 space-y-2 ml-4">
              <li><strong>Before Processing:</strong> Full refund within 24 hours</li>
              <li><strong>After Processing:</strong> Standard return policy applies once delivered</li>
              <li><strong>BoxPrint Orders:</strong> Can only be cancelled before printing begins</li>
            </ul>

            <h2 className="text-2xl font-black text-neo-black mt-8 mb-4 flex items-center gap-3">
              <HelpCircle size={24} className="text-neo-yellow" />
              9. Contact Us
            </h2>
            <p className="text-neo-black/70 leading-relaxed">
              Have questions about returns or refunds? We&apos;re here to help:
            </p>
            <div className="bg-neo-light-gray p-6 rounded-xl mt-4">
              <p className="text-neo-black font-bold mb-2">BoxPox Returns Team</p>
              <p className="text-neo-black/70">Email: returns@boxpox.com</p>
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
