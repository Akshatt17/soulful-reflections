import { AssessmentConfig } from "@/types/assessment";

export const isiConfig: AssessmentConfig = {
  id: "isi",
  title: "ISI – Insomnia Severity Index",
  shortTitle: "ISI – Insomnia Severity Index (Reflective Sleep Check-In)",
  description: "A gentle reflective tool to help you understand how sleep has been feeling for you recently—both at night and during the day.",
  icon: "Moon",

  questions: [
    { text: "How much difficulty have you had in drifting off to sleep? (Falling asleep)" },
    { text: "How much difficulty have you had staying asleep (waking up in the middle of the night)? (Staying asleep)" },
    { text: "How much difficulty have you had with waking earlier than you want and not being able to return to sleep? (Waking too early)" },
    { text: "How satisfied or dissatisfied have you felt with your current sleep pattern? (Satisfaction with sleep)" },
    { text: "How much have your sleep difficulties stood out to you (or felt like a problem) in your life? (How noticeable it feels)" },
    { text: "How much have your sleep difficulties affected your daytime functioning (energy, mood, concentration, productivity, relationships)? (Impact on daily life)" },
    { text: "How much worry, frustration, or distress have you felt about your sleep? (Worry or distress about sleep)" },
  ],
  questionCount: 7,

  responseOptions: [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ],
  responseLabels: [
    { value: 0, label: "Not at all / No problem" },
    { value: 1, label: "Mild" },
    { value: 2, label: "Moderate" },
    { value: 3, label: "Severe" },
    { value: 4, label: "Very severe" },
  ],

  maxScore: 28,

  scoringBands: [
    {
      range: [0, 7],
      title: "No clinically significant insomnia",
      description: "Your responses suggest your sleep is mostly within a comfortable range. Even if you have occasional restless nights, they don't seem to be weighing heavily on your overall functioning.",
      reflection: "Keep nurturing your sleep rhythms—consistency, gentle wind-down routines, and self-kindness go a long way.",
      severity: "none",
      borderColor: "border-sage/30",
      bgColor: "bg-sage/5",
      badgeColor: "bg-sage/20",
      badgeTextColor: "text-sage",
    },
    {
      range: [8, 14],
      title: "Subthreshold insomnia (mild sleep difficulty)",
      description: "Your responses suggest sleep has been a little unsettled—perhaps taking longer to fall asleep, waking more than you'd like, or feeling less refreshed. It may not fully derail your day, but it's asking for attention.",
      reflection: "Your body may be asking for steadier rhythms, calmer evenings, or more space to process stress. Simple sleep-hygiene steps and stress management can help.",
      severity: "mild",
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-500/5",
      badgeColor: "bg-amber-500/20",
      badgeTextColor: "text-amber-700",
    },
    {
      range: [15, 21],
      title: "Moderate insomnia",
      description: "Your responses suggest sleep difficulties are clearly affecting you—at night and in the day. You may notice fatigue, irritability, low mood, reduced concentration, or a sense of dread around bedtime.",
      reflection: "This is not laziness or weakness—this is a mind-body system struggling to settle. Professional support (especially CBT-I) can be very effective.",
      severity: "moderate",
      borderColor: "border-orange-500/30",
      bgColor: "bg-orange-500/5",
      badgeColor: "bg-orange-500/20",
      badgeTextColor: "text-orange-700",
    },
    {
      range: [22, 28],
      title: "Severe insomnia",
      description: "Your responses suggest significant insomnia with strong impact on your functioning and well-being. Sleep may feel like a battle, and daytime life may feel heavier because of it.",
      reflection: "You deserve relief, and you don't have to solve this alone. Evidence-based treatments can help.",
      severity: "severe",
      borderColor: "border-destructive/50",
      bgColor: "bg-destructive/10",
      badgeColor: "bg-destructive/30",
      badgeTextColor: "text-destructive",
    },
  ],

  intro: {
    subtitle: "The Velvet Mind",
    title: "ISI – Insomnia Severity Index (Reflective Sleep Check-In)",
    tagline: "A gentle note before you begin",
    about: "This self-check is adapted in a softer, reflective tone from the Insomnia Severity Index (ISI). It helps you understand how sleep has been feeling for you recently—both at night and during the day. It is not a diagnosis. If your score suggests moderate to severe insomnia, seeking professional help can make a real difference.",
    howToAnswer: {
      prompt: "Answer based on your sleep over the last 2 weeks. Each question is scored from 0 to 4. Choose the option that feels closest to your experience.",
      instructions: [
        "Think about the last 2 weeks (including today).",
        "Choose one option for each item.",
        "Answer as honestly as you can - there are no right or wrong answers.",
      ],
    },
    duration: "2-3 minutes",
  },

  quizHeader: "ISI – Insomnia Severity Index",
  quizSubheader: "Over the last 2 weeks, how has sleep been for you? Please choose one score (0-4) for each item.",

  crisis: {
    threshold: 22,
    title: "When to seek help sooner",
    message: "Consider reaching out promptly if any of these are true: you are relying on alcohol or non-prescribed medications to sleep; you feel severely depressed, panicky, or hopeless alongside insomnia; you have loud snoring, breathing pauses, or severe daytime sleepiness (possible sleep apnea); sleep loss is affecting safety (driving, work hazards).",
  },

  gentleReminder: "Sleep is not something we can force—it's something we allow. If your score is higher, let it be a signal of care: your system is asking for support, not judgment.",

  scoringGuide: {
    title: "ISI Scoring Guide",
    howToScore: "Add your scores for all 7 questions. Total ISI score range: 0 to 28.",
  },
};
