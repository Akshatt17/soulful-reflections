import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import drNiharika from "@/assets/dr-niharika-bhaskar.jpg";
import Reflected from "@/components/water/Reflected";

const AboutFounder = () => (
  <div className="section-padding">
    <div className="container-custom px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">About SR</p>
        <p className="font-serif text-2xl leading-snug text-foreground sm:text-3xl">
          A clinical sanctuary for those who have been carrying a heavy weight in silence —
          where your struggle finally meets understanding.
        </p>
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex justify-center lg:col-span-5">
          <Reflected gap={12} className="inline-block">
            <div className="relative aspect-square w-64 overflow-hidden rounded-full ring-4 ring-card depth-shadow sm:w-80">
              <img
                src={drNiharika}
                alt="Dr. Niharika Bhaskar"
                className="h-full w-full object-cover"
              />
            </div>
          </Reflected>
        </div>

        <div className="space-y-5 lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.3em] text-deep-plum-soft">The Founder</p>
          <h2 className="font-serif text-4xl font-bold text-primary sm:text-5xl">
            Dr. Niharika Bhaskar
          </h2>
          <p className="text-sm uppercase tracking-[0.2em] text-accent-foreground">
            Practicing Psychiatrist · Founder, SR
          </p>
          <p className="text-base leading-relaxed text-foreground/90">
            <span className="font-semibold text-foreground">My Mission:</span>{" "}
            To bridge the gap between deep soul-searching and clinical care, so no one has to
            navigate their mental health alone.
          </p>
          <p className="text-base leading-relaxed text-foreground/90">
            <span className="font-semibold text-foreground">My Philosophy:</span>{" "}
            The mind deserves the same care as the body — gently, precisely, and without shame.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-primary transition-colors hover:text-berry"
          >
            Read her story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default AboutFounder;
