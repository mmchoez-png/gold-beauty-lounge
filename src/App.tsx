import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { SidebarDrawer } from './components/layout/SidebarDrawer';
import { NotificationsDrawer } from './components/layout/NotificationsDrawer';
import { DashboardView } from './views/DashboardView';
import { QrDataModal } from './components/modals/QrDataModal';
import { RechargeModal } from './components/modals/RechargeModal';
import { BookingModal } from './components/modals/BookingModal';
import { LoyaltyModal } from './components/modals/LoyaltyModal';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

import { BottomNavigation } from './components/layout/BottomNavigation';
import { Footer } from './components/layout/Footer';

function AppContent() {
  const [view, setView] = useState('dashboard');
  const [modals, setModals] = useState({
    sidebar: false,
    notifications: false,
    qrData: false,
    recharge: false,
    booking: false,
    loyalty: false,
  });

  const toggleModal = (key: keyof typeof modals, val: boolean) => {
    setModals(prev => ({ ...prev, [key]: val }));
  };

  const handleModuleClick = (id: string) => {
    switch (id) {
      case 'code': toggleModal('qrData', true); break;
      case 'loyalty': toggleModal('loyalty', true); break;
      case 'gift': setView('gift'); break;
      case 'diary': setView('diary'); break;
      case 'boutique': setView('boutique'); break;
      case 'record': setView('record'); break;
      case 'booking': toggleModal('booking', true); break;
      case 'coupons': setView('coupons'); break;
      case 'inicio': setView('dashboard'); break;
      default: toggleModal('booking', true); break;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4 selection:bg-gold/20">
      <div className="w-full max-w-md h-[850px] bg-cream shadow-2xl rounded-[48px] overflow-hidden relative flex flex-col border-[8px] border-charcoal/5">
        
        <Header 
          onMenuClick={() => toggleModal('sidebar', true)} 
          onNotificationsClick={() => toggleModal('notifications', true)} 
        />

        {/* Navigation Layers */}
        <SidebarDrawer 
          isOpen={modals.sidebar} 
          onClose={() => toggleModal('sidebar', false)} 
          onViewChange={setView}
        />

        <NotificationsDrawer 
          isOpen={modals.notifications} 
          onClose={() => toggleModal('notifications', false)} 
        />

        {/* Action Modals */}
        <QrDataModal 
          isOpen={modals.qrData} 
          onClose={() => toggleModal('qrData', false)} 
        />

        <RechargeModal 
          isOpen={modals.recharge} 
          onClose={() => toggleModal('recharge', false)} 
        />

        <BookingModal 
          isOpen={modals.booking} 
          onClose={() => toggleModal('booking', false)} 
        />

        <LoyaltyModal 
          isOpen={modals.loyalty} 
          onClose={() => toggleModal('loyalty', false)} 
        />

        {/* View Content */}
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <DashboardView 
                onModuleClick={handleModuleClick}
                onBookingClick={() => toggleModal('booking', true)}
                onRechargeClick={() => toggleModal('recharge', true)}
                onLoyaltyClick={() => toggleModal('loyalty', true)}
              />
            </motion.div>
          )}
          
          {(view !== 'dashboard') && (
            <motion.div
              key="other"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="h-20 w-20 rounded-3xl bg-gold/10 flex items-center justify-center mb-6">
                <Sparkles className="h-10 w-10 text-bronze" />
              </div>
              <h2 className="text-xl font-black text-charcoal uppercase mb-2">Vista en Desarrollo</h2>
              <p className="text-xs text-charcoal/40 font-bold uppercase tracking-widest leading-relaxed">
                El módulo de {view.toUpperCase()} estará disponible en la próxima actualización de la experiencia Gold.
              </p>
              <button 
                onClick={() => setView('dashboard')}
                className="mt-8 text-[10px] font-black text-bronze uppercase tracking-[0.3em] border-b-2 border-bronze pb-1"
              >
                Volver al Inicio
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <BottomNavigation 
          activeView={view}
          onViewChange={setView}
          onQrClick={() => toggleModal('qrData', true)}
          onBookingClick={() => toggleModal('booking', true)}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
