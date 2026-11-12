export type UserLevel = 'GOLD' | 'GOLD SILVER' | 'GOLD PLATINUM VIP';

export interface UserProfile {
  name: string;
  level: UserLevel;
  avatar: string;
  allergies: string;
  nailPolish: string;
  hairFormula: string;
  birthday: string;
}

export interface Booking {
  id: string;
  service: string;
  specialist: string;
  date: string;
  time: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  price: number;
  offPeak?: boolean;
  customization?: {
    drink: string;
    quietChair: boolean;
  };
}

export interface Transaction {
  id: string;
  type: 'RECHARGE' | 'PAYMENT' | 'CONVERSION' | 'GIFT_CARD' | 'BOUTIQUE';
  amount: number;
  description: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface DiaryEntry {
  id: string;
  service: string;
  date: string;
  beforeImg: string;
  afterImg: string;
  formula: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'BOOKING' | 'PROMO' | 'WALLET' | 'SYSTEM';
}

export interface AppState {
  balance: number;
  stars: number;
  profile: UserProfile;
  bookings: Booking[];
  transactions: Transaction[];
  notifications: Notification[];
  diary: DiaryEntry[];
  cart: string[]; // Product IDs
  isOffline: boolean;
}
