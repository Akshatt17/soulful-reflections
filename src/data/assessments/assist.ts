import { AssessmentConfig } from "@/types/assessment";

// Substance selection options
const substanceOptions = [
  { value: 0, label: "Tobacco / Nicotine" },
  { value: 1, label: "Alcohol" },
  { value: 2, label: "Cannabis" },
  { value: 3, label: "Cocaine" },
  { value: 4, label: "Amphetamines / Stimulants" },
  { value: 5, label: "Inhalants" },
  { value: 6, label: "Sedatives / Sleeping pills" },
  { value: 7, label: "Hallucinogens" },
  { value: 8, label: "Opioids" },
  { value: 9, label: "Other substance" },
];

const substanceNames = [
  "Tobacco / Nicotine",
  "Alcohol",
  "Cannabis",
  "Cocaine",
  "Amphetamines / Stimulants",
  "Inhalants",
  "Sedatives / Sleeping pills",
  "Hallucinogens",
  "Opioids",
  "Other substance",
];

// Q1: Ever used?
const everUsedOptions = [
  { value: 0, label: "No" },
  { value: 1, label: "Yes" },
];

// Q2-Q7: ASSIST frequency scale (note: values are 0, 2, 3, 4, 6 - not sequential)
const frequencyOptions = [
  { value: 0, label: "Never" },
  { value: 2, label: "Once or twice" },
  { value: 3, label: "Monthly" },
  { value: 4, label: "Weekly" },
  { value: 6, label: "Daily or almost daily" },
];

// Q8: Serious harm
const seriousHarmOptions = [
  { value: 0, label: "No" },
  { value: 3, label: "Yes, but not in the last 3 months" },
  { value: 6, label: "Yes, in the last 3 months" },
];

