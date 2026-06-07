import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Feather, History, Calendar, Heart } from "lucide-react";
import { STORIES } from "../data";

interface HeritageTimelineProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeritageTimeline({ isOpen, onClose }: HeritageTimelineProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden font-sans text-[#F5F5F0]">
          {/* Backdrop wrapper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            id="heritage-backdrop"
          />

          {/* Timeline side container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-2xl bg-[#0F0F0F] shadow-2xl h-full flex flex-col justify-between border-l border-white/10"
            id="heritage-panel-container"
          >
            {/* Top Close */}
            <div className="p-6 border-b border-white/10 bg-[#1A1A1A] flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <History className="w-5 h-5 text-white/80" />
                <h3 className="font-serif text-lg tracking-wider text-[#F5F5F0] uppercase">Notre Histoire d'Art</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5"
                aria-label="Fermer"
                id="close-heritage-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Center Timeline */}
            <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-12">
              {/* Introduction Banner & Art story */}
              <div className="space-y-4 text-center pb-8 border-b border-white/10">
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#F5F5F0]/60 uppercase font-semibold">
                  Maison Lumière de Paris
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F0] font-normal">
                  Chaque flacon est un objet d'art, chaque écorce une poésie.
                </h2>
                <p className="font-serif italic text-xs text-white/45 max-w-md mx-auto leading-relaxed">
                  "Depuis sa fondation, la Maison Lumière capture l'immatérielle beauté de la lumière de Paris pour l'enfermer dans de précieux écrins de verre sculpté."
                </p>
                <div className="pt-2">
                  <div className="w-6 h-[1px] bg-white/20 mx-auto" />
                </div>
              </div>

              {/* Milestones Map */}
              <div className="relative border-l-2 border-white/10 pl-6 space-y-10 md:space-y-14 py-4 ml-2">
                {STORIES.map((milestone, idx) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Circle Indicator on vertical timeline line */}
                    <span className="absolute -left-[35px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0F0F0F] border-2 border-[#F5F5F0] font-sans shadow-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F5F5F0]" />
                    </span>

                    {/* Content Block */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-serif text-2xl font-bold text-[#F5F5F0] bg-[#1A1A1A] rounded-xs py-0.5 px-2 font-mono border border-white/10">
                          {milestone.year}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-[#F5F5F0]">
                          {milestone.title}
                        </h4>
                      </div>

                      {/* Location badge */}
                      <div className="flex items-center space-x-1.5 text-[10px] text-white/40 font-semibold uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{milestone.location}</span>
                      </div>

                      <p className="text-xs text-[#F5F5F0]/70 leading-relaxed max-w-lg">
                        {milestone.description}
                      </p>

                      {/* Image Box */}
                      {milestone.image && (
                        <div className="overflow-hidden border border-white/10 shadow-sm mt-3.5 max-w-sm rounded-xs">
                          <img
                            src={milestone.image}
                            alt={milestone.title}
                            referrerPolicy="no-referrer"
                            className="aspect-video w-full object-cover origin-center hover:scale-105 duration-700 select-none"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Core Philosophy Section details */}
              <div className="bg-[#1A1A1A] border border-white/10 p-5 space-y-4 rounded-xs">
                <div className="flex items-center space-x-2 text-white/90">
                  <Feather className="w-4 h-4" />
                  <span className="font-sans text-xs font-semibold tracking-wider uppercase">L'engagement de la Haute Verrerie</span>
                </div>
                <p className="text-xs text-[#F5F5F0]/70 leading-relaxed">
                  Toutes nos pièces de flaconnage d'art sont soufflées et gravées individuellement dans des manufactures familiales de renom. Conçues pour durer, elles sont rechargeables à l'infini dans nos salons de la rue Saint-Honoré, limitant l'impact écologique tout en ornant votre cabinet de toilette de leur sillage éternel.
                </p>
                <div className="flex items-center space-x-1.5 text-[11px] text-white/60 italic font-serif">
                  <Heart className="w-3.5 h-3.5 fill-white/60 text-white/60" />
                  <span>Un demi-siècle de Haute Parfumerie d'exception.</span>
                </div>
              </div>
            </div>

            {/* Bottom Brand footer */}
            <div className="p-6 border-t border-white/10 bg-[#0F0F0F] text-center">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
                MAISON LUMIÈRE PARIS - DEPUIS 1924
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
