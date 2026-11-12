import { useApp } from '@/src/context/AppContext';
import { Card, Button, Badge } from '@/src/components/ui';
import { Plus, Star, Gift, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface WalletCardProps {
  onRecharge: () => void;
  onLoyalty: () => void;
}

export function WalletCard({ onRecharge, onLoyalty }: WalletCardProps) {
  const { state } = useApp();

  return (
    <div className="px-6 py-4">
      <Card className="relative overflow-hidden group shadow-2xl shadow-gold/10">
        {/* Background Accents */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
        <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-bronze/5 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
        
        <div className="flex flex-col gap-8 relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-[0.2em] text-bronze uppercase">Saldo Disponible</span>
                <div className="h-1 w-1 rounded-full bg-gold" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-charcoal tracking-tight">
                  ${state.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            
            <button 
              onClick={onLoyalty}
              className="flex flex-col items-end gap-1.5 active:scale-95 transition-transform group/star"
            >
              <span className="text-[9px] font-bold tracking-[0.15em] text-charcoal/40 uppercase">Estrellas</span>
              <div className="flex items-center gap-2 bg-cream px-3 py-2 rounded-2xl border border-gold/20 shadow-sm group-hover/star:border-bronze transition-colors">
                <Star className="h-3.5 w-3.5 text-bronze fill-bronze animate-pulse" />
                <span className="text-sm font-black text-charcoal tracking-tight">
                  {state.stars}
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex -space-x-3 overflow-hidden">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-cream flex items-center justify-center">
                  <Gift className="h-3 w-3 text-bronze opacity-40" />
                </div>
              ))}
              <div className="h-8 w-8 rounded-full border-2 border-white bg-bronze text-white flex items-center justify-center text-[8px] font-bold">
                +4
              </div>
            </div>
            <p className="text-[9px] font-bold text-charcoal/40 uppercase tracking-widest flex-1">
              Canjea por <span className="text-bronze">Gift Cards</span>
            </p>
            <ArrowUpRight className="h-4 w-4 text-gold" />
          </div>

          <Button 
            variant="charcoal" 
            fullWidth 
            onClick={onRecharge}
            className="flex items-center justify-center gap-3 py-5"
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
            Recarga Rápida
          </Button>
        </div>
      </Card>
    </div>
  );
}
