import { AssessmentConfig } from "@/types/assessment";

export const phq9Config: AssessmentConfig = {
  id: "phq9",
  title: "PHQ-9 Self-Reflection Questionnaire",
  shortTitle: "PHQ-9: Gentle Check-In for Low Mood",
  description: "A brief set of questions to help you reflect on how you've been feeling emotionally over the past two weeks.",
  icon: "Heart",
  
  questions: [
    { text: "Little interest or pleasure in things you usually enjoy." },
    { text: "Feeling down, low, or emotionally heavy." },
    { text: "Trouble falling asleep, staying asleep, or sleeping too much." },
    { text: "Feeling tired, low on energy, or slowed down." },
    { text: "Changes in appetite - eating less than usual or eating more for comfort." },
    { text: "Feeling disappointed in yourself, or feeling like you have let yourself or your loved ones down." },
    { text: "Trouble focusing (for example, while reading, working, or watching something)." },
    { text: "Moving or speaking more slowly than usual, or feeling unusually restless or fidgety." },
    { text: "Thoughts that you would be better off not here, or thoughts of harming yourself." },
  ],
  questionCount: 9,
  
  responseOptions: [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ],
  responseLabels: [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" },
  ],
  
  maxScore: 27,
  
  scoringBands: [
    {
      range: [0, 4],
      title: "Minimal or No Depression",
      description: "Your responses suggest your emotional state is fairly balanced right now. Occasional low days may still happen, but they do not seem to be weighing heavily on your daily life.",
      reflection: "You appear to have emotional resilience at this moment. Keep nurturing yourself through rest, connection, and self-care.",
      severity: "minimal",
      borderColor: "border-sage/30",
      bgColor: "bg-sage/5",
      badgeColor: "bg-sage/20",
      badgeTextColor: "text-sage",
    },
    {
      range: [5, 9],
      title: "Mild Depressive Symptoms",
      description: "Your answers suggest subtle emotional heaviness - perhaps low motivation, disturbed sleep, or moments of sadness that come and go.",
      reflection: "Your mind may be asking for gentle attention. If these feelings persist or grow, consider speaking with a mental health professional.",
      severity: "mild",
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-500/5",
      badgeColor: "bg-amber-500/20",
      badgeTextColor: "text-amber-700",
    },
    {
      range: [10, 14],
      title: "Moderate Depression",
      description: "Your responses indicate distress that may be affecting sleep, energy, focus, or enjoyment. Daily tasks may feel heavier.",
      reflection: "You are not weak - you may be overwhelmed. We strongly recommend consulting a mental health professional for support.",
      severity: "moderate",
      borderColor: "border-orange-500/30",
      bgColor: "bg-orange-500/5",
      badgeColor: "bg-orange-500/20",
      badgeTextColor: "text-orange-700",
    },
    {
      range: [15, 19],
      title: "Moderately Severe Depression",
      description: "Your answers suggest significant emotional pain that may be interfering with personal, professional, or social life.",
      reflection: "This is a moment to reach out. Please seek professional support as soon as possible. Therapy and/or medical support can help you regain stability and hope.",
      severity: "moderately-severe",
      borderColor: "border-destructive/30",
      bgColor: "bg-destructive/5",
      badgeColor: "bg-destructive/20",
      badgeTextColor: "text-destructive",
    },
    {
      range: [20, 27],
      title: "Severe Depression",
      description: "Your responses indicate intense distress that is likely affecting multiple areas of life. Support is not just recommended - it is necessary and available.",
      reflection: "Please consult a psychiatrist or mental health professional urgently. If you are having thoughts of harming yourself, seek immediate help from emergency services or someone you trust nearby.",
      severity: "severe",
      borderColor: "border-destructive/50",
      bgColor: "bg-destructive/10",
      badgeColor: "bg-destructive/30",
      badgeTextColor: "text-destructive",
    },
  ],
  
  intro: {
    subtitle: "Soulful Reflections",
    title: "PHQ-9: Gentle Check-In for Low Mood",
    tagline: "A self-reflection tool for the past 2 weeks",
    about: "This questionnaire helps you notice patterns in mood, energy, sleep, and self-worth over the past two weeks. It is not a diagnosis. It is a screening and reflection tool that can guide you toward support if needed.",
    howToAnswer: {
      prompt: "How to Answer",
      instructions: [
        "Think about the last 2 weeks (including today).",
        "Choose one option for each statement.",
        "Answer as honestly as you can - there are no right or wrong answers.",
      ],
    },
    duration: "2-3 minutes",
  },
  
  quizHeader: "PHQ-9: Gentle Check-In",
  quizSubheader: "Over the last 2 weeks, how often have you been bothered by these?",
  
  crisis: {
    threshold: 15,
    flaggedQuestionIndex: 8, // Question 9 (0-indexed as 8) - self-harm question
    title: "Support Resources",
    message: "Based on your responses, we want to make sure you have access to support:",
  },
  
  gentleReminder: "Mental health exists on a spectrum. Needing help is not a weakness - it is wisdom. If your score suggests moderate to severe symptoms, reaching out early can change the course of your journey.",
  
  scoringGuide: {
    title: "PHQ-9 Scoring Guide",
    howToScore: "Add up your scores for all 9 questions. Total score range: 0 to 27.",
  },
};
