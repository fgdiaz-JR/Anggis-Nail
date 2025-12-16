import React, { useState, useEffect, useRef } from 'react'
import {
  Home,
  List,
  Image,
  Mail,
  Calendar,
  Instagram,
  Phone,
  MapPin,
  Menu,
  X,
  Star,
  ArrowRight,
  Clock,
  Heart,
  CheckCircle,
  Facebook
} from 'lucide-react'

import Button from './components/Button'
import ReservationModal from './components/ReservationModal'
  import ServiceCard from './components/ServiceCard'
  import TestimonialCard from './components/TestimonialCard'
  import { galleryImages, navLinks, giftCards, mission, vision, values } from './data'

  const App = () => { 
    const [scrolled, setScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null); 
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [activeSection, setActiveSection] = useState('home'); // Estado para la navegación activa
    const [mobileOpen, setMobileOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedGift, setSelectedGift] = useState(null);
    // Testimonials carousel state & refs
      // Testimonials carousel state & refs (updated to use the user's logic)
      const scrollRef = useRef(null); // Ref para el contenedor del carrusel
      const [currentIndex, setCurrentIndex] = useState(0); // Índice de la tarjeta activa
      const [isHovering, setIsHovering] = useState(false); // Estado para pausar el scroll

      // Static testimonials data (could be moved to a data file)
      const testimonialData = [
        { name: 'Sofía Rodríguez', rating: 5, text: '¡Increíble atención! Llevé una foto de Pinterest súper complicada y Anggis la replicó a la perfección. El lugar es precioso.' },
        { name: 'Valentina M.', rating: 5, text: 'Soy súper exigente con la limpieza y este salón superó mis expectativas. Todo esterilizado y abren los paquetes frente a ti.' },
        { name: 'Camila Torres', rating: 4, text: 'Me hice las Soft Gel y me duraron 4 semanas intactas. Me encanta que tengan tanta variedad de colores y glitters.' },
        { name: 'José Martínez', rating: 5, text: 'Gran servicio a domicilio. Llegó puntual y dejó todo impecable. Recomendado para hombres que buscan cuidado profesional.' },
        { name: 'Andrés G.', rating: 4, text: 'Primera vez pidiendo una manicura para caballeros — el resultado superó lo esperado y la atención fue muy amable.' },
        { name: 'Mariana López', rating: 5, text: 'Compré una gift card como regalo y la experiencia de canje fue facilísima. Mi amiga quedó encantada.' },
        { name: 'Carlos R.', rating: 5, text: 'La gift card fue un regalo perfecto. La reserva por WhatsApp fue rápida y clara.' },
        { name: 'Lucía P.', rating: 5, text: 'Me encanta cómo personalizan los diseños. Volveré con una gift card para regalar a mi mamá.' },
        { name: 'Diego S.', rating: 4, text: 'Servicio profesional, buen tiempo de respuesta y resultados duraderos. Ideal también para hombres.' },
      ];

      // Estilos para ocultar la barra de desplazamiento horizontal (usados en JSX)
      const hideScrollbarStyle = `
        /* Custom CSS para ocultar la barra de desplazamiento horizontal del carrusel */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `;

      // 1) Intervalo que actualiza el índice (cada 4 segundos)
      // Si el usuario está interactuando (hover o touch), no se actualiza el índice
      useEffect(() => {
        if (isHovering) return; // pausa autoplay mientras el usuario interacciona

        const intervalId = setInterval(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % testimonialData.length);
        }, 4000); // 4000ms = 4s

        return () => clearInterval(intervalId); // limpieza del intervalo
      }, [isHovering, testimonialData.length]);

      // 2) Efecto que desplaza la vista al índice actual (solo desplazamiento HORIZONTAL)
      useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        const child = container.children[currentIndex];
        if (!child) return;
        // Calcula la posición izquierda para centrar el hijo dentro del contenedor
        const left = child.offsetLeft - (container.clientWidth - child.clientWidth) / 2;
        container.scrollTo({ left, behavior: 'smooth' });
      }, [currentIndex]);

      // Helper para desplazar al índice usando el ref del contenedor
      const scrollToIndex = (index) => {
        const container = scrollRef.current;
        if (!container) return;
        const child = container.children[index];
        if (!child) return;
        child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        setCurrentIndex(index);
      };
    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Observer para detectar la sección visible y activar el ícono en la barra inferior
    useEffect(() => {
      const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Detecta cuando el centro de la sección está visible
        threshold: 0, 
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, observerOptions);

      // Observa todas las secciones con ID para la navegación
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => observer.observe(section));

      return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    // Al seleccionar una Gift Card, hacer scroll suave al formulario de solicitud
    useEffect(() => {
      if (selectedGift) {
        // pequeño timeout para esperar al render del nodo
        setTimeout(() => {
          const el = document.getElementById('gift-request');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 80);
      }
    }, [selectedGift]);


    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-purple-200 selection:text-purple-900">
      
        {/* --- NAVBAR SUPERIOR (Solo Desktop) --- */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-6'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-12 md:h-16">
              {/* Logo */}
              <a href="#home" className="flex-shrink-0 flex items-center gap-3">
                <img src="./images/Anggis_Nails_logo_-removebg-preview.png" alt="Anggis Nails" className="w-14 h-14 md:w-16 md:h-16 object-contain" />
                <div>
                  <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                    ANGGIS
                  </span>
                  <span className="block text-[10px] text-purple-600 tracking-[0.2em] uppercase font-bold -mt-1 ml-0.5">Nails</span>
                </div>
              </a>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors relative group">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
                <Button primary className="px-5 py-2 text-sm" onClick={() => setModalOpen(true)}>Reservar</Button>
              </div>
            
              {/* Botón hamburguesa móvil */}
              <div className="md:hidden">
                <button
                  aria-label="Abrir menú"
                  onClick={() => setMobileOpen(true)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile slide-over menu */}
        <div className={`fixed inset-0 z-50 ${mobileOpen ? 'block' : 'pointer-events-none'}`} aria-hidden={!mobileOpen}>
          {/* backdrop */}
          <div className={`backdrop ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)}></div>

          {/* drawer */}
          <aside className={`drawer ${mobileOpen ? 'open' : ''}`}>
            <div className="p-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                <div>
                  <div className="font-extrabold">ANGGIS</div>
                  <div className="text-xs text-purple-600">Nails</div>
                </div>
              </div>
              <button aria-label="Cerrar" onClick={() => setMobileOpen(false)} className="p-2 rounded-md hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <nav className="p-4 space-y-4">
                <a href="#home" onClick={() => setMobileOpen(false)} className="block text-slate-700 font-medium">Inicio</a>
              <a href="#services" onClick={() => setMobileOpen(false)} className="block text-slate-700 font-medium">Servicios</a>
              <a href="#gallery" onClick={() => setMobileOpen(false)} className="block text-slate-700 font-medium">Galería</a>
              <a href="#giftcards" onClick={() => setMobileOpen(false)} className="block text-slate-700 font-medium">Gift Cards</a>
              <a href="#booking-policy" onClick={() => setMobileOpen(false)} className="block text-slate-700 font-medium">Política de Citas</a>
              <a href="#contact" onClick={() => setMobileOpen(false)} className="block text-slate-700 font-medium">Contacto</a>

              <div className="pt-4">
                <Button primary onClick={() => { setMobileOpen(false); setModalOpen(true); }}>Reservar</Button>
              </div>
            </nav>
          </aside>
        </div>

        {/* --- HERO SECTION --- */}
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Fondos abstractos (Toque juvenil) */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-200 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-purple-200 rounded-full blur-[80px] opacity-40"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white rounded-full border border-purple-100 shadow-sm animate-bounce-slow">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
                <span className="text-slate-600 font-semibold text-xs tracking-wide uppercase">Nueva colección de Verano</span>
              </div>
            
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                Tus uñas son el lienzo de <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 bg-300% animate-gradient">
                  tu personalidad.
                </span>
              </h1>
            
              <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto">
                Cuidamos de ti en casa: comodidad, cariño y profesionalismo para que salgas lista y feliz.
              </p>
            
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button primary onClick={() => setModalOpen(true)}>
                  <Calendar size={18} />
                  Agendar Cita
                </Button>
                <a href="https://www.instagram.com/anggis.nails?igsh=MTM5dXdicnVpdzZ1YQ==" target="_blank" rel="noopener noreferrer">
                  <Button>
                    <Instagram size={18} />
                    Ver Portafolio
                  </Button>
                </a>
              </div>

              {/* Features strip */}
              <div className="mt-16 flex flex-wrap justify-center gap-8 text-slate-400 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-purple-500" /> Productos premium que cuidan tus uñas
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-purple-500" /> Esterilización con estándares médicos
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-purple-500" /> Satisfacción garantizada (7 días)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section id="services" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Menú de Servicios</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto rounded-full mb-4"></div>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Calidad y estilo en cada detalle. Todos nuestros servicios incluyen manicura rusa (limpieza profunda de cutícula).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard title="Manicure" price="$13.000" duration="30 min" description="Cuidado completo de la uña: limado, cuidado de cutículas, hidratación y esmaltado." />
              <ServiceCard title="Pedicure" price="$15.000" duration="50 min" description="Cuidado de pies: remojo, exfoliación, eliminación de durezas, hidratación y esmaltado." />
              <ServiceCard title="Manicure y Pedicure" price="$25.000" duration="80 min" description="Servicio combinado que incluye los pasos completos de manicure y pedicure." />
              <ServiceCard title="Manicure Semipermanente" price="$45.000" duration="60 min" description="Manicure con esmalte semipermanente curado en lámpara UV/LED para mayor duración y brillo." popular={true} />
              <ServiceCard title="Pedicure Semipermanente" price="$35.000" duration="60 min" description="Pedicure con esmalte semipermanente: acabado duradero y resistente al desgaste." />
              <ServiceCard title="Acrílicas con Tips + Semipermanente" price="$75.000" duration="120 min" description="Extensión con tips y acrílico: se moldean y se sellan con semipermanente para mayor resistencia." />
              <ServiceCard title="Uñas Acrílicas Esculpidas" price="$70.000" duration="120 min" description="Extensión esculpida profesionalmente sobre molde para una forma personalizada y durable." popular={true} />
              <ServiceCard title="Acrílicas Esculpidas + Semipermanente" price="$95.000" duration="150 min" description="Uñas esculpidas con sellado semipermanente que ofrece un acabado extra duradero." />
              <ServiceCard title="Baño de Acrílico (Uña Natural)" price="$50.000" duration="50 min" description="Aplicación de baño de acrílico sobre la uña natural para fortalecer y darle brillo sin extensiones." />
              <ServiceCard title="Baño de Acrílico + Semipermanente" price="$70.000" duration="80 min" description="Baño de acrílico con sellado semipermanente para mayor durabilidad y brillo intenso." />
              <ServiceCard title="Retoque Uñas Acrílicas" price="$50.000" duration="60 min" description="Mantenimiento de acrílicas: rellenado del crecimiento, nivelado y reparaciones necesarias." />
              <ServiceCard title="Uñas Press On" price="$80.000" duration="60 min" description="Aplicación y personalización de uñas press-on, ajuste perfecto y diseño incluido." />
              <ServiceCard title="Dipping" price="$65.000" duration="80 min" description="Sistema dipping con polvo acrílico para un acabado resistente y con aspecto natural, sin necesidad de lámpara UV." />
            </div>
          </div>
        </section>

        {/* --- BANNER VISUAL (Estilo Juvenil con Galería Dinámica) --- */}
        <section id="gallery" className="py-24 bg-slate-900 text-white relative overflow-hidden group">
          {/* Patrón de fondo */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="mb-12">
              <Instagram className="mx-auto mb-4 text-purple-400" size={40} />
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Inspiración y Diseños Recientes</h2>
              <p className="text-purple-200 text-lg">Explora nuestro portafolio. ¡Pasa el mouse sobre una imagen para verla!</p>
            </div>
            
            {/* --- Galería de Imagen Dinámica --- */}
            <div className="flex justify-center max-w-7xl mx-auto h-[400px] overflow-hidden rounded-3xl shadow-2xl shadow-purple-500/30">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  // usamos flex-basis para controlar cuánto crece cada barra (menos agresivo que w-full)
                  style={{ flex: hoveredIndex === index ? '0 0 35%' : '0 0 48px' }}
                  className={`h-full flex-shrink-0 relative rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${index > 0 ? 'ml-1' : ''}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className={`w-full h-full object-cover border-2 border-purple-500 transition-transform duration-500 ${hoveredIndex === index ? 'shadow-xl shadow-purple-500/50 saturate-100 scale-100' : 'grayscale hover:grayscale-0 scale-[0.98]'}`}
                    style={{ transformOrigin: 'center' }}
                  />
                </div>
              ))}
            </div>
            {/* --- Fin Galería de Imagen Dinámica --- */}
            {lightboxOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setLightboxOpen(false)}>
                <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow" onClick={() => setLightboxOpen(false)}>
                    <X size={18} />
                  </button>
                  <img src={galleryImages[lightboxIndex ?? 0].url} alt={galleryImages[lightboxIndex ?? 0].alt} className="w-full max-h-[90vh] object-contain rounded-xl mx-auto" />
                </div>
              </div>
            )}
            <div className="mt-6 text-center">
              <a href="https://www.instagram.com/anggis.nails?igsh=MTM5dXdicnVpdzZ1YQ==" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-slate-900 hover:bg-purple-50 border-none mx-auto">
                  Ver Feed Completo
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* --- GIFT CARDS --- */}
        <section id="giftcards" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900">Gift Cards</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto rounded-full mb-4"></div>
              <p className="text-slate-500 max-w-2xl mx-auto">Regala bienestar: tarjetas digitales canjeables para nuestros servicios más destacados. Selecciona la que prefieras y te mostramos cómo solicitarla.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {giftCards.map((g) => (
                <div key={g.id} className="bg-slate-50 p-6 rounded-2xl shadow-md">
                  <h3 className="text-lg font-bold text-slate-900">{g.name}</h3>
                  <p className="text-slate-500 mt-2 text-sm">{g.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold text-slate-800">{g.price}</span>
                    <Button onClick={() => setSelectedGift(g)}>Solicitar</Button>
                  </div>
                </div>
              ))}
            </div>

            {selectedGift && (
              <div id="gift-request" className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold">Solicitar: {selectedGift.name}</h4>
                    <p className="text-slate-500 text-sm mt-1">Si te gusta esta Gift Card, copia el mensaje o ábrelo en WhatsApp — te responderemos pronto para coordinar la entrega.</p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600" onClick={() => setSelectedGift(null)}>Cerrar</button>
                </div>

                <div className="mt-4">
                  <label className="block text-xs text-slate-500 mb-1">Mensaje sugerido (puedes editarlo)</label>
                  <textarea readOnly rows={2} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-md text-sm" value={`Hola, quiero solicitar una Gift Card: ${selectedGift.name}`} />
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm"
                      onClick={() => {
                        const msg = `Hola, quiero solicitar una Gift Card: ${selectedGift.name}`;
                        if (navigator && navigator.clipboard) {
                          navigator.clipboard.writeText(msg);
                          alert('Mensaje copiado al portapapeles.');
                        } else {
                          alert(`Copia este mensaje: ${msg}`);
                        }
                      }}
                    >Copiar mensaje</button>

                    <a href={`https://wa.me/573174925427?text=${encodeURIComponent(`Hola, quiero solicitar una Gift Card: ${selectedGift.name}`)}`} className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full text-sm hover:bg-purple-50">Abrir WhatsApp</a>
                  </div>
                  <p className="text-xs text-slate-400 mt-3">Número de contacto: <strong>+57 317 4925427</strong> — te respondemos por WhatsApp lo antes posible.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* --- POLÍTICA DE CITA --- */}
        <section id="booking-policy" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Política de Cita</h2>
                  <p className="text-slate-500">Para que tu experiencia sea perfecta y puntual, por favor ten en cuenta lo siguiente:</p>
              <ul className="list-disc pl-5 mt-4 text-slate-500 space-y-2">
                <li>Reservas por WhatsApp o teléfono. Te confirmamos la cita en breve.</li>
                <li>Si necesitas cambiar o cancelar, avísanos con al menos 24 horas de antelación.</li>
                <li>Para el servicio a domicilio, prepara un espacio limpio y con buena luz para trabajar cómodamente.</li>
                <li>Si no es posible realizar la visita por falta de acceso o aviso tardío, podríamos aplicar una tarifa de desplazamiento.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- ABOUT: MISSION, VISION, VALUES --- */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Nosotros</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Conoce la esencia de Anggis Nails: nuestra misión, visión y los valores que nos guían.</p>
            </div>

            {/* Mission and Vision */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Mission */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Heart className="text-purple-600" size={28} />
                  {mission.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">{mission.description}</p>
              </div>

              {/* Vision */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Star className="text-blue-600" size={28} />
                  {vision.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">{vision.description}</p>
              </div>
            </div>

            {/* Values */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Nuestros Valores</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                    <h4 className="text-lg font-bold text-purple-600 mb-3 flex items-center gap-2">
                      <CheckCircle size={20} />
                      {value.name}
                    </h4>
                    <p className="text-slate-700 text-sm leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12">
               <div className="max-w-lg">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Clientes Felices</h2>
                  <p className="text-slate-500">No solo hacemos uñas: cuidamos de ti. Aquí compartimos lo que nuestras clientas dicen sobre su experiencia.</p>
               </div>
               <div className="flex gap-2 mt-4 md:mt-0">
                 <div className="flex text-yellow-400">
                   {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                 </div>
                 <span className="font-bold text-slate-800">4.9/5.0</span>
                 <span className="text-slate-400">(500+ Reseñas)</span>
               </div>
             </div>

             {/* Carousel de testimonios */}
             <div className="relative">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-slate-900">Historias reales</h3>
                 <div className="hidden md:flex items-center gap-2">
                   <button aria-label="Prev" className="p-2 rounded-full bg-white shadow" onClick={() => {
                     const prev = (currentIndex - 1 + testimonialData.length) % testimonialData.length;
                     scrollToIndex(prev);
                   }}>
                     ‹
                   </button>
                   <button aria-label="Next" className="p-2 rounded-full bg-white shadow" onClick={() => {
                     const next = (currentIndex + 1) % testimonialData.length;
                     scrollToIndex(next);
                   }}>
                     ›
                   </button>
                 </div>
               </div>

               {/* Añadimos estilos inline para ocultar la scrollbar horizontal */}
               <style>{hideScrollbarStyle}</style>

               {/* Carousel viewport: overflow-x con snap; pausa autoplay mientras el usuario interacciona */}
               <div
                 ref={scrollRef}
                 onMouseEnter={() => setIsHovering(true)}
                 onMouseLeave={() => setIsHovering(false)}
                 onTouchStart={() => setIsHovering(true)}
                 onTouchEnd={() => setIsHovering(false)}
                 className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 py-2"
               >
                 {testimonialData.map((t, i) => (
                   <div key={i} className="snap-center flex-shrink-0 w-[86%] md:w-[32%]">
                     <TestimonialCard name={t.name} rating={t.rating} text={t.text} />
                   </div>
                 ))}
               </div>

               <div className="mt-4 flex items-center justify-center gap-2">
                 {testimonialData.map((_, i) => (
                   <button key={i} onClick={() => { scrollToIndex(i); }} className={`w-2 h-2 rounded-full ${currentIndex === i ? 'bg-purple-600' : 'bg-slate-300'}`}></button>
                 ))}
               </div>
             </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer id="contact" className="bg-white border-t border-slate-200 pt-16 pb-8 mb-16 md:mb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
              {/* Info Marca */}
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold text-slate-900">ANGGIS</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Cuidamos tus uñas con técnica profesional y mucho cariño — servicio a domicilio para tu comodidad.
                </p>
                <div className="flex gap-4 pt-2">
                  <a href="https://www.instagram.com/anggis.nails?igsh=MTM5dXdicnVpdzZ1YQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.facebook.com/share/1BoFtUFzLv/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-colors">
                    <Facebook size={20} />
                  </a>
                  <a href="mailto:anggis.nails@example.com" className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-colors">
                    <Mail size={20} />
                  </a>
                </div>
              </div>

              {/* Enlaces */}
              <div>
                <h4 className="font-bold text-slate-900 mb-6">Explorar</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#services" className="text-slate-500 hover:text-purple-600 transition-colors">Nuestros Servicios</a></li>
                  <li><a href="#gallery" className="text-slate-500 hover:text-purple-600 transition-colors">Galería de Diseños</a></li>
                  <li><a href="#giftcards" className="text-slate-500 hover:text-purple-600 transition-colors">Gift Cards</a></li>
                  <li><a href="#booking-policy" className="text-slate-500 hover:text-purple-600 transition-colors">Política de Citas</a></li>
                </ul>
              </div>

              {/* Contacto */}
              <div>
                <h4 className="font-bold text-slate-900 mb-6">Visítanos</h4>
                  <ul className="space-y-4 text-sm">
                    <li className="text-slate-500">
                      Trabajamos únicamente a domicilio — no contamos con local físico.
                    </li>
                    <li className="flex items-center text-slate-500 group">
                      <Phone size={18} className="mr-3 text-purple-600 flex-shrink-0" />
                      <span className="group-hover:text-purple-600 transition-colors">+57 317 4925427</span>
                    </li>
                    <li className="flex items-center text-slate-500">
                      <Clock size={18} className="mr-3 text-purple-600 flex-shrink-0" />
                      <span>Lun - Sab: 9:00 AM - 7:00 PM</span>
                    </li>
                  </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="font-bold text-slate-900 mb-6">Newsletter</h4>
                <p className="text-slate-500 text-sm mb-4">Recibe 10% OFF en tu primera cita al suscribirte.</p>
                <div className="flex shadow-sm rounded-lg overflow-hidden">
                  <input 
                    type="email" 
                    placeholder="Tu email" 
                    className="flex-1 px-4 py-2.5 bg-slate-50 border-none focus:ring-2 focus:ring-purple-500 outline-none text-sm" 
                  />
                  <button className="bg-purple-600 text-white px-4 hover:bg-purple-700 transition-colors">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

              <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
              <p>&copy; {new Date().getFullYear()} Anggis Nails. Todos los derechos reservados.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-purple-600">Privacidad</a>
                <a href="#" className="hover:text-purple-600">Términos</a>
              </div>
            </div>
          </div>
        </footer>
      
        {/* --- MOBILE BOTTOM NAVIGATION BAR (md:hidden) --- */}
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] z-[100] md:hidden">
            <div className="flex justify-around items-center h-full">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  // Some entries in `navLinks` may not provide an `Icon`.
                  // Use a safe fallback (Home) to avoid trying to render `undefined`.
                  const IconComponent = link.Icon || Home;
                
                  return (
                    <a 
                        key={link.name} 
                        href={link.href} 
                        className={`
                            flex flex-col items-center justify-center w-full transition-all duration-300 relative 
                            ${isActive ? 'text-purple-600' : 'text-slate-500 hover:text-purple-400'}
                        `}
                    >
                        {/* Indicador Activo (El toque juvenil/trendy) */}
                          {isActive && (
                          <div className="absolute top-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-b-full"></div>
                        )}

                        {/* Icono */}
                        <IconComponent size={22} className={`transition-transform duration-300 ${isActive ? 'scale-110 mb-0.5' : 'mb-0.5'}`} />
                      
                        {/* Texto */}
                        <span className={`text-[10px] font-semibold transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                          {link.name}
                        </span>
                    </a>
                )})}
            </div>
        </div>
        {/* --- FIN BARRA DE NAVEGACIÓN MÓVIL --- */}

        <ReservationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    );
  };

export default App;
