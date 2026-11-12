import { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'white' | 'dark' | 'nude';
  withBorder?: boolean;
}

export function Card({ 
  children, 
  className, 
  variant = 'white', 
  withBorder = true 
}: CardProps) {
  const variants = {
    white: 'bg-white',
    dark: 'bg-charcoal text-white',
    nude: 'bg-cream'
  };

  return (
    <div className={cn(
      'rounded-[32px] p-6 shadow-sm',
      variants[variant],
      withBorder && (variant === 'dark' ? 'border border-gold/20' : 'border border-gold'),
      className
    )}>
      {children}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'charcoal' | 'outline' | 'ghost';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  className, 
  variant = 'gold', 
  fullWidth = false,
  size = 'md',
  ...props 
}: ButtonProps) {
  const variants = {
    gold: 'gold-gradient text-charcoal font-bold shadow-lg shadow-gold/20',
    charcoal: 'bg-charcoal text-white font-bold shadow-lg shadow-charcoal/20',
    outline: 'border-2 border-gold text-bronze font-bold bg-transparent',
    ghost: 'bg-gold/10 text-bronze font-bold'
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-4 text-xs',
    lg: 'px-8 py-5 text-sm'
  };

  return (
    <button 
      className={cn(
        'rounded-2xl uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface BadgeProps {
  children: ReactNode;
  variant?: 'gold' | 'charcoal' | 'white';
}

export function Badge({ children, variant = 'gold' }: BadgeProps) {
  const variants = {
    gold: 'bg-bronze text-white',
    charcoal: 'bg-charcoal text-white',
    white: 'bg-white text-bronze border border-gold'
  };

  return (
    <span className={cn(
      'inline-block px-2 py-1 rounded-lg text-[8px] font-bold uppercase tracking-wider',
      variants[variant]
    )}>
      {children}
    </span>
  );
}
