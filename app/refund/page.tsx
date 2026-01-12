export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-neo-black pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-black mb-12 uppercase italic text-white">Refund & Cancellation</h1>
        
        <div className="grid gap-12">
          <section className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-neo-yellow"></div>
            <h2 className="text-2xl font-bold mb-6 text-white">CANCELLATION TERMS</h2>
            <div className="space-y-4 text-white/60">
              <p>
                Cancellations will only be considered if the request is made within <span className="text-neo-yellow font-bold">7 days</span> of placing the order.
              </p>
              <p className="text-sm bg-white/5 p-4 border border-white/10 rounded-xl">
                Note: Requests may not be entertained if orders have been initiated for shipping or are out for delivery. Perishable items are not eligible for cancellation unless quality issues are established.
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-white/10 bg-white/5 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4 text-white">DAMAGED ITEMS</h3>
              <p className="text-sm text-white/60">
                Report damaged or defective items to our customer service within <span className="text-neo-yellow font-bold">7 days</span> of receipt. Requests are subject to merchant verification.
              </p>
            </div>
            <div className="border-2 border-white/10 bg-white/5 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4 text-white">REFUND TIMELINE</h3>
              <p className="text-sm text-white/60">
                Once approved, refunds are processed within <span className="text-neo-yellow font-bold">5 days</span> to the original payment method.
              </p>
            </div>
          </section>

          <section className="bg-neo-gray border border-white/10 text-white p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">RETURN POLICY</h2>
            <p className="mb-6 text-white/60">
              We offer refund/exchange within the first <span className="text-neo-yellow font-bold">7 days</span> from the date of purchase.
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="text-neo-yellow">✓</span> <span className="text-white/80">Item must be unused and in original condition.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neo-yellow">✓</span> <span className="text-white/80">Original packaging must be intact.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neo-yellow">✓</span> <span className="text-white/80">Sale items may be exempted from returns.</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
