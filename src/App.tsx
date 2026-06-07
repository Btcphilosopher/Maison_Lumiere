import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  User, 
  ShoppingBag, 
  ChevronDown, 
  ArrowRight, 
  Star, 
  Menu, 
  X, 
  Leaf, 
  Cpu, 
  Truck, 
  Gift, 
  Mail, 
  Heart,
  Eye,
  Instagram,
  Facebook,
  ShieldAlert,
  Info
} from "lucide-react";

import { Perfume, CollectionItem, CartItem } from "./types";
import { PERFUMES, COLLECTIONS } from "./data";
import ProductQuickView from "./components/ProductQuickView";
import CartDrawer from "./components/CartDrawer";
import SearchOverlay from "./components/SearchOverlay";
import HeritageTimeline from "./components/HeritageTimeline";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Newsletter subscription
  const [emailInput, setEmailInput] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Quick feedback toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Legal Modal
  const [activeLegalModal, setActiveLegalModal] = useState<string | null>(null);

  // Filtered perfumes based on user selection
  const filteredPerfumes = selectedCollection 
    ? PERFUMES.filter(p => p.collectionId === selectedCollection)
    : PERFUMES;

  // Header click helper (scrolling or triggering drawer)
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Cart operations
  const handleAddToCart = (perfume: Perfume, size: string, quantity: number) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) => item.perfume.id === perfume.id && item.selectedSize === size
      );

      if (existingIdx > -1) {
        const nextItems = [...prevItems];
        nextItems[existingIdx].quantity += quantity;
        showToast(`Quantité mise à jour pour ${perfume.name} (${size}) dans votre panier`);
        return nextItems;
      } else {
        showToast(`${perfume.name} (${size}) ajouté à votre panier`);
        return [...prevItems, { perfume, quantity, selectedSize: size }];
      }
    });
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = quantity;
      return copy;
    });
  };

  const removeCartItem = (index: number) => {
    const term = cartItems[index].perfume.name;
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
    showToast(`${term} a été retiré de votre panier`);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSubscribed(true);
      setEmailInput("");
      showToast("Bienvenue ! Vous faites désormais partie du Cercle de Lumière.");
    }
  };

  // Count total units in cart for header counter
  const totalCartUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F0] font-sans selection:bg-white/20 selection:text-white overflow-x-hidden antialiased">
      
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-55 px-6 py-3 bg-[#1A1A1A] text-[#F5F5F0] text-xs font-sans font-semibold tracking-widest text-center shadow-2xl border border-white/10 rounded-none max-w-sm w-full select-none"
            id="global-toast"
          >
            {toastMessage.toUpperCase()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-black text-[10px] tracking-[0.25em] text-[#F5F5F0] font-sans font-medium px-4 md:px-8 py-3 flex items-center justify-between border-b border-white/5 overflow-hidden select-none">
        <div className="flex-1 text-center md:text-left">
          <span>LIVRAISON OFFERTE EN FRANCE DÈS 80€ D'ACHAT</span>
        </div>
        
        {/* Right sub-menu in top header bar */}
        <div className="hidden md:flex items-center space-x-6 text-[9.5px]">
          <div className="flex items-center space-x-1 cursor-not-allowed hover:text-white transition-colors text-white/60">
            <span>FR</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
          <button 
            onClick={() => scrollToSection("la-maison-heritage")}
            className="hover:text-white tracking-widest uppercase transition-colors text-white/60"
          >
            BOUTIQUES
          </button>
          
          <div className="h-3 w-[1px] bg-white/10" />
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => showToast("Espace client confidentiel bientôt disponible")} 
              className="hover:text-white transition-colors text-white/60"
              aria-label="Espace Client"
              id="top-bar-user-icon"
            >
              <User className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-white transition-colors flex items-center space-x-1 text-white/60"
              aria-label="Panier d'achat"
              id="top-bar-cart-icon"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-2 bg-[#F5F5F0] text-[#0F0F0F] text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#0F0F0F] font-sans leading-none scale-90">
                {totalCartUnits}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. LOGO & NAVIGATION HEADER */}
      <header className="sticky top-0 bg-[#0F0F0F]/90 backdrop-blur-md border-b border-white/10 z-40 px-4 md:px-8 py-5 select-none transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Mobile triggers & indicators */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-[#F5F5F0]/80 hover:text-white p-1"
              aria-label="Ouvrir le menu"
              id="mobile-menu-burger"
            >
              <Menu className="w-5.5 h-5.5" />
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-[#F5F5F0]/80 hover:text-white p-1"
              aria-label="Lancer la recherche"
              id="mobile-search-btn"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Left menu (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] font-sans font-semibold tracking-[0.2em] text-white/70">
            <button 
              onClick={() => {
                setSelectedCollection(null);
                scrollToSection("collection-nos-univers");
              }} 
              className="hover:text-white relative py-1 group transition-colors"
            >
              <span>PARFUMS</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5F5F0] group-hover:w-full transition-all duration-300" />
            </button>
            <button 
              onClick={() => {
                setSelectedCollection(null);
                scrollToSection("collection-nos-univers");
              }} 
              className="hover:text-white relative py-1 group transition-colors"
            >
              <span>COLLECTIONS</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5F5F0] group-hover:w-full transition-all duration-300" />
            </button>
            <button 
              onClick={() => scrollToSection("la-maison-heritage")} 
              className="hover:text-white relative py-1 group transition-colors"
            >
              <span>LA MAISON</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5F5F0] group-hover:w-full transition-all duration-300" />
            </button>
            <button 
              onClick={() => setIsTimelineOpen(true)} 
              className="hover:text-white relative py-1 group transition-colors"
            >
              <span>SAVOIR-FAIRE</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5F5F0] group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          {/* Luxury Logo Centered */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="focus:outline-none bg-transparent block">
              <span className="font-sans text-[9px] tracking-[0.5em] text-white/40 uppercase block mb-1 font-semibold leading-none">MAISON</span>
              <h1 className="font-serif text-2xl md:text-3.5xl tracking-[0.18em] text-[#F5F5F0] font-medium leading-none whitespace-nowrap" id="logo-branding-heading">
                LUMIÈRE
              </h1>
              <span className="font-sans text-[8px] tracking-[0.6em] text-white/30 uppercase block mt-[5px] font-bold leading-none">PARIS</span>
            </button>
          </div>

          {/* Right menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-8 text-[11px] font-sans font-semibold tracking-[0.2em] text-white/70">
            <button 
              onClick={() => showToast("Le Journal de Parfumerie sera disponible très prochainement.")} 
              className="hover:text-white relative py-1 group transition-colors"
            >
              <span>JOURNAL</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5F5F0] group-hover:w-full transition-all duration-300" />
            </button>
            <button 
              onClick={() => {
                setSelectedCollection("les-coffrets");
                scrollToSection("collection-nos-univers");
              }} 
              className="hover:text-white relative py-1 group transition-colors"
            >
              <span>CADEAUX</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5F5F0] group-hover:w-full transition-all duration-300" />
            </button>
            
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-white flex items-center space-x-1.5 transition-colors focus:outline-none"
              id="desktop-search-trigger"
            >
              <span>RECHERCHER</span>
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right indicators */}
          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#F5F5F0]/80 hover:text-white"
              aria-label="Ouvrir panier"
              id="mobile-cart-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-[#F5F5F0] text-[#0F0F0F] text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#0F0F0F] leading-none">
                {totalCartUnits}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute inset-y-0 left-0 w-full max-w-xs bg-[#0F0F0F] border-r border-white/10 shadow-2xl p-6 flex flex-col justify-between"
              id="mobile-menu-drawer"
            >
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                  <span className="font-serif tracking-widest text-white/40 text-[10px] uppercase font-semibold">MAISON LUMIÈRE</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-1">
                    <X className="w-5 h-5 text-white/80" />
                  </button>
                </div>

                <div className="flex flex-col space-y-5 pt-8 text-sm font-semibold text-white/80 tracking-[0.2em] uppercase">
                  <button onClick={() => { setSelectedCollection(null); scrollToSection("collection-nos-univers"); }} className="text-left py-1 hover:text-[#F5F5F0] transition-colors">
                    PARFUMS
                  </button>
                  <button onClick={() => { setSelectedCollection(null); scrollToSection("collection-nos-univers"); }} className="text-left py-1 hover:text-[#F5F5F0] transition-colors">
                    COLLECTIONS
                  </button>
                  <button onClick={() => scrollToSection("la-maison-heritage")} className="text-left py-1 hover:text-[#F5F5F0] transition-colors">
                    LA MAISON
                  </button>
                  <button onClick={() => setIsTimelineOpen(true)} className="text-left py-1 hover:text-[#F5F5F0] transition-colors">
                    SAVOIR-FAIRE
                  </button>
                  <button onClick={() => showToast("Le Journal de Parfumerie sera disponible bientôt.")} className="text-left py-1 hover:text-[#F5F5F0] transition-colors">
                    JOURNAL
                  </button>
                  <button onClick={() => { setSelectedCollection("les-coffrets"); scrollToSection("collection-nos-univers"); }} className="text-left py-1 hover:text-[#F5F5F0] transition-colors">
                    CADEAUX
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4 text-xs font-medium text-white/50">
                <button onClick={() => setIsTimelineOpen(true)} className="text-left block w-full hover:text-white">NOTRE HISTOIRE DEPUIS 1924</button>
                <button onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }} className="text-left block w-full hover:text-white">ACCÉDER AUX PANIER ({totalCartUnits})</button>
                <div className="text-[10px] text-white/30 tracking-wider">MAISON LUMIÈRE PARIS • FR</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* 3. IMMERSIVE HERO SECTION */}
      <section className="relative h-[80vh] md:h-[90vh] bg-black/40 overflow-hidden flex items-center justify-center pt-10">
        
        {/* Background Image with optimized loading referrerPolicy */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_perfume_1780834900418.png"
            alt="Maison Lumière Éclat de Nuit Eau de Parfum"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-102 filter brightness-[0.55] select-none"
            id="hero-background-image"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-[#0F0F0F]/45 to-transparent md:to-[#0F0F0F]/15 pointer-events-none" />
        </div>

        {/* Content Box Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col items-start text-white select-none">
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-2xl space-y-4 md:space-y-6"
            id="hero-intro-text-box"
          >
            <span className="font-sans text-[10px] md:text-xs tracking-[0.35em] text-white/80 font-semibold uppercase block leading-none">
              HAUTE PARFUMERIE EXCLUSIVE
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6.5xl tracking-wide leading-[1.1] font-light">
              L'ART DU PARFUM
              <br />
              <span className="font-normal italic">À LA FRANÇAISE</span>
            </h2>

            <p className="font-serif text-sm md:text-base text-white/80 font-light leading-relaxed max-w-lg italic">
              "Des fragrances d'exception inspirées par la beauté, l'émotion et le savoir-faire précieux français."
            </p>

            {/* Direct Interaction points */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-4 md:pt-6">
              <button
                onClick={() => {
                  setSelectedCollection(null);
                  scrollToSection("collection-nos-univers");
                }}
                className="px-6 py-4 bg-[#F5F5F0] text-[#0F0F0F] font-sans text-xs font-bold tracking-widest hover:bg-white transition-all duration-300 rounded-none shadow-lg shadow-black/10 active:translate-y-0.5"
                id="hero-discover-btn"
              >
                DÉCOUVRIR LA COLLECTION
              </button>
              
              <button
                onClick={() => setIsTimelineOpen(true)}
                className="py-3 px-1 border-b border-white/60 text-white hover:text-white/80 hover:border-white font-sans text-xs font-bold tracking-widest transition-all uppercase"
                id="hero-history-btn"
              >
                NOTRE HISTOIRE
              </button>
            </div>
          </motion.div>

        </div>

        {/* Dynamic scroll down helper */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-1.5 opacity-60">
          <span className="font-sans text-[8px] tracking-[0.25em] text-white uppercase font-bold">DÉFILER</span>
          <div className="w-[1px] h-8 bg-white/70 animate-pulse" />
        </div>

      </section>


      {/* 4. NOS UNIVERS (COLLECTIONS) SECTION */}
      <section className="py-20 px-4 md:px-8 bg-[#0F0F0F] transition-all border-t border-white/5" id="collection-nos-univers">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section titles */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
            <div className="space-y-1 select-none">
              <span className="font-sans text-[10px] tracking-[0.35em] text-white/40 font-bold uppercase block">
                COLLECTIONS
              </span>
              <h3 className="font-serif text-3xl md:text-4.5xl tracking-wide text-[#F5F5F0] uppercase font-light">
                NOS UNIVERS
              </h3>
            </div>

            {/* Selector clear & helper link */}
            <div className="flex items-center space-x-6 pt-4 md:pt-0">
              {selectedCollection && (
                <button
                  onClick={() => setSelectedCollection(null)}
                  className="font-sans text-xs text-white/70 font-semibold tracking-wider hover:text-white transition-colors uppercase cursor-pointer"
                  id="show-all-collections-btn"
                >
                  Tous nos univers
                </button>
              )}
              <button 
                onClick={() => {
                  setSelectedCollection(null);
                  scrollToSection("perfumes-catalog");
                }}
                className="font-sans text-xs text-white/70 font-semibold tracking-wider hover:text-white transition-all uppercase border-b border-white/40 pb-1 cursor-pointer"
              >
                VOIR TOUTES LES COLLECTIONS
              </button>
            </div>
          </div>

          {/* 4-Columns Collections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none" id="collections-four-column-grid">
            {COLLECTIONS.map((col) => {
              const count = PERFUMES.filter(p => p.collectionId === col.id).length;
              const isActive = selectedCollection === col.id;
              
              return (
                <div
                  key={col.id}
                  onClick={() => {
                    setSelectedCollection(col.id === selectedCollection ? null : col.id);
                    setTimeout(() => {
                      scrollToSection("perfumes-catalog");
                    }, 100);
                  }}
                  className={`group bg-[#1A1A1A] border transition-all duration-500 cursor-pointer p-4 overflow-hidden relative flex flex-col justify-between ${
                    isActive
                      ? "border-[#F5F5F0] bg-black/40 shadow-xl"
                      : "border-white/10 bg-transparent hover:border-white/30 hover:bg-[#1A1A1A]/30"
                  }`}
                  id={`collection-card-${col.id}`}
                >
                  {/* Image container 4:3 ratio with elegant hover filters */}
                  <div className="aspect-[4/3] w-full bg-black/30 overflow-hidden mb-5 border border-white/5">
                    <img
                      src={col.image}
                      alt={col.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Text group info */}
                  <div className="space-y-1 bg-transparent pr-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-md tracking-wider font-semibold text-[#F5F5F0] group-hover:text-white transition-colors">
                        {col.name}
                      </h4>
                      <span className="font-sans text-[9px] text-white/60 font-semibold bg-white/10 min-w-5 h-5 flex items-center justify-center rounded-full text-[9px]">
                        {count}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-white/50 leading-normal" id={`subtext-${col.id}`}>
                      {col.subtext}
                    </p>
                  </div>

                  {/* Tiny selector active arrow */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-sans font-bold tracking-widest text-white/40 group-hover:text-[#F5F5F0] transition-colors">
                    <span>EXPLORER</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 5. INTERACTIVE PERFUME SHOPPING DISCOVERY (THE BOUTIQUE) */}
      <section className="py-12 px-4 md:px-8 bg-[#1A1A1A] border-y border-white/10" id="perfumes-catalog">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Dynamic header describing filtered collection */}
          <div className="text-center space-y-3 max-w-xl mx-auto select-none">
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-white/40 font-semibold">
              LA BOUTIQUE EN LIGNE
            </span>
            <h3 className="font-serif text-2xl md:text-3.5xl text-[#F5F5F0] font-normal">
              {selectedCollection 
                ? COLLECTIONS.find(c => c.id === selectedCollection)?.fullName.toUpperCase()
                : "TOUTES LES CRÉATIONS PARFUMÉES"}
            </h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans italic" id="boutique-dynamic-pitch">
              {selectedCollection 
                ? COLLECTIONS.find(c => c.id === selectedCollection)?.description
                : "Explorez nos lignes signatures de Haute Parfumerie, d'élixirs rares et de rituels parfumés fabriqués à la main à Paris et Grasse."}
            </p>
          </div>

          {/* Active filter badge display if applicable */}
          {selectedCollection && (
            <div className="flex justify-center items-center select-none">
              <span className="inline-flex items-center space-x-2 px-3 py-1 bg-[#F5F5F0] text-[#0F0F0F] text-[10px] font-sans font-semibold tracking-widest uppercase">
                <span>Filtre : {COLLECTIONS.find(c => c.id === selectedCollection)?.name}</span>
                <button 
                  onClick={() => setSelectedCollection(null)} 
                  className="hover:text-red-600 p-0.5 focus:outline-none"
                  id="clear-filter-badge-btn"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}

          {/* Perfume items catalog scroller cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="perfume-product-grid">
            {filteredPerfumes.map((perfume) => (
              <motion.div
                layout
                key={perfume.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group bg-[#0F0F0F] p-5 border border-white/10 hover:border-white/30 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                id={`perfume-card-${perfume.id}`}
              >
                {/* Visual image box */}
                <div 
                  onClick={() => { setSelectedPerfume(perfume); setIsQuickViewOpen(true); }}
                  className="aspect-[4/5] bg-[#1A1A1A] border border-white/5 rounded-none overflow-hidden relative p-4 flex items-center justify-center cursor-pointer select-none group-hover:scale-102 transition-transform duration-500"
                >
                  <span className="absolute top-3 left-3 bg-[#0F0F0F] text-[8.5px] font-sans tracking-widest text-white/60 uppercase px-2 py-0.5 font-bold border border-white/10">
                    {perfume.collectionName}
                  </span>
                  
                  <img
                    src={perfume.image}
                    referrerPolicy="no-referrer"
                    className="max-h-[220px] object-contain group-hover:scale-105 duration-700 transition-transform drop-shadow-md select-none"
                  />

                  {/* Overlays action hover drawer */}
                  <div className="absolute inset-0 bg-black/4 z-10 transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPerfume(perfume);
                        setIsQuickViewOpen(true);
                      }}
                      className="px-4 py-2.5 bg-[#F5F5F0] text-[#0F0F0F] font-sans text-[10px] font-semibold tracking-widest hover:bg-white transition-all shadow-md flex items-center space-x-1.5 rounded-none cursor-pointer"
                      id={`quickview-hover-btn-${perfume.id}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>APERCU RAPIDE</span>
                    </button>
                  </div>
                </div>

                {/* Information details block */}
                <div className="pt-4 space-y-2 select-none">
                  {/* Reviews & rating mock */}
                  <div className="flex items-center space-x-1 text-xs">
                    <div className="flex text-amber-400">
                      <Star className="w-3 h-3 fill-amber-450" />
                    </div>
                    <span className="font-sans text-[10px] text-white/70 font-semibold">{perfume.rating || "4.8"}</span>
                    <span className="font-sans text-[10px] text-[#F5F5F0]/30">•</span>
                    <span className="font-sans text-[10px] text-white/40 capitalize">{perfume.character.split(",")[0]}</span>
                  </div>

                  <div 
                    onClick={() => { setSelectedPerfume(perfume); setIsQuickViewOpen(true); }}
                    className="cursor-pointer"
                  >
                    <h4 className="font-serif text-lg font-bold text-[#F5F5F0] group-hover:text-white transition-colors">
                      {perfume.name}
                    </h4>
                    <p className="text-[11px] text-white/50 font-serif italic line-clamp-1">
                      {perfume.tagline}
                    </p>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-white/10 mt-2">
                    <span className="text-[10px] font-sans tracking-wide text-white/40 font-semibold lowercase">
                      à partir de
                    </span>
                    <span className="font-serif text-md tracking-wide text-[#F5F5F0] font-semibold">
                      {perfume.price} €
                    </span>
                  </div>
                </div>

                {/* Add to basket button directly on card */}
                <div className="pt-4">
                  <button
                    onClick={() => handleAddToCart(perfume, perfume.sizes[0], 1)}
                    className="w-full py-2.5 bg-[#F5F5F0] text-[#0F0F0F] hover:bg-white font-sans text-[10px] font-bold tracking-[0.18em] transition-colors rounded-none flex items-center justify-center space-x-1.5 focus:outline-none focus:ring-1 focus:ring-white/20"
                    id={`add-to-cart-direct-${perfume.id}`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>AJOUTER</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* 6. LA MAISON (BRAND HERITAGE) SECTION */}
      <section className="bg-[#0F0F0F] py-16 px-4 md:px-8 border-b border-white/10" id="la-maison-heritage">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text details editorial */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8 pr-0 lg:pr-6">
            <div className="space-y-2 select-none">
              <span className="font-sans text-[11px] tracking-[0.3em] text-white/40 font-bold uppercase block">
                LA MAISON
              </span>
              <h3 className="font-serif text-3.5xl md:text-5xl text-[#F5F5F0] font-normal leading-tight">
                UN HÉRITAGE
                <br />
                <span className="italic font-light">DEPUIS 1924</span>
              </h3>
            </div>

            <p className="font-serif text-sm text-white/70 leading-relaxed max-w-md select-none">
              Maison Lumière est une parfumerie française indépendante fondée à Paris. Chaque parfum est une story, chaque flacon un objet d'art sculpté par le feu et le génie.
            </p>

            <p className="text-xs text-white/50 leading-relaxed font-sans max-w-sm select-none">
              Nos créations olfactives puisent leur force dans l'utilisation exclusive d'absolus naturels d'exception sourcés à prix juste, célébrant un savoir-faire centenaire inchangé.
            </p>

            <div className="pt-4 select-none">
              <button
                onClick={() => setIsTimelineOpen(true)}
                className="py-2.5 px-1 border-b-2 border-white/60 text-[#F5F5F0] hover:text-white hover:border-white font-sans text-xs font-bold tracking-widest uppercase transition-colors"
                id="discover-story-btn-main"
              >
                DÉCOUVRIR NOTRE HISTOIRE
              </button>
            </div>
          </div>

          {/* Right visual block with simulated on-wall plaque logo */}
          <div className="lg:col-span-7 relative group select-none">
            
            {/* Main Haussman Paris building image */}
            <div className="overflow-hidden border border-white/10 shadow-2xl max-h-[480px]">
              <img
                src="/src/assets/images/paris_heritage_1780834976481.png"
                alt="Château de la Maison Lumière rue Saint-Honoré Paris"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000"
                id="heritage-main-img"
              />
            </div>

            {/* Simulated gold brass plaque hanging on building stone wall */}
            <div 
              className="absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-gradient-to-br from-[#1A1A1A] via-[#0D0D0D] to-black text-[#F5F5F0] p-5 shadow-2xl border border-white/10 max-w-[210px] select-none backdrop-blur-xs transition-transform duration-500 group-hover:translate-y-[-5px]"
              id="paris-storeline-plaque"
            >
              <div className="text-center space-y-1.5">
                <span className="font-sans text-[8.5px] tracking-[0.4em] text-white/40 uppercase block font-semibold leading-none">MAISON</span>
                <h4 className="font-serif text-lg tracking-[0.16em] font-medium leading-none text-white">
                  LUMIÈRE
                </h4>
                <span className="font-sans text-[7.5px] tracking-[0.55em] text-white/30 block font-bold leading-none">PARIS</span>
                
                <div className="h-[1px] bg-white/10 my-2.5 w-10 mx-auto" />
                
                <p className="text-[9.5px] font-sans tracking-wide text-white/85 uppercase font-semibold">
                  SALON D'ART
                </p>
                <p className="text-[8.5px] font-serif italic text-white/60">
                  Ouvert tous les jours
                  <br />
                  Rue Saint-Honoré
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 7. VALUE PROPOSITIONS RAIL */}
      <section className="bg-[#1A1A1A] py-12 px-4 md:px-8 border-b border-white/10 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-white/5">
          
          {/* Prop 1 */}
          <div className="flex items-start space-x-4 pt-6 sm:pt-0 lg:px-4">
            <div className="p-2.5 bg-[#0F0F0F] rounded-none border border-white/10 shrink-0 animate-pulse-slow">
              <Leaf className="w-5 h-5 text-white/80" />
            </div>
            <div className="space-y-0.5">
              <h5 className="font-sans text-xs font-bold tracking-widest text-[#F5F5F0] uppercase">
                INGRÉDIENTS D'EXCEPTION
              </h5>
              <p className="text-[11px] text-white/50 font-sans font-medium">
                Sourcés avec exigence et traçabilité absolue.
              </p>
            </div>
          </div>

          {/* Prop 2 */}
          <div className="flex items-start space-x-4 pt-6 sm:pt-0 lg:px-6">
            <div className="p-2.5 bg-[#0F0F0F] rounded-none border border-white/10 shrink-0">
              <Cpu className="w-5 h-5 text-white/80" />
            </div>
            <div className="space-y-0.5">
              <h5 className="font-sans text-xs font-bold tracking-widest text-[#F5F5F0] uppercase">
                FABRICATION FRANÇAISE
              </h5>
              <p className="text-[11px] text-white/50 font-sans font-medium">
                Un savoir-faire artisanal de haute parfumerie.
              </p>
            </div>
          </div>

          {/* Prop 3 */}
          <div className="flex items-start space-x-4 pt-6 sm:pt-0 lg:px-6">
            <div className="p-2.5 bg-[#0F0F0F] rounded-none border border-white/10 shrink-0">
              <Truck className="w-5 h-5 text-white/80" />
            </div>
            <div className="space-y-0.5">
              <h5 className="font-sans text-xs font-bold tracking-widest text-[#F5F5F0] uppercase">
                LIVRAISON OFFERTE
              </h5>
              <p className="text-[11px] text-white/50 font-sans font-medium">
                Dès 80€ d'achat confidentiel en France.
              </p>
            </div>
          </div>

          {/* Prop 4 */}
          <div className="flex items-start space-x-4 pt-6 sm:pt-0 lg:px-6">
            <div className="p-2.5 bg-[#0F0F0F] rounded-none border border-white/10 shrink-0">
              <Gift className="w-5 h-5 text-white/80" />
            </div>
            <div className="space-y-0.5">
              <h5 className="font-sans text-xs font-bold tracking-widest text-[#F5F5F0] uppercase">
                ÉCHANTILLONS OFFERTS
              </h5>
              <p className="text-[11px] text-white/50 font-sans font-medium">
                Deux rituels offerts pour chaque commande.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* 8. BRAND FOOTER (NEWSLETTER & SOCIALS) */}
      <footer className="bg-black/90 text-[#F5F5F0] pt-16 pb-12 px-4 md:px-8 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start pb-12 border-b border-white/5">
          
          {/* Col 1: Logo and brief address / info */}
          <div className="md:col-span-4 space-y-6 select-none">
            <div>
              <span className="font-sans text-[9px] tracking-[0.45em] text-white/40 block mb-1">MAISON</span>
              <h3 className="font-serif text-2xl tracking-[0.16em] text-[#F5F5F0]">LUMIÈRE</h3>
              <span className="font-sans text-[8px] tracking-[0.55em] text-white/30 block">PARIS</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed max-w-sm">
              Inspirée des plus belles nuances de lumière de Paris depuis 1924, la Maison perpétue avec passion l'art de la haute parfumerie créative.
            </p>
            <div className="text-[11px] text-white/40 font-medium">
              Rue Saint-Honoré, Paris Ier — France
            </div>
          </div>

          {/* Col 2: Newsletter form */}
          <div className="md:col-span-5 space-y-4">
            <h5 className="font-sans text-xs tracking-widest uppercase font-semibold text-white/70">
              RECEVOIR NOS CONFIDENCES
            </h5>
            
            {newsletterSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-neutral-900 border border-white/10 p-4 space-y-2 select-none"
                id="newsletter-success"
              >
                <div className="flex items-center space-x-2 text-white text-xs font-semibold">
                  <Star className="w-4 h-4 fill-white" />
                  <span>INSCRIPTION CONFIRMÉE</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Merci de nous avoir confié votre adresse. Nous avons le privilège de vous accueillir au **Cercle de Lumière** de la Haute Parfumerie.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <p className="text-xs text-white/50 leading-relaxed select-none">
                  Inscrivez-vous pour recevoir nos parutions littéraires exclusives, lancements de rituels et invitations à nos salons d'exception.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    required
                    type="email"
                    placeholder="Votre email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 bg-black/40 border border-white/10 placeholder-white/20 text-xs px-3 py-3 rounded-none focus:outline-none focus:border-white/30 text-white font-sans max-w-md w-full"
                    id="footer-email-input"
                  />
                  <button
                    type="submit"
                    className="bg-[#F5F5F0] text-[#0F0F0F] hover:bg-white px-6 py-3 text-xs font-bold font-sans tracking-widest transition-colors rounded-none shrink-0"
                    id="footer-subscribe-submit"
                  >
                    S'INSCRIRE
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Col 3: Social & Support lines */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-sans text-xs tracking-widest uppercase font-semibold text-white/70">
              SUIVEZ-NOUS
            </h5>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => showToast("Visitez notre carnet d'inspiration Instagram")} 
                className="p-2.5 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 select-none transition-all cursor-pointer rounded-none"
                aria-label="Instagram"
                id="instagram-icon-btn"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button 
                onClick={() => showToast("Rejoignez notre salon Facebook")} 
                className="p-2.5 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 select-none transition-all cursor-pointer rounded-none"
                aria-label="Facebook"
                id="facebook-icon-btn"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button 
                onClick={() => showToast("Explorez nos rituels créatifs sur Pinterest & TikTok")} 
                className="p-2.5 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 select-none transition-all cursor-pointer rounded-none text-xs font-bold"
                id="interest-icon-btn"
              >
                P 
              </button>
              <button 
                onClick={() => showToast("Suivez nos créations éphémères sur TikTok")} 
                className="p-2.5 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 select-none transition-all cursor-pointer rounded-none text-xs font-bold"
                id="tiktok-icon-btn"
              >
                T
              </button>
            </div>
            
            <p className="text-[11px] text-white/40 leading-normal select-none pt-2">
              Service Relations Clients :
              <br />
              <span className="text-white/80">contacts@maisonlumiere.paris</span>
            </p>
          </div>

        </div>

        {/* 9. COPYRIGHT & LEGAL RIBBON */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/30 select-none font-medium gap-4">
          <div>
            <span>© MAISON LUMIÈRE PARIS 2026/2024 • TOUS DROITS RÉSERVÉS</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button 
              onClick={() => setActiveLegalModal("mentions")} 
              className="hover:text-white text-white/50 transition-colors uppercase"
              id="legal-btn-mentions"
            >
              MENTIONS LÉGALES
            </button>
            <button 
              onClick={() => setActiveLegalModal("confidentialite")} 
              className="hover:text-white text-white/50 transition-colors uppercase"
              id="legal-btn-confidentialite"
            >
              CONFIDENTIALITÉ
            </button>
            <button 
              onClick={() => setActiveLegalModal("cgv")} 
              className="hover:text-white text-white/50 transition-colors uppercase"
              id="legal-btn-cgv"
            >
              CGV
            </button>
            <button 
              onClick={() => setActiveLegalModal("contact")} 
              className="hover:text-white text-white/50 transition-colors uppercase"
              id="legal-btn-contact"
            >
              CONTACT
            </button>
          </div>
        </div>
      </footer>


      {/* MODALS AND EXPANSION DRAWERS */}

      {/* Product Quick View Modal */}
      <ProductQuickView
        perfume={selectedPerfume}
        isOpen={isQuickViewOpen}
        onClose={() => { setSelectedPerfume(null); setIsQuickViewOpen(false); }}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Side Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeCartItem}
        onClearCart={clearCart}
      />

      {/* Full-Screen Search System */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPerfume={(p) => {
          setSelectedPerfume(p);
          setIsQuickViewOpen(true);
        }}
      />

      {/* Heritage Stories Slide-Over Drawer */}
      <HeritageTimeline
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
      />

      {/* Legal and Support modal */}
      <AnimatePresence>
        {activeLegalModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLegalModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-md w-full bg-[#1A1A1A] p-6 text-[#F5F5F0] shadow-2xl border border-white/10"
              id="legal-modal-card"
            >
              <button
                onClick={() => setActiveLegalModal(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white bg-white/5 border border-white/5 rounded-none p-1"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#F5F5F0] border-b border-white/10 pb-2">
                  <Info className="w-5 h-5 text-white/70" />
                  <h4 className="font-serif text-lg font-bold uppercase tracking-wider">
                    {activeLegalModal === "mentions" && "Mentions Légales"}
                    {activeLegalModal === "confidentialite" && "Confidentialité"}
                    {activeLegalModal === "cgv" && "Conditions Générales"}
                    {activeLegalModal === "contact" && "Nous Contacter"}
                  </h4>
                </div>

                <div className="text-xs text-white/75 leading-relaxed max-h-[300px] overflow-y-auto space-y-3">
                  {activeLegalModal === "mentions" && (
                    <>
                      <p className="font-bold">ÉDITEUR DU SITE</p>
                      <p>Maison Lumière de Paris SAS au capital de 1 000 000 €.</p>
                      <p>Siège social: Rue Saint-Honoré, 75001 Paris - France.</p>
                      <p>Directrice de la publication: Louise Lumière.</p>
                      <p className="font-bold">HÉBERGEMENT</p>
                      <p>Ce site de démonstration esthétique et fonctionnelle est hébergé de manière sécurisée par les serveurs d'Artéfact (Cloud Run Ingress API).</p>
                    </>
                  )}

                  {activeLegalModal === "confidentialite" && (
                    <>
                      <p>Maison Lumière s'engage à préserver la stricte confidentialité de vos données personnelles.</p>
                      <p>Les informations collectées lors de votre inscription au **Cercle de Lumière** ou lors du règlement de vos commandes sont exclusivement destinées à nos services internes et ne seront jamais cédées à des tiers.</p>
                      <p>Conformément au RGPD européen, vous disposez d'un droit permanent d'accès, de correction et de suppression de vos données en cliquant sur le lien fourni dans nos correspondances.</p>
                    </>
                  )}

                  {activeLegalModal === "cgv" && (
                    <>
                      <p className="font-bold">LIVRAISONS ET RETOURS</p>
                      <p>La livraison standard est offerte pour toute commande supérieure ou égale à 80,00 €. En deçà, un forfait de préparation et d'expédition de 9,50 € s'applique.</p>
                      <p>Tous nos colis sont préparés de manière confidentielle avec grand soin dans des boîtes d'art Maison Lumière capitonnées.</p>
                      <p>Pour des raisons d'hygiène, les parfums débouchés ne peuvent faire l'objet d'un retour.</p>
                    </>
                  )}

                  {activeLegalModal === "contact" && (
                    <div className="space-y-4 pt-2">
                      <p>Notre service conciergerie est à votre écoute pour vous guider dans vos choix olfactifs ou suivre votre envoi de colis précieux.</p>
                      <div className="p-3 bg-black/40 border border-white/5 space-y-1.5 text-[11px] font-sans">
                        <p>✉ Email: <span className="font-bold text-white">boutique@maisonlumiere.paris</span></p>
                        <p>☎ Téléphone: <span className="font-bold text-white">+33 (0) 1 42 60 00 24</span></p>
                        <p>📍 Atelier: <span className="font-bold text-white">Rue Saint-Honoré, 75001 Paris</span></p>
                      </div>
                      <p>Une réponse soignée et personnalisée vous sera apportée sous quelques heures.</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => setActiveLegalModal(null)}
                    className="w-full py-2 bg-[#F5F5F0] text-[#0F0F0F] hover:bg-white text-xs font-semibold tracking-widest font-sans rounded-none"
                  >
                    COMPRIS
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
