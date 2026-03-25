export interface QuizQuestion {
  question: string;
  options: { text: string; value: string }[];
}

export interface QuizResult {
  id: string;
  title: string;
  description: string;
  articles: string[]; // slugs of recommended articles
}

export interface Quiz {
  id: string;
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  questions: QuizQuestion[];
  results: QuizResult[];
  getResult: (answers: string[]) => QuizResult;
}

function tallyAnswers(answers: string[]): Record<string, number> {
  const tally: Record<string, number> = {};
  for (const a of answers) {
    tally[a] = (tally[a] || 0) + 1;
  }
  return tally;
}

function topKey(tally: Record<string, number>): string {
  let max = 0;
  let key = "";
  for (const [k, v] of Object.entries(tally)) {
    if (v > max) {
      max = v;
      key = k;
    }
  }
  return key;
}

export const quizzes: Quiz[] = [
  {
    id: "dream-type",
    slug: "what-type-of-dreamer-are-you",
    title: "What Type of Dreamer Are You?",
    description: "Discover your unique dreaming style and what it reveals about your inner world.",
    metaDescription: "Take this quiz to discover your dreaming style — are you a lucid navigator, symbolic decoder, or prophetic dreamer?",
    questions: [
      { question: "When you wake from a vivid dream, what do you do first?", options: [{ text: "Lie still and replay every detail", value: "symbolic" }, { text: "Grab my phone to write it down", value: "lucid" }, { text: "Feel the emotions lingering in my body", value: "somatic" }, { text: "Wonder if it means something about my future", value: "prophetic" }] },
      { question: "How often do you remember your dreams?", options: [{ text: "Almost every night — in vivid detail", value: "lucid" }, { text: "A few times a week, usually fragments", value: "symbolic" }, { text: "Only when they are intense or disturbing", value: "somatic" }, { text: "Rarely, but when I do, they feel significant", value: "prophetic" }] },
      { question: "What kind of dreams do you have most often?", options: [{ text: "Complex narratives with recurring symbols", value: "symbolic" }, { text: "Dreams where I know I am dreaming", value: "lucid" }, { text: "Dreams that leave physical sensations", value: "somatic" }, { text: "Dreams that seem to predict events", value: "prophetic" }] },
      { question: "If you could choose one dream ability, what would it be?", options: [{ text: "Decode every symbol perfectly", value: "symbolic" }, { text: "Control my dreams completely", value: "lucid" }, { text: "Heal through dreaming", value: "somatic" }, { text: "See the future clearly", value: "prophetic" }] },
      { question: "What draws you to dream interpretation?", options: [{ text: "Understanding my unconscious patterns", value: "symbolic" }, { text: "Expanding consciousness and awareness", value: "lucid" }, { text: "Processing emotions and trauma", value: "somatic" }, { text: "Connecting to something beyond myself", value: "prophetic" }] },
    ],
    results: [
      { id: "symbolic", title: "The Symbolic Decoder", description: "Your dreams speak in rich metaphor and archetypal imagery. You have a natural gift for reading the language of the unconscious. Jung would have loved working with you.", articles: ["what-dreams-actually-saying", "recurring-dream-symbols-decoded", "jung-shadow-dreams"] },
      { id: "lucid", title: "The Lucid Navigator", description: "You walk the borderland between sleeping and waking with unusual awareness. Your consciousness does not fully surrender — it explores. This is a rare and powerful capacity.", articles: ["lucid-dreaming-spiritual-practice", "conscious-dreaming-techniques", "dream-control-vs-surrender"] },
      { id: "somatic", title: "The Somatic Dreamer", description: "Your body is your primary dream organ. You feel dreams in your muscles, your gut, your chest. The messages come through sensation first, image second. This is the oldest form of dreaming.", articles: ["body-dreams-somatic-messages", "nightmares-shadow-integration", "sleep-paralysis-liminal-territory"] },
      { id: "prophetic", title: "The Prophetic Dreamer", description: "Something in you reaches beyond the present moment. Your dreams touch territories that linear time cannot explain. This is not fantasy — it is a form of perception that every wisdom tradition recognizes.", articles: ["prophetic-dreams-real", "precognitive-dreaming-science", "dream-deja-vu-explained"] },
    ],
    getResult(answers) {
      const t = tallyAnswers(answers);
      const key = topKey(t);
      return this.results.find((r) => r.id === key) || this.results[0];
    },
  },
  {
    id: "shadow-dream",
    slug: "what-is-your-shadow-trying-to-tell-you",
    title: "What Is Your Shadow Trying to Tell You?",
    description: "Your nightmares and disturbing dreams carry messages from the parts of yourself you have disowned.",
    metaDescription: "Discover what your shadow is communicating through your dreams — take this quiz to decode the darkness.",
    questions: [
      { question: "What is the most common disturbing element in your dreams?", options: [{ text: "Being chased or pursued", value: "avoidance" }, { text: "Falling or losing control", value: "control" }, { text: "Confrontation or conflict", value: "anger" }, { text: "Being exposed or naked", value: "shame" }] },
      { question: "When you wake from a nightmare, what emotion dominates?", options: [{ text: "Fear and anxiety", value: "avoidance" }, { text: "Helplessness", value: "control" }, { text: "Rage or frustration", value: "anger" }, { text: "Embarrassment or vulnerability", value: "shame" }] },
      { question: "Which statement resonates most?", options: [{ text: "I tend to avoid difficult conversations", value: "avoidance" }, { text: "I need to feel in charge of situations", value: "control" }, { text: "I suppress my anger to keep the peace", value: "anger" }, { text: "I worry about what people think of me", value: "shame" }] },
      { question: "In your dreams, how do you typically respond to threats?", options: [{ text: "I run or hide", value: "avoidance" }, { text: "I freeze or feel paralyzed", value: "control" }, { text: "I fight back or confront", value: "anger" }, { text: "I try to cover up or explain myself", value: "shame" }] },
      { question: "What childhood pattern feels most familiar?", options: [{ text: "Learning to stay quiet and invisible", value: "avoidance" }, { text: "Needing to be perfect or responsible", value: "control" }, { text: "Being told my feelings were too much", value: "anger" }, { text: "Feeling different or not good enough", value: "shame" }] },
    ],
    results: [
      { id: "avoidance", title: "The Avoided Truth", description: "Your shadow carries what you have been running from. The chase dreams are not about external threats — they are about the parts of your own experience you refuse to face. The running stops when you turn around.", articles: ["chase-dreams-decoded", "avoidance-patterns-dreams", "facing-dream-fears"] },
      { id: "control", title: "The Surrendered Control", description: "Your shadow holds the vulnerability you have armored against. The falling dreams are invitations to release the grip. Real power comes not from control but from the willingness to be undone.", articles: ["falling-dreams-meaning", "control-surrender-dreams", "letting-go-dream-messages"] },
      { id: "anger", title: "The Buried Fire", description: "Your shadow carries the rage you were taught to suppress. Those conflict dreams are your psyche demanding that you reclaim your fire. Anger is not the enemy — it is the boundary your soul has been trying to set.", articles: ["anger-dreams-meaning", "conflict-dreams-decoded", "reclaiming-emotional-fire"] },
      { id: "shame", title: "The Hidden Self", description: "Your shadow holds the parts of you that were shamed into hiding. The exposure dreams are not punishment — they are your unconscious asking you to stop performing and start being real.", articles: ["naked-dreams-vulnerability", "shame-dreams-healing", "authenticity-dream-messages"] },
    ],
    getResult(answers) {
      const t = tallyAnswers(answers);
      return this.results.find((r) => r.id === topKey(t)) || this.results[0];
    },
  },
  {
    id: "sleep-quality",
    slug: "how-deep-is-your-dream-life",
    title: "How Deep Is Your Dream Life?",
    description: "Assess the depth and richness of your dreaming practice.",
    metaDescription: "How deep does your dream life go? Take this assessment to discover the richness of your nocturnal consciousness.",
    questions: [
      { question: "How would you describe your typical dream recall?", options: [{ text: "Crystal clear, multiple dreams per night", value: "deep" }, { text: "Usually remember one dream clearly", value: "moderate" }, { text: "Fragments and feelings mostly", value: "surface" }, { text: "Almost never remember dreams", value: "dormant" }] },
      { question: "Do you keep a dream journal?", options: [{ text: "Yes, consistently for months or years", value: "deep" }, { text: "I try to, but not consistently", value: "moderate" }, { text: "I have tried but gave up", value: "surface" }, { text: "Never", value: "dormant" }] },
      { question: "Have you ever had a lucid dream?", options: [{ text: "Yes, regularly", value: "deep" }, { text: "A few times", value: "moderate" }, { text: "Maybe once, I am not sure", value: "surface" }, { text: "Never", value: "dormant" }] },
      { question: "How do your dreams affect your waking life?", options: [{ text: "They guide major decisions and insights", value: "deep" }, { text: "They sometimes offer useful perspectives", value: "moderate" }, { text: "They occasionally linger but I do not act on them", value: "surface" }, { text: "They do not affect my waking life", value: "dormant" }] },
      { question: "What is your relationship with nightmares?", options: [{ text: "I see them as important messages to decode", value: "deep" }, { text: "They bother me but I try to understand them", value: "moderate" }, { text: "They scare me and I try to forget them", value: "surface" }, { text: "I do not have nightmares or do not remember them", value: "dormant" }] },
    ],
    results: [
      { id: "deep", title: "Deep Dreamer", description: "You have cultivated a profound relationship with your dream life. Your unconscious speaks and you listen. This is rare and valuable — keep going deeper.", articles: ["advanced-dream-practices", "dream-mastery-path", "deepening-dream-awareness"] },
      { id: "moderate", title: "Awakening Dreamer", description: "You are at the threshold. Your dream life is active and you are beginning to pay attention. The door is open — what you do next determines everything.", articles: ["beginning-dream-practice", "dream-journal-guide", "building-dream-recall"] },
      { id: "surface", title: "Surface Dreamer", description: "Your dreams are trying to reach you but the signal is faint. This is not a deficiency — it is an invitation. The practice of reaching for your dreams trains your mind to hold onto them.", articles: ["why-cant-i-remember-dreams", "dream-recall-techniques", "starting-dream-journey"] },
      { id: "dormant", title: "Dormant Dreamer", description: "Your dream life is waiting to be awakened. Everyone dreams — the question is whether you are ready to listen. Start tonight. Keep a pen by your bed. Reach for the dream before you reach for your phone.", articles: ["everyone-dreams-science", "awakening-dream-life", "first-steps-dreaming"] },
    ],
    getResult(answers) {
      const t = tallyAnswers(answers);
      return this.results.find((r) => r.id === topKey(t)) || this.results[0];
    },
  },
  {
    id: "recurring-pattern",
    slug: "what-recurring-dream-pattern-haunts-you",
    title: "What Recurring Dream Pattern Haunts You?",
    description: "Identify the persistent dream pattern that your unconscious keeps sending.",
    metaDescription: "Discover which recurring dream pattern your unconscious keeps sending — and what it is trying to tell you.",
    questions: [
      { question: "Which scenario appears most in your recurring dreams?", options: [{ text: "Being late or unprepared for something important", value: "unpreparedness" }, { text: "Teeth falling out or body parts changing", value: "transformation" }, { text: "Being lost in an unfamiliar place", value: "searching" }, { text: "Water — oceans, floods, rivers, rain", value: "emotional" }] },
      { question: "How do these recurring dreams make you feel?", options: [{ text: "Anxious and stressed", value: "unpreparedness" }, { text: "Disturbed and confused", value: "transformation" }, { text: "Lonely and disoriented", value: "searching" }, { text: "Overwhelmed or strangely peaceful", value: "emotional" }] },
      { question: "When do these dreams tend to intensify?", options: [{ text: "Before deadlines or major events", value: "unpreparedness" }, { text: "During periods of personal change", value: "transformation" }, { text: "When I feel directionless in life", value: "searching" }, { text: "When I am suppressing strong emotions", value: "emotional" }] },
      { question: "If your recurring dream had a message, what would it be?", options: [{ text: "You are not ready for what is coming", value: "unpreparedness" }, { text: "Something fundamental is shifting", value: "transformation" }, { text: "You have lost your way", value: "searching" }, { text: "Feel what you are refusing to feel", value: "emotional" }] },
    ],
    results: [
      { id: "unpreparedness", title: "The Unpreparedness Pattern", description: "Your unconscious is flagging a gap between where you are and where you need to be. This is not about literal preparation — it is about the deeper readiness your soul is demanding.", articles: ["unprepared-dreams-meaning", "anxiety-dreams-decoded", "performance-fear-dreams"] },
      { id: "transformation", title: "The Transformation Pattern", description: "Something in you is dying so something new can be born. The body-change dreams are not about vanity — they are about identity. You are becoming someone you have not met yet.", articles: ["teeth-falling-dreams", "body-change-dreams", "death-rebirth-dreams"] },
      { id: "searching", title: "The Searching Pattern", description: "You are looking for something you cannot name. The lost-place dreams are your psyche mapping territory your conscious mind has not explored. The destination is not a place — it is a way of being.", articles: ["lost-dreams-meaning", "searching-dreams-decoded", "finding-purpose-dreams"] },
      { id: "emotional", title: "The Emotional Flood Pattern", description: "Water in dreams is almost always about emotion. Your unconscious is telling you that the dam is full. What you have been holding back needs to flow — or it will flood.", articles: ["water-dreams-meaning", "flood-dreams-emotions", "ocean-dreams-decoded"] },
    ],
    getResult(answers) {
      const t = tallyAnswers(answers);
      return this.results.find((r) => r.id === topKey(t)) || this.results[0];
    },
  },
  {
    id: "spiritual-dreaming",
    slug: "how-spiritually-connected-are-your-dreams",
    title: "How Spiritually Connected Are Your Dreams?",
    description: "Explore the spiritual dimension of your dream life.",
    metaDescription: "Discover how spiritually connected your dreams are — from ordinary processing to transcendent experiences.",
    questions: [
      { question: "Have you ever felt a presence in your dreams that felt divine or transcendent?", options: [{ text: "Yes, frequently", value: "transcendent" }, { text: "A few memorable times", value: "awakening" }, { text: "Maybe, but I am not sure", value: "emerging" }, { text: "No", value: "grounded" }] },
      { question: "Do your dreams ever contain spiritual symbols — temples, light, sacred geometry?", options: [{ text: "Regularly", value: "transcendent" }, { text: "Occasionally", value: "awakening" }, { text: "Rarely", value: "emerging" }, { text: "Never", value: "grounded" }] },
      { question: "Have you received guidance or wisdom in a dream?", options: [{ text: "Yes, clear and actionable guidance", value: "transcendent" }, { text: "Impressions that felt meaningful", value: "awakening" }, { text: "Nothing I would call guidance", value: "emerging" }, { text: "Dreams are just random to me", value: "grounded" }] },
      { question: "How do you feel about the idea that dreams connect to something larger?", options: [{ text: "I know it from direct experience", value: "transcendent" }, { text: "I believe it and want to explore more", value: "awakening" }, { text: "I am curious but skeptical", value: "emerging" }, { text: "I think dreams are just brain activity", value: "grounded" }] },
      { question: "Have you ever had a dream that felt more real than waking life?", options: [{ text: "Yes, multiple times — they changed me", value: "transcendent" }, { text: "Once or twice, and it was profound", value: "awakening" }, { text: "Maybe, but I dismissed it", value: "emerging" }, { text: "No, dreams always feel like dreams", value: "grounded" }] },
    ],
    results: [
      { id: "transcendent", title: "Transcendent Dreamer", description: "Your dream life operates at frequencies most people never access. You are not imagining the spiritual dimension of your dreams — you are experiencing it directly. Honor this capacity.", articles: ["spiritual-dreams-guide", "transcendent-dream-experiences", "divine-dreams-meaning"] },
      { id: "awakening", title: "Spiritually Awakening Dreamer", description: "The door between ordinary dreaming and spiritual experience is opening for you. Pay attention to the dreams that feel different — they are different. Your consciousness is expanding.", articles: ["spiritual-awakening-dreams", "expanding-dream-consciousness", "sacred-dream-signs"] },
      { id: "emerging", title: "Spiritually Emerging Dreamer", description: "The spiritual dimension of your dreams is present but you have not yet learned to recognize it. This is not about belief — it is about attention. Start noticing the dreams that linger.", articles: ["recognizing-spiritual-dreams", "dream-spirituality-beginners", "opening-dream-awareness"] },
      { id: "grounded", title: "Grounded Dreamer", description: "You approach dreams practically, and there is nothing wrong with that. But consider: every wisdom tradition on Earth recognized dreams as a bridge to something beyond the individual mind. Curiosity costs nothing.", articles: ["science-of-dreaming", "dreams-beyond-brain-activity", "practical-dream-wisdom"] },
    ],
    getResult(answers) {
      const t = tallyAnswers(answers);
      return this.results.find((r) => r.id === topKey(t)) || this.results[0];
    },
  },
  {
    id: "nightmare-relationship",
    slug: "what-is-your-relationship-with-nightmares",
    title: "What Is Your Relationship with Nightmares?",
    description: "How you relate to your nightmares reveals how you relate to your shadow.",
    metaDescription: "Discover your relationship with nightmares — do you flee, fight, freeze, or face them? What this reveals about you.",
    questions: [
      { question: "When you have a nightmare, your first instinct is to:", options: [{ text: "Analyze what it means", value: "analyst" }, { text: "Try to forget it as fast as possible", value: "avoider" }, { text: "Feel shaken for hours afterward", value: "absorber" }, { text: "Talk to someone about it", value: "processor" }] },
      { question: "How often do you have nightmares?", options: [{ text: "Rarely — my dreams are mostly neutral or positive", value: "analyst" }, { text: "Often, and I hate it", value: "avoider" }, { text: "Periodically, usually during stressful times", value: "absorber" }, { text: "Sometimes, and I try to learn from them", value: "processor" }] },
      { question: "If a nightmare character spoke to you, you would:", options: [{ text: "Ask it what it represents", value: "analyst" }, { text: "Wake myself up immediately", value: "avoider" }, { text: "Feel overwhelmed by its presence", value: "absorber" }, { text: "Listen to what it has to say", value: "processor" }] },
      { question: "Your nightmares most often involve:", options: [{ text: "Complex scenarios with symbolic meaning", value: "analyst" }, { text: "Pure terror — monsters, danger, death", value: "avoider" }, { text: "Emotional devastation — loss, betrayal, grief", value: "absorber" }, { text: "Challenges that feel like tests", value: "processor" }] },
    ],
    results: [
      { id: "analyst", title: "The Nightmare Analyst", description: "You approach nightmares with intellectual curiosity. This is valuable but incomplete. The next step is to feel the nightmare in your body, not just decode it in your mind.", articles: ["nightmare-analysis-guide", "intellectual-vs-somatic-dreaming", "deeper-nightmare-work"] },
      { id: "avoider", title: "The Nightmare Avoider", description: "Your instinct is to run from the darkness. But what you resist persists — especially in dreams. The nightmare will keep returning until you stop running and start listening.", articles: ["facing-nightmares", "why-nightmares-return", "courage-in-dreaming"] },
      { id: "absorber", title: "The Nightmare Absorber", description: "You feel nightmares deeply — perhaps too deeply. Your sensitivity is a gift, but you need better boundaries between dream experience and waking life. Grounding practices are essential.", articles: ["sensitive-dreamers-guide", "grounding-after-nightmares", "emotional-boundaries-dreams"] },
      { id: "processor", title: "The Nightmare Processor", description: "You have the healthiest relationship with nightmares — you neither flee nor drown. You engage. This is the path of integration. Keep going.", articles: ["nightmare-integration-practice", "shadow-work-through-dreams", "transforming-nightmares"] },
    ],
    getResult(answers) {
      const t = tallyAnswers(answers);
      return this.results.find((r) => r.id === topKey(t)) || this.results[0];
    },
  },
  {
    id: "dream-symbol",
    slug: "which-dream-symbol-is-calling-you",
    title: "Which Dream Symbol Is Calling You?",
    description: "Discover which archetypal symbol your unconscious is using to communicate with you right now.",
    metaDescription: "Which dream symbol is your unconscious sending you? Discover the archetype calling to you right now.",
    questions: [
      { question: "Which image feels most magnetic to you right now?", options: [{ text: "A door or gateway", value: "threshold" }, { text: "Water — ocean, river, or rain", value: "water" }, { text: "An animal or creature", value: "animal" }, { text: "A house or building", value: "house" }] },
      { question: "What are you most seeking in your life right now?", options: [{ text: "A new beginning or transformation", value: "threshold" }, { text: "Emotional release or clarity", value: "water" }, { text: "Instinctual wisdom or power", value: "animal" }, { text: "Security or self-understanding", value: "house" }] },
      { question: "Which element feels most alive to you?", options: [{ text: "Air — freedom, possibility", value: "threshold" }, { text: "Water — depth, emotion", value: "water" }, { text: "Earth — instinct, grounding", value: "animal" }, { text: "Fire — transformation, purification", value: "house" }] },
      { question: "In dreams, you are most drawn to:", options: [{ text: "Mysterious passages and unknown territories", value: "threshold" }, { text: "Bodies of water in any form", value: "water" }, { text: "Animals that seem to have a message", value: "animal" }, { text: "Rooms, buildings, or structures", value: "house" }] },
    ],
    results: [
      { id: "threshold", title: "The Threshold", description: "You are being called to cross over. The doorway symbol is the oldest dream archetype — the invitation to leave the known and enter the unknown. Something in you is ready for passage.", articles: ["doorway-dreams-meaning", "threshold-symbolism-dreams", "crossing-over-dreams"] },
      { id: "water", title: "The Water", description: "Water is the unconscious itself. Your psyche is calling you to dive deeper into your emotional life. The depth of the water in your dreams reflects the depth of feeling you are being asked to access.", articles: ["water-dreams-meaning", "ocean-dreams-decoded", "river-dreams-symbolism"] },
      { id: "animal", title: "The Animal Guide", description: "Animals in dreams represent instinctual wisdom — the intelligence that lives below thought. Your unconscious is sending you a guide. Pay attention to which animal appears and what it does.", articles: ["animal-dreams-guide", "spirit-animals-dreams", "instinct-dreams-meaning"] },
      { id: "house", title: "The House", description: "The house is you. Every room is a part of your psyche. The condition of the house reflects your inner state. Exploring the house in dreams is exploring yourself.", articles: ["house-dreams-meaning", "room-symbolism-dreams", "building-dreams-decoded"] },
    ],
    getResult(answers) {
      const t = tallyAnswers(answers);
      return this.results.find((r) => r.id === topKey(t)) || this.results[0];
    },
  },
  {
    id: "integration-style",
    slug: "what-is-your-dream-integration-style",
    title: "What Is Your Dream Integration Style?",
    description: "How do you best process and integrate the wisdom from your dreams?",
    metaDescription: "Discover your unique dream integration style — how you best process and apply the wisdom from your dreams.",
    questions: [
      { question: "After a meaningful dream, you are most likely to:", options: [{ text: "Write about it extensively", value: "writer" }, { text: "Create art, music, or movement inspired by it", value: "artist" }, { text: "Meditate on it or sit in silence", value: "contemplative" }, { text: "Discuss it with someone I trust", value: "relational" }] },
      { question: "How do you best process complex emotions?", options: [{ text: "Through writing or journaling", value: "writer" }, { text: "Through creative expression", value: "artist" }, { text: "Through stillness and inner reflection", value: "contemplative" }, { text: "Through conversation and connection", value: "relational" }] },
      { question: "Which practice appeals to you most?", options: [{ text: "Dream journaling with detailed analysis", value: "writer" }, { text: "Dream-inspired art or movement", value: "artist" }, { text: "Dream meditation or re-entry", value: "contemplative" }, { text: "Dream sharing circles", value: "relational" }] },
      { question: "When a dream gives you an insight, you:", options: [{ text: "Document it and track patterns over time", value: "writer" }, { text: "Let it flow into a creative project", value: "artist" }, { text: "Sit with it until it integrates naturally", value: "contemplative" }, { text: "Share it to deepen understanding", value: "relational" }] },
    ],
    results: [
      { id: "writer", title: "The Dream Writer", description: "Words are your bridge between dreaming and waking. Your journal is not just a record — it is an active dialogue with your unconscious. Keep writing. The patterns will reveal themselves.", articles: ["dream-journal-mastery", "writing-dreams-practice", "pattern-tracking-dreams"] },
      { id: "artist", title: "The Dream Artist", description: "Your unconscious speaks in images and sensations, and you translate it through creation. This is one of the most powerful integration paths — art bypasses the rational mind entirely.", articles: ["dream-art-practice", "creative-dream-integration", "movement-dreams-body"] },
      { id: "contemplative", title: "The Dream Contemplative", description: "Silence is your laboratory. You process dreams through stillness, allowing the meaning to emerge rather than forcing interpretation. This is the path of the mystic.", articles: ["dream-meditation-guide", "contemplative-dream-practice", "silence-dream-wisdom"] },
      { id: "relational", title: "The Dream Relator", description: "You integrate through connection. Sharing dreams with trusted others creates a mirror that solo practice cannot. The dream reveals new dimensions when spoken aloud.", articles: ["dream-sharing-practice", "relational-dream-work", "dream-circles-guide"] },
    ],
    getResult(answers) {
      const t = tallyAnswers(answers);
      return this.results.find((r) => r.id === topKey(t)) || this.results[0];
    },
  },
  {
    id: "vedantic-state",
    slug: "which-vedantic-dream-state-are-you-in",
    title: "Which Vedantic Dream State Are You In?",
    description: "Explore the three states of consciousness through the lens of Vedantic philosophy.",
    metaDescription: "Discover which Vedantic state of consciousness — Jagrat, Swapna, or Sushupti — dominates your inner life.",
    questions: [
      { question: "Where does your attention spend most of its time?", options: [{ text: "Focused on external tasks and goals", value: "jagrat" }, { text: "Drifting between inner imagery and outer reality", value: "swapna" }, { text: "In a deep, quiet stillness beyond thought", value: "sushupti" }, { text: "Witnessing all three without attachment", value: "turiya" }] },
      { question: "How would you describe your inner life?", options: [{ text: "Practical and action-oriented", value: "jagrat" }, { text: "Rich with imagination and symbolism", value: "swapna" }, { text: "Peaceful and spacious", value: "sushupti" }, { text: "Aware of awareness itself", value: "turiya" }] },
      { question: "What feels most real to you?", options: [{ text: "The physical world I can touch and measure", value: "jagrat" }, { text: "The inner world of dreams and visions", value: "swapna" }, { text: "The silence beneath all experience", value: "sushupti" }, { text: "The consciousness that perceives all states", value: "turiya" }] },
      { question: "When you meditate or sit quietly, what happens?", options: [{ text: "My mind stays busy with plans and thoughts", value: "jagrat" }, { text: "Images and scenes arise spontaneously", value: "swapna" }, { text: "I dissolve into formless awareness", value: "sushupti" }, { text: "I observe the arising and passing of all phenomena", value: "turiya" }] },
      { question: "Which statement resonates most deeply?", options: [{ text: "I am what I do and achieve", value: "jagrat" }, { text: "I am what I dream and imagine", value: "swapna" }, { text: "I am the silence between thoughts", value: "sushupti" }, { text: "I am the awareness in which all states arise", value: "turiya" }] },
    ],
    results: [
      { id: "jagrat", title: "Jagrat — The Waking State", description: "You are firmly rooted in waking consciousness. This is where most people live — but Vedantic wisdom says it is only one-third of reality. Your dreams are inviting you to explore the other two-thirds.", articles: ["vedantic-dream-states", "waking-consciousness-limits", "beyond-rational-mind"] },
      { id: "swapna", title: "Swapna — The Dream State", description: "You naturally inhabit the dream state — the realm of symbol, image, and fluid reality. Vedantic philosophy considers this state equally real to waking. You are already closer to the deeper truth than most.", articles: ["swapna-dream-state", "dream-reality-vedanta", "symbolic-consciousness"] },
      { id: "sushupti", title: "Sushupti — Deep Sleep State", description: "You have touched the formless awareness that underlies both waking and dreaming. In Vedantic philosophy, sushupti is the closest most people come to their true nature — pure consciousness without content.", articles: ["deep-sleep-consciousness", "sushupti-awareness", "formless-dream-state"] },
      { id: "turiya", title: "Turiya — The Fourth State", description: "You are witnessing consciousness itself. Turiya is not a state — it is the ground in which all states arise. This is what the Mandukya Upanishad points to: the awareness that is always present, always awake.", articles: ["turiya-consciousness", "witness-awareness-dreams", "mandukya-upanishad-dreams"] },
    ],
    getResult(answers) {
      const t = tallyAnswers(answers);
      return this.results.find((r) => r.id === topKey(t)) || this.results[0];
    },
  },
];

export function getQuizBySlug(slug: string): Quiz | undefined {
  return quizzes.find((q) => q.slug === slug);
}
