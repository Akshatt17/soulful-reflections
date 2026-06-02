import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, PlayCircle, Headphones, Phone, Clock, Mail, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer } from "@/lib/motion-variants";
import ImageReflectionsGallery from "@/components/micro-reflections/images/ImageReflectionsGallery";
import articlesData from "@/data/articles.json";
import srLogo from "@/assets/sr-logo.jpeg";
import drNiharika from "@/assets/dr-niharika-bhaskar.jpg";
import heroLeafGraphic from "@/assets/hero/leaf-graphic.png";
import heroLeafBg from "@/assets/hero/leaf-bg.jpeg";
import heroStartCircle from "@/assets/hero/start-here-circle.png";
import aboutSculpture from "@/assets/about/LEFT_BG.jpeg";
import aboutOakLeaf from "@/assets/about/right_bottom.png";
import reflectionBg from "@/assets/Reflection_of_week/Background.jpeg";
import reflectionArch from "@/assets/Reflection_of_week/Arch.png";
import reflectiveReadsImg from "@/assets/reflective_reads.jpeg";
import microReflectionsImg from "@/assets/Micro_Reflections.jpeg";
import selfAssessmentImg from "@/assets/Self_Assesment.jpeg";
const HERO_GOLD = "#F1DBB7";
const HERO_DARK = "#412415";

const Hero = () => {
  return (
    <section
      aria-label="Hero"
      className="relative w-full min-h-[100vh] flex overflow-hidden"
      style={{ backgroundColor: HERO_DARK }}
    >
      {/* Split background: dark-brown left (60%), leaf photo right (40%) */}
      <div className="hidden md:block w-[60%] h-full absolute inset-y-0 left-0" style={{ backgroundColor: HERO_DARK }} />
      <div className="hidden md:block w-[40%] h-full absolute inset-y-0 right-0">
        <img
          src={heroLeafBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay to harmonize with brown side */}
        <div className="absolute inset-0" style={{ backgroundColor: HERO_DARK, opacity: 0.25 }} />
      </div>

      {/* Decorative leaf graphic, bottom-left */}
      <img
        src={heroLeafGraphic}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute -bottom-16 -left-16 w-[650px] max-w-[55%] object-contain opacity-90 pointer-events-none select-none"
      />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="relative z-10 w-full container-custom px-4 sm:px-6 lg:px-8 pt-28 pb-32 flex flex-col items-center"
      >
        {/* Top tagline */}
        <motion.div
          variants={fadeInUp}
          className="text-center font-serif tracking-[0.25em] text-xs md:text-sm leading-relaxed mb-12 md:mb-16"
          style={{ color: HERO_GOLD }}
        >
          <p>A SAFE SPACE TO PUT DOWN WHAT YOU&apos;VE BEEN CARRYING.</p>
          <p className="mt-1">THE MENTAL HEALTH HUB</p>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-center font-serif font-light tracking-tight leading-[0.85] whitespace-nowrap text-6xl sm:text-7xl md:text-8xl lg:text-[140px]"
          style={{ color: HERO_GOLD }}
        >
          <span className="block">SOULFUL</span>
          <span className="block">REFLECTION</span>
        </motion.h1>

        {/* Subline + CTA row */}
        <div className="relative w-full mt-16 md:mt-20 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between gap-12 max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center md:text-left font-serif tracking-[0.15em] font-light text-lg md:text-2xl leading-snug"
            style={{ color: HERO_GOLD }}
          >
            <p>HONOUR THE JOURNEY.</p>
            <p className="mt-1">END THE SILENT STRUGGLE.</p>
          </motion.div>

          <motion.div variants={scaleIn}>
            <Link
              to="/tools"
              aria-label="Start here"
              className="relative block w-[220px] h-[220px] md:w-[280px] md:h-[280px] transition-transform duration-300 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none"
            >
              <img
                src={heroStartCircle}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain drop-shadow-md"
              />
              <span
                className="absolute inset-0 flex flex-col items-center justify-center font-serif font-light leading-none text-3xl md:text-4xl"
                style={{ color: HERO_DARK }}
              >
                <span>START</span>
                <span className="mt-1">HERE</span>
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const ABOUT_CREAM = "#C9B795";
const ABOUT_TERRACOTTA = "#9C6243";
const ABOUT_INK = "#3D1810";

const About = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: ABOUT_TERRACOTTA }}
    >
      <div className="grid grid-cols-[45%_55%] min-h-[420px] sm:min-h-[560px] md:min-h-[720px]">
        {/* Left: sculpture image as full-bleed background (image already includes its cream backdrop) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInLeft}
          className="relative w-full"
          style={{ backgroundColor: ABOUT_CREAM }}
        >
          <img
            src={aboutSculpture}
            alt="Brain, Psi symbol, and Heart sculpture"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Right: title + body on terracotta */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-16 md:py-24"
          style={{ backgroundColor: ABOUT_TERRACOTTA }}
        >
          <motion.h2
            variants={fadeInRight}
            className="font-serif font-light leading-[0.95] tracking-tight mb-4 sm:mb-10 md:mb-14"
            style={{ color: ABOUT_INK, fontSize: "clamp(1.75rem, 7vw, 6.5rem)" }}
          >
            <span className="block">ABOUT</span>
            <span className="block">SR</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="font-serif leading-relaxed mb-3 sm:mb-6 max-w-xl"
            style={{ color: ABOUT_INK, fontSize: "clamp(0.75rem, 1.5vw, 1.5rem)" }}
          >
            Soulful Reflection (SR), a clinical sanctuary for those who have been carrying a heavy weight in silence. Here, your struggle finally meets understanding.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="font-serif leading-relaxed max-w-xl"
            style={{ color: ABOUT_INK, fontSize: "clamp(0.75rem, 1.5vw, 1.5rem)" }}
          >
            We have built this hub to bridge the gap between deep soul-searching and psychiatric precision, offering you a safe space to explore the &ldquo;why&rdquo; behind your mental health.
          </motion.p>
        </motion.div>
      </div>

      {/* Oak leaf, bottom-right decorative */}
      <img
        src={aboutOakLeaf}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-20 sm:w-32 md:w-44 lg:w-56 pointer-events-none select-none z-20"
      />
    </section>
  );
};

