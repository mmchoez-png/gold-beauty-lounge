import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, ChevronRight, Zap, Gift } from 'lucide-react';
import { useApp } from '@/src/context/AppContext';
import { Button, Card } from '@/src/components/ui';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const rechargeOptions = [
  { amount: 50, bonus: 0, label: 'Básico' },
  { amount: 100, bonus: 15, label: 'Popular', highlighted: true },
  { amount: 200, bonus: 35, label: 'VIP' },
  { amount: 500, bonus: 100, label: 'Elite' },
];

export function RechargeModal({ isOpen, onClose }: RechargeModalProps) {
  const { recharge, addNotification } = useApp();

  const handleRecharge = (amount: number, bonus: number) => {
    recharge(amount, bonus);
    addNotification('Recarga Exitosa', `Has recargado $${amount}${bonus > 0 ? ` + un bono de $${bonus}` : ''}.`, 'WALLET');
    onClose();
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
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md rounded-t-[40px] bg-white p-8 shadow-2xl"
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 h-1.5 w-12 rounded-full bg-charcoal/10" />

            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-charcoal uppercase">Recarga Rápida</h2>
                <p className="text-[10px] text-bronze font-bold tracking-wider">AÑADE SALDO A TU BILLETERA</p>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-charcoal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {rechargeOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRecharge(opt.amount, opt.bonus)}
                  className={`w-full group relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all active:scale-[0.98] ${
                    opt.highlighted 
                      ? 'border-bronze bg-cream shadow-md' 
                      : 'border-gold/10 bg-white hover:border-gold'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                      opt.highlighted ? 'bg-bronze text-white' : 'bg-gold/10 text-bronze'
                    }`}>
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">{opt.label}</p>
                      <p className="text-xl font-bold text-charcoal">${opt.amount}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {opt.bonus > 0 && (
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] font-bold text-bronze uppercase tracking-tighter">Bono extra</span>
                        <span className="text-xs font-bold text-bronze">+${opt.bonus}</span>
                      </div>
                    )}
                    <ChevronRight className={`h-5 w-5 ${opt.highlighted ? 'text-bronze' : 'text-gold'}`} />
                  </div>

                  {opt.highlighted && (
                    <div className="absolute -top-2 -right-2 bg-bronze text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-lg animate-bounce">
                      Recomendado
                    </div>
                  )}
                </button>
              ))}
            </div>

            <Card variant="dark" withBorder={false}>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Gift className="h-24 w-24" />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-4 w-4 text-gold" />
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold">Incentivo Premium</h4>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Todas tus recargas generan estrellas automáticas que puedes canjear por servicios exclusivos o productos.
              </p>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
