import { AppState } from '../types';
import tinturadoImg from '../assets/images/tinturado.png';
import serumCapilarImg from '../assets/images/serum_capilar.png';
import hidratacionManosImg from '../assets/images/hidratacion_manos.png';
import cremaFacialImg from '../assets/images/crema_facial.png';

export const INITIAL_STATE: AppState = {
  balance: 1240.50,
  stars: 450,
  profile: {
    name: 'María García',
    level: 'GOLD',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    allergies: 'Ninguna declarada',
    nailPolish: 'OPI-G13 Nude Gold',
    hairFormula: '7.3 + 8.1 / 20 vol.',
    birthday: '1992-05-15',
  },
  bookings: [
    {
      id: '1',
      service: 'Manicure Luxury',
      specialist: 'Elena R.',
      date: '2026-11-20',
      time: '14:00',
      status: 'PENDING',
      price: 45
    }
  ],
  transactions: [
    { 
      id: 't1', 
      type: 'RECHARGE', 
      amount: 500, 
      description: 'Recarga inicial', 
      date: new Date().toISOString() 
    }
  ],
  notifications: [
    {
      id: 'n1',
      title: '¡Bienvenida!',
      message: 'Disfruta de tu experiencia Gold Beauty Lounge.',
      date: new Date().toISOString(),
      read: false,
      type: 'SYSTEM'
    }
  ],
  diary: [
    {
      id: 'd1',
      service: 'Manicure Luxury',
      date: '2026-10-15',
      beforeImg: hidratacionManosImg,
      afterImg: hidratacionManosImg,
      formula: 'Base Coat + 2 capas Nude Gold + Top'
    }
  ],
  cart: [],
  isOffline: false,
};

export const PRODUCTS = [
  { 
    id: 'p1', 
    name: 'Shampoo Sin Sulfatos', 
    price: 35.00, 
    description: 'Cuidado profesional para cabello tinturado.', 
    image: tinturadoImg
  },
  { 
    id: 'p2', 
    name: 'Sérum Capilar Oro', 
    price: 45.00, 
    description: 'Brillo instantáneo y nutrición profunda.', 
    image: serumCapilarImg
  },
  { 
    id: 'p3', 
    name: 'Aceite de Cutículas', 
    price: 18.00, 
    description: 'Hidratación intensa para tus uñas.', 
    image: hidratacionManosImg
  },
  { 
    id: 'p4', 
    name: 'Crema Facial Noche', 
    price: 65.00, 
    description: 'Regeneración celular nocturna.', 
    image: cremaFacialImg
  },
];