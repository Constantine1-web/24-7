'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOrders } from '@/context/OrderContext';
import Footer from '@/components/Footer';
import { OrderStatus } from '@/types';
import { CheckCircle2, Clock, MapPin, Phone, Bike, ChefHat, PackageCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const { getOrderById } = useOrders();

  const orderId = params?.id as string;
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-brand-parchment flex flex-col justify-between">
        <div className="max-w-md mx-auto text-center py-24 px-4">
          <AlertCircle size={48} className="text-brand-orange mx-auto mb-3" />
          <h2 className="font-display text-3xl uppercase text-brand-darkGreen">ORDER NOT FOUND</h2>
          <p className="text-xs text-gray-600 mt-2">No active order matching ID '{orderId}'.</p>
          <button
            onClick={() => router.push('/menu')}
            className="mt-6 bg-brand-orange text-white px-8 py-3 rounded-full font-bold uppercase text-xs shadow-orange-glow"
          >
            RETURN TO MENU
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const stages: { status: OrderStatus; label: string; desc: string; icon: any }[] = [
    {
      status: 'received',
      label: 'ORDER RECEIVED',
      desc: 'Order confirmed & sent to 24/7 kitchen.',
      icon: CheckCircle2,
    },
    {
      status: 'preparing',
      label: 'KITCHEN PREPARING',
      desc: 'Chefs are smashing patties & frying plantains.',
      icon: ChefHat,
    },
    {
      status: 'ready',
      label: 'READY FOR DISPATCH',
      desc: 'Food packaged in insulated thermal bag.',
      icon: PackageCheck,
    },
    {
      status: 'out_for_delivery',
      label: 'OUT FOR DELIVERY',
      desc: 'Rider is en route to your location in Uyo.',
      icon: Bike,
    },
    {
      status: 'delivered',
      label: 'DELIVERED & ENJOY',
      desc: 'Order handed over successfully. Enjoy your meal!',
      icon: CheckCircle2,
    },
  ];

  const statusOrder: OrderStatus[] = ['received', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
  const currentStageIndex = statusOrder.indexOf(order.orderStatus);

  return (
    <div className="min-h-screen flex flex-col bg-brand-parchment text-brand-darkGreen">
      {/* Header Banner */}
      <div className="bg-brand-green text-brand-parchment py-10 px-4 sm:px-6 lg:px-8 border-b border-brand-lightGreen/30">
        <div className="max-w-4xl mx-auto text-center relative">
          <button
            onClick={() => router.push('/')}
            className="absolute left-0 top-0 hidden sm:flex items-center space-x-1 text-brand-yellow text-xs font-bold uppercase hover:underline"
          >
            <ArrowLeft size={16} />
            <span>HOME</span>
          </button>

          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-yellow bg-brand-yellow/20 px-3 py-1 rounded-full">
            LIVE DISPATCH TRACKER
          </span>
          <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
            TRACK ORDER #{order.id}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Real-time status updates directly from 24/7 Flavours Kitchen, Uyo.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full space-y-8">
        
        {/* Estimated ETA Banner */}
        <div className="bg-brand-orange text-white p-6 rounded-3xl shadow-orange-glow flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-white/90">
              ESTIMATED DELIVERY TIME
            </span>
            <div className="font-display text-3xl sm:text-4xl text-white">
              {order.orderStatus === 'delivered' ? 'DELIVERED!' : order.estimatedDeliveryTime}
            </div>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl font-bold text-xs uppercase">
            <Clock size={16} />
            <span>
              STATUS: {order.orderStatus.replace(/_/g, ' ').toUpperCase()}
            </span>
          </div>
        </div>

        {/* Live Timeline Status Board */}
        <div className="bg-brand-creamCard p-6 sm:p-8 rounded-3xl border border-brand-parchmentDark shadow-brand space-y-8">
          <h3 className="font-display text-2xl uppercase tracking-tight text-brand-darkGreen text-center sm:text-left">
            PREPARATION &amp; DELIVERY TIMELINE
          </h3>

          <div className="relative space-y-8 before:absolute before:inset-0 before:left-6 sm:before:left-7 before:w-0.5 before:bg-gray-300 before:z-0">
            {stages.map((stage, idx) => {
              const isPassed = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const Icon = stage.icon;

              return (
                <div key={stage.status} className="relative z-10 flex items-start space-x-4">
                  
                  {/* Status Node Circle Icon */}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-bold transition-all shadow-md flex-shrink-0 ${
                      isCurrent
                        ? 'bg-brand-orange text-white ring-4 ring-brand-orange/30 scale-110'
                        : isPassed
                        ? 'bg-brand-green text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <Icon size={24} />
                  </div>

                  {/* Stage Details */}
                  <div className="pt-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`font-display text-lg uppercase tracking-tight ${
                          isCurrent
                            ? 'text-brand-orange'
                            : isPassed
                            ? 'text-brand-darkGreen'
                            : 'text-gray-400'
                        }`}
                      >
                        {stage.label}
                      </h4>

                      {isCurrent && (
                        <span className="text-[10px] font-extrabold bg-brand-orange text-white px-2.5 py-0.5 rounded-full uppercase animate-pulse">
                          IN PROGRESS
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">{stage.desc}</p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Order Items & Customer Address Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Items Summary */}
          <div className="bg-brand-creamCard p-6 rounded-3xl border border-brand-parchmentDark shadow-sm space-y-3">
            <h4 className="font-display text-lg uppercase tracking-tight text-brand-darkGreen border-b border-gray-200 pb-2">
              ITEMS ORDERED
            </h4>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-800">
                    {item.quantity}x {item.menuItem.name}
                  </span>
                  <span className="font-extrabold text-brand-orange">
                    ₦{item.totalPrice.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between font-extrabold text-sm text-brand-darkGreen">
              <span>TOTAL PAID</span>
              <span className="text-brand-orange">₦{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Delivery Location & Support */}
          <div className="bg-brand-creamCard p-6 rounded-3xl border border-brand-parchmentDark shadow-sm space-y-4">
            <h4 className="font-display text-lg uppercase tracking-tight text-brand-darkGreen border-b border-gray-200 pb-2">
              DELIVERY LOCATION
            </h4>

            {order.deliveryAddress ? (
              <div className="space-y-1 text-xs text-gray-700">
                <p className="font-bold text-brand-darkGreen">{order.deliveryAddress.fullName}</p>
                <p>{order.deliveryAddress.street}, {order.deliveryAddress.area}</p>
                <p>Uyo, Akwa Ibom State</p>
                <p className="text-gray-500 font-semibold">Phone: {order.deliveryAddress.phone}</p>
              </div>
            ) : (
              <p className="text-xs text-gray-600">Pickup selected at 23 Ikpa Road, Uyo.</p>
            )}

            <div className="pt-3 border-t border-gray-200">
              <a
                href="tel:+2348123456789"
                className="w-full bg-brand-darkGreen text-white py-2.5 rounded-xl text-xs font-extrabold uppercase flex items-center justify-center space-x-2 hover:bg-brand-orange transition-colors shadow-sm"
              >
                <Phone size={14} />
                <span>CALL RESTAURANT / RIDER</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
