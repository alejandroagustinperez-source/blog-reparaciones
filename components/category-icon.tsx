import { Zap, Droplets, Flame, Cloud, Plug, Hammer, Wrench } from "lucide-react";

const config: Record<string, { icon: typeof Zap; bg: string; label: string }> = {
  electricidad: { icon: Zap, bg: "bg-[#1e3a5f]", label: "Electricidad" },
  plomeria: { icon: Droplets, bg: "bg-[#2d5a8e]", label: "Plomería" },
  gas: { icon: Flame, bg: "bg-[#ea580c]", label: "Gas" },
  humedad: { icon: Cloud, bg: "bg-[#0ea5e9]", label: "Humedad" },
  electrodomesticos: { icon: Plug, bg: "bg-[#16a34a]", label: "Electrodomésticos" },
  carpinteria: { icon: Hammer, bg: "bg-[#92400e]", label: "Carpintería" },
};

export function CategoryIcon({ category, className = "" }: { category: string; className?: string }) {
  const c = config[category] ?? { icon: Wrench, bg: "bg-[#1e3a5f]", label: "General" };
  const Icon = c.icon;

  return (
    <div className={`flex items-center justify-center ${c.bg} ${className}`}>
      <Icon size={48} className="text-white" />
    </div>
  );
}

export function CategoryBadge({ category }: { category: string }) {
  const c = config[category] ?? { icon: Wrench, bg: "bg-[#1e3a5f]", label: "General" };

  return (
    <span className="rounded-full bg-[#f97316] px-3 py-1 text-xs font-semibold text-white shadow-sm">
      {c.label}
    </span>
  );
}

export function getCategoryLabel(category: string): string {
  const c = config[category] ?? { icon: Wrench, bg: "bg-[#1e3a5f]", label: "General" };
  return c.label;
}

export function getCategoryBg(category: string): string {
  const c = config[category] ?? { icon: Wrench, bg: "bg-[#1e3a5f]", label: "General" };
  return c.bg;
}
