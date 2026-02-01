import { AssessmentConfig } from "@/types/assessment";

export const gad7Config: AssessmentConfig = {
  id: "gad7",
  title: "GAD-7: A Gentle Check-In for Anxiety",
  shortTitle: "GAD-7: A Gentle Check-In for Anxiety",
  description: "A short self-reflection tool to help you notice how often anxiety-related feelings and thoughts have been showing up in your life.",
  icon: "Brain",
  
  questions: [
    { text: "Feeling more nervous, anxious, or on edge than you would like." },
    { text: "Finding it difficult to stop or manage worrying once it starts." },
    { text: "Worrying about different things across the day (even small things)." },
    { text: "Feeling tense or restless inside, like it is hard to relax." },
    { text: "Feeling so restless that sitting still feels difficult." },
    { text: "Becoming easily irritated, short-tempered, or more sensitive than usual." },
    { text: "Feeling as if something bad might happen, even when you cannot explain why." },
  ],
  questionCount: 7,
  
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
  
  maxScore: 21,
  
  scoringBands: [
    {
      range: [0, 4],
      title: "Minimal Anxiety",
      description: "Your responses suggest that anxiety is not strongly present right now, or it is showing up only occasionally. You may still have stressful days, but they do not seem to be taking over your inner space.",
      reflection: "Keep supporting your nervous system with rest, routine, and connection.",
      severity: "minimal",
      borderColor: "border-sage/30",
      bgColor: "bg-sage/5",
      badgeColor: "bg-sage/20",
      badgeTextColor: "text-sage",
    },
    {
      range: [5, 9],
      title: "Mild Anxiety",
      description: "Your answers suggest that worry or tension has been visiting more often than you would like. It may come and go, but it is asking for gentle attention.",
      reflection: "Consider grounding practices (slow breathing, movement, journaling) and talk to someone you trust if it continues.",
      severity: "mild",
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-500/5",
      badgeColor: "bg-amber-500/20",
      badgeTextColor: "text-amber-700",
    },
    {
      range: [10, 14],
      title: "Moderate Anxiety",
      description: "Your responses indicate anxiety that may be affecting focus, sleep, or everyday comfort. You might be spending a noticeable amount of energy managing worry.",
      reflection: "It can really help to consult a mental health professional for practical strategies and support.",
      severity: "moderate",
      borderColor: "border-orange-500/30",
      bgColor: "bg-orange-500/5",
      badgeColor: "bg-orange-500/20",
      badgeTextColor: "text-orange-700",
    },
    {
      range: [15, 21],
      title: "Severe Anxiety",
      description: "Your answers suggest intense anxiety that may be significantly interfering with your life. Living in this state can be exhausting, and you do not have to carry it alone.",
      reflection: "Please seek professional help soon. Support can reduce suffering and help you feel safe in your body and mind again.",
      severity: "severe",
      borderColor: "border-destructive/50",
      bgColor: "bg-destructive/10",
      badgeColor: "bg-destructive/30",
      badgeTextColor: "text-destructive",
    },
  ],
  
  intro: {
    subtitle: "Soulful Reflections",
    title: "GAD-7: A Gentle Check-In for Anxiety",
    tagline: "Generalized Anxiety Disorder-7 (GAD-7)",
    about: "This short self-reflection tool helps you notice how often anxiety-related feelings and thoughts have been showing up in your life over the last 2 weeks.",
    importantNote: "This is not a diagnosis. It is a screening and reflection tool. If your results feel concerning, or if you are struggling to cope, consider reaching out to a mental health professional.",
    howToAnswer: {
      prompt: "Over the last 2 weeks, how often have you been bothered by the following?",
      instructions: [
        "Think about the last 2 weeks (including today).",
        "Choose one option for each statement.",
        "Answer as honestly as you can - there are no right or wrong answers.",
      ],
    },
    duration: "1-2 minutes",
  },
  
  quizHeader: "GAD-7: Gentle Check-In for Anxiety",
  quizSubheader: "Over the last 2 weeks, how often have you been bothered by these?",
  
  crisis: {
    threshold: 15,
    title: "If You Feel Unsafe",
    message: "If you are having thoughts of harming yourself, feel unable to stay safe, or feel in immediate danger, seek urgent help from local emergency services or the nearest hospital, or reach out to someone you trust right now.",
  },
  
  gentleReminder: "Mental health exists on a spectrum. Needing help is not a weakness - it is wisdom. If your score suggests moderate to severe symptoms, reaching out early can change the course of your journey.",
  
  scoringGuide: {
    title: "GAD-7 Scoring Guide",
    howToScore: "Add up your scores for all 7 questions. Total score range: 0 to 21.",
  },
};
