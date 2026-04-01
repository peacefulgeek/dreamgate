export interface AssessmentQuestion {
  question: string;
  options: { text: string; score: number }[];
}

export interface AssessmentRange {
  min: number;
  max: number;
  title: string;
  description: string;
  recommendations: string[];
  articleSlugs: string[];
}

export interface Assessment {
  id: string;
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  questions: AssessmentQuestion[];
  ranges: AssessmentRange[];
  maxScore: number;
  getResult: (score: number) => AssessmentRange;
}

function findRange(ranges: AssessmentRange[], score: number): AssessmentRange {
  for (const r of ranges) {
    if (score >= r.min && score <= r.max) return r;
  }
  return ranges[ranges.length - 1];
}

export const assessments: Assessment[] = [
  {
    id: "dream-recall",
    slug: "dream-recall-assessment",
    title: "Dream Recall Ability Assessment",
    description: "Measure how well you remember your dreams and identify specific areas for improvement.",
    metaDescription: "Assess your dream recall ability with this 10-question evaluation. Get personalized recommendations for improving dream memory.",
    maxScore: 40,
    questions: [
      { question: "How many mornings per week do you remember at least one dream?", options: [{ text: "Rarely or never", score: 0 }, { text: "1-2 mornings", score: 1 }, { text: "3-4 mornings", score: 2 }, { text: "5-6 mornings", score: 3 }, { text: "Almost every morning", score: 4 }] },
      { question: "When you do remember a dream, how much detail can you recall?", options: [{ text: "Only a vague feeling", score: 0 }, { text: "One or two fragments", score: 1 }, { text: "The main storyline", score: 2 }, { text: "Multiple scenes with detail", score: 3 }, { text: "Vivid, complete narratives", score: 4 }] },
      { question: "Do you keep a dream journal?", options: [{ text: "No, never tried", score: 0 }, { text: "I tried but stopped", score: 1 }, { text: "Occasionally", score: 2 }, { text: "Most mornings", score: 3 }, { text: "Every morning without fail", score: 4 }] },
      { question: "Can you recall dreams from earlier in the night (not just the last one)?", options: [{ text: "Never", score: 0 }, { text: "Very rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Regularly — multiple dreams per night", score: 4 }] },
      { question: "How quickly do your dream memories fade after waking?", options: [{ text: "Gone within seconds", score: 0 }, { text: "Gone within a few minutes", score: 1 }, { text: "Fade over an hour", score: 2 }, { text: "Persist for several hours", score: 3 }, { text: "I can recall them all day", score: 4 }] },
      { question: "Do you notice recurring symbols or themes across dreams?", options: [{ text: "I do not remember enough to notice", score: 0 }, { text: "Maybe one or two", score: 1 }, { text: "A few patterns", score: 2 }, { text: "Several clear patterns", score: 3 }, { text: "I track a rich symbolic vocabulary", score: 4 }] },
      { question: "Can you recall the emotions you felt during a dream?", options: [{ text: "Rarely", score: 0 }, { text: "Sometimes a general mood", score: 1 }, { text: "Usually the dominant emotion", score: 2 }, { text: "Multiple emotions with nuance", score: 3 }, { text: "Full emotional landscape", score: 4 }] },
      { question: "Do you ever remember sounds, smells, or physical sensations from dreams?", options: [{ text: "Never", score: 0 }, { text: "Very rarely", score: 1 }, { text: "Occasionally", score: 2 }, { text: "Frequently", score: 3 }, { text: "Regularly — multi-sensory recall", score: 4 }] },
      { question: "How often do you wake up knowing you dreamed but cannot remember the content?", options: [{ text: "Almost every morning", score: 0 }, { text: "Most mornings", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Rarely", score: 3 }, { text: "Almost never — I usually remember", score: 4 }] },
      { question: "Have you noticed your dream recall improving over time?", options: [{ text: "It has gotten worse", score: 0 }, { text: "No change", score: 1 }, { text: "Slight improvement", score: 2 }, { text: "Noticeable improvement", score: 3 }, { text: "Dramatically better", score: 4 }] },
    ],
    ranges: [
      { min: 0, max: 10, title: "Dormant Dreamer", description: "Your dream recall is currently minimal, but this is not a fixed trait — it is a skill that responds to practice. Most people at this level see significant improvement within 2-3 weeks of consistent effort.", recommendations: ["Start a bedside dream journal — even single words count", "Set an intention before sleep: 'I will remember my dreams'", "Avoid screens for 30 minutes before bed", "Stay still for 60 seconds upon waking before moving"], articleSlugs: ["why-you-forget-dreams", "dream-journal-beginners-guide"] },
      { min: 11, max: 20, title: "Emerging Recall", description: "You are catching fragments but losing the full picture. This is the most common stage — and the one where small changes produce the biggest gains. Your brain is already generating rich dreams; the bottleneck is the transfer from sleep memory to waking memory.", recommendations: ["Write in your journal within 60 seconds of waking", "Record emotions first, then images, then narrative", "Review your journal weekly to spot patterns", "Try waking 30 minutes earlier to catch the last REM cycle"], articleSlugs: ["dream-recall-techniques", "rem-sleep-emotional-processing"] },
      { min: 21, max: 30, title: "Active Dreamer", description: "You have solid dream recall with room to deepen. At this level, you are ready to move beyond simple recording into active dreamwork — interpretation, pattern tracking, and dialogue with dream figures.", recommendations: ["Begin tracking recurring symbols in a separate index", "Practice dream re-entry meditation", "Explore active imagination with persistent dream figures", "Consider a dream group for external perspectives"], articleSlugs: ["recurring-dream-symbols-decoded", "practice-dream-re-entry"] },
      { min: 31, max: 40, title: "Dream Adept", description: "Your dream recall is exceptional. You have built a strong bridge between your sleeping and waking consciousness. The next frontier is not remembering more — it is going deeper into what you already remember.", recommendations: ["Explore lucid dreaming techniques", "Study dream yoga traditions", "Work with the somatic dimension of dreams", "Consider teaching or mentoring others in dreamwork"], articleSlugs: ["lucid-dreaming-spiritual-practice", "turiya-fourth-state"] },
    ],
    getResult(score) { return findRange(this.ranges, score); },
  },
  {
    id: "lucid-readiness",
    slug: "lucid-dreaming-readiness-assessment",
    title: "Lucid Dreaming Readiness Assessment",
    description: "Evaluate whether you have the prerequisites for successful lucid dreaming practice.",
    metaDescription: "Are you ready for lucid dreaming? This assessment evaluates your awareness, recall, and meditation skills to determine your readiness.",
    maxScore: 40,
    questions: [
      { question: "How often do you question whether you are dreaming during the day?", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "A few times a week", score: 2 }, { text: "Daily", score: 3 }, { text: "Multiple times daily — it is a habit", score: 4 }] },
      { question: "Do you have a regular meditation practice?", options: [{ text: "No", score: 0 }, { text: "I have tried it", score: 1 }, { text: "A few times a week", score: 2 }, { text: "Daily, 10-20 minutes", score: 3 }, { text: "Daily, 30+ minutes", score: 4 }] },
      { question: "How would you rate your dream recall?", options: [{ text: "I rarely remember dreams", score: 0 }, { text: "A few dreams per week", score: 1 }, { text: "Most mornings", score: 2 }, { text: "Every morning with detail", score: 3 }, { text: "Multiple dreams per night", score: 4 }] },
      { question: "Have you ever realized you were dreaming while still in the dream?", options: [{ text: "Never", score: 0 }, { text: "Once or twice in my life", score: 1 }, { text: "A few times", score: 2 }, { text: "Several times", score: 3 }, { text: "Regularly", score: 4 }] },
      { question: "How aware are you of your surroundings during daily activities?", options: [{ text: "Often on autopilot", score: 0 }, { text: "Somewhat aware", score: 1 }, { text: "Moderately mindful", score: 2 }, { text: "Usually present and aware", score: 3 }, { text: "Highly mindful throughout the day", score: 4 }] },
      { question: "Do you perform reality checks?", options: [{ text: "What are reality checks?", score: 0 }, { text: "I know about them but do not do them", score: 1 }, { text: "Occasionally", score: 2 }, { text: "Several times daily", score: 3 }, { text: "Consistently, with genuine questioning", score: 4 }] },
      { question: "How well can you maintain focus on a single thought or image?", options: [{ text: "My mind wanders constantly", score: 0 }, { text: "A few seconds", score: 1 }, { text: "30 seconds to a minute", score: 2 }, { text: "Several minutes", score: 3 }, { text: "Extended periods with stability", score: 4 }] },
      { question: "Do you notice dream signs — recurring elements that could signal you are dreaming?", options: [{ text: "I do not know what dream signs are", score: 0 }, { text: "I have not identified any", score: 1 }, { text: "I know a few but miss them in dreams", score: 2 }, { text: "I recognize them sometimes", score: 3 }, { text: "I have a clear list and watch for them", score: 4 }] },
      { question: "How do you respond to unusual events in daily life?", options: [{ text: "I do not notice them", score: 0 }, { text: "I notice but move on", score: 1 }, { text: "I pause and consider them", score: 2 }, { text: "I question my assumptions", score: 3 }, { text: "I use them as awareness triggers", score: 4 }] },
      { question: "What is your motivation for lucid dreaming?", options: [{ text: "Curiosity", score: 1 }, { text: "Fun and adventure", score: 2 }, { text: "Self-knowledge", score: 3 }, { text: "Spiritual practice", score: 3 }, { text: "Consciousness exploration", score: 4 }] },
    ],
    ranges: [
      { min: 0, max: 10, title: "Foundation Building", description: "You need to build the prerequisites before attempting lucid dreaming. Focus on dream recall and basic mindfulness first — without these foundations, lucid dreaming techniques will not work.", recommendations: ["Establish a dream journal practice for at least 4 weeks", "Begin a daily meditation practice, even 5 minutes", "Learn about reality checks and start practicing them", "Read Exploring the World of Lucid Dreaming by Stephen LaBerge"], articleSlugs: ["dream-recall-techniques", "meditation-changes-dream-landscape"] },
      { min: 11, max: 20, title: "Approaching Readiness", description: "You have some of the building blocks but need to strengthen your awareness practice. Lucid dreams may happen spontaneously at this level, but you are not yet ready for systematic induction.", recommendations: ["Increase reality checks to 10+ per day with genuine questioning", "Deepen meditation to 15-20 minutes daily", "Start a dream sign catalog from your journal", "Practice MILD technique before sleep"], articleSlugs: ["reality-testing-bridge", "conscious-dreaming-techniques"] },
      { min: 21, max: 30, title: "Ready for Practice", description: "You have the awareness, recall, and discipline needed for lucid dreaming. Now it is a matter of consistent technique application and patience.", recommendations: ["Choose one induction technique and practice it for 30 days", "Combine MILD with WBTB for highest success rate", "Keep detailed records of any lucidity, even brief flashes", "Study dream stabilization techniques for when lucidity occurs"], articleSlugs: ["lucid-dreaming-spiritual-practice", "dream-control-vs-surrender"] },
      { min: 31, max: 40, title: "Advanced Practitioner", description: "You are already experiencing or very close to regular lucid dreams. Your foundation is strong. The question now is what you will do with this capacity.", recommendations: ["Explore dream yoga traditions for deeper practice", "Use lucid dreams for shadow work and integration", "Practice dream incubation with specific intentions", "Consider the philosophical implications of conscious dreaming"], articleSlugs: ["turiya-fourth-state", "lucid-dreaming-spiritual-practice"] },
    ],
    getResult(score) { return findRange(this.ranges, score); },
  },
  {
    id: "shadow-awareness",
    slug: "shadow-awareness-assessment",
    title: "Shadow Awareness Assessment",
    description: "Measure your relationship with the unconscious shadow — the parts of yourself you have disowned or denied.",
    metaDescription: "How aware are you of your psychological shadow? This assessment measures your relationship with the unconscious parts of yourself.",
    maxScore: 40,
    questions: [
      { question: "When someone irritates you intensely, do you consider that the quality might exist in yourself?", options: [{ text: "No — they are just annoying", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Almost always — I use it as a mirror", score: 4 }] },
      { question: "How comfortable are you with your own anger?", options: [{ text: "I suppress it completely", score: 0 }, { text: "It makes me very uncomfortable", score: 1 }, { text: "I am learning to sit with it", score: 2 }, { text: "I can feel it without acting on it", score: 3 }, { text: "I have a healthy relationship with my anger", score: 4 }] },
      { question: "Do you have recurring dreams about threatening figures or being chased?", options: [{ text: "Frequently — they terrify me", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Occasionally", score: 2 }, { text: "Rarely now — I used to", score: 3 }, { text: "I engage with shadow figures in dreams", score: 4 }] },
      { question: "How do you respond to criticism?", options: [{ text: "Defensively — I shut down or attack", score: 0 }, { text: "It stings but I try to ignore it", score: 1 }, { text: "I consider it but it is hard", score: 2 }, { text: "I can usually find the truth in it", score: 3 }, { text: "I actively seek honest feedback", score: 4 }] },
      { question: "Are there parts of yourself you hide from others?", options: [{ text: "Many — I show a very curated version", score: 0 }, { text: "Several important ones", score: 1 }, { text: "A few, but I am working on it", score: 2 }, { text: "Very few — I am mostly authentic", score: 3 }, { text: "I am comfortable showing all of myself", score: 4 }] },
      { question: "How do you relate to people you admire intensely?", options: [{ text: "I idealize them", score: 0 }, { text: "I wish I could be like them", score: 1 }, { text: "I recognize they have qualities I want to develop", score: 2 }, { text: "I see them as mirrors of my own potential", score: 3 }, { text: "I own those qualities in myself", score: 4 }] },
      { question: "When you make a mistake, what is your inner response?", options: [{ text: "Harsh self-criticism", score: 0 }, { text: "Shame and hiding", score: 1 }, { text: "Discomfort but I try to learn", score: 2 }, { text: "Honest acknowledgment without drama", score: 3 }, { text: "Curiosity about what the mistake reveals", score: 4 }] },
      { question: "Do you notice patterns in your relationships — the same conflicts repeating?", options: [{ text: "No — every situation is different", score: 0 }, { text: "Maybe, but it is their fault", score: 1 }, { text: "I am starting to see patterns", score: 2 }, { text: "Yes, and I am working on my part", score: 3 }, { text: "I use relationships as mirrors for growth", score: 4 }] },
      { question: "How do you handle envy?", options: [{ text: "I deny feeling it", score: 0 }, { text: "It consumes me sometimes", score: 1 }, { text: "I feel it and try to understand it", score: 2 }, { text: "I use it as information about my desires", score: 3 }, { text: "I have transformed envy into aspiration", score: 4 }] },
      { question: "Have you done any formal shadow work (therapy, journaling, dreamwork)?", options: [{ text: "No", score: 0 }, { text: "A little reading", score: 1 }, { text: "Some journaling or self-reflection", score: 2 }, { text: "Regular practice", score: 3 }, { text: "Ongoing deep work with support", score: 4 }] },
    ],
    ranges: [
      { min: 0, max: 10, title: "Shadow Unconscious", description: "Your shadow is largely hidden from your awareness. This is not a judgment — it is the default human condition. But the shadow does not disappear because you cannot see it. It shows up in projections, conflicts, and recurring life patterns.", recommendations: ["Read Man and His Symbols by Carl Jung", "Start noticing what triggers strong emotional reactions", "Begin a simple journaling practice about difficult emotions", "Pay attention to your dreams — the shadow speaks there first"], articleSlugs: ["jung-shadow-dreams", "what-dreams-actually-saying"] },
      { min: 11, max: 20, title: "Shadow Emerging", description: "You are beginning to glimpse your shadow. This is often uncomfortable — the initial recognition that qualities you dislike in others exist in yourself can be destabilizing. Stay with it. This discomfort is the beginning of integration.", recommendations: ["Work with a therapist or counselor who understands shadow work", "Practice the 3-2-1 shadow process", "Journal about your strongest emotional reactions", "Explore active imagination with dream figures"], articleSlugs: ["shadow-integration-through-dreams", "recurring-dream-symbols-decoded"] },
      { min: 21, max: 30, title: "Shadow Engaged", description: "You have a working relationship with your shadow. You can see your projections, own your difficult qualities, and use conflict as a mirror. This is where the real transformation happens.", recommendations: ["Deepen your practice with dream dialogue techniques", "Explore the golden shadow — disowned positive qualities", "Work with archetypes in your dreams", "Consider how your shadow serves your wholeness"], articleSlugs: ["practice-dream-re-entry", "collective-unconscious-shared-symbols"] },
      { min: 31, max: 40, title: "Shadow Integrated", description: "You have done significant shadow work and it shows in your relationships, your dreams, and your capacity for honest self-reflection. The shadow is no longer an enemy — it is a source of energy, creativity, and depth.", recommendations: ["Mentor others in shadow work", "Explore the collective shadow in cultural dreams", "Study the relationship between shadow and creativity", "Continue the work — integration is ongoing, not a destination"], articleSlugs: ["turiya-fourth-state", "collective-unconscious-shared-symbols"] },
    ],
    getResult(score) { return findRange(this.ranges, score); },
  },
  {
    id: "sleep-quality",
    slug: "sleep-quality-for-dreamers-assessment",
    title: "Sleep Quality for Dreamers Assessment",
    description: "Evaluate how well your sleep habits support rich, memorable dream experiences.",
    metaDescription: "Assess whether your sleep habits support vivid dreaming. Get personalized recommendations for optimizing your sleep for dream work.",
    maxScore: 40,
    questions: [
      { question: "How consistent is your sleep schedule?", options: [{ text: "Completely irregular", score: 0 }, { text: "Varies by 2+ hours", score: 1 }, { text: "Varies by about an hour", score: 2 }, { text: "Within 30 minutes most nights", score: 3 }, { text: "Same time every night, including weekends", score: 4 }] },
      { question: "How many hours of sleep do you typically get?", options: [{ text: "Less than 5", score: 0 }, { text: "5-6 hours", score: 1 }, { text: "6-7 hours", score: 2 }, { text: "7-8 hours", score: 3 }, { text: "8-9 hours consistently", score: 4 }] },
      { question: "How dark is your sleeping environment?", options: [{ text: "Light from screens, windows, or LEDs", score: 0 }, { text: "Some light leaks in", score: 1 }, { text: "Mostly dark with minor light", score: 2 }, { text: "Very dark", score: 3 }, { text: "Complete darkness — no light at all", score: 4 }] },
      { question: "Do you use screens within an hour of bedtime?", options: [{ text: "Right up until I close my eyes", score: 0 }, { text: "Usually", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Rarely", score: 3 }, { text: "Never — I have a screen-free wind-down", score: 4 }] },
      { question: "How often do you wake up during the night?", options: [{ text: "Multiple times, hard to fall back asleep", score: 0 }, { text: "A few times", score: 1 }, { text: "Once or twice briefly", score: 2 }, { text: "Rarely", score: 3 }, { text: "I sleep through the night", score: 4 }] },
      { question: "Do you consume caffeine after noon?", options: [{ text: "Yes, throughout the day", score: 0 }, { text: "Usually in the afternoon", score: 1 }, { text: "Occasionally", score: 2 }, { text: "Rarely", score: 3 }, { text: "Never after noon", score: 4 }] },
      { question: "Do you have a pre-sleep routine?", options: [{ text: "No routine at all", score: 0 }, { text: "I try but it is inconsistent", score: 1 }, { text: "A loose routine", score: 2 }, { text: "A consistent 15-30 minute routine", score: 3 }, { text: "A deliberate practice including breathwork or meditation", score: 4 }] },
      { question: "How do you feel when you wake up?", options: [{ text: "Exhausted", score: 0 }, { text: "Groggy and slow", score: 1 }, { text: "Okay after a few minutes", score: 2 }, { text: "Rested", score: 3 }, { text: "Refreshed and clear", score: 4 }] },
      { question: "Is your bedroom temperature comfortable for sleeping?", options: [{ text: "Too hot or too cold", score: 0 }, { text: "Not ideal", score: 1 }, { text: "Acceptable", score: 2 }, { text: "Good", score: 3 }, { text: "Optimized — cool and comfortable", score: 4 }] },
      { question: "Do you exercise regularly?", options: [{ text: "No", score: 0 }, { text: "Occasionally", score: 1 }, { text: "A few times a week", score: 2 }, { text: "Most days", score: 3 }, { text: "Daily, but not within 3 hours of bed", score: 4 }] },
    ],
    ranges: [
      { min: 0, max: 10, title: "Sleep Compromised", description: "Your sleep habits are actively working against your dream life. The good news: this is the area where small changes produce the most dramatic results. Fix your sleep and your dreams will transform.", recommendations: ["Set a non-negotiable bedtime and wake time", "Remove all screens from the bedroom", "Invest in blackout curtains or a quality sleep mask", "Cut caffeine after noon — no exceptions"], articleSlugs: ["rem-sleep-emotional-processing", "nervous-system-shapes-dreams"] },
      { min: 11, max: 20, title: "Sleep Developing", description: "You have some good habits but inconsistency is undermining your sleep quality. REM sleep — where the most vivid dreams occur — is concentrated in the last 2-3 hours of sleep. If you are cutting sleep short, you are cutting your dream time.", recommendations: ["Extend sleep to 7.5-8 hours minimum", "Create a 30-minute wind-down routine", "Address the biggest sleep disruptor first", "Track your sleep for 2 weeks to find patterns"], articleSlugs: ["rem-sleep-emotional-processing", "why-you-forget-dreams"] },
      { min: 21, max: 30, title: "Sleep Supportive", description: "Your sleep habits are solid and likely supporting good dream recall. Fine-tuning at this level is about optimizing the transitions between sleep stages and creating conditions for the deepest REM periods.", recommendations: ["Experiment with sleep environment upgrades (weighted blanket, white noise)", "Add breathwork to your pre-sleep routine", "Consider magnesium glycinate supplementation", "Practice yoga nidra before sleep"], articleSlugs: ["meditation-changes-dream-landscape", "practice-dream-re-entry"] },
      { min: 31, max: 40, title: "Sleep Optimized", description: "Your sleep environment and habits are excellent. You are giving your brain the best possible conditions for rich, memorable dreams. Any further optimization is in the realm of advanced practice.", recommendations: ["Explore polyphasic sleep experiments for dream work", "Use WBTB (Wake Back to Bed) technique for lucid dreaming", "Study chronobiology to align practice with your circadian rhythm", "Consider sleep tracking to identify your optimal REM windows"], articleSlugs: ["lucid-dreaming-spiritual-practice", "turiya-fourth-state"] },
    ],
    getResult(score) { return findRange(this.ranges, score); },
  },
  {
    id: "meditation-depth",
    slug: "meditation-depth-assessment",
    title: "Meditation Depth Assessment",
    description: "Evaluate the depth and consistency of your meditation practice as it relates to dream work.",
    metaDescription: "How deep is your meditation practice? This assessment evaluates your contemplative skills and their connection to dream work.",
    maxScore: 40,
    questions: [
      { question: "How long have you been meditating?", options: [{ text: "I have not started", score: 0 }, { text: "Less than 3 months", score: 1 }, { text: "3 months to 1 year", score: 2 }, { text: "1-5 years", score: 3 }, { text: "5+ years", score: 4 }] },
      { question: "How often do you meditate?", options: [{ text: "Never", score: 0 }, { text: "A few times a month", score: 1 }, { text: "A few times a week", score: 2 }, { text: "Daily", score: 3 }, { text: "Twice daily or more", score: 4 }] },
      { question: "How long is your typical session?", options: [{ text: "I do not meditate", score: 0 }, { text: "5-10 minutes", score: 1 }, { text: "10-20 minutes", score: 2 }, { text: "20-40 minutes", score: 3 }, { text: "40+ minutes", score: 4 }] },
      { question: "Can you observe your thoughts without getting caught up in them?", options: [{ text: "No — I am always lost in thought", score: 0 }, { text: "Briefly, then I get pulled in", score: 1 }, { text: "For short periods", score: 2 }, { text: "For extended periods", score: 3 }, { text: "This is my natural state", score: 4 }] },
      { question: "Have you experienced states of deep stillness or absorption?", options: [{ text: "Never", score: 0 }, { text: "Maybe once or twice", score: 1 }, { text: "Occasionally", score: 2 }, { text: "Regularly", score: 3 }, { text: "Frequently — I can access them reliably", score: 4 }] },
      { question: "Do you practice body awareness or somatic meditation?", options: [{ text: "No", score: 0 }, { text: "I have tried it", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Regularly", score: 3 }, { text: "It is central to my practice", score: 4 }] },
      { question: "Have you practiced yoga nidra or similar liminal-state meditation?", options: [{ text: "Never heard of it", score: 0 }, { text: "I have read about it", score: 1 }, { text: "I have tried it a few times", score: 2 }, { text: "I practice it regularly", score: 3 }, { text: "It is a core part of my practice", score: 4 }] },
      { question: "Does your meditation practice influence your dreams?", options: [{ text: "I do not meditate or notice any connection", score: 0 }, { text: "I have not noticed a connection", score: 1 }, { text: "Maybe — I am not sure", score: 2 }, { text: "Yes — my dreams are more vivid after meditation", score: 3 }, { text: "Deeply — meditation and dreams are part of the same practice", score: 4 }] },
      { question: "Can you maintain awareness during the transition from waking to sleep?", options: [{ text: "No — I just fall asleep", score: 0 }, { text: "I have noticed the transition once or twice", score: 1 }, { text: "Sometimes I catch hypnagogic imagery", score: 2 }, { text: "I can often observe the transition", score: 3 }, { text: "I can maintain awareness through the transition", score: 4 }] },
      { question: "Do you have a teacher or community for your practice?", options: [{ text: "No", score: 0 }, { text: "I use apps", score: 1 }, { text: "I follow online teachers", score: 2 }, { text: "I have a teacher I work with", score: 3 }, { text: "I have a teacher and a community", score: 4 }] },
    ],
    ranges: [
      { min: 0, max: 10, title: "Contemplative Beginner", description: "You are at the beginning of the contemplative path. Meditation is the single most powerful tool for transforming your dream life — it trains the exact kind of awareness that lucid dreaming and deep dreamwork require.", recommendations: ["Start with 5 minutes daily — consistency matters more than duration", "Try a guided meditation app like Waking Up or Insight Timer", "Focus on breath awareness as your foundation", "Be patient — the benefits compound over weeks and months"], articleSlugs: ["meditation-changes-dream-landscape", "dream-recall-techniques"] },
      { min: 11, max: 20, title: "Developing Practitioner", description: "You have a foundation but need more consistency and depth. The gap between occasional meditation and daily practice is where most people stall — and it is exactly where the dream benefits begin to emerge.", recommendations: ["Commit to daily practice for 30 consecutive days", "Extend sessions gradually to 20 minutes", "Explore body scan meditation as a bridge to yoga nidra", "Notice how meditation days affect your dream recall"], articleSlugs: ["meditation-changes-dream-landscape", "nervous-system-shapes-dreams"] },
      { min: 21, max: 30, title: "Established Practitioner", description: "Your practice is solid and likely already influencing your dream life. You are ready for the more advanced contemplative practices that directly engage the dream state.", recommendations: ["Begin a formal yoga nidra practice", "Explore dream yoga from the Tibetan tradition", "Practice maintaining awareness during the sleep transition", "Study non-dual awareness teachings"], articleSlugs: ["turiya-fourth-state", "practice-dream-re-entry"] },
      { min: 31, max: 40, title: "Advanced Contemplative", description: "Your meditation practice is deep and well-established. The boundary between meditation, dreaming, and waking awareness is becoming more permeable — which is exactly the territory of advanced dream yoga.", recommendations: ["Deepen dream yoga practice with a qualified teacher", "Explore the relationship between deep sleep awareness and turiya", "Practice maintaining awareness across all states", "Consider retreat practice for intensive exploration"], articleSlugs: ["turiya-fourth-state", "lucid-dreaming-spiritual-practice"] },
    ],
    getResult(score) { return findRange(this.ranges, score); },
  },
  {
    id: "nightmare-relationship",
    slug: "nightmare-relationship-assessment",
    title: "Nightmare Relationship Assessment",
    description: "Evaluate how you relate to nightmares and whether you are using them as a resource or running from them.",
    metaDescription: "How do you relate to your nightmares? This assessment reveals whether fear or wisdom drives your response to disturbing dreams.",
    maxScore: 40,
    questions: [
      { question: "How often do you have nightmares?", options: [{ text: "Several times a week", score: 1 }, { text: "Weekly", score: 2 }, { text: "A few times a month", score: 2 }, { text: "Rarely", score: 3 }, { text: "Very rarely — and I engage with them when they come", score: 4 }] },
      { question: "What is your first response when you wake from a nightmare?", options: [{ text: "Panic — I try to forget it immediately", score: 0 }, { text: "Relief that it was not real", score: 1 }, { text: "Discomfort but curiosity", score: 2 }, { text: "I sit with the feelings and reflect", score: 3 }, { text: "I write it down and work with it", score: 4 }] },
      { question: "Do you believe nightmares have meaning?", options: [{ text: "No — they are just brain noise", score: 0 }, { text: "Maybe, but I do not want to find out", score: 1 }, { text: "Probably, but I am not sure how to interpret them", score: 2 }, { text: "Yes — they are important messages", score: 3 }, { text: "They are among the most valuable dreams I have", score: 4 }] },
      { question: "Have you ever tried to re-enter a nightmare to understand it?", options: [{ text: "Absolutely not", score: 0 }, { text: "The idea terrifies me", score: 1 }, { text: "I have thought about it", score: 2 }, { text: "I have tried it", score: 3 }, { text: "I do this regularly", score: 4 }] },
      { question: "How do nightmares affect your next day?", options: [{ text: "They ruin my whole day", score: 0 }, { text: "They leave me anxious for hours", score: 1 }, { text: "Some lingering unease", score: 2 }, { text: "Brief discomfort, then I move on", score: 3 }, { text: "They energize my self-reflection", score: 4 }] },
      { question: "Do you see a connection between your nightmares and your waking life?", options: [{ text: "No", score: 0 }, { text: "I have not looked for one", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Usually", score: 3 }, { text: "Always — they are direct reflections", score: 4 }] },
      { question: "How do you feel about the threatening figures in your nightmares?", options: [{ text: "Pure terror", score: 0 }, { text: "Fear and avoidance", score: 1 }, { text: "Wary curiosity", score: 2 }, { text: "I try to understand what they represent", score: 3 }, { text: "I engage with them as parts of myself", score: 4 }] },
      { question: "Have nightmares ever led to positive changes in your life?", options: [{ text: "No — they are only negative", score: 0 }, { text: "I cannot think of any", score: 1 }, { text: "Maybe indirectly", score: 2 }, { text: "Yes, a few times", score: 3 }, { text: "Regularly — they are catalysts for growth", score: 4 }] },
      { question: "Do you have recurring nightmares?", options: [{ text: "Yes, the same one over and over", score: 1 }, { text: "Similar themes repeat", score: 2 }, { text: "They used to recur but have changed", score: 3 }, { text: "Rarely — they evolve as I work with them", score: 3 }, { text: "No — I resolve them through dreamwork", score: 4 }] },
      { question: "Would you be willing to face your worst nightmare consciously?", options: [{ text: "Never", score: 0 }, { text: "I do not think so", score: 1 }, { text: "Maybe with support", score: 2 }, { text: "Yes, with preparation", score: 3 }, { text: "I have done this and it was transformative", score: 4 }] },
    ],
    ranges: [
      { min: 0, max: 10, title: "Nightmare Avoidant", description: "You are running from your nightmares, which means you are running from the parts of yourself they represent. This is understandable — nightmares are genuinely frightening. But avoidance keeps the cycle going.", recommendations: ["Start by simply writing nightmares down — do not interpret yet", "Recognize that nightmares are not predictions or punishments", "Consider working with a therapist who understands dream work", "Read about nightmare rescripting techniques"], articleSlugs: ["jung-shadow-dreams", "what-dreams-actually-saying"] },
      { min: 11, max: 20, title: "Nightmare Curious", description: "You are beginning to see nightmares as more than just bad experiences. This shift from avoidance to curiosity is the most important step in nightmare work.", recommendations: ["Practice writing nightmare narratives in full detail", "Identify the core emotion in each nightmare", "Try the Gestalt technique of speaking as each dream figure", "Look for connections between nightmare themes and waking stressors"], articleSlugs: ["shadow-integration-through-dreams", "recurring-dream-symbols-decoded"] },
      { min: 21, max: 30, title: "Nightmare Engaged", description: "You have a working relationship with your nightmares. You can sit with the discomfort, extract meaning, and use disturbing dreams as catalysts for growth.", recommendations: ["Practice dream re-entry with nightmare figures", "Explore lucid dreaming as a tool for nightmare resolution", "Work with the somatic dimension — where do nightmares live in your body?", "Study the relationship between nightmares and unprocessed grief or trauma"], articleSlugs: ["practice-dream-re-entry", "nervous-system-shapes-dreams"] },
      { min: 31, max: 40, title: "Nightmare Alchemist", description: "You have transformed your relationship with nightmares. What once terrified you now teaches you. This is genuine shadow integration in action.", recommendations: ["Share your nightmare work process with others", "Explore collective nightmares and cultural shadow", "Study the role of nightmares in shamanic traditions", "Continue deepening — the shadow always has more to reveal"], articleSlugs: ["collective-unconscious-shared-symbols", "turiya-fourth-state"] },
    ],
    getResult(score) { return findRange(this.ranges, score); },
  },
  {
    id: "dream-integration",
    slug: "dream-integration-assessment",
    title: "Dream Integration Assessment",
    description: "Measure how effectively you bring dream insights into your waking life.",
    metaDescription: "Are you integrating your dream wisdom into daily life? This assessment measures the bridge between your sleeping and waking consciousness.",
    maxScore: 40,
    questions: [
      { question: "After recording a dream, do you spend time reflecting on its meaning?", options: [{ text: "I do not record dreams", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Usually", score: 3 }, { text: "Always — it is part of my morning practice", score: 4 }] },
      { question: "Have dream insights ever changed a decision you made?", options: [{ text: "No", score: 0 }, { text: "I am not sure", score: 1 }, { text: "Maybe once", score: 2 }, { text: "A few times", score: 3 }, { text: "Regularly — I consult my dreams", score: 4 }] },
      { question: "Do you notice connections between your dreams and your emotional state?", options: [{ text: "No", score: 0 }, { text: "Occasionally", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "My dreams are a reliable emotional barometer", score: 4 }] },
      { question: "Do you take action based on dream messages?", options: [{ text: "Never", score: 0 }, { text: "I would not know how", score: 1 }, { text: "I have tried once or twice", score: 2 }, { text: "Sometimes", score: 3 }, { text: "Regularly — dreams inform my actions", score: 4 }] },
      { question: "Can you identify how a specific dream relates to a current life situation?", options: [{ text: "No", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes after reflection", score: 2 }, { text: "Usually", score: 3 }, { text: "Almost always — the connections are clear", score: 4 }] },
      { question: "Do you share your dreams with anyone?", options: [{ text: "Never", score: 0 }, { text: "Very rarely", score: 1 }, { text: "With close friends occasionally", score: 2 }, { text: "With a partner or dream group", score: 3 }, { text: "Regularly — sharing deepens understanding", score: 4 }] },
      { question: "Have you ever performed a ritual or symbolic action based on a dream?", options: [{ text: "No — that sounds strange", score: 0 }, { text: "I have thought about it", score: 1 }, { text: "Once or twice", score: 2 }, { text: "Several times", score: 3 }, { text: "It is a regular part of my practice", score: 4 }] },
      { question: "Do you revisit old dreams to find new meaning?", options: [{ text: "No", score: 0 }, { text: "I do not keep records", score: 1 }, { text: "Occasionally", score: 2 }, { text: "Regularly", score: 3 }, { text: "Yes — dreams reveal new layers over time", score: 4 }] },
      { question: "Has dreamwork changed your relationship with yourself?", options: [{ text: "I do not do dreamwork", score: 0 }, { text: "Not noticeably", score: 1 }, { text: "Slightly", score: 2 }, { text: "Significantly", score: 3 }, { text: "Profoundly — it is central to my self-knowledge", score: 4 }] },
      { question: "Do you feel that your waking life and dream life are connected?", options: [{ text: "No — they are separate", score: 0 }, { text: "I am not sure", score: 1 }, { text: "I am beginning to see connections", score: 2 }, { text: "Yes — they inform each other", score: 3 }, { text: "They are one continuous stream of consciousness", score: 4 }] },
    ],
    ranges: [
      { min: 0, max: 10, title: "Dream Disconnected", description: "Your dream life and waking life are operating independently. This is like having a wise advisor who speaks to you every night — and never listening. The bridge between these two worlds is built through simple, consistent practices.", recommendations: ["Start with one question: What is this dream about in my life right now?", "Choose one dream per week and sit with it for 10 minutes", "Look for the emotion in the dream — then find where that emotion lives in your waking life", "Read Inner Work by Robert A. Johnson for a practical method"], articleSlugs: ["what-dreams-actually-saying", "dream-journal-beginners-guide"] },
      { min: 11, max: 20, title: "Dream Curious", description: "You sense that your dreams matter but have not yet built a consistent practice of integration. The insights are there — you just need a method for bringing them across the threshold.", recommendations: ["Develop a morning reflection ritual — even 5 minutes", "Start a dream-to-life connection journal", "Practice asking dream figures what they want to tell you", "Find a dream partner or group for shared exploration"], articleSlugs: ["recurring-dream-symbols-decoded", "practice-dream-re-entry"] },
      { min: 21, max: 30, title: "Dream Integrated", description: "You are actively building the bridge between sleeping and waking consciousness. Dreams inform your decisions, your self-understanding, and your growth. This is where dreamwork becomes a genuine spiritual practice.", recommendations: ["Deepen your practice with active imagination", "Explore the relationship between dreams and synchronicity", "Work with big dreams as life-direction indicators", "Consider how your dream practice serves your larger purpose"], articleSlugs: ["meditation-changes-dream-landscape", "collective-unconscious-shared-symbols"] },
      { min: 31, max: 40, title: "Dream Embodied", description: "Your dream life and waking life are deeply interwoven. You live with the kind of self-knowledge that most people never access. Dreams are not something you do — they are part of how you navigate reality.", recommendations: ["Teach or mentor others in dream integration", "Explore the collective dimension of dreams", "Study how dreams function across contemplative traditions", "Continue the practice — depth has no bottom"], articleSlugs: ["turiya-fourth-state", "lucid-dreaming-spiritual-practice"] },
    ],
    getResult(score) { return findRange(this.ranges, score); },
  },
  {
    id: "consciousness-spectrum",
    slug: "consciousness-spectrum-assessment",
    title: "Consciousness Spectrum Assessment",
    description: "Map where you are on the spectrum of waking, dreaming, and transcendent awareness.",
    metaDescription: "Where do you fall on the consciousness spectrum? This assessment maps your awareness across waking, dreaming, and transcendent states.",
    maxScore: 40,
    questions: [
      { question: "How often do you experience moments of pure presence — no thought, just awareness?", options: [{ text: "Never", score: 0 }, { text: "Very rarely", score: 1 }, { text: "Occasionally", score: 2 }, { text: "Regularly", score: 3 }, { text: "This is becoming my baseline", score: 4 }] },
      { question: "Have you experienced awareness during the transition between waking and sleep?", options: [{ text: "No", score: 0 }, { text: "Maybe once", score: 1 }, { text: "A few times", score: 2 }, { text: "Regularly", score: 3 }, { text: "I can maintain awareness through the transition", score: 4 }] },
      { question: "Do you ever feel that waking life has a dream-like quality?", options: [{ text: "No — waking is clearly real", score: 0 }, { text: "That is a strange question", score: 1 }, { text: "Occasionally, in certain moments", score: 2 }, { text: "Yes — I notice the constructed nature of experience", score: 3 }, { text: "Regularly — the boundary between states is thin", score: 4 }] },
      { question: "Have you experienced lucid dreaming?", options: [{ text: "No", score: 0 }, { text: "Once or twice", score: 1 }, { text: "A few times", score: 2 }, { text: "Regularly", score: 3 }, { text: "I can induce it reliably", score: 4 }] },
      { question: "Have you experienced awareness during deep sleep (dreamless sleep)?", options: [{ text: "No — deep sleep is unconscious", score: 0 }, { text: "I am not sure", score: 1 }, { text: "Maybe — there is something there", score: 2 }, { text: "Yes — brief moments of awareness", score: 3 }, { text: "Yes — I have experienced turiya", score: 4 }] },
      { question: "How would you describe your sense of self?", options: [{ text: "Fixed and solid", score: 0 }, { text: "Mostly stable", score: 1 }, { text: "Fluid — it changes in different contexts", score: 2 }, { text: "I notice the self as a construction", score: 3 }, { text: "Awareness itself, not limited to a self", score: 4 }] },
      { question: "Have you had experiences that transcend normal categories of waking or dreaming?", options: [{ text: "No", score: 0 }, { text: "I am not sure", score: 1 }, { text: "Maybe — unusual experiences I cannot categorize", score: 2 }, { text: "Yes — mystical or non-dual experiences", score: 3 }, { text: "These experiences are becoming more frequent", score: 4 }] },
      { question: "Do you practice any form of awareness training across states?", options: [{ text: "No", score: 0 }, { text: "Meditation only", score: 1 }, { text: "Meditation and dream journaling", score: 2 }, { text: "Meditation, dreamwork, and yoga nidra", score: 3 }, { text: "A comprehensive practice spanning all states", score: 4 }] },
      { question: "How do you understand the relationship between consciousness and the brain?", options: [{ text: "Consciousness is produced by the brain", score: 1 }, { text: "I have not thought about it", score: 1 }, { text: "It is more complex than simple production", score: 2 }, { text: "Consciousness may be fundamental, not produced", score: 3 }, { text: "I have direct experience that consciousness transcends the brain", score: 4 }] },
      { question: "What is your deepest motivation for exploring consciousness?", options: [{ text: "Curiosity", score: 1 }, { text: "Better sleep", score: 1 }, { text: "Self-understanding", score: 2 }, { text: "Liberation or awakening", score: 3 }, { text: "Service — helping others wake up", score: 4 }] },
    ],
    ranges: [
      { min: 0, max: 10, title: "Conventional Awareness", description: "You experience consciousness in the conventional way — waking feels real, dreams feel like dreams, and deep sleep is a blank. This is the starting point for most people, and there is nothing wrong with it. But there are vast territories of experience beyond this.", recommendations: ["Begin a meditation practice to develop witness awareness", "Start recording dreams to build the bridge between states", "Read about the Mandukya Upanishad and the four states of consciousness", "Be open to the possibility that awareness is wider than you think"], articleSlugs: ["turiya-fourth-state", "what-dreams-actually-saying"] },
      { min: 11, max: 20, title: "Expanding Awareness", description: "You are beginning to notice that consciousness is more fluid and mysterious than the conventional view suggests. Dreams are becoming more vivid, meditation is opening new territory, and the boundaries between states are starting to soften.", recommendations: ["Deepen meditation with a focus on awareness itself", "Explore yoga nidra as a bridge between states", "Study non-dual teachings from Advaita Vedanta or Dzogchen", "Pay attention to liminal experiences — they are doorways"], articleSlugs: ["meditation-changes-dream-landscape", "turiya-fourth-state"] },
      { min: 21, max: 30, title: "Liminal Awareness", description: "You are living in the territory between states. Lucid dreaming, hypnagogic awareness, and moments of non-dual perception are becoming part of your experience. This is where the ancient dream yoga traditions become directly relevant.", recommendations: ["Study dream yoga formally with a qualified teacher", "Practice maintaining awareness across all state transitions", "Explore the relationship between deep sleep and pure awareness", "Work with a teacher who understands these territories"], articleSlugs: ["turiya-fourth-state", "lucid-dreaming-spiritual-practice"] },
      { min: 31, max: 40, title: "Transcendent Awareness", description: "You have direct experience of consciousness that transcends the conventional waking-dreaming-sleeping framework. The fourth state — turiya — is not just a concept for you. This is rare and precious territory.", recommendations: ["Continue practice with humility — depth has no limit", "Serve others by sharing what you have learned", "Study how different traditions describe this territory", "Remember that integration into daily life is the ultimate practice"], articleSlugs: ["turiya-fourth-state", "collective-unconscious-shared-symbols"] },
    ],
    getResult(score) { return findRange(this.ranges, score); },
  },
];

export function getAssessmentBySlug(slug: string): Assessment | undefined {
  return assessments.find((a) => a.slug === slug);
}
