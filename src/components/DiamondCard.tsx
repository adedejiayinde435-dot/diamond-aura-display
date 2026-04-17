import { motion } from "framer-motion";
import { Diamond } from "../types/diamond";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowUpRight, Diamond as DiamondIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiamondCardProps {
  diamond: Diamond;
  onView: (id: string) => void;
}

export const DiamondCard = ({ diamond, onView }: DiamondCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="bg-zinc-900/40 border-zinc-800 hover:border-sky-500/50 transition-all duration-500 overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-sky-500/10">
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={diamond.image}
            alt={diamond.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            {diamond.isVerified && (
              <Badge className="bg-sky-500 text-zinc-950 font-bold flex gap-1 items-center px-2 py-0.5">
                <ShieldCheck className="w-3 h-3" />
                VERIFIED
              </Badge>
            )}
            {diamond.certificate && (
              <Badge variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white font-mono text-[10px]">
                {diamond.certificate}
              </Badge>
            )}
          </div>
          
          <div className="absolute top-4 right-4">
            <div className="p-2 rounded-full bg-zinc-950/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <DiamondIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-zinc-100 font-semibold text-lg line-clamp-1 group-hover:text-sky-400 transition-colors">
              {diamond.title}
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-zinc-800/50 rounded-lg p-2 border border-white/5 text-center">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Carat</p>
              <p className="text-zinc-200 font-bold">{diamond.carat} ct</p>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-2 border border-white/5 text-center">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Color</p>
              <p className="text-zinc-200 font-bold">{diamond.color}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Price</p>
              <p className="text-2xl font-black text-sky-400 tracking-tighter">
                ${diamond.price.toLocaleString()}
              </p>
            </div>
            <Button 
              size="icon" 
              className="rounded-full bg-white hover:bg-sky-400 text-zinc-950 transition-all hover:scale-110"
              onClick={() => onView(diamond.id)}
            >
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};