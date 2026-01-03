export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white border-2 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-4xl font-bold mb-8 uppercase">Shipping Policy</h1>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center border-b border-neutral-100 pb-8">
              <div className="bg-yellow-400 text-black p-6 rounded-full w-32 h-32 flex flex-col items-center justify-center shrink-0">
                <span className="text-3xl font-bold">02</span>
                <span className="text-[10px] font-mono uppercase">Days</span>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">DISPATCH TIMELINE</h2>
                <p className="text-neutral-600 text-sm">
                  Orders are shipped within <span className="font-bold text-black">2 days</span> from the date of the order and/or payment confirmation, subject to courier company norms.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold uppercase text-sm tracking-widest">Courier Partners</h3>
                <p className="text-sm text-neutral-600">
                  Orders are shipped through registered domestic courier companies and/or speed post only.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold uppercase text-sm tracking-widest">Delivery Address</h3>
                <p className="text-sm text-neutral-600">
                  Delivery will be made to the address provided by the buyer at the time of purchase. Confirmation will be sent to your registered email ID.
                </p>
              </div>
            </div>

            <div className="bg-neutral-900 text-white p-6 rounded-lg">
              <h3 className="font-bold mb-2">Liability Disclaimer</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority. Shipping costs levied by the seller or Platform Owner are non-refundable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
