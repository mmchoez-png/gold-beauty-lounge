import { Menu, Bell } from 'lucide-react';
import { useApp } from '@/src/context/AppContext';
import { cn } from '@/src/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  onNotificationsClick: () => void;
}

export function Header({ onMenuClick, onNotificationsClick }: HeaderProps) {
  const { state } = useApp();
  const unreadCount = state.notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-cream/90 px-6 py-5 backdrop-blur-md border-b border-gold/10">
      <button 
        onClick={onMenuClick}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-gold/20 shadow-sm transition-all hover:bg-gold/5 active:scale-90"
      >
        <Menu className="h-6 w-6 text-charcoal" strokeWidth={1.5} />
      </button>

      <div className="flex flex-col items-center">
        <h1 className="text-[11px] font-black tracking-[0.4em] text-charcoal uppercase leading-none mb-1">
          Gold Beauty Lounge
        </h1>
        <div className="h-[1px] w-8 bg-gold" />
      </div>

      <button 
        onClick={onNotificationsClick}
        className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-gold/20 shadow-sm transition-all hover:bg-gold/5 active:scale-90"
      >
        <Bell className="h-6 w-6 text-charcoal" strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-bronze text-[9px] font-black text-white ring-2 ring-cream shadow-lg shadow-bronze/30">
            {unreadCount}
          </span>
        )}
      </button>
    </header>
  );
}
