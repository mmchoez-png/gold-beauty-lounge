import { Home, Calendar, QrCode, Ticket } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface BottomNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onQrClick: () => void;
  onBookingClick: () => void;
}

export function BottomNavigation({ 
  activeView, 
  onViewChange, 
  onQrClick, 
  onBookingClick 
}: BottomNavigationProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Inicio' },
    { id: 'booking', icon: Calendar, label: 'Reservas', action: onBookingClick },
    { id: 'qr', icon: QrCode, label: 'Código', action: onQrClick },
    { id: 'coupons', icon: Ticket, label: 'Cupones' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[382px] z-40">
      <nav className="bg-charcoal/95 backdrop-blur-md rounded-[24px] p-2 flex items-center justify-around shadow-2xl border border-gold/20">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => item.action ? item.action() : onViewChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300",
                isActive ? "bg-gold/10 text-gold" : "text-white/40 hover:text-white/60"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "scale-110")} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[8px] font-black uppercase tracking-widest leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
