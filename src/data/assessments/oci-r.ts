import { AssessmentConfig } from "@/types/assessment";

export const ociRConfig: AssessmentConfig = {
  id: "oci-r",
  title: "OCI-R – Obsessive-Compulsive Inventory–Revised",
  shortTitle: "OCI-R – Obsessive-Compulsive Inventory–Revised (Reflective Version)",
  description: "A gentle reflective self-check inspired by the OCI-R, a widely used screening measure for obsessive-compulsive symptoms.",
  icon: "Target",

  questions: [
    { text: "Unwanted thoughts, images, or urges have shown up in my mind and felt hard to dismiss." },
    { text: "I have replayed worries in my mind (for example, 'What if I did something wrong?') even when I tried to reassure myself." },
    { text: "I have felt a strong need to be certain, and uncertainty has felt unusually uncomfortable." },
    { text: "I have checked things repeatedly (locks, switches, messages, appliances, mistakes) to feel 'sure.'" },
    { text: "I have gone back over actions or memories to confirm something is correct or safe." },
    { text: "I have asked others for reassurance more than I wanted to, just to settle a doubt." },
    { text: "I have felt unusually concerned about germs, contamination, or feeling 'unclean.'" },
    { text: "I have washed, cleaned, or sanitized more than felt necessary to feel calm." },
    { text: "I have avoided places, objects, or people because of fear of contamination or feeling dirty." },
    { text: "I have felt distressed when things were not arranged evenly, neatly, or 'just right.'" },
    { text: "I have spent time adjusting, arranging, or repeating actions until it felt correct." },
    { text: "I have felt compelled to follow certain rules or patterns to prevent discomfort." },
    { text: "I have struggled to throw away items because of a strong feeling that I might need them later." },
    { text: "Letting go of objects has felt emotionally difficult, even when I knew they were not useful." },
    { text: "Clutter or saved items have started to affect my space or daily routine." },
    { text: "I have repeated words, prayers, numbers, or mental actions to reduce anxiety or prevent something bad." },
    { text: "I have tried to 'undo' a thought by replacing it with another thought, image, or action." },
    { text: "I have felt driven to perform a small ritual (mental or physical) to feel safe or relieved." },
  ],
  questionCount: 18,

  responseOptions: [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ],
  responseLabels: [
    { value: 0, label: "Not at all" },
    { value: 1, label: "A little" },
    { value: 2, label: "Moderately" },
    { value: 3, label: "A lot" },
    { value: 4, label: "Extremely" },
  ],

  maxScore: 72,

  scoringBands: [
    {
      range: [0, 20],
      title: "Lower range",
      description: "Your responses suggest OCD-like symptoms are minimal or occasional. Intrusive thoughts and habits can happen to anyone, especially under stress. If any specific theme bothers you, you still deserve support.",
      reflection: "If any of these experiences feel intrusive or distressing, gentle self-compassion and professional support can help.",
      severity: "low",
      borderColor: "border-sage/30",
      bgColor: "bg-sage/5",
      badgeColor: "bg-sage/20",
      badgeTextColor: "text-sage",
    },
    {
      range: [21, 30],
      title: "Elevated range (possible clinically significant symptoms)",
      description: "Your responses suggest these thoughts or urges may be taking noticeable space. You may be spending time checking, cleaning, repeating, arranging, or mentally reassuring yourself—often to reduce anxiety or prevent a feared outcome.",
      reflection: "This is not 'overthinking' by choice. OCD symptoms often feel like a false alarm that keeps ringing.",
      severity: "elevated",
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-500/5",
      badgeColor: "bg-amber-500/20",
      badgeTextColor: "text-amber-700",
    },
    {
      range: [31, 72],
      title: "High range (strong likelihood of significant OCD symptoms)",
      description: "Your responses suggest a high level of distress and/or compulsive coping patterns. These experiences can be exhausting, time-consuming, and isolating.",
      reflection: "Effective treatment is available. Please consider consulting a psychiatrist or clinical psychologist—especially one trained in CBT with ERP (Exposure and Response Prevention).",
      severity: "high",
      borderColor: "border-destructive/50",
      bgColor: "bg-destructive/10",
      badgeColor: "bg-destructive/30",
      badgeTextColor: "text-destructive",
    },
  ],

  intro: {
    subtitle: "The Velvet Mind",
    title: "OCI-R – Obsessive-Compulsive Inventory–Revised (Reflective Version)",
    tagline: "A gentle note before you begin",
    about: "This self-check is written in a softer, reflective tone and is inspired by the OCI-R (Obsessive-Compulsive Inventory–Revised), a widely used screening measure for obsessive-compulsive symptoms. It is not a diagnosis. A higher score suggests stronger OCD-like symptoms and is a sign to consider a professional assessment—especially if these experiences consume time or cause distress.",
    howToAnswer: {
      prompt: "Answer based on how much each experience has bothered you over the last 1 month. For each statement, choose one number (0–4).",
      instructions: [
        "Think about the last month (including today).",
        "Choose one option for each statement.",
        "Answer as honestly as you can - there are no right or wrong answers.",
      ],
    },
    duration: "5-7 minutes",
  },

  quizHeader: "OCI-R – Obsessive-Compulsive Inventory–Revised",
  quizSubheader: "Over the last month, how much has each experience bothered you? Choose one score (0-4) for each item.",

  crisis: {
    threshold: 31,
    title: "If you feel unsafe",
    message: "If you are having thoughts of self-harm, feeling overwhelmed beyond control, or unable to function, seek urgent professional help. Even if your score is not very high, consider getting help if: these symptoms take more than 1 hour a day; they interfere with work/studies, relationships, faith practices, health, or daily routines; or you feel stuck in rituals or avoidance.",
  },

  gentleReminder: "A higher score suggests stronger OCD-like symptoms and is a sign to consider a professional assessment. These experiences are not a character flaw—they are patterns that can be understood and treated with skilled support.",

  scoringGuide: {
    title: "OCI-R Scoring Guide",
    howToScore: "Add all item scores to get a total. Total score range: 0 to 72 (18 items × 0–4).",
  },
};