const REFLECTION_INK = "#3D1810";
const REFLECTION_CARD = "rgba(178, 138, 119, 0.55)";

const ReflectionOfTheWeek = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `url(${reflectionBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "clamp(420px, 60vw, 720px)",
      }}
    >
      {/* Arch + leaf decoration, left side */}
      <img
        src={reflectionArch}
        alt=""
        aria-hidden="true"
        className="absolute left-0 bottom-0 h-full w-auto max-w-[55%] object-contain object-bottom pointer-events-none select-none z-10"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 py-16 sm:py-20 md:py-28"
      >
        <motion.h2
          variants={fadeInUp}
          className="font-serif uppercase text-center tracking-wide mb-8 sm:mb-12 leading-tight"
          style={{
            color: REFLECTION_INK,
            fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
            letterSpacing: "0.04em",
          }}
        >
          <span className="block">REFLECTION FOR</span>
          <span className="block">THE WEEK</span>
        </motion.h2>

        <motion.div
          variants={scaleIn}
          className="rounded-md backdrop-blur-[2px] px-10 sm:px-16 md:px-24 py-12 sm:py-16 md:py-20 max-w-2xl w-full text-center"
          style={{ backgroundColor: REFLECTION_CARD }}
        >
          <h3
            className="font-sans font-medium tracking-wide"
            style={{
              color: REFLECTION_INK,
              fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
            }}
          >
            YOU CAN.
          </h3>
        </motion.div>
      </motion.div>
    </section>
  );
};

const ReflectiveReads = () => {
  const latest = [...articlesData]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())[0];

  const DarkPanel = (
    <div className="relative h-full bg-primary overflow-hidden flex flex-col justify-center px-8 lg:px-14 py-10 lg:py-0">
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="absolute left-0 bottom-0 w-56 lg:w-72 opacity-20 pointer-events-none text-primary-foreground"
        fill="currentColor"
      >
        <path d="M20 180 C 40 120, 80 70, 160 30 C 130 80, 110 130, 90 180 Z M 95 175 C 105 140, 120 110, 150 80" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M30 175 C 55 130, 95 90, 165 55 C 140 100, 115 145, 95 180 Z" />
      </svg>

      <div className="relative z-10">
        <span className="block font-serif italic text-5xl lg:text-6xl text-primary-foreground leading-none">
          Reflective
        </span>
        <span className="block font-serif font-black text-6xl lg:text-8xl uppercase text-primary-foreground leading-none mt-1">
          READS
        </span>

        <p className="text-xs tracking-[0.2em] uppercase text-primary-foreground/60 mt-8">
          Latest Article
        </p>
        {latest && (
          <>
            <h3 className="font-serif text-lg text-primary-foreground/90 mt-2 line-clamp-2 max-w-md">
              {latest.title}
            </h3>
            <Link
              to={`/articles/${latest.slug}`}
              className="inline-block text-sm text-primary-foreground/60 mt-3 hover:text-primary-foreground transition-colors"
            >
              Read more...
            </Link>
          </>
        )}
      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#FDFBF7]">
      {/* Desktop split */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="hidden lg:grid grid-cols-2 items-stretch min-h-[520px]"
      >
        <motion.div variants={fadeInLeft} className="h-full">
          {DarkPanel}
        </motion.div>
        <motion.div variants={fadeInRight} className="relative overflow-hidden">
          <img
            src={reflectiveReadsImg}
            alt="Reading and reflection"
            className="w-full h-full object-cover absolute inset-0"
          />
        </motion.div>
      </motion.div>

      {/* Mobile stack */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
        className="lg:hidden flex flex-col"
      >
        <img
          src={reflectiveReadsImg}
          alt="Reading and reflection"
          className="w-full aspect-[16/9] object-cover"
        />
        {DarkPanel}
      </motion.div>
    </section>
  );
};

const MicroReflections = () => {
  return (
    <section className="section-padding relative overflow-hidden isolate">
      <img
        src={microReflectionsImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-cream/40 z-[1]" />

      <div className="container-custom px-4 relative z-[2]">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
          className="font-serif font-black text-4xl sm:text-5xl uppercase tracking-tight text-primary text-center mb-12"
        >
          MICRO-REFLECTIONS
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start"
        >
          {/* Column 1 — Audio */}
          <motion.div variants={fadeInUp} className="flex flex-col">
            <h3 className="font-serif text-2xl text-primary/70 text-center mb-4">CALM</h3>
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Headphones className="w-8 h-8 text-primary/50 mx-auto" />
              <p className="text-xs uppercase tracking-widest text-primary/60 mt-3">
                Audio Reflections
              </p>
              <p className="text-sm text-primary/50 mt-1">Coming soon</p>
            </div>
            <a
              href="https://instagram.com/soulfulreflectionsr"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-primary/50 hover:text-primary text-center mt-3 transition-colors"
            >
              Follow on Instagram
            </a>
          </motion.div>

          {/* Column 2 — Images */}
          <motion.div variants={fadeInUp} className="flex flex-col">
            <h3 className="text-xs uppercase tracking-widest text-primary/70 text-center mb-4">
              IMAGES REFLECTIONS
            </h3>
            <div className="px-4">
              <ImageReflectionsGallery limit={2} columns={2} />
            </div>
          </motion.div>

          {/* Column 3 — Video */}
          <motion.div variants={fadeInUp} className="flex flex-col">
            <h3 className="text-xs uppercase tracking-widest text-primary/70 text-center mb-4">
              VIDEO REFLECTIONS
            </h3>
            {/* TODO: replace placeholders with actual Instagram Reel embeds */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center shadow-card mb-3"
                >
                  <PlayCircle className="w-8 h-8 text-primary/40" />
                </div>
              ))}
            </div>
            <a
              href="https://instagram.com/soulfulreflectionsr"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-primary/50 hover:text-primary text-center mt-2 transition-colors"
            >
              Watch on Instagram
            </a>
          </motion.div>
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/media" className="text-sm text-primary/60 hover:text-primary transition-colors">
            Explore All →
          </Link>
        </div>
      </div>
    </section>
  );
};

const SelfAssessment = () => {
  const DarkPanel = (
    <div className="relative h-full bg-primary overflow-hidden flex flex-col justify-center px-8 lg:px-14 py-10 lg:py-0">
      <h2 className="font-serif font-black text-4xl lg:text-5xl uppercase text-primary-foreground leading-tight">
        SELF-ASSESSMENT
      </h2>
      <h2 className="font-serif font-black text-5xl lg:text-7xl uppercase text-primary-foreground leading-none">
        TOOLS
      </h2>
      <p className="text-sm text-primary-foreground/60 mt-4 max-w-xs">
        Understand yourself one question at a time.
      </p>
      <Link
        to="/tools"
        className="inline-flex items-center gap-2 mt-6 text-sm text-primary-foreground/80 hover:text-primary-foreground border-b border-primary-foreground/30 hover:border-primary-foreground pb-0.5 transition-colors w-fit"
      >
        Explore All Tools →
      </Link>
    </div>
  );

  return (
    <section className="w-full bg-[#FDFBF7]">
      {/* Desktop split */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="hidden lg:grid grid-cols-2 items-stretch min-h-[500px]"
      >
        <motion.div variants={fadeInLeft} className="h-full">
          {DarkPanel}
        </motion.div>
        <motion.div variants={fadeInRight} className="relative overflow-hidden">
          <img
            src={selfAssessmentImg}
            alt="Self-assessment brain illustration"
            className="w-full h-full object-cover absolute inset-0"
          />
        </motion.div>
      </motion.div>

      {/* Mobile stack */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
        className="lg:hidden flex flex-col"
      >
        <img
          src={selfAssessmentImg}
          alt="Self-assessment brain illustration"
          className="w-full aspect-[16/9] object-cover"
        />
        {DarkPanel}
      </motion.div>
    </section>
  );
};

const Founder = () => {
  return (
    <section className="py-24 bg-[#EBE5DC] overflow-hidden">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto">
          
          {/* Vertical Text (Hidden on mobile) */}
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={fadeInLeft}
            className="hidden md:block rotate-180 uppercase tracking-[0.3em] text-primary/40 font-bold text-3xl px-12"
            style={{ writingMode: 'vertical-rl' }}
          >
            THE FOUNDER
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={scaleIn}
              className="flex justify-center"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-elevated border-[6px] border-white">
                <img src={drNiharika} alt="Dr. Niharika Bhaskar" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={fadeInRight}
              className="space-y-6 text-center md:text-left"
            >
              <div className="md:hidden uppercase tracking-[0.3em] text-primary/60 font-bold text-sm mb-4">
                THE FOUNDER
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
                Dr. Niharika Bhaskar
              </h2>
              <p className="text-[#C06C50] uppercase tracking-wider text-sm font-semibold">
                Clinical Psychologist & Founder
              </p>
              <p className="text-primary/80 text-lg leading-relaxed">
                As your clinician and a recovering perfectionist, I understand the toll of trying to carry professional and personal weight in silence. 
                My vision is to ensure that every human here—from students to professionals—can access evidence-based expertise while remaining deeply human and connected to those I serve.
              </p>
              <div className="pt-4">
                <Link to="/about" className="inline-flex items-center text-primary font-medium hover:text-[#C06C50] transition-colors pb-1 border-b border-primary/20 hover:border-[#C06C50]">
                  Read Her Story <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const SupportNewsletter = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ firstName, email, consent });
  };

  return (
    <section className="flex flex-col">
      {/* Top half: Newsletter */}
      <div className="bg-[#1C1008] text-white py-24">
        <div className="container-custom px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-[#FDFBF7]">
              Weekly Reflections in Your Inbox
            </h2>
            <p className="text-white/70 mb-8">
              Join our community and receive thoughtful insights, guided practices, 
              and inspiration delivered to you each week.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-12 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-white/30"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-white/30"
                  required
                />
              </div>

              <div className="flex items-start gap-3 text-left">
                <Checkbox
                  id="consent-index"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                  className="mt-1 border-white/40 data-[state=checked]:bg-white data-[state=checked]:text-[#1C1008]"
                />
                <label htmlFor="consent-index" className="text-sm text-white/70 cursor-pointer">
                  I agree to receive weekly newsletters and understand I can unsubscribe at any time.
                </label>
              </div>

              <Button type="submit" className="w-full sm:w-auto bg-[#FDFBF7] text-[#1C1008] hover:bg-[#FDFBF7]/90 font-semibold h-12 px-8 rounded-xl">
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom half: Support */}
      <div className="bg-[#A85B32] text-white py-20">
        <div className="container-custom px-4">
          <h2 className="text-center font-serif text-3xl font-bold mb-12 uppercase tracking-wide">
            Support / Help
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <a href="tel:8456850333" className="flex flex-col items-center text-center space-y-3 hover:text-white/80 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-medium">8456850333</span>
            </a>
            
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-medium">Mon–Wed, 10AM–1PM</span>
            </div>

            <a href="mailto:soulfulreflectionSR@gmail.com" className="flex flex-col items-center text-center space-y-3 hover:text-white/80 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-medium">soulfulreflectionSR<br/>@gmail.com</span>
            </a>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-medium">Dharanidhar Medical College,<br/>Keonjhar, Odisha</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#1C1008] text-white py-16 border-t border-white/10">
      <div className="container-custom px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={srLogo} alt="SR Logo" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-serif font-bold text-xl tracking-wide text-[#FDFBF7]">Soulful Reflection</span>
            </div>
            <p className="text-white/60 text-sm max-w-sm">
              A clinical sanctuary bridging the gap between deep soul-searching and psychiatric precision.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 uppercase tracking-wider text-[#FDFBF7]">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/tools" className="hover:text-white transition-colors">Self-Assessment</Link></li>
              <li><Link to="/articles" className="hover:text-white transition-colors">Reflective Reads</Link></li>
              <li><Link to="/media" className="hover:text-white transition-colors">Media</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 uppercase tracking-wider text-[#FDFBF7]">Social</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="https://instagram.com/soulfulreflectionsr" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50 text-center md:text-left">
          <p>
            If you are in crisis, please contact iCall: <a href="tel:9152987821" className="text-white/70 hover:text-white">9152987821</a> or Vandrevala Foundation: <a href="tel:18602662345" className="text-white/70 hover:text-white">1860-2662-345</a>. This site is not a substitute for professional care.
          </p>
          <p className="shrink-0">
            &copy; {new Date().getFullYear()} Soulful Reflection.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function IndexNew() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Hero />
      <About />
      <ReflectionOfTheWeek />
      <ReflectiveReads />
      <MicroReflections />
      <SelfAssessment />
      <Founder />
      <SupportNewsletter />
      <Footer />
    </div>
  );
}
