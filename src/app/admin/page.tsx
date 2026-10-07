'use client';

import React, { useState } from 'react';
import { useOrders } from '@/context/OrderContext';
import { MENU_ITEMS, PROMO_CODES } from '@/data/menuData';
import { OrderStatus, MenuItem } from '@/types';
import { ChefHat, Bike, CheckCircle2, Clock, PackageCheck, AlertCircle, ShoppingBag, DollarSign, TrendingUp, Tag, ToggleLeft, ToggleRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { orders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'promos'>('orders');
  const [menuItemsState, setMenuItemsState] = useState<MenuItem[]>(MENU_ITEMS);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Business Analytics Calculations
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = orders.filter(
    (o) => o.orderStatus !== 'delivered' && o.orderStatus !== 'cancelled'
  ).length;
  const completedOrdersCount = orders.filter((o) => o.orderStatus === 'delivered').length;

  const toggleStock = (itemId: string) => {
    setMenuItemsState((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, available: !item.available } : item))
    );
  };

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.orderStatus === filterStatus;
  });

  return (
    <div className="min-h-screen bg-brand-darkGreen text-brand-parchment flex flex-col">
      
      {/* Top Admin Header */}
      <header className="bg-black/40 border-b border-brand-lightGreen/40 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-orange text-white font-display text-2xl rounded-xl flex items-center justify-center shadow-md">
              24
            </div>
            <div>
              <h1 className="font-display text-2xl uppercase tracking-tight text-white leading-none">
                RESTAURANT COMMAND CENTER
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-yellow">
                24/7 FLAVOURS • 23 IKPA ROAD, UYO
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 bg-brand-green/80 p-1.5 rounded-2xl border border-brand-lightGreen/40">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase transition-all ${
                activeTab === 'orders'
                  ? 'bg-brand-orange text-white shadow-orange-glow'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              LIVE ORDERS ({activeOrdersCount})
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase transition-all ${
                activeTab === 'menu'
                  ? 'bg-brand-orange text-white shadow-orange-glow'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              MENU &amp; STOCK
            </button>
            <button
              onClick={() => setActiveTab('promos')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase transition-all ${
                activeTab === 'promos'
                  ? 'bg-brand-orange text-white shadow-orange-glow'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              PROMOTIONS
            </button>
          </div>

          <Link
            href="/"
            className="hidden lg:flex items-center space-x-1 text-xs font-bold text-brand-yellow hover:underline"
          >
            <ArrowLeft size={14} />
            <span>VIEW CUSTOMER APP</span>
          </Link>
        </div>
      </header>

      {/* Analytics KPI Stat Bar */}
      <div className="bg-black/20 border-b border-brand-lightGreen/30 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-brand-green/60 p-4 rounded-2xl border border-brand-lightGreen/30 flex items-center space-x-3">
            <div className="p-2.5 bg-brand-orange/20 text-brand-orange rounded-xl">
              <DollarSign size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-300 uppercase">TOTAL SALES TODAY</span>
              <div className="font-display text-2xl text-brand-yellow">₦{totalSales.toLocaleString()}</div>
            </div>
          </div>

          <div className="bg-brand-green/60 p-4 rounded-2xl border border-brand-lightGreen/30 flex items-center space-x-3">
            <div className="p-2.5 bg-brand-yellow/20 text-brand-yellow rounded-xl">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-300 uppercase">ACTIVE ORDERS</span>
              <div className="font-display text-2xl text-white">{activeOrdersCount}</div>
            </div>
          </div>

          <div className="bg-brand-green/60 p-4 rounded-2xl border border-brand-lightGreen/30 flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-300 uppercase">COMPLETED ORDERS</span>
              <div className="font-display text-2xl text-emerald-400">{completedOrdersCount}</div>
            </div>
          </div>

          <div className="bg-brand-green/60 p-4 rounded-2xl border border-brand-lightGreen/30 flex items-center space-x-3">
            <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
              <TrendingUp size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-300 uppercase">TOP SELLER</span>
              <div className="font-display text-sm text-white truncate">Smash Burger</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Admin Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        
        {/* ORDERS MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Filter Pills */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-display text-2xl uppercase tracking-tight text-white">
                LIVE ORDER KANBAN BOARD
              </h2>

              <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                {['all', 'received', 'preparing', 'ready', 'out_for_delivery', 'delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs uppercase transition-colors whitespace-nowrap ${
                      filterStatus === st
                        ? 'bg-brand-orange text-white'
                        : 'bg-brand-green text-gray-300 hover:text-white border border-brand-lightGreen/40'
                    }`}
                  >
                    {st.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-brand-green/90 p-5 rounded-3xl border border-brand-lightGreen/50 shadow-xl space-y-4 flex flex-col justify-between"
                >
                  {/* Order Top Bar */}
                  <div>
                    <div className="flex justify-between items-start border-b border-brand-lightGreen/30 pb-3">
                      <div>
                        <span className="font-display text-xl text-brand-yellow">#{ord.id}</span>
                        <p className="text-[10px] text-gray-300 font-bold">
                          {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      <span
                        className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full ${
                          ord.orderStatus === 'delivered'
                            ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500'
                            : ord.orderStatus === 'out_for_delivery'
                            ? 'bg-blue-900/80 text-blue-300 border border-blue-500'
                            : ord.orderStatus === 'ready'
                            ? 'bg-purple-900/80 text-purple-300 border border-purple-500'
                            : ord.orderStatus === 'preparing'
                            ? 'bg-amber-900/80 text-amber-300 border border-amber-500'
                            : 'bg-brand-orange text-white'
                        }`}
                      >
                        {ord.orderStatus.replace(/_/g, ' ')}
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div className="py-2 space-y-0.5 text-xs text-gray-200">
                      <p className="font-bold text-white">{ord.customerName} ({ord.customerPhone})</p>
                      {ord.deliveryAddress && (
                        <p className="text-[11px] text-gray-300 truncate">
                          📍 {ord.deliveryAddress.street}, {ord.deliveryAddress.area}
                        </p>
                      )}
                    </div>

                    {/* Items List */}
                    <div className="space-y-1.5 pt-2 border-t border-brand-lightGreen/20">
                      {ord.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-xs">
                          <span className="text-gray-200">
                            {item.quantity}x {item.menuItem.name}
                          </span>
                          <span className="font-bold text-brand-yellow">
                            ₦{item.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total & Action Controls */}
                  <div className="pt-3 border-t border-brand-lightGreen/30 space-y-3">
                    <div className="flex justify-between items-center text-sm font-extrabold">
                      <span>TOTAL PAYABLE</span>
                      <span className="text-brand-orange text-lg">₦{ord.total.toLocaleString()}</span>
                    </div>

                    {/* Status Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      {ord.orderStatus === 'received' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'preparing', 'Kitchen accepted order')}
                          className="col-span-2 bg-brand-orange hover:bg-brand-orangeHover text-white py-2.5 rounded-xl font-extrabold text-xs uppercase"
                        >
                          ACCEPT &amp; PREPARE
                        </button>
                      )}

                      {ord.orderStatus === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'ready', 'Food ready in insulated bag')}
                          className="col-span-2 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl font-extrabold text-xs uppercase"
                        >
                          MARK READY FOR DISPATCH
                        </button>
                      )}

                      {ord.orderStatus === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'out_for_delivery', 'Rider assigned & dispatched')}
                          className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-extrabold text-xs uppercase"
                        >
                          DISPATCH RIDER
                        </button>
                      )}

                      {ord.orderStatus === 'out_for_delivery' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'delivered', 'Order delivered successfully')}
                          className="col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-extrabold text-xs uppercase"
                        >
                          MARK DELIVERED
                        </button>
                      )}

                      {ord.orderStatus === 'delivered' && (
                        <div className="col-span-2 text-center text-xs font-bold text-emerald-400 py-1">
                          ✓ ORDER COMPLETED
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* MENU & STOCK MANAGEMENT TAB */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl uppercase tracking-tight text-white">
              MENU &amp; AVAILABILITY CONTROLS
            </h2>

            <div className="bg-brand-green/80 rounded-3xl border border-brand-lightGreen/40 p-6 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-lightGreen/40 text-brand-yellow font-extrabold uppercase">
                    <th className="pb-3">ITEM NAME</th>
                    <th className="pb-3">CATEGORY</th>
                    <th className="pb-3">PRICE</th>
                    <th className="pb-3">PREP TIME</th>
                    <th className="pb-3">AVAILABILITY STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-lightGreen/20">
                  {menuItemsState.map((item) => (
                    <tr key={item.id} className="hover:bg-brand-lightGreen/30">
                      <td className="py-3.5 font-bold text-white">{item.name}</td>
                      <td className="py-3.5 uppercase text-gray-300">{item.category}</td>
                      <td className="py-3.5 font-extrabold text-brand-orange">
                        ₦{item.price.toLocaleString()}
                      </td>
                      <td className="py-3.5 text-gray-300">{item.prepTime}</td>
                      <td className="py-3.5">
                        <button
                          onClick={() => toggleStock(item.id)}
                          className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold ${
                            item.available
                              ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500'
                              : 'bg-red-900/80 text-red-300 border border-red-500'
                          }`}
                        >
                          {item.available ? (
                            <>
                              <ToggleRight size={16} />
                              <span>IN STOCK</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft size={16} />
                              <span>SOLD OUT</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROMOTIONS MANAGEMENT TAB */}
        {activeTab === 'promos' && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl uppercase tracking-tight text-white">
              ACTIVE DISCOUNT PROMO CODES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROMO_CODES.map((promo) => (
                <div
                  key={promo.code}
                  className="bg-brand-green/80 p-6 rounded-3xl border border-brand-lightGreen/40 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl text-brand-yellow">{promo.code}</span>
                    <span className="bg-brand-orange text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">{promo.description}</p>
                  <div className="pt-2 text-xs font-bold text-emerald-400">
                    Min Order: ₦{promo.minOrder.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
