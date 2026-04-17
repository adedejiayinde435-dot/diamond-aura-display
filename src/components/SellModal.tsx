import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { Diamond as DiamondIcon, UploadCloud } from "lucide-react";

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellModal = ({ isOpen, onClose }: SellModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Diamond listing submitted for appraisal!", {
        description: "Our experts will review your listing within 24 hours.",
      });
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <DiamondIcon className="w-5 h-5 text-zinc-950" />
            </div>
            SELL YOUR DIAMOND
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Submit your diamond's details for a professional appraisal and market listing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carat" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Carat Weight</Label>
              <Input id="carat" placeholder="e.g. 1.5" className="bg-zinc-800 border-zinc-700" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shape" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Shape</Label>
              <Select>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select Shape" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="round">Round</SelectItem>
                  <SelectItem value="princess">Princess</SelectItem>
                  <SelectItem value="emerald">Emerald</SelectItem>
                  <SelectItem value="pear">Pear</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Color Grade</Label>
              <Select>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select Color" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="D">D (Colorless)</SelectItem>
                  <SelectItem value="E">E</SelectItem>
                  <SelectItem value="F">F</SelectItem>
                  <SelectItem value="G">G</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clarity" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Clarity Grade</Label>
              <Select>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select Clarity" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="FL">Flawless</SelectItem>
                  <SelectItem value="IF">Internally Flawless</SelectItem>
                  <SelectItem value="VVS1">VVS1</SelectItem>
                  <SelectItem value="VS1">VS1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Upload Photos / Certificates</Label>
            <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-sky-500/10">
                <UploadCloud className="w-6 h-6 text-zinc-500 group-hover:text-sky-500" />
              </div>
              <p className="text-sm font-medium text-zinc-300">Drag and drop images or click to browse</p>
              <p className="text-[10px] text-zinc-500 uppercase font-bold">Max file size: 10MB</p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-sky-500 hover:bg-sky-600 text-zinc-950 font-black h-12 rounded-xl"
            >
              {isSubmitting ? "Submitting..." : "SUBMIT LISTING"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};