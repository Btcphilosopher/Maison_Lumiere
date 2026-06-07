import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search, Sparkles, SlidersHorizontal, Eye } from "lucide-react";
import { Perfume } from "../types";
import { PERFUMES } from "../data";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const POPULAR_TAGS = ["Jasmin", "Ambre", "Rose", "Cuir", "Santal", "Solaire", "Frais", "Vanille", "Boisé", "Coffret"];

export default function SearchOverlay({ isOpen, onClose, onSelectPerfume }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPerfumes, setFilteredPerfumes] = useState<Perfume[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery.trim() === "" && !selectedFamily) {
      setFilteredPerfumes([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results = PERFUMES.filter((perfume) => {
      // Name, Title, and tagline matches
      const textMatch =
        perfume.name.toLowerCase().includes(query) ||
        perfume.tagline.toLowerCase().includes(query) ||
        perfume.collectionName.toLowerCase().includes(query) ||
        perfume.description.toLowerCase().includes(query);

      // Notes matches
      const notesCombined = [
        ...perfume.topNotes,
        ...perfume.heartNotes,
        ...perfume.baseNotes,
        perfume.character
      ].join(" ").toLowerCase();

      const notesMatch = notesCombined.includes(query);

      // Family/Tag check if selected
      const familyMatch = selectedFamily
        ? perfume.character.toLowerCase().includes(selectedFamily.toLowerCase()) ||
          perfume.name.toLowerCase().includes(selectedFamily.toLowerCase()) ||
          perfume.collectionName.toLowerCase().includes(selectedFamily.toLowerCase()) ||
          notesCombined.includes(selectedFamily.toLowerCase())
        : true;

      return (textMatch || notesMatch) && familyMatch;
    });

    setFilteredPerfumes(results);
  }, [searchQuery, selectedFamily]);

  const handleTagClick = (tag: string) => {
    setSelectedFamily(tag === selectedFamily ? null : tag);
    setSearchQuery("");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFamily(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#0F0F0F] flex flex-col font-sans text-[#F5F5F0]"
          id="search-overlay-fullscreen"
        >
          {/* Header row */}
          <div className="p-6 md:p-8 flex justify-between items-center bg-[#0F0F0F]/90 backdrop-blur-md border-b border-white/10">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/40 font-semibold">
              Rechercher une fragrance
            </span>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full"
              aria-label="Fermer la recherche"
              id="close-search-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-4xl mx-auto w-full space-y-8 md:space-y-12">
            {/* Elegant Search Input */}
            <div className="relative">
              <Search className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 text-white/30 stroke-[1.5]" />
              <input
                autoFocus
                type="text"
                placeholder="Notes de fond, nom d'un parfum, d'une fleur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xl md:text-3xl pl-10 md:pl-12 pr-4 py-4 md:py-6 bg-transparent border-b border-white/10 font-serif font-light focus:outline-none focus:border-white/80 transition-all text-[#F5F5F0] placeholder-white/20"
                id="search-main-input"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs tracking-wider"
                    id="clear-search-query-btn"
                  >
                    EFFACER
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Tags/Categories row */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[10px] tracking-widest text-white/40 font-medium uppercase">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>FILTRER PAR ACCORDS ET MAISONS</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {POPULAR_TAGS.map((tag) => {
                  const isActive = selectedFamily === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`px-3.5 py-1.5 font-sans text-xs transition-all duration-300 pointer-events-auto ${
                        isActive
                          ? "bg-[#F5F5F0] text-[#0F0F0F] border-transparent font-medium"
                          : "bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:border-white/30"
                      }`}
                      id={`tag-btn-${tag}`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results body */}
            <div className="pt-6 min-h-[300px]">
              {filteredPerfumes.length === 0 ? (
                <div className="text-center py-16 space-y-4" id="search-no-results">
                  {searchQuery || selectedFamily ? (
                    <>
                      <Sparkles className="w-10 h-10 text-white/10 mx-auto" />
                      <h4 className="font-serif text-lg text-white/80">Aucun sillage correspondant</h4>
                      <p className="text-xs text-white/40 max-w-xs mx-auto">
                        Essayez de formuler votre recherche avec des notes différentes (ex: Rose, Jasmin, Ambre, Cuir).
                      </p>
                      <button
                        onClick={clearFilters}
                        className="text-xs text-white hover:text-white/80 transition-colors underline font-medium tracking-wider font-sans uppercase"
                        id="reset-search-filters"
                      >
                        Réinitialiser la recherche
                      </button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <p className="font-serif italic text-white/40 text-sm">
                        "Les fragrances d'exceptions s'épanouissent sous le secret."
                      </p>
                      <p className="text-xs text-white/30 max-w-sm mx-auto">
                        Saisissez un ingrédient ou sélectionnez l'un des accords populaires ci-dessus pour entamer l'éveil de vos sens.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] tracking-wider text-white/30 font-semibold border-b border-white/10 pb-2">
                    <span>{filteredPerfumes.length} CRÉATION(S) TROUVÉE(S)</span>
                    <button onClick={clearFilters} className="hover:text-white transition-colors uppercase">
                      TOUT EFFACER
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="search-results-grid">
                    {filteredPerfumes.map((perfume) => (
                      <motion.div
                        key={perfume.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-4 p-3 bg-[#1A1A1A] hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                        onClick={() => {
                          onSelectPerfume(perfume);
                          onClose();
                        }}
                        id={`search-result-card-${perfume.id}`}
                      >
                        <div className="w-16 h-16 bg-black/30 p-1 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform">
                          <img
                            src={perfume.image}
                            alt={perfume.name}
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0 select-none">
                          <span className="text-[9px] font-sans text-white/50 tracking-widest font-semibold uppercase underline decoration-white/20 underline-offset-2">
                            {perfume.collectionName}
                          </span>
                          <h5 className="font-serif text-sm font-bold text-[#F5F5F0] group-hover:text-white transition-colors truncate">
                            {perfume.name}
                          </h5>
                          <p className="text-[10px] text-white/50 font-serif italic truncate">
                            {perfume.tagline}
                          </p>
                          <p className="text-[9px] text-white/40 font-sans truncate mt-0.5">
                            Notes: {[...perfume.topNotes, ...perfume.heartNotes].slice(0, 3).join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-serif text-sm tracking-wide text-[#F5F5F0]">{perfume.price} €</span>
                          <div className="text-[9px] font-sans text-white/40 tracking-wider flex items-center space-x-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-3 h-3 text-white/60" />
                            <span>VOIR</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
