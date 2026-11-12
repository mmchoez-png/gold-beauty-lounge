import manicureImg from '../../assets/images/hidratacion_manos.png';
import stylingImg from '../../assets/images/promo_styling_luxury_1794274844217.jpg';
import facialImg from '../../assets/images/promo_aesthetic_luxury_1794274844162.jpg';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, User, Calendar, Clock, Coffee, 
  ChevronRight, ArrowLeft, CheckCircle2,
  VolumeX, Sparkles, MapPin, Users
} from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/src/context/AppContext';
import { cn } from '@/src/lib/utils';
import { Button, Card, Badge } from '@/src/components/ui';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const services = [
  { id: 'manicure', label: 'Manicure Luxury', duration: '60 min', price: 45, img: manicureImg },
  { id: 'hair', label: 'Estilismo Premium', duration: '90 min', price: 85, img: stylingImg },
  { id: 'facial', label: 'Tratamiento Facial', duration: '45 min', price: 65, img: facialImg },
];

const specialists = [
  { id: 'elena', name: 'Elena R.', role: 'Senior Nail Artist', rating: 4.9, bio: 'Especialista en arte minimalista y cuidado de uñas naturales.' },
  { id: 'carlos', name: 'Carlos M.', role: 'Master Stylist', rating: 5.0, bio: 'Experto en colorimetría y cortes de vanguardia.' },
  { id: 'sofia', name: 'Sofia L.', role: 'Facial Expert', rating: 4.8, bio: 'Tratamientos rejuvenecedores con tecnología avanzada.' },
];

const timeSlots = [
  { time: '09:00', offPeak: true },
  { time: '10:00', offPeak: true },
  { time: '11:00', offPeak: false },
  { time: '12:00', offPeak: false },
  { time: '14:00', offPeak: false },
  { time: '15:00', offPeak: false },
  { time: '16:00', offPeak: true },
  { time: '17:00', offPeak: true },
];

