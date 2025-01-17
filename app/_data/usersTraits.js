const firstUser = {
  name: "Sarah",
  avatar: "/female-emoji.png",
  traits: [
    {
      name: "Organizational Style",
      labels: {
        Structured: { value: 55, isDominant: true },
        Flexible: { value: 45 },
      },
      description: "Sarah prefers structured organization in her life.",
    },
    {
      name: "Communication Approach",
      labels: {
        Expressive: { value: 30 },
        Reserved: { value: 70, isDominant: true },
      },
      description: "Sarah communicates more reservedly.",
    },
    {
      name: "Intimacy Dynamics",
      labels: {
        Connected: { value: 40 },
        Independent: { value: 60, isDominant: true },
      },
      description: "Sarah values independence in close relationships.",
    },
    {
      name: "Growth Orientation",
      labels: {
        Ambitious: { value: 45 },
        Grounded: { value: 55, isDominant: true },
      },
      description: "Sarah leans towards grounded, practical growth.",
    },
    {
      name: "Social Interaction",
      labels: {
        Inclusive: { value: 60, isDominant: true },
        Private: { value: 40 },
      },
      description: "Sarah enjoys inclusivity in social settings.",
    },
    {
      name: "Future Vision",
      labels: {
        Planned: { value: 70, isDominant: true },
        Exploratory: { value: 30 },
      },
      description: "Sarah prefers a planned and structured future.",
    },
    {
      name: "Parenting Philosophy",
      labels: {
        Structured: { value: 40 },
        Adaptive: { value: 60, isDominant: true },
      },
      description: "Sarah believes in adaptive parenting strategies.",
    },
    {
      name: "Financial Mindset",
      labels: {
        Cautious: { value: 55, isDominant: true },
        Opportunistic: { value: 45 },
      },
      description: "Sarah leans towards a cautious financial mindset.",
    },
  ],
  growthOpportunity: "Consider embracing unplanned moments during weekends to make life more spontaneous and enjoyable.",
};

const secondUser = {
  name: "Thomas",
  avatar: "/male-emoji.png",
  traits: [
    {
      name: "Organizational Style",
      labels: {
        Structured: { value: 45 },
        Flexible: { value: 55, isDominant: true },
      },
      description: "Thomas prefers a more flexible organization style.",
    },
    {
      name: "Communication Approach",
      labels: {
        Expressive: { value: 70, isDominant: true },
        Reserved: { value: 30 },
      },
      description: "Thomas is more expressive in communication.",
    },
    {
      name: "Intimacy Dynamics",
      labels: {
        Connected: { value: 60, isDominant: true },
        Independent: { value: 40 },
      },
      description: "Thomas values connection in close relationships.",
    },
    {
      name: "Growth Orientation",
      labels: {
        Ambitious: { value: 75, isDominant: true },
        Grounded: { value: 25 },
      },
      description: "Thomas is highly ambitious in personal growth.",
    },
    {
      name: "Social Interaction",
      labels: {
        Inclusive: { value: 60, isDominant: true },
        Private: { value: 40 },
      },
      description: "Thomas enjoys inclusivity in social settings.",
    },
    {
      name: "Future Vision",
      labels: {
        Planned: { value: 40 },
        Exploratory: { value: 60, isDominant: true },
      },
      description: "Thomas is open to exploratory future planning.",
    },
    {
      name: "Parenting Philosophy",
      labels: {
        Structured: { value: 50 },
        Adaptive: { value: 50, isDominant: true },
      },
      description: "Thomas balances adaptive and structured parenting.",
    },
    {
      name: "Financial Mindset",
      labels: {
        Cautious: { value: 35 },
        Opportunistic: { value: 65, isDominant: true },
      },
      description: "Your financial mindset is strongly opportunistic, a style that thrives on seizing opportunities and embracing growth. This perspective brings a dynamic energy to your romantic relationship, often fostering excitement and the potential for shared adventures. It can encourage your partnership to dream big and take bold steps, creating a future rich with possibilities. Your strengths lie in your clarity and decisiveness, as reflected in your responses about prioritizing growth and optimizing spending. However, your preferences may sometimes clash with a partner who values stability or a more cautious approach. Balancing these tendencies is key to ensuring both partners feel secure and aligned in financial decisions.To nurture harmony, consider combining your opportunistic outlook with small gestures of financial reassurance. For example, setting aside a joint savings fund for shared goals while maintaining room for your adventurous investments can honor both styles. Additionally, open, proactive discussions about large purchases or debt management will foster mutual trust and understanding. Your natural style is a gift in any partnership, infusing excitement and ambition into shared dreams. Embrace this while remaining attuned to your partner's needs, knowing that your ability to inspire and lead can strengthen the foundation of your relationship.",
    },
  ],
  growthOpportunity: "Make it a habit to share your weekly schedule during Sunday dinners to foster better communication.",
};

const together = {
  growthOpportunity: "Set up a shared calendar to keep track of important events and stay organized together.",
};

export default { firstUser, secondUser, together };
