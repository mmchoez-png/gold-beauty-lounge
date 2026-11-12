import { motion } from 'motion/react';
import { Card, Badge } from '@/src/components/ui';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';

const promos = [
  { id: 1, title: 'Manicure Luxury', discount: '25% OFF', tag: 'Uñas Impecables', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Estilismo Premium', discount: '15% OFF', tag: 'Look Renovado', img: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=400&auto=format&fit=crop' },
  { id: 3, title: 'Tratamiento Facial', discount: '10% OFF', tag: 'Piel Radiante', img: 'https://images.unsplash.com/photo-1570172619997-752145b6ef5c?q=80&w=400&auto=format&fit=crop' },
];

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80";

interface PromoCarouselProps {
  onPromoClick: (promo: any) => void;
}

export function PromoCarousel({ onPromoClick }: PromoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 280 + 20; // width + gap
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = 280 + 20;
      const index = Math.round(scrollPosition / cardWidth);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between px-6 mb-4">
        <h3 className="text-sm font-bold text-charcoal uppercase tracking-widest">Promociones Exclusivas</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            className="h-8 w-8 rounded-full border border-gold/20 flex items-center justify-center text-bronze disabled:opacity-30"
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button 
            onClick={() => scrollToIndex(Math.min(promos.length - 1, activeIndex + 1))}
            className="h-8 w-8 rounded-full border border-gold/20 flex items-center justify-center text-bronze disabled:opacity-30"
            disabled={activeIndex === promos.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-5 overflow-x-auto px-6 no-scrollbar snap-x pb-4"
      >
        {promos.map((promo) => (
          <motion.button
            key={promo.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => onPromoClick(promo)}
            className="relative flex-none w-[280px] h-[180px] rounded-[32px] overflow-hidden snap-center group shadow-xl"
          >
            <img 
              src={promo.img} 
              alt={promo.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
            
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="gold">{promo.discount}</Badge>
              <Badge variant="white">{promo.tag}</Badge>
            </div>
            
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div className="text-left">
                <p className="text-white font-black text-lg tracking-tight uppercase mb-0.5">{promo.title}</p>
                <p className="text-gold/80 text-[9px] font-bold uppercase tracking-[0.2em]">Agendar ahora</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <ChevronRight className="h-5 w-5 text-white" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center gap-1.5 mt-2">
        {promos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              activeIndex === idx ? "w-6 bg-bronze" : "w-1.5 bg-gold/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
