import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Plus, 
  User, 
  ShoppingBag,
  Diamond as DiamondIcon,
  CircleDot,
  Gem,
  Coins,
  LayoutGrid,
  Search,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { MOCK_DIAMONDS } from "./data/mockDiamonds";
import { DiamondCard } from "./components/DiamondCard";
import { SellModal } from "./components/SellModal";
import { Hero } from "./components/Hero";

const CATEGORIES = [
  { id: "all", name: "All Vault", icon: LayoutGrid },
  { id: "loose", name: "Loose Diamonds", icon: DiamondIcon },
  { id: "ring", name: "Engagement", icon: CircleDot },
  { id: "jewelry", name: "Fine Jewelry", icon: Gem },
  { id: "investment", name: "Investment", icon: Coins },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  const filteredDiamonds = useMemo(() => {
    return MOCK_DIAMONDS.filter(d => {
      const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "all" || d.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleViewDetails = (id: string) => {
    toast.info("Viewing details for " + id, {
      description: "Full certification details and high-res imagery loading...",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-sky-500/30 selection:text-sky-400">
      <Toaster position="top-right" richColors theme="dark" />
      <SellModal isOpen={isSellModalOpen} onClose={() => setIsSellModalOpen(false)} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => { setActiveCategory("all"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center group-hover:rotate-[15deg] transition-transform duration-500 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                <DiamondIcon className="w-6 h-6 text-zinc-950 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none">DIAMOND</span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-sky-400 leading-none mt-1">VENTURE</span>
              </div>
            </motion.div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {['Marketplace', 'Auctions', 'Certification', 'About'].map((item) => (
                <button key={item} className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-sky-400 transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative group mr-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-sky-400 transition-colors" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..." 
                className="w-48 bg-zinc-900/50 border-zinc-800 h-9 pl-9 rounded-full text-xs focus:w-64 transition-all"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-sky-400">
              <ShoppingBag className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-sky-400">
              <User className="w-5 h-5" />
            </Button>
            <Button 
              onClick={() => setIsSellModalOpen(true)}
              className="bg-zinc-100 hover:bg-sky-500 text-zinc-950 font-black rounded-full px-6 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 mr-2" />
              SELL
            </Button>
          </div>

          <button 
            className="md:hidden p-2 text-zinc-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-zinc-950 pt-24 px-6 md:hidden"
          >
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-4">
                {['Marketplace', 'Auctions', 'Appraisals', 'Account'].map((item) => (
                  <Button key={item} variant="ghost" className="justify-between h-16 text-xl font-black tracking-tight border-b border-white/5 rounded-none px-0">
                    {item}
                    <ArrowRight className="w-5 h-5 text-sky-500" />
                  </Button>
                ))}
              </div>
              <Button 
                onClick={() => { setIsSellModalOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full bg-sky-500 text-zinc-950 h-16 text-lg font-black rounded-2xl"
              >
                List Your Diamond
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />

        {/* Category Bar */}
        <section className="bg-zinc-950 sticky top-20 z-30 border-b border-white/5 py-6 backdrop-blur-md bg-zinc-950/90">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 p-1.5 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeCategory === cat.id 
                        ? "bg-sky-500 text-zinc-950 shadow-lg shadow-sky-500/20" 
                        : "text-zinc-500 hover:text-zinc-200"
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
                THE VAULT <span className="text-zinc-500 font-normal">/ {activeCategory.replace('_', ' ')}</span>
              </h2>
              <p className="text-zinc-500 font-medium">
                Showing {filteredDiamonds.length} exceptional pieces authenticated by our experts.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-1">Global Market Price</p>
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  +2.45% (24H)
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredDiamonds.length > 0 ? (
                filteredDiamonds.map((diamond) => (
                  <DiamondCard 
                    key={diamond.id} 
                    diamond={diamond} 
                    onView={handleViewDetails} 
                  />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-32 text-center"
                >
                  <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                    <Search className="w-10 h-10 text-zinc-700" />
                  </div>
                  <h3 className="text-2xl font-black text-zinc-300 mb-2">No diamonds found in the vault</h3>
                  <p className="text-zinc-500 max-w-sm mx-auto">We couldn't find any results matching your search. Try refining your filters.</p>
                  <Button 
                    variant="link" 
                    className="mt-6 text-sky-400 font-black uppercase tracking-widest text-xs"
                    onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                  >
                    Clear All Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Appraisal Banner */}
        <section className="container mx-auto px-6 pb-20">
          <div className="relative rounded-[32px] overflow-hidden bg-zinc-900 border border-zinc-800 p-8 md:p-16">
            <div className="absolute top-0 right-0 w-1/2 h-full -z-0 opacity-20 md:opacity-100">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/7884a4ea-1b9b-4bd0-bbdf-e48ce28e53ab/appraisal-office-992ce927-1776406161607.webp" 
                alt="Appraisal" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/40 to-transparent" />
            </div>
            
            <div className="relative z-10 max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">
                UNCOVER THE TRUE VALUE OF YOUR <span className="text-sky-400">LEGACY.</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Our world-class gemologists provide GIA-standard appraisals for your private collection. Get a market-accurate valuation in under 24 hours.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => setIsSellModalOpen(true)}
                  className="h-14 px-10 bg-sky-500 hover:bg-sky-600 text-zinc-950 font-black rounded-2xl"
                >
                  START APPRAISAL
                </Button>
                <Button variant="outline" className="h-14 px-10 border-zinc-700 text-zinc-100 hover:bg-white/5 font-black rounded-2xl">
                  LEARN MORE
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 pt-20 pb-10 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
                  <DiamondIcon className="w-6 h-6 text-zinc-950 fill-current" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter leading-none">DIAMOND</span>
                  <span className="text-[10px] font-bold tracking-[0.3em] text-sky-400 leading-none mt-1">VENTURE</span>
                </div>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Setting the standard for luxury diamond trading. Secure, verified, and brilliant.
              </p>
              <div className="flex gap-4">
                {['tw', 'ig', 'fb'].map((social) => (
                  <div key={social} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-500 hover:border-sky-500/50 hover:text-sky-400 transition-all cursor-pointer">
                    <span className="text-xs font-black uppercase">{social}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {['Services', 'Company', 'Legal'].map((title, idx) => (
              <div key={title}>
                <h4 className="text-zinc-100 font-black uppercase tracking-widest text-xs mb-8">{title}</h4>
                <ul className="space-y-4">
                  {[
                    ['Marketplace', 'Auctions', 'Certification', 'Vault'][idx],
                    ['About Us', 'Concierge', 'Careers', 'Press'][idx],
                    ['Privacy', 'Terms', 'Security', 'Cookies'][idx]
                  ].filter(Boolean).map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-zinc-500 hover:text-sky-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
              © 2025 Diamond Venture Ltd. All Brilliance Reserved.
            </p>
            <div className="flex items-center gap-8">
              <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.3em]">Authorized GIA Partner</span>
              <div className="h-4 w-px bg-zinc-800" />
              <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.3em]">SECURE SSL 256-BIT</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}