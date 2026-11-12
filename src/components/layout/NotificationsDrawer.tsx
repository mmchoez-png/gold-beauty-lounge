import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Bell, Calendar, Percent, Gift, Check, ChevronRight,
  Wallet, Sparkles, ShoppingBag
} from 'lucide-react';
import { useApp } from '@/src/context/AppContext';
import { cn } from '@/src/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/src/components/ui';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  const { state, markNotificationRead } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'BOOKING': return <Calendar className="h-4 w-4" />;
      case 'WALLET': return <Wallet className="h-4 w-4" />;
      case 'PROMO': return <Percent className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-[320px] bg-cream shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gold/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-bronze flex items-center justify-center text-white shadow-lg">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-widest text-charcoal uppercase">Alertas</h2>
                  <p className="text-[10px] text-bronze font-bold tracking-wider">CENTRO DE NOTIFICACIONES</p>
                </div>
              </div>
              <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gold/20">
                <X className="h-4 w-4 text-charcoal" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
              {state.notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-charcoal/30">
                  <Bell className="h-12 w-12 mb-4 opacity-10" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Sin notificaciones</p>
                </div>
              ) : (
                state.notifications.map((n) => (
                  <motion.div
                    key={n.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => markNotificationRead(n.id)}
                    className={cn(
                      "p-5 rounded-[28px] border transition-all cursor-pointer relative overflow-hidden group",
                      n.read ? "bg-white/50 border-gold/10" : "bg-white border-bronze/30 shadow-md"
                    )}
                  >
                    {!n.read && (
                      <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-bronze shadow-[0_0_8px_rgba(122,92,30,0.5)]" />
                    )}
                    <div className="flex gap-4">
                      <div className={cn(
                        "h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                        n.read ? "bg-charcoal/5 text-charcoal/40" : "bg-cream text-bronze shadow-sm"
                      )}>
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1">
                        <p className={cn("text-xs mb-1", n.read ? "font-bold text-charcoal/60" : "font-black text-charcoal")}>
                          {n.title}
                        </p>
                        <p className="text-[10px] text-charcoal/40 leading-relaxed mb-3">
                          {n.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-bold text-bronze/60 uppercase tracking-tighter">
                            {formatDistanceToNow(new Date(n.date), { addSuffix: true, locale: es })}
                          </span>
                          {!n.read && (
                            <span className="text-[8px] font-black text-bronze uppercase flex items-center gap-1">
                              Nueva <Check className="h-2 w-2" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-6 bg-white border-t border-gold/10 space-y-4">
              <div className="rounded-2xl bg-charcoal p-4 flex items-center justify-between group cursor-pointer active:scale-95 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-gold" />
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Ofertas para ti</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gold" />
              </div>
              
              <div className="rounded-2xl bg-cream border border-gold/20 p-4 flex items-center justify-between group cursor-pointer active:scale-95 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white border border-gold/20 flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4 text-bronze" />
                  </div>
                  <span className="text-[10px] font-bold text-charcoal uppercase tracking-widest">Tu Carrito</span>
                </div>
                <Badge variant="gold">{state.cart.length}</Badge>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
