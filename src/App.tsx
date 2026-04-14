import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Droplets, 
  Wrench, 
  Flame, 
  ShieldCheck, 
  Star, 
  Phone, 
  Menu, 
  X, 
  ChevronRight,
  Award,
  CheckCircle2,
  MapPin,
  Mail
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-lg border-b border-slate-200 py-3 shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-600/20">
            <Droplets className="text-white w-6 h-6" />
          </div>
          <span className={cn(
            "font-display font-bold text-xl tracking-tighter transition-colors duration-500",
            isScrolled ? "text-slate-900" : "text-white"
          )}>
            CHUGACH <span className="text-sky-500 font-light">PLUMBING</span>
          </span>
        </div>

        <div className={cn(
          "hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest transition-colors duration-500",
          isScrolled ? "text-slate-600" : "text-white/90"
        )}>
          {['Services', 'About', 'Reviews', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-sky-600 transition-colors">
              {item}
            </a>
          ))}
          <a href="tel:+19075550123" className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border transition-all",
            isScrolled 
              ? "bg-sky-50 border-sky-100 text-sky-700 hover:bg-sky-100" 
              : "bg-white/10 border-white/20 text-white hover:bg-white/20"
          )}>
            <Phone className="w-4 h-4" />
            <span className="font-bold">(907) 555-0123</span>
          </a>
        </div>

        <button className={cn("md:hidden transition-colors duration-500", isScrolled ? "text-slate-900" : "text-white")} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {['Services', 'About', 'Reviews', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-lg font-medium text-slate-600 hover:text-sky-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://picsum.photos/seed/alaska-glacier/1920/1080" 
          alt="Pristine Alaskan Glacier"
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        {/* Bright Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/20 via-transparent to-white" />
        <div className="absolute inset-0 bg-sky-500/5" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-sm">
            Inspiring Alaskan Excellence
          </span>
          <h1 className="text-5xl md:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-lg">
            Crystal Clear <br />
            <span className="text-sky-100">
              Comfort
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow-md">
            Pristine service for the Last Frontier. We bring modern plumbing solutions to Anchorage with the clarity and reliability of an Alaskan morning.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-full shadow-xl shadow-sky-600/30 transition-all flex items-center gap-2 group">
              Schedule Priority Service
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-full border border-white/40 backdrop-blur-md transition-all">
              Explore Our Work
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sky-600"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-sky-600 to-transparent" />
      </motion.div>
    </section>
  );
};

interface ServiceCardProps {
  icon: any;
  title: string;
  description: string;
  delay: number;
  key?: React.Key;
}

const ServiceCard = ({ icon: Icon, title, description, delay }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card p-8 rounded-3xl group hover:bg-white hover:shadow-2xl hover:shadow-sky-900/10 transition-all duration-500 border-sky-100"
  >
    <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-600 transition-colors duration-500">
      <Icon className="w-7 h-7 text-sky-600 group-hover:text-white transition-colors duration-500" />
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-600 leading-relaxed font-light">
      {description}
    </p>
    <div className="mt-8 flex items-center gap-2 text-sky-600 text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
      Learn More <ChevronRight className="w-4 h-4" />
    </div>
  </motion.div>
);

const Services = () => {
  const services = [
    {
      icon: Droplets,
      title: "Emergency Repairs",
      description: "Fast, reliable response when you need it most. We protect your home with the urgency and care it deserves."
    },
    {
      icon: Wrench,
      title: "Modern Upgrades",
      description: "Transform your space with high-efficiency fixtures and contemporary designs tailored for Alaskan living."
    },
    {
      icon: Flame,
      title: "Water Solutions",
      description: "From tankless heaters to advanced filtration, we ensure your water is hot, clean, and always available."
    },
    {
      icon: ShieldCheck,
      title: "System Health",
      description: "Comprehensive maintenance and inspections to keep your home's infrastructure running at peak performance."
    }
  ];

  return (
    <section id="services" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Pristine Solutions <br /> For Every Home
            </h2>
            <p className="text-slate-600 text-lg font-light">
              Inspired by the clarity of our landscapes, we provide plumbing services that bring peace of mind and modern efficiency to your doorstep.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-3xl font-bold text-sky-600">15+</div>
              <div className="text-xs uppercase tracking-widest text-slate-400">Years Exp</div>
            </div>
            <div className="w-[1px] h-12 bg-slate-200" />
            <div className="text-right">
              <div className="text-3xl font-bold text-sky-600">2.5k</div>
              <div className="text-xs uppercase tracking-widest text-slate-400">Projects</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard 
              key={i} 
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={i * 0.1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Trust = () => {
  return (
    <section id="reviews" className="py-32 px-6 relative overflow-hidden bg-sky-50/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-sky-400/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">A Reputation Built on Trust</h2>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-sky-500 text-sky-500" />
            ))}
          </div>
          <p className="text-slate-500 uppercase tracking-[0.3em] text-sm font-bold">Top Rated in Anchorage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Jameson K.",
              role: "Homeowner in Hillside",
              text: "Chugach Plumbing handled our full bathroom remodel. The attention to detail was unlike any contractor I've worked with in Alaska. Truly premium service."
            },
            {
              name: "Sarah M.",
              role: "Business Owner",
              text: "When our restaurant had a major leak at 2 AM, they were here in 30 minutes. Saved us thousands in potential damage. Reliable and professional."
            },
            {
              name: "Robert T.",
              role: "Real Estate Developer",
              text: "The only plumbing company I trust for my luxury builds. Their installations are clean, efficient, and they always meet the deadline."
            }
          ].map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-sky-900/5"
            >
              <p className="text-lg text-slate-600 italic mb-8 font-light leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold">
                  {review.name[0]}
                </div>
                <div>
                  <div className="text-slate-900 font-bold">{review.name}</div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xl">
            <Award className="w-8 h-8 text-sky-600" />
            BBB ACCREDITED
          </div>
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xl">
            <ShieldCheck className="w-8 h-8 text-sky-600" />
            LICENSED & INSURED
          </div>
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xl">
            <CheckCircle2 className="w-8 h-8 text-sky-600" />
            MASTER PLUMBERS
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8">Let's Start <br /> Something New</h2>
            <p className="text-slate-600 text-lg font-light mb-12 leading-relaxed">
              Ready to upgrade your home's comfort? Our team is standing by to provide the expert service you deserve.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center border border-sky-100">
                  <Phone className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Call Us 24/7</div>
                  <div className="text-2xl text-slate-900 font-bold">(907) 555-0123</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center border border-sky-100">
                  <MapPin className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Our Location</div>
                  <div className="text-2xl text-slate-900 font-bold">Anchorage, Alaska</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center border border-sky-100">
                  <Mail className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Email Us</div>
                  <div className="text-2xl text-slate-900 font-bold">service@chugachplumbing.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sky-50/50 p-10 rounded-[3rem] border border-sky-100 shadow-2xl shadow-sky-900/5">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Full Name</label>
                  <input type="text" className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:border-sky-600 transition-colors shadow-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Phone Number</label>
                  <input type="tel" className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:border-sky-600 transition-colors shadow-sm" placeholder="(907) 000-0000" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Service Type</label>
                <select className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:border-sky-600 transition-colors shadow-sm appearance-none">
                  <option>Emergency Repair</option>
                  <option>Installation</option>
                  <option>Maintenance</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Message</label>
                <textarea rows={4} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:border-sky-600 transition-colors shadow-sm" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full py-5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl shadow-lg shadow-sky-600/20 transition-all">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-slate-100 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
              <Droplets className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg tracking-tighter text-slate-900 uppercase">
              Chugach <span className="text-sky-600 font-light">Plumbing</span>
            </span>
          </div>
          
          <div className="flex gap-8 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-sky-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>

          <div className="text-slate-400 text-xs tracking-widest uppercase font-bold">
            © 2024 Chugach Plumbing & Restoration. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-sky-500/20 bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Trust />
      <Contact />
      <Footer />
    </div>
  );
}
