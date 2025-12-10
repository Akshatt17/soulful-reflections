import { Link } from "react-router-dom";
import { Activity, Brain, Scale, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Brain,
  Scale,
};

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const ToolCard = ({ id, title, description, icon }: ToolCardProps) => {
  const IconComponent = iconMap[icon] || Activity;

  return (
    <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      <div className="w-14 h-14 bg-sage/20 rounded-full flex items-center justify-center mb-6">
        <IconComponent className="w-7 h-7 text-sage" />
      </div>
      <h3 className="font-serif text-xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed mb-5">{description}</p>
      <Link
        to={`/tools/${id}`}
        className="text-primary font-medium hover:underline underline-offset-4 transition-all duration-200"
      >
        Begin Assessment →
      </Link>
    </div>
  );
};

export default ToolCard;
