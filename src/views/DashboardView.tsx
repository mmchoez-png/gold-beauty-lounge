import { useApp } from '@/src/context/AppContext';
import { Header } from '@/src/components/layout/Header';
import { WalletCard } from '@/src/components/layout/WalletCard';
import { PromoCarousel } from '@/src/components/layout/PromoCarousel';
import { Card, Button, Badge } from '@/src/components/ui';
import { 
  Home, Gift, QrCode, Ticket, 
  Trophy, BookHeart, ShoppingBag, History,
  Sparkles, Calendar, ArrowRight, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface DashboardViewProps {
  onModuleClick: (id: string) => void;
  onBookingClick: () => void;
  onRechargeClick: () => void;
  onLoyaltyClick: () => void;
}

const modules = [
  { id: 'inicio', icon: Home, label: 'Inicio', sub: 'Mi Dashboard' },
  { id: 'gift', icon: Gift, label: 'Gift Card', sub: 'Envío P2P' },
  { id: 'code', icon: QrCode, label: 'Código', sub: 'Check-In' },
  { id: 'coupons', icon: Ticket, label: 'Cupones', sub: 'Hora Baja' },
  { id: 'loyalty', icon: Trophy, label: 'Fidelización', sub: 'Retos VIP' },
  { id: 'diary', icon: BookHeart, label: 'Diario', sub: 'Belleza' },
  { id: 'boutique', icon: ShoppingBag, label: 'Boutique', sub: 'Tienda' },
  { id: 'record', icon: History, label: 'Récord', sub: 'Facturas' },
];

export function DashboardView({ 
  onModuleClick, 
  onBookingClick, 
  onRechargeClick, 
  onLoyaltyClick 
}: DashboardViewProps) {
  const { state } = useApp();
  const nextBooking = state.bookings.find(b => b.status === 'PENDING');

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
      <div className="pt-2">
        <WalletCard onRecharge={onRechargeClick} onLoyalty={onLoyaltyClick} />
      </div>
      
      {/* Active Booking Snippet */}
      <AnimatePresence>
        {nextBooking && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 mb-3"
          >
            <Card variant="dark" className="p-4 flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-all" withBorder={false}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                  <Calendar className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="text-[8px] font-bold uppercase tracking-widest text-gold/60">Próxima Cita</p>
                    <div className="h-1 w-1 rounded-full bg-gold animate-ping" />
                  </div>
                  <p className="text-xs font-black text-white uppercase tracking-tight">{nextBooking.service}</p>
                  <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest">{nextBooking.date} • {nextBooking.time}</p>
                </div>
              </div>
              <div className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <ArrowRight className="h-4 w-4 text-gold" />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="-mt-2">
        <PromoCarousel onPromoClick={onBookingClick} />
      </div>
      
      {/* Grid Quick Access */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-charcoal uppercase tracking-widest">Experiencia Integral</h3>
          <Badge variant="white">Explorar</Badge>
        </div>
        <div className="grid grid-cols-4 gap-x-3 gap-y-6">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => onModuleClick(m.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={cn(
                "h-[56px] w-[56px] rounded-[22px] bg-white border border-gold/20 shadow-sm flex items-center justify-center transition-all duration-300",
                "group-hover:scale-105 group-hover:bg-cream group-hover:border-bronze group-active:scale-95"
              )}>
                <m.icon className="h-5.5 w-5.5 text-bronze group-hover:text-bronze transition-colors" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[9px] font-black text-charcoal text-center leading-none uppercase tracking-tight">
                  {m.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main CTA */}
      <div className="px-6 py-6">
        <Card variant="dark" className="p-6 text-center relative overflow-hidden shadow-2xl" withBorder={false}>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Sparkles className="h-24 w-24 rotate-12" />
          </div>
          
          <div className="relative z-10">
            <h4 className="text-xl font-black text-white mb-1 uppercase tracking-tight">Reserva tu cita</h4>
            <p className="text-[10px] text-white/50 tracking-widest uppercase font-bold mb-6 max-w-[200px] mx-auto leading-relaxed">
              Expertos listos para tu bienestar
            </p>
            <Button fullWidth onClick={onBookingClick} className="py-4 rounded-xl">
              Agendar Ahora
            </Button>
          </div>
        </Card>
      </div>

      {/* Institutional Footer */}
      <footer className="px-6 py-8 text-center space-y-4 pb-12">
        <p className="text-lg italic font-bold text-bronze gold-text-gradient">¡Renueva tu vida!</p>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] flex-1 bg-gold/20" />
          <span className="text-[8px] font-black text-charcoal/20 uppercase tracking-[0.4em]">Gold Beauty Lounge</span>
          <div className="h-[1px] flex-1 bg-gold/20" />
        </div>
      </footer>
    </div>
  );
}
