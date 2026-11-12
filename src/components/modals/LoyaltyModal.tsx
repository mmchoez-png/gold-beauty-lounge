import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Star, Gift, Users, 
  ArrowRight, ShieldCheck, ChevronRight,
  TrendingUp, Sparkles, X
} from 'lucide-react';
import { useApp } from '@/src/context/AppContext';
import { cn } from '@/src/lib/utils';
import { Button, Card, Badge } from '@/src/components/ui';

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const challenges = [
  { id: 'facial', title: 'Reto Estacional', desc: '2/3 sesiones faciales en 45 días', progress: 66, bonus: 15, tag: 'Bono $15' },
  { id: 'new', title: 'Exploración', desc: 'Prueba un servicio nuevo este mes', progress: 0, bonus: 'x2', tag: 'Estrellas x2' },
];

export function LoyaltyModal({ isOpen, onClose }: LoyaltyModalProps) {
  const { state, convertStars, addNotification } = useApp();

  const handleConvert = () => {
    if (state.stars >= 400) {
      convertStars(400, 20);
      addNotification('Conversión Exitosa', 'Has canjeado 400 estrellas por $20.00 de saldo.', 'WALLET');
    }
  };

  const getNextLevel = () => {
    if (state.profile.level === 'GOLD') return 'GOLD SILVER';
    if (state.profile.level === 'GOLD SILVER') return 'GOLD PLATINUM VIP';
    return 'MAX LEVEL';
  };

  const levelProgress = (state.stars % 1000) / 10;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md rounded-t-[40px] bg-white p-8 shadow-2xl h-[90vh] flex flex-col"
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 h-1.5 w-12 rounded-full bg-charcoal/10" />

            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-bronze flex items-center justify-center text-white shadow-lg">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-widest text-charcoal uppercase">Fidelización</h2>
                  <p className="text-[10px] text-bronze font-bold tracking-wider">RETOS & RECOMPENSAS</p>
                </div>
              </div>
              <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-charcoal">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-8 pb-6">
              {/* VIP Progress */}
              <Card variant="dark" className="p-6 overflow-hidden relative" withBorder={false}>
                <div className="absolute -right-4 -top-4 opacity-10">
                  <ShieldCheck className="h-24 w-24" />
                </div>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">Nivel Actual</p>
                    <p className="text-xl font-black tracking-tight">{state.profile.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Siguiente Nivel</p>
                    <p className="text-xs font-bold text-gold">{getNextLevel()}</p>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress}%` }}
                    className="h-full bg-gold shadow-[0_0_10px_rgba(230,198,135,0.5)]"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-[9px] font-bold text-white/40 uppercase">{state.stars} estrellas</span>
                  <span className="text-[9px] font-bold text-white/40 uppercase">1,000 pto</span>
                </div>
              </Card>

              {/* Star Conversion */}
              <div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-charcoal/40 uppercase mb-4">Canje Instantáneo</h3>
                <button 
                  onClick={handleConvert}
                  disabled={state.stars < 400}
                  className={cn(
                    "w-full p-6 rounded-[32px] border-2 flex items-center justify-between transition-all active:scale-[0.98] group",
                    state.stars >= 400 ? "border-bronze bg-cream shadow-md" : "border-gold/10 bg-white opacity-50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white border border-gold/20 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <TrendingUp className="h-6 w-6 text-bronze" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-charcoal">Convertir 400 Estrellas</p>
                      <p className="text-[10px] text-bronze font-black uppercase tracking-wider">Acreditar $20.00 Saldo</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-bronze" />
                </button>
              </div>

              {/* Challenges */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] text-charcoal/40 uppercase">Retos de Temporada</h3>
                  <Badge variant="gold">Activos</Badge>
                </div>
                <div className="space-y-4">
                  {challenges.map((c) => (
                    <div key={c.id} className="p-6 rounded-[32px] bg-white border border-gold/10 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-xl bg-cream flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-bronze" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-charcoal uppercase tracking-tight">{c.title}</p>
                            <p className="text-[10px] text-charcoal/40 font-medium">{c.desc}</p>
                          </div>
                        </div>
                        <Badge variant="gold">{c.tag}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[8px] font-bold text-charcoal/40 uppercase">
                          <span>Progreso</span>
                          <span>{c.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-cream rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${c.progress}%` }}
                            className="h-full bg-bronze"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Referral */}
              <div className="p-6 rounded-[32px] border-2 border-dashed border-bronze/30 bg-cream/50 flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
                    <Users className="h-6 w-6 text-bronze" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-charcoal uppercase tracking-tight">Invita a una Amiga</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-bronze font-black uppercase tracking-widest">MARIA-GOLD26</span>
                      <Gift className="h-3 w-3 text-bronze" />
                    </div>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-white border border-gold/20 flex items-center justify-center shadow-sm">
                  <ChevronRight className="h-5 w-5 text-bronze" />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
