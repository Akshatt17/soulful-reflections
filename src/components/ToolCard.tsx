import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { 
  Activity, 
  Brain, 
  Scale, 
  Heart, 
  Moon, 
  Sun, 
  Sparkles, 
  Smile, 
  Users, 
  Zap,
  Shield,
  Target,
  LucideIcon 
} from "lucide-react";

// Icon map for tool cards - add new icons here as needed
const iconMap: Record<string, LucideIcon> = {
  Activity,
  Brain,
  Scale,
  Heart,
  Moon,
  Sun,
  Sparkles,
  Smile,
  Users,
  Zap,
  Shield,
  Target,
};

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration?: string;
  ctaText?: string;
}

const ToolCard = ({ id, title, description, icon, duration, ctaText = "Begin Reflection" }: ToolCardProps) => {
  const IconComponent = iconMap[icon] || Activity;

  return (
    <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      <div className="w-14 h-14 bg-sage/20 rounded-full flex items-center justify-center mb-6">
        <IconComponent className="w-7 h-7 text-sage" />
      </div>
      <h3 className="font-serif text-xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
      {duration && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
      )}
      <Link
        to={`/tools/${id}`}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        {ctaText}
      </Link>
    </div>
  );
};

export default ToolCard;