export function BookingModal({ isOpen, onClose, initialService }: BookingModalProps) {
  const { addBooking, addNotification } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: initialService || '',
    type: 'Individual',
    specialist: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    drink: 'Mimosa',
    quietChair: false
  });

  const handleConfirm = () => {
    addBooking({
      service: formData.service,
      specialist: formData.specialist,
      date: formData.date,
      time: formData.time,
      price: services.find(s => s.label === formData.service)?.price || 0,
      customization: {
        drink: formData.drink,
        quietChair: formData.quietChair
      }
    });
    addNotification('Cita Confirmada', `Tu cita para ${formData.service} ha sido agendada.`, 'BOOKING');
    onClose();
    setTimeout(() => setStep(1), 500);
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
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md rounded-t-[40px] bg-white p-8 shadow-2xl h-[90vh] flex flex-col"
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 h-1.5 w-12 rounded-full bg-charcoal/10" />

            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="h-10 w-10 flex items-center justify-center rounded-full bg-cream text-charcoal">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                <div>
                  <h2 className="text-sm font-bold tracking-widest text-charcoal uppercase">Reserva</h2>
                  <p className="text-[10px] text-bronze font-bold tracking-wider">PASO {step} DE 4</p>
                </div>
              </div>
              <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-charcoal">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
              {/* Step 1: Service Type & Service */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex p-1 bg-cream rounded-2xl">
                    {['Individual', 'Beauty Party'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setFormData({ ...formData, type: t })}
                        className={cn(
                          "flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                          formData.type === t ? "bg-white text-charcoal shadow-sm" : "text-charcoal/40"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-charcoal">Elige un Servicio</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setFormData({ ...formData, service: s.label }); setStep(2); }}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-3xl border transition-all text-left group",
                          formData.service === s.label ? "border-bronze bg-cream" : "border-gold/10 bg-white"
                        )}
                      >
                        <img src={s.img} alt={s.label} className="h-16 w-16 rounded-2xl object-cover" />
                        <div className="flex-1">
                          <p className="font-bold text-charcoal">{s.label}</p>
                          <p className="text-[10px] text-charcoal/40 uppercase tracking-widest">{s.duration} • ${s.price}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-white border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ChevronRight className="h-5 w-5 text-bronze" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Specialists */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-charcoal">Especialista Favorito</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {specialists.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setFormData({ ...formData, specialist: s.name }); setStep(3); }}
                        className={cn(
                          "p-5 rounded-[32px] border transition-all text-left",
                          formData.specialist === s.name ? "border-bronze bg-cream" : "border-gold/10 bg-white shadow-sm"
                        )}
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className="h-14 w-14 rounded-full bg-bronze/10 flex items-center justify-center text-bronze font-bold text-lg border border-gold/30">
                            {s.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-charcoal">{s.name}</p>
                            <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold">{s.role}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-bronze">{s.rating}</span>
                              <Sparkles className="h-3 w-3 text-bronze fill-bronze" />
                            </div>
                            <span className="text-[8px] font-bold text-charcoal/40 uppercase">Portafolio</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-charcoal/60 leading-relaxed italic">{s.bio}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-charcoal">Fecha y Hora</h3>
                  <div className="bg-cream p-4 rounded-3xl border border-gold/20 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="h-4 w-4 text-bronze" />
                      <span className="text-[10px] font-bold text-charcoal uppercase tracking-widest">Seleccionar Día</span>
                    </div>
                    <div className="flex justify-between">
                      {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                        <div key={i} className={cn(
                          "flex flex-col items-center gap-2 p-2 rounded-xl transition-all",
                          i === 2 ? "bg-bronze text-white shadow-md" : "text-charcoal/40"
                        )}>
                          <span className="text-[8px] font-bold">{d}</span>
                          <span className="text-xs font-bold">{15 + i}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setFormData({ ...formData, time: slot.time })}
                        className={cn(
                          "flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all relative overflow-hidden",
                          formData.time === slot.time 
                            ? "border-bronze bg-cream shadow-md" 
                            : "border-gold/10 bg-white"
                        )}
                      >
                        <span className="text-xs font-bold text-charcoal">{slot.time}</span>
                        {slot.offPeak && (
                          <span className="text-[6px] font-bold text-bronze uppercase bg-gold/20 px-1 rounded-sm mt-1">Hora Baja</span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="p-5 rounded-3xl bg-charcoal/5 border-2 border-dashed border-gold/30">
                    <div className="flex items-center gap-3 mb-1">
                      <Clock className="h-4 w-4 text-bronze" />
                      <p className="text-xs font-bold text-charcoal">¿No encuentras horario?</p>
                    </div>
                    <p className="text-[10px] text-charcoal/40 mb-3">Activa la lista de espera para este día.</p>
                    <Button variant="outline" size="sm" fullWidth>Activar Lista de Espera</Button>
                  </div>
                </div>
              )}

              {/* Step 4: Customization */}
              {step === 4 && (
                <div className="space-y-8">
                  <h3 className="text-lg font-bold text-charcoal">Cita a tu Medida</h3>
                  
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest block">Bebida de cortesía</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Mimosa', 'Espresso', 'Té relajante', 'Agua infusionada'].map((d) => (
                        <button
                          key={d}
                          onClick={() => setFormData({ ...formData, drink: d })}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl border text-[11px] font-bold transition-all",
                            formData.drink === d ? "border-bronze bg-cream shadow-sm" : "border-gold/10 bg-white"
                          )}
                        >
                          <Coffee className={cn("h-4 w-4", formData.drink === d ? "text-bronze" : "text-gold")} />
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-3xl bg-cream border border-gold/20 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        <VolumeX className="h-6 w-6 text-bronze" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-charcoal">Cita Silenciosa</p>
                        <p className="text-[8px] text-charcoal/40 uppercase font-bold">Quiet Chair Experience</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setFormData({ ...formData, quietChair: !formData.quietChair })}
                      className={cn(
                        "h-7 w-12 rounded-full p-1 transition-colors",
                        formData.quietChair ? "bg-bronze" : "bg-charcoal/10"
                      )}
                    >
                      <div className={cn("h-5 w-5 rounded-full bg-white transition-transform shadow-sm", formData.quietChair && "translate-x-5")} />
                    </button>
                  </div>

                  <Card variant="dark" className="p-6" withBorder={false}>
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="h-4 w-4 text-gold" />
                      <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">Ubicación Seleccionada</p>
                    </div>
                    <p className="text-xs font-bold">Gold Beauty Lounge - Sede Central</p>
                    <p className="text-[10px] text-white/40">Vía Samborondón Km 1.5, Plaza Lagos</p>
                  </Card>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gold/10">
              {step === 3 && (
                <Button 
                  fullWidth 
                  disabled={!formData.time} 
                  onClick={() => setStep(4)}
                >
                  Personalizar Experiencia
                </Button>
              )}
              {step === 4 && (
                <Button fullWidth onClick={handleConfirm}>
                  Confirmar Reserva Premium
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
