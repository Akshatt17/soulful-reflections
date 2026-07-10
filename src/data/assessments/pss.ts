import { AssessmentConfig } from "@/types/assessment";

export const pssConfig: AssessmentConfig = {
  id: "pss",
  title: "PSS — Perceived Stress Scale",
  shortTitle: "PSS — Perceived Stress Scale",
  description: "A reflective tool to help you notice how stressful life has felt recently. Understand your stress patterns over the last month.",
  icon: "Activity",
  
  questions: [
    { text: "…felt upset because something unexpected happened?", isPositive: false },
    { text: "…felt that you couldn't control some important things in your life?", isPositive: false },
    { text: "…felt nervous, stressed, or on edge?", isPositive: false },
    { text: "…felt confident about your ability to handle personal challenges?", isPositive: true },
    { text: "…felt that things were going your way?", isPositive: true },
    { text: "…found yourself unable to cope with all the things you had to do?", isPositive: false },
    { text: "…felt able to keep everyday irritations from taking over your day?", isPositive: true },
    { text: "…felt that you were on top of things (even if only in small ways)?", isPositive: true },
    { text: "…felt bothered by things that felt outside your control?", isPositive: false },
    { text: "…felt that difficulties were piling up so high that you couldn't overcome them?", isPositive: false },
  ],
  questionCount: 10,
  
  // PSS uses 0-4 scale
  responseOptions: [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ],
  responseLabels: [
    { value: 0, label: "Never" },
    { value: 1, label: "Almost never" },
    { value: 2, label: "Sometimes" },
    { value: 3, label: "Fairly often" },
    { value: 4, label: "Very often" },
  ],
  
  maxScore: 40,
  
  // Items 4, 5, 7, 8 are positive items (0-indexed: 3, 4, 6, 7)
  reverseScoreIndices: [3, 4, 6, 7],
  
  scoringBands: [
    {
      range: [0, 13],
      title: "Lower Perceived Stress",
      description: "Your responses suggest that stress has felt manageable lately. You may still have busy days, but you're generally able to steady yourself and recover.",
      reflection: "You seem to have space to breathe. Keep protecting your routines, rest, and supportive connections.",
      severity: "low",
      borderColor: "border-sage/30",
      bgColor: "bg-sage/5",
      badgeColor: "bg-sage/20",
      badgeTextColor: "text-sage",
    },
    {
      range: [14, 26],
      title: "Moderate Perceived Stress",
      description: "Your answers suggest that stress has been present and noticeable. You might be juggling a lot mentally, feeling more reactive, or finding it harder to switch off.",
      reflection: "Your mind may be asking for gentleness, boundaries, and small moments of release. If this feels persistent, consider speaking with a mental health professional or a trusted guide.",
      severity: "moderate",
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-500/5",
      badgeColor: "bg-amber-500/20",
      badgeTextColor: "text-amber-700",
    },
    {
      range: [27, 40],
      title: "Higher Perceived Stress",
      description: "Your responses indicate that stress has been feeling heavy or constant, possibly affecting sleep, mood, focus, or physical well-being.",
      reflection: "You've been carrying a lot. You don't have to hold it alone. We strongly recommend seeking support from a mental health professional, especially if stress is affecting your daily functioning.",
      severity: "high",
      borderColor: "border-destructive/50",
      bgColor: "bg-destructive/10",
      badgeColor: "bg-destructive/30",
      badgeTextColor: "text-destructive",
    },
  ],
  
  intro: {
    subtitle: "The Velvet Mind",
    title: "PSS — Perceived Stress Scale",
    tagline: "Gentle Check-In",
    about: "This is a reflective tool to help you notice how stressful life has felt recently. It is not a diagnosis.",
    howToAnswer: {
      prompt: "For each statement, choose how often it felt true for you in the last month.",
      instructions: [
        "Think about the last month (including today).",
        "Choose one option for each statement.",
        "Answer as honestly as you can - there are no right or wrong answers.",
      ],
    },
    duration: "2-3 minutes",
  },
  
  quizHeader: "PSS: Perceived Stress Scale",
  quizSubheader: "Over the last month, how often have you felt the following?",
  
  crisis: {
    threshold: 27,
    title: "A Safety Note",
    message: "If stress is accompanied by panic, hopelessness, thoughts of self-harm, or you feel unsafe, please seek urgent support from local emergency services or a trusted person nearby.",
  },
  
  gentleReminder: "The PSS helps you understand how stressful your life has felt recently. It is not a diagnosis, but a mirror for self-awareness. If stress feels overwhelming, reaching out for support is a sign of wisdom.",
  
  scoringGuide: {
    title: "PSS Scoring Guide",
    howToScore: "Add up your scores for all 10 items. Important: Items 4, 5, 7, and 8 are positively-worded and must be reverse-scored before totaling.",
    reverseScoreNote: "Reverse-scoring key (for items 4, 5, 7, 8): 0→4, 1→3, 2→2, 3→1, 4→0",
  },
};
