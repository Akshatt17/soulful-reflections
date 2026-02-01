import { AssessmentConfig } from "@/types/assessment";

// Part 1: Yes=1, No=0
const yesNoOptions = [
  { value: 0, label: "No" },
  { value: 1, label: "Yes" },
];

// Part 2: Yes=2, No=0, Not sure=1 (scoring checks for Yes=2)
const part2Options = [
  { value: 0, label: "No" },
  { value: 1, label: "Not sure" },
  { value: 2, label: "Yes" },
];

// Part 3: No problem=0, Minor=1, Moderate=2, Serious=3
const part3Options = [
  { value: 0, label: "No problem" },
  { value: 1, label: "Minor problem" },
  { value: 2, label: "Moderate problem" },
  { value: 3, label: "Serious problem" },
];

export const mdqConfig: AssessmentConfig = {
  id: "mdq",
  title: "MDQ – Mood Disorder Questionnaire",
  shortTitle: "MDQ – Mood Disorder Questionnaire (Reflective Mood Check-In)",
  description: "A gentle reflective self-check based on the Mood Disorder Questionnaire, a commonly used screening tool for possible bipolar spectrum symptoms.",
  icon: "Zap",

  questions: [
    {
      sectionLabel: "Part 1: Experiences of a 'high' or unusually energized mood",
      text: "There were times when you felt so upbeat, confident, or 'on top of the world' that others noticed a change (or you got into situations that weren't typical for you).",
      options: yesNoOptions,
    },
    {
      text: "There were times when you felt unusually irritable or easily provoked, where you snapped more than usual or felt 'on edge' for a stretch of time.",
      options: yesNoOptions,
    },
    {
      text: "There were times when you needed much less sleep than usual and still felt full of energy.",
      options: yesNoOptions,
    },
    {
      text: "There were times when you talked more than usual, spoke faster, or felt pressure to keep talking.",
      options: yesNoOptions,
    },
    {
      text: "There were times when your thoughts raced, jumped quickly between ideas, or your mind felt hard to slow down.",
      options: yesNoOptions,
    },
    {
      text: "There were times when you got distracted more easily than usual, or had trouble staying focused because everything grabbed your attention.",
      options: yesNoOptions,
    },
    {
      text: "There were times when you felt unusually energetic, restless, or driven—like you had to keep doing something.",
      options: yesNoOptions,
    },
    {
      text: "There were times when you were more active than usual (socially, physically, at work, online, or starting many projects).",
      options: yesNoOptions,
    },
    {
      text: "There were times when you were more outgoing than usual—calling people, messaging, socializing more, or feeling unusually socially bold.",
      options: yesNoOptions,
    },
    {
      text: "There were times when your interest in sex increased noticeably compared to your usual self.",
      options: yesNoOptions,
    },
    {
      text: "There were times when you did things that were unusual for you or risky—spending more money, driving fast, substance use, impulsive choices, or taking chances you'd normally avoid.",
      options: yesNoOptions,
    },
    {
      text: "There were times when your spending increased so much that it caused trouble for you or your family.",
      options: yesNoOptions,
    },
    {
      sectionLabel: "Part 2: Timing",
      text: "If you answered 'Yes' to more than one item above, did several of these experiences happen during the same period of time?",
      options: part2Options,
    },
    {
      sectionLabel: "Part 3: Impact on life",
      text: "How much did these experiences affect your life (work/studies, relationships, finances, health, safety, or daily functioning)?",
      options: part3Options,
    },
  ],
  questionCount: 14,

  // Default options (used when question has no per-question override)
  responseOptions: yesNoOptions,
  responseLabels: [
    { value: 0, label: "No" },
    { value: 1, label: "Yes" },
  ],

  maxScore: 12, // Part 1 max (12 Yes answers)

  // Used for ScoringDialog; actual result uses customScoring logic
  scoringBands: [
    {
      range: [0, 6],
      title: "Negative screen",
      description: "Your answers do not strongly suggest a bipolar-spectrum pattern on this screening tool. Still, mood symptoms can come from stress, anxiety, depression, trauma, sleep disruption, medical conditions, or substance use. If you're struggling or your mood feels unpredictable, you still deserve support.",
      reflection: "If any of these experiences resonate with you, consider speaking with a mental health professional for support.",
      severity: "negative",
      borderColor: "border-sage/30",
      bgColor: "bg-sage/5",
      badgeColor: "bg-sage/20",
      badgeTextColor: "text-sage",
    },
    {
      range: [7, 12],
      title: "Positive screen (when Part 2 = Yes AND Part 3 = Moderate/Serious)",
      description: "Your answers suggest you may have experienced periods of unusually elevated energy, activity, or irritability that cluster together and have affected your life. This does not confirm bipolar disorder—but it is a meaningful sign to seek a professional assessment.",
      reflection: "Many people describe these phases as feeling powerful, fast, or intensely productive at first—but later they can lead to exhaustion, conflict, regret, or emotional crashes. Understanding the pattern can be the beginning of steadier ground.",
      severity: "positive",
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-500/5",
      badgeColor: "bg-amber-500/20",
      badgeTextColor: "text-amber-700",
    },
  ],

  intro: {
    subtitle: "Soulful Reflections",
    title: "MDQ – Mood Disorder Questionnaire (Reflective Mood Check-In)",
    tagline: "A gentle note before you begin",
    about: "This self-check is written in a softer, reflective tone based on the Mood Disorder Questionnaire (MDQ), a commonly used screening tool for possible bipolar spectrum symptoms. It is not a diagnosis. A positive screen simply means it may be worth having a professional evaluation—especially if mood shifts have impacted your life, relationships, sleep, or decisions.",
    howToAnswer: {
      prompt: "Think about your experiences across your life (not only the last few weeks). For each statement below, choose Yes or No based on whether you have ever had a period of time when that statement felt true for you.",
      instructions: [
        "Part 1: Mark Yes or No for each item about elevated or energized mood experiences.",
        "Part 2: If you said Yes to more than one item, did several happen during the same period?",
        "Part 3: How much did these experiences affect your life?",
      ],
    },
    duration: "5-7 minutes",
  },

  quizHeader: "MDQ – Mood Disorder Questionnaire",
  quizSubheader: "Please mark Yes or No for each item. Think about your experiences across your life.",

  crisis: {
    threshold: 1, // Positive screen triggers crisis resources
    title: "When to consult sooner",
    message: "Please consider consulting a psychiatrist or qualified mental health professional if: you have repeated cycles of 'high/energized' periods followed by low mood or burnout; you've had risky behaviors during these phases; sleep reduces dramatically without fatigue; relationships or work are being affected; you have a family history of bipolar disorder. If you are having thoughts of self-harm, feeling out of control, or unable to sleep for multiple nights, seek urgent help.",
  },

  gentleReminder: "Some people may still benefit from a professional evaluation even if they don't meet all three criteria—especially if mood shifts are distressing, risky, or recurrent. A positive screen does not confirm bipolar disorder, but it is a meaningful sign to seek a professional assessment.",

  scoringGuide: {
    title: "MDQ Scoring Guide",
    howToScore: "The MDQ is usually considered a positive screen when: (1) You answered 'Yes' to 7 or more items in Part 1, AND (2) You answered 'Yes' in Part 2 (symptoms occurred during the same time period), AND (3) You marked Part 3 as 'Moderate problem' or 'Serious problem.'",
  },

  customScoring: (answers, config) => {
    // Part 1: sum of Yes answers (indices 0-11), Yes=1
    const part1Count = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reduce(
      (sum, i) => sum + (answers[i] === 1 ? 1 : 0),
      0
    );
    // Part 2: index 12, Yes=2
    const part2Yes = answers[12] === 2;
    // Part 3: index 13, Moderate=2 or Serious=3
    const part3ModerateOrSerious = (answers[13] ?? 0) >= 2;

    const isPositive =
      part1Count >= 7 && part2Yes && part3ModerateOrSerious;

    const part2Label = part2Yes ? "Yes" : answers[12] === 1 ? "Not sure" : "No";
    const part3Labels = ["No problem", "Minor problem", "Moderate problem", "Serious problem"];
    const part3Label = part3Labels[answers[13] ?? 0];

    const negativeInterpretation = {
      range: "Negative",
      title: "Negative screen",
      description:
        "Your answers do not strongly suggest a bipolar-spectrum pattern on this screening tool. Still, mood symptoms can come from stress, anxiety, depression, trauma, sleep disruption, medical conditions, or substance use. If you're struggling or your mood feels unpredictable, you still deserve support.",
      reflection:
        "If any of these experiences resonate with you, consider speaking with a mental health professional for support.",
      severity: "negative",
    };

    const positiveInterpretation = {
      range: "Positive",
      title: "Positive screen",
      description:
        "Your answers suggest you may have experienced periods of unusually elevated energy, activity, or irritability that cluster together and have affected your life. This does not confirm bipolar disorder—but it is a meaningful sign to seek a professional assessment.",
      reflection:
        "Many people describe these phases as feeling powerful, fast, or intensely productive at first—but later they can lead to exhaustion, conflict, regret, or emotional crashes. Understanding the pattern can be the beginning of steadier ground.",
      severity: "positive",
    };

    const interpretation = isPositive ? positiveInterpretation : negativeInterpretation;

    return {
      displayScore: part1Count,
      displayMax: 12,
      interpretation: {
        ...interpretation,
        scoreDisplayValue: isPositive ? "Positive screen" : "Negative screen",
        scoreDisplaySubtitle: `${part1Count} of 12 items in Part 1 • Part 2: ${part2Label} • Part 3: ${part3Label}`,
      },
      showCrisis: isPositive,
    };
  },
};
