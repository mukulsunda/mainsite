export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-neo-black pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-neo-gray border border-white/10 p-10 rounded-2xl">
          <h1 className="text-4xl font-bold mb-8 uppercase text-white">Shipping Policy</h1>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center border-b border-white/10 pb-8">
              <div className="bg-neo-yellow text-neo-black p-6 rounded-full w-32 h-32 flex flex-col items-center justify-center shrink-0">
                <span className="text-3xl font-bold">02</span>
                <span className="text-[10px] font-mono uppercase">Days</span>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2 text-white">DISPATCH TIMELINE</h2>
                <p className="text-white/60 text-sm">
                  Orders are shipped within <span className="font-bold text-neo-yellow">2 days</span> from the date of the order and/or payment confirmation, subject to courier company norms.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold uppercase text-sm tracking-widest text-white">Courier Partners</h3>
                <p className="text-sm text-white/60">
                  Orders are shipped through registered domestic courier companies and/or speed post only.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold uppercase text-sm tracking-widest text-white">Delivery Address</h3>
                <p className="text-sm text-white/60">
                  Delivery will be made to the address provided by the buyer at the time of purchase. Confirmation will be sent to your registered email ID.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 text-white p-6 rounded-xl">
              <h3 className="font-bold mb-2">Liability Disclaimer</h3>
              <p className="text-xs text-white/40 leading-relaxed">
                Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority. Shipping costs levied by the seller or Platform Owner are non-refundable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
