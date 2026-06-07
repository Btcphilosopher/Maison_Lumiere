import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash2, ShoppingBag, Truck, Gift, Lock, CreditCard, CheckCircle2 } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

const SAMPLE_OPTIONS = [
  { id: "s-eclat", name: "Éclat de Nuit", label: "Échantillon 2ml - Fruité Sombre" },
  { id: "s-or", name: "Or Solaire", label: "Échantillon 2ml - Solaire Ambré" },
  { id: "s-mai", name: "Eau de Mai", label: "Échantillon 2ml - Rose Fraîche" },
  { id: "s-velours", name: "Voile de Velours", label: "Échantillon 2ml - Iris Cuiré" }
];

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "loading" | "success">("idle");

  const subtotal = cartItems.reduce((sum, item) => sum + item.perfume.price * item.quantity, 0);
  const threshold = 80; // Free shipping threshold in EUR
  const isFreeShipping = subtotal >= threshold;
  const deliveryFee = subtotal > 0 && !isFreeShipping ? 9.50 : 0;
  const discountTotal = subtotal * promoDiscount;
  const total = subtotal - discountTotal + deliveryFee;

  const handleSampleToggle = (sampleId: string) => {
    if (selectedSamples.includes(sampleId)) {
      setSelectedSamples(selectedSamples.filter(s => s !== sampleId));
    } else {
      if (selectedSamples.length < 2) {
        setSelectedSamples([...selectedSamples, sampleId]);
      }
    }
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "LUMIERE10") {
      setPromoDiscount(0.10); // 10% discount
      setIsPromoApplied(true);
    } else {
      alert("Code promotionnel non valide. Essayez 'LUMIERE10' pour 10% de réduction.");
    }
  };

  const triggerCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutStatus("loading");
    setTimeout(() => {
      setCheckoutStatus("success");
    }, 2500);
  };

  const handleSuccessClose = () => {
    setCheckoutStatus("idle");
    setSelectedSamples([]);
    setPromoCode("");
    setPromoDiscount(0);
    setIsPromoApplied(false);
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden text-[#F5F5F0] font-sans">
          {/* Backdrop wrapper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            id="cart-backdrop"
          />

          {/* Drawer Wrapper */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-[#0F0F0F] shadow-2xl flex flex-col justify-between border-l border-white/10"
              id="cart-drawer-container"
            >
              {checkoutStatus === "success" ? (
                /* Success screen */
                <div className="p-8 h-full flex flex-col items-center justify-center text-center space-y-6" id="checkout-success-panel">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-emerald-500 animate-bounce" />
                  </motion.div>
                  <h3 className="font-serif text-3xl font-light text-[#F5F5F0]">Commande Confirmée</h3>
                  <p className="font-serif italic text-white/50 text-sm max-w-xs">
                    "Que votre sillage illumine votre chemin..."
                  </p>
                  <div className="bg-[#1A1A1A] border border-white/10 p-5 rounded-xs w-full text-left space-y-3 shadow-xs">
                    <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Résumé de la commande</p>
                    <div className="text-xs space-y-2 text-[#F5F5F0]/80">
                      <div className="flex justify-between">
                        <span>Articles :</span>
                        <span className="font-semibold">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} pièces</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Échantillons offerts :</span>
                        <span className="font-medium italic">
                          {selectedSamples.length > 0 
                            ? selectedSamples.map(id => SAMPLE_OPTIONS.find(s => s.id === id)?.name).join(", ") 
                            : "Aucun sélectionné"}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-white/5 pt-2 text-sm text-[#F5F5F0] font-bold">
                        <span>Total Payé :</span>
                        <span>{total.toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed max-w-sm">
                    Un email de confirmation contenant votre numéro d'envoi de colis vous a été transmis. Votre colis de prestige contenant vos rituels parfumés sera expédié sous 24 heures.
                  </p>
                  <button
                    onClick={handleSuccessClose}
                    className="w-full py-3.5 bg-[#F5F5F0] text-[#0F0F0F] font-sans text-xs font-semibold tracking-widest hover:bg-white transition-colors rounded-none"
                    id="success-continue-shopping-btn"
                  >
                    CONTINUER MES DÉCOUVERTES
                  </button>
                </div>
              ) : checkoutStatus === "loading" ? (
                /* Loading screen */
                <div className="p-8 h-full flex flex-col items-center justify-center text-center space-y-4" id="checkout-loading-panel">
                  <div className="relative w-16 h-16 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                  <p className="font-serif text-lg text-[#F5F5F0] mt-4">Sécurisation de la transaction...</p>
                  <p className="font-sans text-[11px] text-white/40 tracking-widest uppercase">Maison Lumière de Paris</p>
                </div>
              ) : (
                /* Normal cart panel */
                <>
                  {/* Header */}
                  <div className="p-6 border-b border-white/10 bg-[#1A1A1A] flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <ShoppingBag className="w-5 h-5 text-[#F5F5F0]" />
                      <h3 className="font-serif text-xl tracking-wide text-[#F5F5F0]">Votre Panier</h3>
                      <span className="font-sans text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/85 font-medium">
                        {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 -mr-2 text-white/45 hover:text-white transition-colors"
                      aria-label="Fermer le panier"
                      id="close-cart-btn"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Free shipping bar indicator */}
                  {cartItems.length > 0 && (
                    <div className="px-6 py-3 bg-[#1A1A1A] border-b border-white/10 text-xs">
                      <div className="flex justify-between items-center mb-1.5 font-medium text-[#F5F5F0]/80">
                        <div className="flex items-center space-x-1">
                          <Truck className="w-3.5 h-3.5 text-white/60 shrink-0" />
                          <span>{isFreeShipping ? "Félicitations ! Livraison offerte." : `Livraison gratuite dès 80,00 €`}</span>
                        </div>
                        {!isFreeShipping && (
                          <span className="font-semibold text-[#F5F5F0] font-sans">
                            plus que {(threshold - subtotal).toFixed(2)} €
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-[#F5F5F0] h-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (subtotal / threshold) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Body Scroller */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12" id="empty-cart-state">
                        <ShoppingBag className="w-12 h-12 text-white/20 stroke-1" />
                        <h4 className="font-serif text-lg text-white/80">Votre panier est vide</h4>
                        <p className="text-xs text-white/40 leading-relaxed max-w-xs">
                          Laissez-vous envoûter par nos rituels olfactifs et découvrez la haute parfumerie française d'exception.
                        </p>
                        <button
                          onClick={onClose}
                          className="px-6 py-3 border border-[#F5F5F0] text-[#F5F5F0] font-sans text-xs tracking-widest hover:bg-[#F5F5F0] hover:text-[#0F0F0F] transition-all rounded-none"
                          id="empty-cart-discover-btn"
                        >
                          DÉCOUVRIR LES CRÉATIONS
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Cart items list */}
                        <div className="space-y-4" id="cart-items-list">
                          {cartItems.map((item, index) => (
                            <motion.div
                              key={`${item.perfume.id}-${item.selectedSize}`}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-start space-x-4 pb-4 border-b border-white/10"
                            >
                              <div className="w-20 h-20 bg-black/30 p-1 flex items-center justify-center shrink-0 border border-white/10">
                                <img
                                  src={item.perfume.image}
                                  alt={item.perfume.name}
                                  referrerPolicy="no-referrer"
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                              <div className="flex-1 select-none">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-serif text-sm font-semibold text-[#F5F5F0] leading-tight">
                                      {item.perfume.name}
                                    </h5>
                                    <p className="font-sans text-[10px] text-white/40 tracking-wider">
                                      {item.selectedSize}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => onRemoveItem(index)}
                                    className="p-1 text-white/40 hover:text-red-500 transition-colors"
                                    aria-label="Supprimer"
                                    id={`remove-item-${index}`}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                  {/* Qty controller */}
                                  <div className="flex items-center border border-white/10 bg-white/5">
                                    <button
                                      onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                                      className="px-2 py-1 text-white/50 hover:text-white disabled:opacity-50"
                                      disabled={item.quantity <= 1}
                                      id={`qty-dec-${index}`}
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="px-2 text-xs font-semibold text-[#F5F5F0]">{item.quantity}</span>
                                    <button
                                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                                      className="px-2 py-1 text-white/50 hover:text-white"
                                      id={`qty-inc-${index}`}
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <span className="font-serif text-sm text-[#F5F5F0] font-light">
                                    {(item.perfume.price * item.quantity).toFixed(2)} €
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Complimentary Samples Selection */}
                        <div className="bg-[#1A1A1A] p-4 border border-white/10 rounded-xs select-none">
                          <div className="flex items-center space-x-1.5 mb-2">
                            <Gift className="w-4 h-4 text-white/70" />
                            <h6 className="font-serif text-xs font-semibold tracking-wider text-[#F5F5F0]">
                              2 ÉCHANTILLONS OFFERTS ({selectedSamples.length}/2)
                            </h6>
                          </div>
                          <p className="text-[10px] text-white/40 leading-relaxed mb-3">
                            Sélectionnez jusqu'à deux miniatures que nous glisserons avec plaisir dans votre boîte d'exception.
                          </p>
                          <div className="grid grid-cols-1 gap-2">
                            {SAMPLE_OPTIONS.map((sample) => {
                              const isChecked = selectedSamples.includes(sample.id);
                              const isDisabled = !isChecked && selectedSamples.length >= 2;
                              return (
                                <button
                                  key={sample.id}
                                  onClick={() => handleSampleToggle(sample.id)}
                                  disabled={isDisabled}
                                  className={`flex items-start text-left p-2 border transition-all text-xs rounded-none ${
                                    isChecked
                                      ? "border-[#F5F5F0] bg-white/10"
                                      : isDisabled
                                      ? "border-white/5 opacity-30 cursor-not-allowed"
                                      : "border-white/10 hover:border-white/30 bg-transparent text-white/70"
                                  }`}
                                  id={`sample-${sample.id}`}
                                >
                                  <div className="flex items-center h-4 mr-2 pt-0.5">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => {}} // toggled on button click
                                      disabled={isDisabled}
                                      className="rounded-none accent-white w-3 h-3 cursor-pointer"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-sans font-medium text-[11px] text-[#F5F5F0]">{sample.name}</p>
                                    <p className="text-[10px] text-white/40">{sample.label}</p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Promo application Form */}
                        <form onSubmit={applyPromo} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Code privilège (ex: LUMIERE10)"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={isPromoApplied}
                            className="flex-1 border border-white/10 bg-white/5 placeholder-white/30 text-xs px-3 py-2.5 rounded-none focus:outline-none focus:border-white/40 uppercase font-sans tracking-wide text-white"
                            id="promo-input"
                          />
                          <button
                            type="submit"
                            disabled={isPromoApplied || !promoCode.trim()}
                            className="bg-white/10 text-white disabled:opacity-40 px-4 py-2 text-xs font-semibold hover:bg-white/20 font-sans tracking-wider transition-colors shrink-0 rounded-none border border-white/10"
                            id="apply-promo-btn"
                          >
                            {isPromoApplied ? "APPLIQUÉ" : "ACTIVER"}
                          </button>
                        </form>
                      </>
                    )}
                  </div>

                  {/* Checkout calculations */}
                  {cartItems.length > 0 && (
                    <div className="p-6 bg-[#1A1A1A] border-t border-white/10 space-y-4">
                      <div className="space-y-2 text-xs text-[#F5F5F0]/70">
                        <div className="flex justify-between">
                          <span>Sous-total</span>
                          <span className="font-medium text-[#F5F5F0]">{subtotal.toFixed(2)} €</span>
                        </div>
                        {isPromoApplied && (
                          <div className="flex justify-between text-rose-400 font-medium">
                            <span>Code Privilege (10%)</span>
                            <span>-{discountTotal.toFixed(2)} €</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Service de livraison</span>
                          <span className="font-medium text-[#F5F5F0]">
                            {deliveryFee === 0 ? "Offert" : `${deliveryFee.toFixed(2)} €`}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-white/10 pt-3 text-sm text-[#F5F5F0] font-bold">
                          <span>Montant Total</span>
                          <span>{total.toFixed(2)} €</span>
                        </div>
                      </div>

                      <button
                        onClick={triggerCheckout}
                        className="w-full py-4 bg-[#F5F5F0] text-[#0F0F0F] hover:bg-white font-sans text-xs font-bold tracking-[0.2em] transition-colors rounded-none flex items-center justify-center space-x-2.5"
                        id="checkout-payment-btn"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>PROCÉDER AU RÈGLEMENT CONFIDENTIEL</span>
                      </button>

                      <div className="flex justify-center items-center space-x-1.5 text-[10px] text-white/40 font-sans">
                        <CreditCard className="w-3 h-3" />
                        <span>Paiement 100% sécurisé via SSL d'Artéfact</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
