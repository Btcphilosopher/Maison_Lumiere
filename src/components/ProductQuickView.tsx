import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, Minus, Plus, ShoppingBag, Check, Heart, ShieldCheck, HelpCircle } from "lucide-react";
import { Perfume } from "../types";

interface ProductQuickViewProps {
  perfume: Perfume | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (perfume: Perfume, size: string, quantity: number) => void;
}

export default function ProductQuickView({ perfume, isOpen, onClose, onAddToCart }: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isWished, setIsWished] = useState(false);
  const [activeTab, setActiveTab] = useState<"notes" | "story">("notes");

  useEffect(() => {
    if (perfume) {
      setSelectedSize(perfume.sizes[0]);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [perfume]);

  if (!perfume) return null;

  const handleAddToCart = () => {
    onAddToCart(perfume, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            id="quickview-backdrop"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-4xl bg-[#0F0F0F] shadow-2xl rounded-xs overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] text-[#F5F5F0] border border-white/10"
            id="quickview-container"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-white transition-colors bg-black/40 hover:bg-[#1A1A1A] rounded-full border border-white/5"
              aria-label="Fermer"
              id="close-quickview-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left side: Luxury product showcase */}
            <div className="w-full md:w-1/2 bg-[#1A1A1A] p-6 flex flex-col items-center justify-center relative overflow-hidden group min-h-[300px] md:min-h-0 border-r border-white/10">
              <span className="absolute top-4 left-4 font-sans text-[10px] tracking-widest text-white/40 font-medium">
                {perfume.collectionName.toUpperCase()}
              </span>

              {/* Decorative circle soft background glow */}
              <div className="absolute w-64 h-64 bg-stone-300/5 rounded-full blur-3xl pointer-events-none" />

              <motion.img
                initial={{ transform: "scale(0.9)", opacity: 0 }}
                animate={{ transform: "scale(1)", opacity: 1 }}
                transition={{ delay: 0.15 }}
                src={perfume.image}
                alt={perfume.name}
                referrerPolicy="no-referrer"
                className="max-h-[340px] md:max-h-[400px] object-contain drop-shadow-xl select-none group-hover:scale-105 transition-transform duration-700"
                id="quickview-perfume-img"
              />

              <div className="absolute bottom-4 text-center">
                <p className="font-serif italic text-xs text-white/40">
                  {perfume.character}
                </p>
              </div>
            </div>

            {/* Right side: Product Config & details */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Brand label */}
                <div className="flex items-center justify-between mb-1">
                  <span className="font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase font-medium">
                    Maison Lumière Paris
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-sans text-xs font-semibold text-white/80">
                      {perfume.rating || "4.8"}
                    </span>
                  </div>
                </div>

                {/* Primary Title */}
                <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F0] pr-8 tracking-wide leading-tight mb-2" id="quickview-perfume-name">
                  {perfume.name}
                </h2>

                <p className="font-serif italic text-sm text-white/50 mb-4 border-b border-white/10 pb-4">
                  {perfume.tagline}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline space-x-2 my-4">
                  <span className="font-serif text-2xl font-light text-[#F5F5F0]">
                    {perfume.price} €
                  </span>
                  <span className="font-sans text-[10px] text-white/40 tracking-wider">
                    Taxes incluses • Livraison offerte dès 80€
                  </span>
                </div>

                {/* Info Tabs */}
                <div className="flex space-x-6 border-b border-white/10 text-xs font-sans font-medium tracking-wider text-white/40 mb-4">
                  <button
                    onClick={() => setActiveTab("notes")}
                    className={`pb-2 border-b-2 transition-colors duration-200 ${
                      activeTab === "notes"
                        ? "border-[#F5F5F0] text-[#F5F5F0] font-semibold"
                        : "border-transparent hover:text-white"
                    }`}
                    id="tab-notes"
                  >
                    PYRAMIDE OLFACTIVE
                  </button>
                  <button
                    onClick={() => setActiveTab("story")}
                    className={`pb-2 border-b-2 transition-colors duration-200 ${
                      activeTab === "story"
                        ? "border-[#F5F5F0] text-[#F5F5F0] font-semibold"
                        : "border-transparent hover:text-white"
                    }`}
                    id="tab-story"
                  >
                    DÉTAILS DU PARFUM
                  </button>
                </div>

                {/* Tab content */}
                <div className="min-h-[140px] mb-6">
                  {activeTab === "notes" ? (
                    <div className="space-y-4">
                      {/* Pyramid Concept */}
                      <div className="grid grid-cols-1 gap-2 text-white/80 text-xs">
                        <div className="flex items-start bg-white/5 p-2.5 rounded-xs border border-white/10">
                          <span className="w-24 text-[10px] uppercase font-sans tracking-[0.2em] text-white/50 font-medium shrink-0 pt-0.5">
                            ▲ TÊTE
                          </span>
                          <span className="font-sans font-medium">
                            {perfume.topNotes.join(", ")}
                          </span>
                        </div>
                        <div className="flex items-start bg-white/5 p-2.5 rounded-xs border border-white/10">
                          <span className="w-24 text-[10px] uppercase font-sans tracking-[0.2em] text-white/50 font-medium shrink-0 pt-0.5">
                            ♥ COEUR
                          </span>
                          <span className="font-sans font-medium">
                            {perfume.heartNotes.join(", ")}
                          </span>
                        </div>
                        <div className="flex items-start bg-white/5 p-2.5 rounded-xs border border-white/10">
                          <span className="w-24 text-[10px] uppercase font-sans tracking-[0.2em] text-white/50 font-medium shrink-0 pt-0.5">
                            ■ FOND
                          </span>
                          <span className="font-sans font-medium">
                            {perfume.baseNotes.join(", ")}
                          </span>
                        </div>
                      </div>

                      {/* Intensity slider */}
                      <div className="flex items-center space-x-3 pt-1">
                        <span className="font-sans text-[10px] tracking-wider text-white/40 font-semibold">
                          INTENSITÉ :
                        </span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span
                              key={s}
                              className={`w-3.5 h-1.5 rounded-xs ${
                                s <= perfume.intensity
                                  ? "bg-[#F5F5F0]"
                                  : "bg-white/10"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-sans text-[11px] text-white/60 capitalize italic">
                          {perfume.intensity >= 5 ? "Riche & Tenace" : perfume.intensity >= 4 ? "Soutenu" : "Délicat"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="font-sans text-xs text-white/60 leading-relaxed">
                        {perfume.description}
                      </p>
                      <div className="flex items-center space-x-2 pt-2 text-[11px] font-sans text-white/60">
                        <ShieldCheck className="w-4 h-4 shrink-0 text-white/55" />
                        <span>Formulé avec 94% d'ingrédients d'origine naturelle. Flaconnage rechargeable d'art.</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Configurations */}
                <div className="space-y-4">
                  {/* Size selection */}
                  <div>
                    <label className="block text-[11px] font-sans tracking-widest text-[#F5F5F0]/60 font-medium mb-2 uppercase">
                      Choisir la taille
                    </label>
                    <div className="flex gap-2.5">
                      {perfume.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border font-sans text-xs transition-all duration-300 rounded-none shrink-0 ${
                            selectedSize === size
                              ? "border-[#F5F5F0] bg-[#F5F5F0] text-[#0F0F0F] font-semibold"
                              : "border-white/10 bg-white/5 text-white/80 hover:border-white/30"
                          }`}
                          id={`size-btn-${size.replace(/\s+/g, "")}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity and Action cluster */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {/* Quantity selectors */}
                    <div className="flex items-center justify-between border border-white/10 bg-white/5 max-w-[130px] w-full self-start">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2.5 text-white/60 hover:text-white transition-colors"
                        disabled={quantity <= 1}
                        aria-label="Diminuer la quantité"
                        id="qty-minus"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-sans text-sm font-medium text-[#F5F5F0] w-6 text-center select-none" id="qty-display">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2.5 text-white/60 hover:text-white transition-colors"
                        aria-label="Augmenter la quantité"
                        id="qty-plus"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Interactive Wishlist */}
                    <button
                      onClick={() => setIsWished(!isWished)}
                      className={`flex items-center justify-center space-x-2 border py-2.5 px-3 hover:border-white/30 font-sans text-xs transition-colors rounded-none w-full sm:col-span-1 border-white/10 text-white/80 bg-white/5`}
                      id="wishlist-toggle-btn"
                    >
                      <Heart className={`w-4 h-4 ${isWished ? "fill-red-500 text-red-500" : "text-white/50"}`} />
                      <span>{isWished ? "Souhaité" : "Favoris"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Purchase Button */}
              <div className="pt-6 border-t border-white/10 mt-6 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 font-sans text-xs font-semibold tracking-[0.2em] transition-all duration-300 flex items-center justify-center space-x-3 rounded-none ${
                    isAdded
                      ? "bg-emerald-800 text-[#F5F5F0]"
                      : "bg-[#F5F5F0] text-[#0F0F0F] hover:bg-white font-bold tracking-widest uppercase transition-colors"
                  }`}
                  id="add-to-cart-submit"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>AJOUTÉ AU PANIER</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>AJOUTER AU PANIER • {(perfume.price * quantity).toFixed(2)} €</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
