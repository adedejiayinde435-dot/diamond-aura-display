import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles className="w-4 h-4" />
            The Future of Diamond Trading
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-100 leading-[0.9] mb-8"
          >
            INVEST IN <span className="text-sky-400 italic">BRILLIANCE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Diamond Venture is the premier digital destination for rare diamonds, high-end jewelry, and investment-grade gemstones. Authenticated, secure, and exceptional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
          >
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-sky-400 transition-colors" />
              <Input 
                placeholder="Search by shape, carat, or certification..." 
                className="h-14 pl-12 bg-zinc-900/50 border-zinc-800 focus:border-sky-500/50 focus:ring-sky-500/10 rounded-2xl text-zinc-100 backdrop-blur-md"
              />
            </div>
            <Button className="h-14 px-8 bg-sky-500 hover:bg-sky-600 text-zinc-950 font-black rounded-2xl w-full sm:w-auto shadow-lg shadow-sky-500/20">
              EXPLORE
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Shimmer Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
    </section>
  );
};