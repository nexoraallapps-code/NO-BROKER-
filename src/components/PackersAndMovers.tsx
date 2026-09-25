import React, { useState } from 'react';
import moversTruck from '../assets/images/movers_relocation_truck_1790309661673.jpg';
import { CITIES } from '../data/mockProperties';
import { 
  Truck, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Sparkles,
  Phone,
  X
} from 'lucide-react';

interface PackersAndMoversProps {
  currentCity: string;
}

export const PackersAndMovers: React.FC<PackersAndMoversProps> = ({ currentCity }) => {
  const [fromCity, setFromCity] = useState(currentCity || 'Mumbai');
  const [toCity, setToCity] = useState('Pune');
  const [movingDate, setMovingDate] = useState('2026-10-15');
  const [homeSize, setHomeSize] = useState('2 BHK');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteBooked, setQuoteBooked] = useState(false);

  // Price estimate algorithm
  const basePrice = homeSize === '1 BHK' ? 6800 : homeSize === '2 BHK' ? 11500 : homeSize === '3 BHK' ? 16800 : 22000;
  const isIntercity = fromCity !== toCity;
  const estimatedPrice = isIntercity ? basePrice * 2.2 : basePrice;

  const handleBookQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteBooked(true);
    setTimeout(() => {
      setShowQuoteModal(false);
      setQuoteBooked(false);
    }, 2500);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#0A0F1D] border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container matching Image 5 & Image 7 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Image & Overlay Info (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src={moversTruck}
                alt="NO BROKER White-glove relocation truck"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/90 text-slate-950 text-[10px] font-bold uppercase tracking-wider mb-2">
                  White Glove Logistics
                </div>
                <div className="text-sm sm:text-base font-bold flex items-center gap-1.5">
                  <span>★ 4.8 / 5.0 (150K+ Moves)</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 font-light leading-relaxed">
                  Dedicated move manager, customized multi-layer furniture padding, and guaranteed damage-free transit across India.
                </p>
              </div>
            </div>

            {/* Right Estimator Form & Trust Features (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-md mb-2">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Official In-House Relocation</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950 dark:text-white">
                  NO BROKER Packers & Movers
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  White-glove relocation service. Dedicated move manager, zero hidden charges, guaranteed damage-free transit.
                </p>
              </div>

              {/* Quick Fare Estimator Box */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Quick Fare Estimator (Zero Advance Booking)
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    100% Price Match
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      From City
                    </label>
                    <select
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      To City
                    </label>
                    <select
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Moving Date
                    </label>
                    <input
                      type="date"
                      value={movingDate}
                      onChange={(e) => setMovingDate(e.target.value)}
                      className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-400">Home Size:</span>
                    {['1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setHomeSize(size)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                          homeSize === size
                            ? 'bg-[#C28E52] text-white'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowQuoteModal(true)}
                    className="py-2 px-4 rounded-lg bg-[#0F5132] hover:bg-[#146c43] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Get Instant Free Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 text-right">
                  Lock best rate today • Free cancellation anytime
                </div>
              </div>

              {/* 3 Pillars of Trust */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Price Match</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Lowest quote or difference refunded instantly.
                  </p>
                </div>

                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5 text-[#C28E52]" />
                    <span>Free Rescheduling</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Change shifting slot anytime at zero extra charge.
                  </p>
                </div>

                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Transit Insurance</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Complete coverage up to ₹10 Lakhs on all items.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Quote Breakdown & Booking Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#C28E52]">
                  Instant Fare Estimate
                </span>
                <h4 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                  Shifting Quote: {fromCity} → {toCity}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowQuoteModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {quoteBooked ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h5 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  Relocation Slot Reserved!
                </h5>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  Your dedicated Move Manager will contact you on WhatsApp to do a digital video survey and finalize packing boxes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookQuote} className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-700 dark:text-slate-300">Estimated Total Fare:</span>
                    <span className="text-xl font-serif text-[#C28E52]">₹{estimatedPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Includes: Multi-layer bubble wrap, cartons, loading, transit & unloading at destination.
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-600">
                    Pay ₹0 right now. Pay only after shifting is completed.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Rahul Saxena"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+91 98110 33412"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0F5132] hover:bg-[#146c43] text-white font-bold text-xs sm:text-sm rounded-lg shadow-md transition-colors"
                >
                  Book Slot (Zero Advance Booking)
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
