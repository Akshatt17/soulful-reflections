import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Headphones,
  Play,
  Phone,
  Clock,
  Mail,
  MapPin,
  Instagram,
  Brain,
  Heart,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Spotlight } from "@/components/ui/spotlight";
import { ImageReflectionsGallery } from "@/components/micro-reflections/images";
import articlesData from "@/data/articles.json";
import toolsData from "@/data/tools.json";
import drNiharika from "@/assets/dr-niharika-bhaskar.jpg";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  stagger,
} from "@/lib/motion-variants";

/* ---------------- Espresso palette (local for this page) ---------------- */
const ESPRESSO = "#1C1008";
const ESPRESSO_DEEP = "#140A04";
const CREAM = "#F2E6D2";
const CREAM_SOFT = "#EADFC9";
const TERRACOTTA = "#B5683E";
const SAND = "#D7B894";

/* ---------------- HERO ---------------- */
const Hero = () => (
  <section
    className="relative flex min-h-screen items-center overflow-hidden"
    style={{ backgroundColor: ESPRESSO }}
  >
    <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#E8B27A" />

    {/* warm radial glow on the right */}
    <div
      className="pointer-events-none absolute -right-40 top-1/4 h-[42rem] w-[42rem] rounded-full blur-3xl opacity-40"
      style={{
        background:
          "radial-gradient(circle at center, #C97A3A 0%, #7A3B1F 45%, transparent 70%)",
      }}
    />
    <div
      className="pointer-events-none absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-25"
      style={{
        background:
          "radial-gradient(circle at center, #B5683E 0%, transparent 70%)",
      }}
    />

    <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-24">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mx-auto max-w-3xl text-center text-[10px] sm:text-xs tracking-[0.32em] uppercase mb-12"
        style={{ color: `${CREAM}99` }}
      >
        A safe space to put down what you've been carrying — the mental health hub
      </motion.p>

      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
          className="font-serif leading-[0.92] tracking-tight"
          style={{ color: CREAM }}
        >
          <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light italic">
            Soulful
          </span>
          <span
            className="block text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bold uppercase tracking-tighter"
            style={{ color: CREAM_SOFT }}
          >
            Reflection
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 text-xs sm:text-sm tracking-[0.28em] uppercase"
          style={{ color: `${CREAM}B3` }}
        >
          Honour the journey. End the silent struggle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/tools"
            className="group inline-flex items-center gap-2 rounded-full border px-10 py-4 text-sm tracking-[0.2em] uppercase transition-all hover:bg-[var(--cream)]/10"
            style={{
              borderColor: `${CREAM}80`,
              color: CREAM,
              ["--cream" as string]: CREAM,
            }}
          >
            Start Here
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ---------------- ABOUT SR ---------------- */
const AboutSR = () => (
  <section
    className="relative section-padding overflow-hidden"
    style={{ backgroundColor: CREAM }}
  >
    <div className="container-custom px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger(0.15)}
        className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center"
      >
        <motion.div variants={fadeInLeft} className="lg:col-span-5">
          <h2
            className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.95]"
            style={{ color: ESPRESSO }}
          >
            About <br />
            <span className="italic font-light">SR</span>
          </h2>
          <div className="mt-8 inline-flex h-32 w-32 items-center justify-center rounded-full border-2"
               style={{ borderColor: TERRACOTTA, backgroundColor: `${TERRACOTTA}14` }}>
            <Brain className="h-14 w-14" style={{ color: TERRACOTTA }} />
          </div>
        </motion.div>

        <motion.div variants={fadeInRight} className="lg:col-span-7 space-y-6 text-base sm:text-lg leading-relaxed"
                    style={{ color: `${ESPRESSO}CC` }}>
          <p>
            Soulful Reflections (SR), a clinical sanctuary for those who have
            been carrying a heavy weight in silence. Here, your struggle finally
            meets understanding.
          </p>
          <p>
            We have built this hub to bridge the gap between deep soul-searching
            and psychiatric precision, offering you a safe space to explore the
            "why" behind your mental health.
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ---------------- REFLECTION OF THE WEEK ---------------- */
const ReflectionOfTheWeek = () => (
  <section
    className="section-padding"
    style={{ backgroundColor: CREAM_SOFT }}
  >
    <div className="container-custom px-4 sm:px-6 lg:px-8">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-xs tracking-[0.32em] uppercase mb-8"
        style={{ color: TERRACOTTA }}
      >
        Reflection for the Week
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={scaleIn}
        className="mx-auto max-w-3xl rounded-3xl bg-white p-12 sm:p-16 shadow-xl text-center"
      >
        <Sparkles className="mx-auto mb-6 h-8 w-8" style={{ color: TERRACOTTA }} />
        <p
          className="font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-tight"
          style={{ color: ESPRESSO }}
        >
          "You are allowed to be a work in progress and still be proud of how
          far you've come."
        </p>
        <p
          className="mt-8 text-sm tracking-[0.2em] uppercase"
          style={{ color: `${ESPRESSO}99` }}
        >
          — Dr. Niharika Bhaskar
        </p>
      </motion.div>
    </div>
  </section>
);

/* ---------------- REFLECTIVE READS ---------------- */
const ReflectiveReads = () => {
  const featured = [...articlesData]
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    )
    .slice(0, 3);

  return (
    <section className="section-padding" style={{ backgroundColor: CREAM }}>
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="font-serif leading-[0.9]">
            <span
              className="block text-5xl sm:text-6xl lg:text-7xl italic font-light"
              style={{ color: TERRACOTTA }}
            >
              Reflective
            </span>
            <span
              className="block text-6xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight"
              style={{ color: ESPRESSO }}
            >
              Reads
            </span>
          </h2>
          <p
            className="mt-4 text-xs tracking-[0.3em] uppercase"
            style={{ color: `${ESPRESSO}80` }}
          >
            Latest Articles
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger(0.15)}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((article) => (
            <motion.article
              key={article.id}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-2xl"
            >
              <Link to={`/articles/${article.slug}`} className="block">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span
                    className="inline-block rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider"
                    style={{ backgroundColor: `${TERRACOTTA}1A`, color: TERRACOTTA }}
                  >
                    {article.category}
                  </span>
                  <h3
                    className="mt-4 font-serif text-2xl font-semibold leading-tight"
                    style={{ color: ESPRESSO }}
                  >
                    {article.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed line-clamp-2"
                    style={{ color: `${ESPRESSO}99` }}
                  >
                    {article.excerpt}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
                    style={{ color: TERRACOTTA }}
                  >
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase font-medium"
            style={{ color: ESPRESSO }}
          >
            View All Reflections <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ---------------- MICRO-REFLECTIONS ---------------- */
const MicroReflections = () => (
  <section
    className="section-padding"
    style={{ backgroundColor: CREAM_SOFT }}
  >
    <div className="container-custom px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="text-center mb-14"
      >
        <h2
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight"
          style={{ color: ESPRESSO }}
        >
          Micro-Reflections
        </h2>
        <p
          className="mt-3 text-xs tracking-[0.3em] uppercase"
          style={{ color: `${ESPRESSO}80` }}
        >
          Bite-sized moments of pause
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger(0.15)}
        className="grid gap-6 md:grid-cols-3"
      >
        {/* Audio – coming soon */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-white p-8 shadow-md flex flex-col items-center text-center min-h-[320px] justify-center"
        >
          <div
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: `${TERRACOTTA}1A` }}
          >
            <Headphones className="h-8 w-8" style={{ color: TERRACOTTA }} />
          </div>
          <h3
            className="font-serif text-2xl font-semibold mb-2"
            style={{ color: ESPRESSO }}
          >
            Audio Reflections
          </h3>
          <p className="text-sm mb-6" style={{ color: `${ESPRESSO}99` }}>
            Audio reflections on the way. Coming soon.
          </p>
          <a
            href="https://instagram.com/soulfulreflectionsr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: TERRACOTTA }}
          >
            <Instagram className="h-4 w-4" /> Follow on Instagram
          </a>
        </motion.div>

        {/* Images */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-white p-6 shadow-md md:col-span-1"
        >
          <h3
            className="font-serif text-xl font-semibold mb-4 text-center"
            style={{ color: ESPRESSO }}
          >
            Image Reflections
          </h3>
          <div className="max-h-[280px] overflow-y-auto pr-1">
            <ImageReflectionsGallery limit={3} columns={2} />
          </div>
        </motion.div>

        {/* Video */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-white p-6 shadow-md"
        >
          <h3
            className="font-serif text-xl font-semibold mb-4 text-center"
            style={{ color: ESPRESSO }}
          >
            Video Reflections
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              // TODO: replace href with actual Reel URL
              <a
                key={i}
                href="https://instagram.com/soulfulreflectionsr"
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-video overflow-hidden rounded-xl bg-muted"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #B5683E 0%, #1C1008 100%)",
                    opacity: 0.85,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 transition-transform group-hover:scale-110">
                    <Play className="h-5 w-5 ml-0.5" style={{ color: ESPRESSO }} fill={ESPRESSO} />
                  </div>
                </div>
                <span className="absolute bottom-2 left-3 text-xs uppercase tracking-wider text-white/90">
                  Watch on Instagram
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-10 text-center">
        <Link
          to="/media"
          className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase font-medium"
          style={{ color: ESPRESSO }}
        >
          Explore All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

/* ---------------- SELF-ASSESSMENT TOOLS ---------------- */
const ICONS: Record<string, typeof Brain> = { Brain, Heart, Sparkles };

const SelfAssessmentTools = () => {
  type ToolCard = { id: string; title: string; description: string; icon?: string };
  const tools: ToolCard[] = (toolsData as { tools?: ToolCard[] }).tools?.slice(0, 3) ?? [
    { id: "phq9", title: "PHQ-9", description: "Reflect on patterns of low mood." },
    { id: "gad7", title: "GAD-7", description: "Notice everyday anxiety." },
    { id: "pss", title: "PSS", description: "Measure perceived stress." },
  ];

  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ backgroundColor: CREAM }}
    >
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-20"
        style={{ background: TERRACOTTA }}
      />
      <div className="container-custom relative px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-14"
        >
          <h2
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight"
            style={{ color: ESPRESSO }}
          >
            Self-Assessment Tools
          </h2>
          <p
            className="mt-3 text-xs tracking-[0.3em] uppercase"
            style={{ color: `${ESPRESSO}80` }}
          >
            Reflect with clinically-grounded questionnaires
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0.12)}
          className="grid gap-6 md:grid-cols-3"
        >
          {tools.map((tool, i) => {
            const Icon = ICONS[tool.icon ?? "Brain"] ?? Brain;
            return (
              <motion.div
                key={tool.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-md"
              >
                <span
                  className="pointer-events-none absolute -right-2 -top-4 font-serif text-7xl font-bold"
                  style={{ color: `${TERRACOTTA}26` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="mb-5 h-9 w-9" style={{ color: TERRACOTTA }} />
                <h3
                  className="font-serif text-xl font-semibold mb-3"
                  style={{ color: ESPRESSO }}
                >
                  {tool.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: `${ESPRESSO}99` }}>
                  {tool.description}
                </p>
                <Link
                  to={`/tools/${tool.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium"
                  style={{ color: TERRACOTTA }}
                >
                  Begin reflection <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase font-medium"
            style={{ color: ESPRESSO }}
          >
            Explore all 7 tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ---------------- THE FOUNDER ---------------- */
const TheFounder = () => (
  <section
    className="relative section-padding"
    style={{ backgroundColor: SAND }}
  >
    <div className="container-custom px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-12 items-center">
        <div className="hidden lg:flex lg:col-span-1 justify-center">
          <span
            className="font-serif text-2xl tracking-[0.4em] uppercase font-bold"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              color: `${ESPRESSO}99`,
            }}
          >
            The Founder
          </span>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleIn}
          className="lg:col-span-4 flex justify-center"
        >
          <div
            className="relative aspect-square w-64 sm:w-80 overflow-hidden rounded-full shadow-2xl ring-4"
            style={{ borderColor: CREAM, ["--tw-ring-color" as string]: CREAM }}
          >
            <img
              src={drNiharika}
              alt="Dr. Niharika Bhaskar"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInRight}
          className="lg:col-span-7 space-y-5"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase lg:hidden"
            style={{ color: `${ESPRESSO}80` }}
          >
            The Founder
          </p>
          <h2
            className="font-serif text-4xl sm:text-5xl font-bold"
            style={{ color: ESPRESSO }}
          >
            Dr. Niharika Bhaskar
          </h2>
          <p
            className="text-sm tracking-[0.2em] uppercase"
            style={{ color: TERRACOTTA }}
          >
            Practicing Psychiatrist · Founder, SR
          </p>
          <p className="text-base leading-relaxed" style={{ color: `${ESPRESSO}CC` }}>
            <span className="font-semibold" style={{ color: ESPRESSO }}>
              My Mission:
            </span>{" "}
            To bridge the gap between deep soul-searching and clinical care, so
            no one has to navigate their mental health alone.
          </p>
          <p className="text-base leading-relaxed" style={{ color: `${ESPRESSO}CC` }}>
            <span className="font-semibold" style={{ color: ESPRESSO }}>
              My Philosophy:
            </span>{" "}
            The mind deserves the same care as the body — gently, precisely,
            and without shame.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase font-medium"
            style={{ color: ESPRESSO }}
          >
            Read Her Story <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ---------------- NEWSLETTER + SUPPORT ---------------- */
const NewsletterAndSupport = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ firstName, email, consent });
  };

  return (
    <>
      <section
        className="section-padding"
        style={{ backgroundColor: ESPRESSO }}
      >
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-center"
          >
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: CREAM }}
            >
              Weekly Reflections in Your Inbox
            </h2>
            <p className="mb-10" style={{ color: `${CREAM}B3` }}>
              Thoughtful insights, guided practices, and inspiration delivered
              to you each week.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="nl-consent"
                  checked={consent}
                  onCheckedChange={(c) => setConsent(c as boolean)}
                  className="mt-1 border-white/40"
                />
                <label
                  htmlFor="nl-consent"
                  className="text-sm cursor-pointer"
                  style={{ color: `${CREAM}B3` }}
                >
                  I agree to receive weekly newsletters and understand I can
                  unsubscribe anytime.
                </label>
              </div>
              <Button
                type="submit"
                size="xl"
                className="w-full sm:w-auto bg-white text-[color:var(--espresso)] hover:bg-white/90"
                style={{ ["--espresso" as string]: ESPRESSO, color: ESPRESSO }}
              >
                Subscribe Now
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <section
        className="section-padding"
        style={{ backgroundColor: TERRACOTTA }}
      >
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.1)}
            className="grid gap-8 lg:grid-cols-2 items-start"
          >
            <motion.div variants={fadeInLeft}>
              <h2
                className="font-serif text-5xl sm:text-6xl font-bold uppercase tracking-tight"
                style={{ color: CREAM }}
              >
                Support / Help
              </h2>
              <p className="mt-4" style={{ color: `${CREAM}CC` }}>
                Reach out — Mon–Wed, 10AM–1PM. We're here.
              </p>
            </motion.div>

            <motion.ul
              variants={fadeInRight}
              className="grid sm:grid-cols-2 gap-5"
            >
              {[
                { icon: Phone, label: "8456850333", href: "tel:+918456850333" },
                { icon: Clock, label: "Mon–Wed · 10 AM – 1 PM" },
                {
                  icon: Mail,
                  label: "soulfulreflectionSR@gmail.com",
                  href: "mailto:soulfulreflectionSR@gmail.com",
                },
                {
                  icon: MapPin,
                  label: "Dharanidhar Medical College, Keonjhar, Odisha",
                },
              ].map(({ icon: Icon, label, href }) => {
                const inner = (
                  <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <Icon className="h-5 w-5 mt-0.5 shrink-0" style={{ color: CREAM }} />
                    <span className="text-sm" style={{ color: CREAM }}>
                      {label}
                    </span>
                  </div>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="block hover:opacity-90">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>
      </section>
    </>
  );
};

/* ---------------- FOOTER ---------------- */
const FooterNew = () => (
  <footer style={{ backgroundColor: ESPRESSO_DEEP, color: CREAM }}>
    <div className="container-custom px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-2xl font-bold mb-3">Soulful Reflections</h3>
          <p className="text-sm" style={{ color: `${CREAM}99` }}>
            A clinical sanctuary where mindfulness meets understanding.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: `${CREAM}80` }}>
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:opacity-80">About</Link></li>
            <li><Link to="/articles" className="hover:opacity-80">Articles</Link></li>
            <li><Link to="/tools" className="hover:opacity-80">Tools</Link></li>
            <li><Link to="/media" className="hover:opacity-80">Micro Reflections</Link></li>
            <li><Link to="/contact" className="hover:opacity-80">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: `${CREAM}80` }}>
            Follow
          </h4>
          <a
            href="https://instagram.com/soulfulreflectionsr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm hover:opacity-80"
          >
            <Instagram className="h-4 w-4" /> @soulfulreflectionsr
          </a>
        </div>
      </div>

      <div
        className="mt-12 border-t pt-8 text-xs leading-relaxed"
        style={{ borderColor: `${CREAM}1A`, color: `${CREAM}99` }}
      >
        <p className="mb-2">
          If you are in crisis, please contact iCall: <a className="underline" href="tel:+919152987821">9152987821</a> or
          Vandrevala Foundation: <a className="underline" href="tel:+9118602662345">1860-2662-345</a>.
          This site is not a substitute for professional care.
        </p>
        <p>© {new Date().getFullYear()} Soulful Reflections. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

/* ---------------- PAGE ---------------- */
const IndexNew = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <main>
        <Hero />
        <AboutSR />
        <ReflectionOfTheWeek />
        <ReflectiveReads />
        <MicroReflections />
        <SelfAssessmentTools />
        <TheFounder />
        <NewsletterAndSupport />
      </main>
      <FooterNew />
    </div>
  );
};

export default IndexNew;