import { Sparkles } from "lucide-react";

const ReflectionOfWeek = () => (
  <div className="section-padding">
    <div className="container-custom px-4 sm:px-6 lg:px-8">
      <p className="mb-8 text-center text-xs uppercase tracking-[0.32em] text-primary">
        Reflection for the week
      </p>
      <div className="mx-auto max-w-3xl rounded-3xl glass-strong depth-shadow p-12 text-center sm:p-16">
        <Sparkles className="mx-auto mb-6 h-8 w-8 text-primary" aria-hidden="true" />
        <p className="font-serif text-3xl italic leading-tight text-foreground sm:text-4xl lg:text-5xl">
          "You are allowed to be a work in progress and still be proud of how far you've come."
        </p>
        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-deep-plum-soft">
          — Dr. Niharika Bhaskar
        </p>
      </div>
    </div>
  </div>
);

export default ReflectionOfWeek;
