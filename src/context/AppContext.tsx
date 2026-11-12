import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AppState, UserProfile, Booking, Notification, Transaction } from '../types';
import { INITIAL_STATE } from '../data/mockData';

interface AppContextType {
  state: AppState;
  recharge: (amount: number, bonus?: number) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  convertStars: (stars: number, amount: number) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addNotification: (title: string, message: string, type?: Notification['type']) => void;
  markNotificationRead: (id: string) => void;
  toggleOffline: () => void;
  resetData: () => void;
  purchaseProduct: (productId: string, price: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('gbl_luxury_state');
      return saved ? JSON.parse(saved) : INITIAL_STATE;
    } catch (e) {
      console.error('Error loading state:', e);
      return INITIAL_STATE;
    }
  });

  useEffect(() => {
    localStorage.setItem('gbl_luxury_state', JSON.stringify(state));
  }, [state]);

  const recharge = useCallback((amount: number, bonus = 0) => {
    const total = amount + bonus;
    setState(prev => ({
      ...prev,
      balance: prev.balance + total,
      transactions: [
        {
          id: `t-${Date.now()}`,
          type: 'RECHARGE',
          amount: total,
          description: `Recarga${bonus > 0 ? ` + Bono $${bonus}` : ''}`,
          date: new Date().toISOString()
        },
        ...prev.transactions
      ]
    }));
  }, []);

  const addBooking = useCallback((booking: Omit<Booking, 'id' | 'status'>) => {
    setState(prev => ({
      ...prev,
      bookings: [
        { ...booking, id: `b-${Date.now()}`, status: 'PENDING' },
        ...prev.bookings
      ]
    }));
  }, []);

  const updateBookingStatus = useCallback((id: string, status: Booking['status']) => {
    setState(prev => ({
      ...prev,
      bookings: prev.bookings.map(b => b.id === id ? { ...b, status } : b)
    }));
  }, []);

  const convertStars = useCallback((stars: number, amount: number) => {
    setState(prev => ({
      ...prev,
      stars: prev.stars - stars,
      balance: prev.balance + amount,
      transactions: [
        {
          id: `c-${Date.now()}`,
          type: 'CONVERSION',
          amount,
          description: `Canje de ${stars} estrellas`,
          date: new Date().toISOString()
        },
        ...prev.transactions
      ]
    }));
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates }
    }));
  }, []);

  const addNotification = useCallback((title: string, message: string, type: Notification['type'] = 'SYSTEM') => {
    setState(prev => ({
      ...prev,
      notifications: [
        {
          id: `n-${Date.now()}`,
          title,
          message,
          date: new Date().toISOString(),
          read: false,
          type
        },
        ...prev.notifications
      ]
    }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n)
    }));
  }, []);

  const toggleOffline = useCallback(() => {
    setState(prev => ({ ...prev, isOffline: !prev.isOffline }));
  }, []);

  const resetData = useCallback(() => {
    setState(INITIAL_STATE);
    localStorage.removeItem('gbl_luxury_state');
  }, []);

  const purchaseProduct = useCallback((productId: string, price: number) => {
    setState(prev => {
      if (prev.balance < price) return prev;
      return {
        ...prev,
        balance: prev.balance - price,
        transactions: [
          {
            id: `p-${Date.now()}`,
            type: 'BOUTIQUE',
            amount: -price,
            description: `Compra en Boutique (ID: ${productId})`,
            date: new Date().toISOString()
          },
          ...prev.transactions
        ]
      };
    });
  }, []);

  return (
    <AppContext.Provider value={{
      state,
      recharge,
      addBooking,
      updateBookingStatus,
      convertStars,
      updateProfile,
      addNotification,
      markNotificationRead,
      toggleOffline,
      resetData,
      purchaseProduct
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
