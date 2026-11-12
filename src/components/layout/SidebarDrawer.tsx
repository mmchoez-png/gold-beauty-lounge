import { motion, AnimatePresence } from 'motion/react';
import { 
  X, User, CreditCard, MessageSquare, 
  Clock, ShieldCheck, FileText, RefreshCw,
  Camera, Gift, ShoppingCart, BookOpen
} from 'lucide-react';
import { useApp } from '@/src/context/AppContext';
import { cn } from '@/src/lib/utils';
import { Card } from '@/src/components/ui';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'perfil', icon: User, label: 'Perfil' },
  { id: 'pago', icon: CreditCard, label: 'Forma de Pago' },
  { id: 'contactos', icon: MessageSquare, label: 'Contactos' },
  { id: 'funcionamiento', icon: Clock, label: 'Funcionamiento' },
  { id: 'politica', icon: ShieldCheck, label: 'Política' },
  { id: 'terminos', icon: FileText, label: 'Términos' },
];

export function SidebarDrawer({ isOpen, onClose, onViewChange }: SidebarDrawerProps) {
  const { state, resetData, updateProfile } = useApp();

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
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-[300px] bg-cream p-6 shadow-2xl flex flex-col"
          >
            {/* Header / Profile */}
            <div className="mb-10 flex items-center gap-4">
              <div className="relative group cursor-pointer">
                <div className="h-16 w-16 rounded-full border-2 border-gold overflow-hidden bg-white shadow-md transition-transform group-hover:scale-105">
                  <img 
                    src={state.profile.avatar} 
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-bronze text-white flex items-center justify-center border-2 border-cream shadow-lg">
                  <Camera className="h-3 w-3" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-charcoal leading-tight">
                  ¡Hola, {state.profile.name.split(' ')[0]}!
                </span>
                <span className="text-[10px] font-bold text-bronze tracking-widest uppercase">
                  {state.profile.level}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-gold/20 active:scale-90 transition-transform"
              >
                <X className="h-5 w-5 text-charcoal" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    onClose();
                  }}
                  className="flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-charcoal transition-all hover:bg-gold/10 group active:scale-[0.98]"
                >
                  <item.icon className="h-5 w-5 text-bronze group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Footer */}
            <div className="mt-auto pt-6 space-y-6">
              <Card variant="white" className="p-5 text-center shadow-sm relative overflow-hidden" withBorder={true}>
                <div className="absolute -right-2 -top-2 h-12 w-12 rounded-full bg-gold/5 blur-xl" />
                <p className="text-sm text-charcoal italic font-bold leading-relaxed relative z-10">
                  "Redefiniendo el lujo en cada detalle"
                </p>
              </Card>

              <button 
                onClick={() => {
                  if (confirm('¿Deseas restaurar los datos de la demo?')) {
                    resetData();
                    onClose();
                  }
                }}
                className="flex w-full items-center justify-center gap-2 py-3 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest hover:text-bronze transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                Restaurar Datos de Demo
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