export const assistConfig: AssessmentConfig = {
  id: "assist",
  title: "ASSIST (WHO) – Substance Use Self-Check",
  shortTitle: "ASSIST (WHO) – Substance Use Self-Check (Reflective Version)",
  description: "A gentle reflective tool adapted from the WHO ASSIST to help you notice patterns of substance use and its impact.",
  icon: "Shield",

  questions: [
    {
      sectionLabel: "Step 1: Select the substance you want to reflect on",
      text: "Which substance would you like to check? (You can retake this assessment for other substances later.)",
      options: substanceOptions,
    },
    {
      sectionLabel: "Q1. Ever in your life...",
      text: "Have you ever used this substance (even once)?",
      options: everUsedOptions,
    },
    {
      sectionLabel: "Q2. In the last 3 months...",
      text: "How often have you used this substance?",
      options: frequencyOptions,
    },
    {
      sectionLabel: "Q3. In the last 3 months...",
      text: "How often have you felt a strong urge, craving, or pull to use this substance?",
      options: frequencyOptions,
    },
    {
      sectionLabel: "Q4. In the last 3 months...",
      text: "How often has using this substance led to difficulties in your daily life (work, studies, home responsibilities, relationships, finances, or health)?",
      options: frequencyOptions,
    },
    {
      sectionLabel: "Q5. In the last 3 months...",
      text: "How often have you felt you should cut down, stop, or take a break from this substance but found it hard?",
      options: frequencyOptions,
    },
    {
      sectionLabel: "Q6. In the last 3 months...",
      text: "How often has someone close to you shown worry, concern, or asked you to reduce/stop because of your use?",
      options: frequencyOptions,
    },
    {
      sectionLabel: "Q7. In the last 3 months...",
      text: "How often have you tried and failed to control, cut down, or stop using this substance?",
      options: frequencyOptions,
    },
    {
      sectionLabel: "Q8. Ever in your life...",
      text: "Have you ever used this substance in a way that led to serious harm to you or others (accidents, injuries, unsafe situations, severe conflict, legal issues, overdose)?",
      options: seriousHarmOptions,
    },
  ],
  questionCount: 9,

  // Default options (not used directly as each question has per-question options)
  responseOptions: frequencyOptions,
  responseLabels: [
    { value: 0, label: "Never" },
    { value: 2, label: "Once or twice" },
    { value: 3, label: "Monthly" },
    { value: 4, label: "Weekly" },
    { value: 6, label: "Daily or almost daily" },
  ],

  maxScore: 39, // Max possible: Q2-Q7 each max 6, so 6*6 = 36 (Q8 not included in main score)

  // Used for ScoringDialog; actual scoring uses customScoring
  scoringBands: [
    {
      range: [0, 10],
      title: "Lower risk (Alcohol: 0–10, Others: 0–3)",
      description: "Your answers suggest your relationship with this substance is currently less likely to create harm. Still, staying mindful helps you keep your balance.",
      reflection: "Keeping boundaries and self-awareness can protect your well-being.",
      severity: "lower",
      borderColor: "border-sage/30",
      bgColor: "bg-sage/5",
      badgeColor: "bg-sage/20",
      badgeTextColor: "text-sage",
    },
    {
      range: [11, 26],
      title: "Moderate risk (Alcohol: 11–26, Others: 4–26)",
      description: "Your answers suggest this substance may be taking more space than you want it to. This is a good time for a supportive conversation, brief counseling, or a structured plan to cut down.",
      reflection: "Brief intervention, counseling, and coping-skills support can help prevent escalation.",
      severity: "moderate",
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-500/5",
      badgeColor: "bg-amber-500/20",
      badgeTextColor: "text-amber-700",
    },
    {
      range: [27, 39],
      title: "High risk (27+)",
      description: "Your answers suggest substance use may be significantly affecting your health, safety, or daily functioning. Professional support is strongly recommended.",
      reflection: "Please consider reaching out to a psychiatrist, addiction specialist, or de-addiction service for a fuller assessment and support plan. You don't have to carry this alone.",
      severity: "high",
      borderColor: "border-destructive/50",
      bgColor: "bg-destructive/10",
      badgeColor: "bg-destructive/30",
      badgeTextColor: "text-destructive",
    },
  ],

  intro: {
    subtitle: "The Velvet Mind",
    title: "ASSIST (WHO) – Substance Use Self-Check (Reflective Version)",
    tagline: "A gentle note before you begin",
    about: "This questionnaire is adapted in a softer, reflective tone from the WHO ASSIST (Alcohol, Smoking and Substance Involvement Screening Test). It is meant to help you notice patterns of substance use and its impact. It is not a diagnosis. If your results suggest moderate to high risk, it's a sign to reach out for professional support.",
    importantNote: "Answer based on your experience in the last 3 months, unless the question says 'ever' in your life. The ASSIST is scored separately for each substance—you can retake this assessment for different substances.",
    howToAnswer: {
      prompt: "First, select which substance you want to reflect on. Then answer each question honestly based on your experience.",
      instructions: [
        "Select one substance to check (you can retake for others).",
        "Most questions use: Never, Once or twice, Monthly, Weekly, Daily.",
        "Your total score (Q2–Q7) determines your risk level.",
        "Q8 about serious harm is considered separately.",
      ],
    },
    duration: "3-5 minutes",
  },

  quizHeader: "ASSIST – Substance Use Self-Check",
  quizSubheader: "Answer each question based on your experience. Most questions refer to the last 3 months.",

  crisis: {
    threshold: 27,
    title: "Support resources",
    message: "Your responses suggest this substance may be significantly affecting your life. Professional support can help—consider reaching out to a psychiatrist, addiction specialist, or de-addiction service. If you are in immediate danger or crisis, please seek urgent help.",
  },

  gentleReminder: "If your score falls in the moderate or high range, consider it a message—not of shame, but of care. Support can include brief counseling, therapy, medical guidance, family support, and structured recovery programs. Change becomes easier when it is not done alone.",

  scoringGuide: {
    title: "ASSIST Scoring Guide",
    howToScore: "Add your scores for Q2 to Q7 (Q1 is a gateway question; Q8 is considered separately for lifetime serious harm). For Alcohol: 0–10 = Lower risk, 11–26 = Moderate risk, 27+ = High risk. For all other substances: 0–3 = Lower risk, 4–26 = Moderate risk, 27+ = High risk.",
  },

  customScoring: (answers, config) => {
    // Q0 = substance selection (0-9)
    // Q1 = ever used (0=No, 1=Yes)
    // Q2-Q7 = frequency questions (scored 0/2/3/4/6)
    // Q8 = serious harm (0/3/6) - not in main score but flagged

    const substanceIndex = answers[0] ?? 0;
    const substanceName = substanceNames[substanceIndex];
    const isAlcohol = substanceIndex === 1;
    const everUsed = answers[1] === 1;

    // If never used (Q1 = No), score is 0
    if (!everUsed) {
      return {
        displayScore: 0,
        displayMax: isAlcohol ? 39 : 39,
        interpretation: {
          range: "0",
          title: "Lower risk",
          description: `You indicated you have never used ${substanceName}. No further risk assessment is needed for this substance.`,
          reflection: "If you have concerns about other substances, you can retake this assessment and select a different one.",
          severity: "lower",
          scoreDisplayValue: "Lower risk",
          scoreDisplaySubtitle: `${substanceName} • Never used`,
        },
        showCrisis: false,
      };
    }

    // Calculate score from Q2-Q7 (indices 2-7)
    const score = [2, 3, 4, 5, 6, 7].reduce(
      (sum, i) => sum + (answers[i] ?? 0),
      0
    );

    // Q8 serious harm flag
    const seriousHarmValue = answers[8] ?? 0;
    const hasSeriousHarm = seriousHarmValue > 0;
    const seriousHarmRecent = seriousHarmValue === 6;

    // Determine risk level based on substance type
    let riskLevel: "lower" | "moderate" | "high";
    let title: string;
    let description: string;
    let reflection: string;

    if (isAlcohol) {
      // Alcohol thresholds: 0-10 lower, 11-26 moderate, 27+ high
      if (score <= 10) {
        riskLevel = "lower";
        title = "Lower risk";
        description = "Your answers suggest your relationship with alcohol is currently less likely to create harm. Still, staying mindful helps you keep your balance.";
        reflection = "Keeping boundaries and self-awareness can protect your well-being.";
      } else if (score <= 26) {
        riskLevel = "moderate";
        title = "Moderate risk";
        description = "Your answers suggest alcohol may be taking more space than you want it to. This is a good time for a supportive conversation, brief counseling, or a structured plan to cut down.";
        reflection = "Brief intervention, counseling, and coping-skills support can help prevent escalation.";
      } else {
        riskLevel = "high";
        title = "High risk";
        description = "Your answers suggest alcohol use may be significantly affecting your health, safety, or daily functioning. Professional support is strongly recommended.";
        reflection = "Please consider reaching out to a psychiatrist, addiction specialist, or de-addiction service. You don't have to carry this alone.";
      }
    } else {
      // Other substances thresholds: 0-3 lower, 4-26 moderate, 27+ high
      if (score <= 3) {
        riskLevel = "lower";
        title = "Lower risk";
        description = `Your responses suggest minimal current risk from ${substanceName}. Keeping boundaries and self-awareness can protect your well-being.`;
        reflection = "Staying mindful helps you maintain your balance.";
      } else if (score <= 26) {
        riskLevel = "moderate";
        title = "Moderate risk";
        description = `Your responses suggest a pattern with ${substanceName} that could begin to impact health or functioning. Brief intervention, counseling, and coping-skills support can help prevent escalation.`;
        reflection = "This is a good time for a supportive conversation or structured plan to cut down.";
      } else {
        riskLevel = "high";
        title = "High risk";
        description = `Your responses suggest high likelihood of harm or dependence related to ${substanceName}. Please consider reaching out to a psychiatrist, addiction specialist, or de-addiction service for a fuller assessment and support plan.`;
        reflection = "Professional support is strongly recommended. You don't have to carry this alone.";
      }
    }

    // Add serious harm note if applicable
    if (hasSeriousHarm) {
      const harmTiming = seriousHarmRecent ? "in the last 3 months" : "in the past (not recently)";
      description += ` Note: You indicated serious harm has occurred ${harmTiming}. This is an important sign to seek professional guidance regardless of your score.`;
    }

    const showCrisis = riskLevel === "high" || seriousHarmRecent;

    return {
      displayScore: score,
      displayMax: 36, // Max for Q2-Q7
      interpretation: {
        range: `${score}`,
        title,
        description,
        reflection,
        severity: riskLevel,
        scoreDisplayValue: `${score}`,
        scoreDisplaySubtitle: `${substanceName} • ${title}${hasSeriousHarm ? " • Serious harm noted" : ""}`,
      },
      showCrisis,
    };
  },
};
