import { LucideIcon } from "lucide-react";

export type DiamondCut = "Ideal" | "Excellent" | "Very Good" | "Good";
export type DiamondColor = "D" | "E" | "F" | "G" | "H" | "I" | "J";
export type DiamondClarity = "FL" | "IF" | "VVS1" | "VVS2" | "VS1" | "VS2" | "SI1";

export interface Diamond {
  id: string;
  title: string;
  price: number;
  carat: number;
  cut: DiamondCut;
  color: DiamondColor;
  clarity: DiamondClarity;
  image: string;
  category: "loose" | "ring" | "jewelry" | "investment";
  isVerified: boolean;
  certificate?: "GIA" | "IGI" | "HRD";
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}