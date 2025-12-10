import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const CrisisBox = () => {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-primary mb-2">Crisis Support</h3>
          <p className="text-sm text-muted-foreground mb-3">
            If you are in crisis or experiencing thoughts of self-harm, please reach out to a crisis helpline immediately. 
            This website is not a substitute for professional mental health care.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a 
              href="tel:988" 
              className="text-primary font-medium hover:underline"
            >
              988 Suicide & Crisis Lifeline
            </a>
            <span className="text-muted-foreground">|</span>
            <Link 
              to="/resources" 
              className="text-primary font-medium hover:underline"
            >
              View All Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisBox;
