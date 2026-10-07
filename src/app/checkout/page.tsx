'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import Footer from '@/components/Footer';
import { MapPin, Phone, CreditCard, Banknote, Building, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, deliveryFee, discount, total, fulfillmentType, setFulfillmentType, clearCart } = useCart();
  const { createOrder } = useOrders();

  const [fullName, setFullName] = useState('Emem Bassey');
  const [phone, setPhone] = useState('+234 803 123 4567');
  const [street, setStreet] = useState('23 Ikpa Road');
  const [area, setArea] = useState('University District');
  const [landmark, setLandmark] = useState('Opposite Plaza Park');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'cash'>('card');
  const [notes, setNotes] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-brand-parchment flex flex-col justify-between">
        <div className="max-w-md mx-auto text-center py-24 px-4">
          <h2 className="font-display text-3xl uppercase text-brand-darkGreen">YOUR CART IS EMPTY</h2>
          <p className="text-sm text-gray-600 mt-2">Add items to your cart before proceeding to checkout.</p>
          <button
            onClick={() => router.push('/menu')}
            className="mt-6 bg-brand-orange text-white px-8 py-3 rounded-full font-bold uppercase text-sm shadow-orange-glow"
          >
            GO TO MENU
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder = createOrder({
      items: cart,
      subtotal,
      deliveryFee,
      discount,
      total,
      fulfillmentType,
      deliveryAddress:
        fulfillmentType === 'delivery'
          ? {
              fullName,
              phone,
              street,
              area,
              city: 'Uyo',
              landmark,
            }
          : undefined,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'paid',
      customerName: fullName,
      customerPhone: phone,
      estimatedDeliveryTime: fulfillmentType === 'delivery' ? '25-35 mins' : '15 mins',
      notes,
    });

    clearCart();
    router.push(`/order-tracking/${newOrder.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-parchment text-brand-darkGreen">
      {/* Top Banner */}
      <div className="bg-brand-green text-brand-parchment py-8 px-4 sm:px-6 lg:px-8 border-b border-brand-lightGreen/30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-brand-yellow hover:underline text-xs font-bold uppercase"
          >
            <ArrowLeft size={16} />
            <span>BACK TO MENU</span>
          </button>

          <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
            SECURE CHECKOUT
          </h1>

          <div className="flex items-center space-x-1 text-xs text-emerald-400 font-bold">
            <ShieldCheck size={16} />
            <span className="hidden sm:inline">256-BIT ENCRYPTED</span>
          </div>
        </div>
      </div>

      {/* Main Checkout Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Inputs Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Fulfillment Type Toggle */}
            <div className="bg-brand-creamCard p-5 rounded-3xl border border-brand-parchmentDark shadow-sm space-y-3">
              <h3 className="font-display text-lg uppercase tracking-tight text-brand-darkGreen">
                1. FULFILLMENT METHOD
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`p-3.5 rounded-2xl font-extrabold text-xs uppercase flex items-center justify-center space-x-2 border transition-all ${
                    fulfillmentType === 'delivery'
                      ? 'bg-brand-orange text-white border-brand-orange shadow-orange-glow'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <MapPin size={16} />
                  <span>DOOR DELIVERY (UYO)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`p-3.5 rounded-2xl font-extrabold text-xs uppercase flex items-center justify-center space-x-2 border transition-all ${
                    fulfillmentType === 'pickup'
                      ? 'bg-brand-orange text-white border-brand-orange shadow-orange-glow'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Building size={16} />
                  <span>PICKUP AT IKPA RD</span>
                </button>
              </div>
            </div>

            {/* Customer & Address Details */}
            <div className="bg-brand-creamCard p-5 rounded-3xl border border-brand-parchmentDark shadow-sm space-y-4">
              <h3 className="font-display text-lg uppercase tracking-tight text-brand-darkGreen">
                2. CONTACT &amp; DELIVERY INFO
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-extrabold uppercase text-gray-600 block mb-1">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-extrabold uppercase text-gray-600 block mb-1">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              {fulfillmentType === 'delivery' && (
                <>
                  <div>
                    <label className="text-[11px] font-extrabold uppercase text-gray-600 block mb-1">
                      DELIVERY STREET ADDRESS (UYO)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 23 Ikpa Road"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-brand-green"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-extrabold uppercase text-gray-600 block mb-1">
                        AREA / NEIGHBORHOOD
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ewet Housing, Plaza, Shelter Afrique"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-brand-green"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-extrabold uppercase text-gray-600 block mb-1">
                        LANDMARK (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Opposite Park / Near Total Fuel"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-brand-green"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Payment Method Options */}
            <div className="bg-brand-creamCard p-5 rounded-3xl border border-brand-parchmentDark shadow-sm space-y-3">
              <h3 className="font-display text-lg uppercase tracking-tight text-brand-darkGreen">
                3. PAYMENT METHOD
              </h3>

              <div className="space-y-2">
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-brand-green/10 border-brand-green text-brand-darkGreen'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard size={18} className="text-brand-orange" />
                    <span className="text-xs font-bold uppercase">PAYSTACK / DEBIT CARD</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-extrabold">
                    INSTANT CONFIRMATION
                  </span>
                </label>

                <label
                  onClick={() => setPaymentMethod('transfer')}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'transfer'
                      ? 'bg-brand-green/10 border-brand-green text-brand-darkGreen'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Banknote size={18} className="text-brand-orange" />
                    <span className="text-xs font-bold uppercase">BANK TRANSFER</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold">Kuda / GTB / Zenith</span>
                </label>

                <label
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cash'
                      ? 'bg-brand-green/10 border-brand-green text-brand-darkGreen'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Banknote size={18} className="text-brand-orange" />
                    <span className="text-xs font-bold uppercase">PAY ON DELIVERY (CASH/POS)</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5">
            <div className="bg-brand-creamCard p-6 rounded-3xl border border-brand-parchmentDark shadow-brand sticky top-28 space-y-4">
              <h3 className="font-display text-xl uppercase tracking-tight text-brand-darkGreen border-b border-gray-200 pb-3">
                ORDER SUMMARY
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-extrabold text-brand-darkGreen">
                        {item.quantity}x {item.menuItem.name}
                      </span>
                      {item.selectedAddons.length > 0 && (
                        <p className="text-[10px] text-gray-500">
                          + {item.selectedAddons.map((a) => a.name).join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-gray-700">
                      ₦{item.totalPrice.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2 pt-3 border-t border-gray-200 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-bold">
                    {deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>-₦{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-brand-darkGreen pt-3 border-t border-gray-300">
                  <span>TOTAL PAYABLE</span>
                  <span className="font-display text-2xl text-brand-orange">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white py-4 rounded-2xl font-extrabold text-sm uppercase shadow-orange-glow transition-all"
              >
                PLACE ORDER NOW • ₦{total.toLocaleString()}
              </motion.button>

              <p className="text-[10px] text-center text-gray-500">
                By placing order you agree to 24/7 Flavours terms &amp; live dispatch timeline.
              </p>
            </div>
          </div>

        </form>
      </div>

      <Footer />
    </div>
  );
}
