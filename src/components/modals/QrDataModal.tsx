import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Star, Info, CreditCard, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '@/src/context/AppContext';
import { Button, Card } from '@/src/components/ui';

interface QrDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QrDataModal({ isOpen, onClose }: QrDataModalProps) {
  const { state, updateBookingStatus, addNotification } = useApp();
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleCheckIn = () => {
    setIsCheckingIn(true);
    setTimeout(() => {
      const nextBooking = state.bookings.find(b => b.status === 'PENDING');
      if (nextBooking) {
        updateBookingStatus(nextBooking.id, 'IN_PROGRESS');
        addNotification('Check-In Exitoso', `Tu cita de ${nextBooking.service} está ahora EN CURSO.`, 'BOOKING');
      }
      setIsCheckingIn(false);
      onClose();
    }, 1500);
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
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md rounded-t-[40px] bg-white p-8 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 h-1.5 w-12 rounded-full bg-charcoal/10" />

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-charcoal uppercase">Código de Datos</h2>
                <p className="text-[10px] text-bronze font-bold tracking-wider">{state.profile.name.toUpperCase()} - {state.profile.level}</p>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-charcoal transition-transform active:scale-90"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* QR Section */}
            <div className="mb-8 flex flex-col items-center">
              <div className="relative p-6 rounded-[32px] bg-white border-2 border-gold/30 shadow-inner">
                <QrCode className="h-48 w-48 text-charcoal" strokeWidth={1} />
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-bronze rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-bronze rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-bronze rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-bronze rounded-br-2xl" />
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1.5 w-24 bg-cream rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-bronze"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(timeLeft / 60) * 100}%` }}
                    transition={{ duration: 1, ease: 'linear' }}
                  />
                </div>
                <span className="text-[10px] font-bold text-charcoal/40 uppercase">Regenerando en {timeLeft}s</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-cream rounded-2xl p-4 flex items-center gap-3 border border-gold/10">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <CreditCard className="h-5 w-5 text-bronze" />
                </div>
                <div>
                  <p className="text-[8px] font-bold text-charcoal/40 uppercase tracking-tighter">Saldo</p>
                  <p className="text-sm font-bold text-charcoal">${state.balance.toFixed(2)}</p>
                </div>
              </div>
              <div className="bg-cream rounded-2xl p-4 flex items-center gap-3 border border-gold/10">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Star className="h-5 w-5 text-bronze fill-bronze/10" />
                </div>
                <div>
                  <p className="text-[8px] font-bold text-charcoal/40 uppercase tracking-tighter">Estrellas</p>
                  <p className="text-sm font-bold text-charcoal">{state.stars}</p>
                </div>
              </div>
            </div>

            {/* Technical Sheet */}
            <Card variant="dark" className="mb-6 p-6 overflow-hidden relative" withBorder={false}>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <QrCode className="h-24 w-24" />
              </div>
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                <Info className="h-4 w-4 text-gold" />
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold">Ficha Digital</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 relative z-10">
                <div>
                  <p className="text-[8px] uppercase text-white/40 tracking-wider mb-0.5">Alergias</p>
                  <p className="text-[11px] font-bold">{state.profile.allergies}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase text-white/40 tracking-wider mb-0.5">Tono Esmalte</p>
                  <p className="text-[11px] font-bold">{state.profile.nailPolish}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[8px] uppercase text-white/40 tracking-wider mb-0.5">Fórmula Capilar</p>
                  <p className="text-[11px] font-bold">{state.profile.hairFormula}</p>
                </div>
              </div>
            </Card>

            <Button 
              fullWidth 
              onClick={handleCheckIn}
              disabled={isCheckingIn}
              className="flex items-center justify-center gap-2"
            >
              {isCheckingIn ? (
                <div className="h-4 w-4 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Simular Check-In
                </>
              )}
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
