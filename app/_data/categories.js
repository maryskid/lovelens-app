const categories = [
  {
    id: 1,
    title: "Daily life",
    description: "Daily rhythms and life management",
    questions: [
      {
        id: "DL1",  // Changed from F1
        type: "ALIGNMENT",
        text: "When managing our daily life...",
        left: "I need structure and predictability",
        right: "I thrive on flexibility and spontaneity",
      },
      {
        id: "DL2",  // Changed from F2
        type: "ALIGNMENT",
        text: "In managing our resources...",
        left: "I prefer detailed planning and tracking",
        right: "I prefer intuitive and flexible management",
      },
      {
        id: "DL3",  // Changed from F3
        type: "COMPLEMENTARITY",
        text: "When facing daily tasks...",
        left: "I'm quick to take action",
        right: "I prefer thorough planning first",
      },
      {
        id: "DL4",  // Changed from F4
        type: "COMPLEMENTARITY",
        text: "In maintaining our home...",
        left: "I notice details and small needs",
        right: "I focus on bigger picture organization",
      },
      {
        id: "DL5",  // Changed from F5
        type: "BALANCE",
        text: "When our routine is disrupted...",
        left: "I become stressed and need support",
        right: "I adapt easily but might overlook impact",
      },
      {
        id: "DL6",  // Changed from F6
        type: "BALANCE",
        text: "In managing life's demands...",
        left: "I tend to overcommit and strain",
        right: "I might undercommit to avoid stress",
      }
    ]
  },
  {
    id: 2,
    title: "Communication",
    description: "Connection patterns and emotional expression",
    questions: [
      {
        id: "COM1",  // Changed from C1 (avoiding just C to be more clear)
        type: "ALIGNMENT",
        text: "When processing emotions together...",
        left: "I need immediate discussion",
        right: "I need time to process first",
      },
      {
        id: "COM2",
        type: "ALIGNMENT",
        text: "During disagreements...",
        left: "I prefer working things out immediately",
        right: "I need space before engaging",
      },
      {
        id: "COM3",
        type: "COMPLEMENTARITY",
        text: "When sharing feelings...",
        left: "I express openly and seek response",
        right: "I show support through listening",
      },
      {
        id: "COM4",
        type: "COMPLEMENTARITY",
        text: "During stressful periods...",
        left: "I initiate more connection",
        right: "I focus inward to recharge",
      },
      {
        id: "COM5",
        type: "BALANCE",
        text: "When receiving feedback...",
        left: "I can be defensive but want growth",
        right: "I'm receptive but might dismiss importance",
      },
      {
        id: "COM6",
        type: "BALANCE",
        text: "In emotional moments...",
        left: "I might overwhelm with intensity",
        right: "I might disconnect too much",
      }
    ]
  },
  {
    id: 3,
    title: "Intimacy",
    description: "Emotional and physical connection patterns",
    questions: [
      {
        id: "INT1",  // Changed from I1 (avoiding just I to be more clear)
        type: "ALIGNMENT",
        text: "To feel deeply connected...",
        left: "I need regular dedicated time",
        right: "I need spontaneous moments",
      },
      {
        id: "INT2",
        type: "ALIGNMENT",
        text: "Regarding personal space...",
        left: "I need lots of together time",
        right: "I need significant alone time",
      },
      {
        id: "INT3",
        type: "COMPLEMENTARITY",
        text: "When feeling disconnected...",
        left: "I initiate conversations about it",
        right: "I create opportunities for closeness",
      },
      {
        id: "INT4",
        type: "COMPLEMENTARITY",
        text: "In showing love...",
        left: "I express through words and planning",
        right: "I express through actions and presence",
      },
      {
        id: "INT5",
        type: "BALANCE",
        text: "With emotional vulnerability...",
        left: "I might share too quickly",
        right: "I might take too long to open up",
      },
      {
        id: "INT6",
        type: "BALANCE",
        text: "During difficult periods...",
        left: "I might become too dependent",
        right: "I might become too distant",
      }
    ]
  },
  {
    id: 4,
    title: "Growth",
    description: "Handling transitions and development",
    questions: [
      {
        id: "GRO1",  // Changed from G1
        type: "ALIGNMENT",
        text: "When facing major life changes...",
        left: "I need detailed plans and discussion",
        right: "I prefer taking it step by step",
      },
      {
        id: "GRO2",
        type: "ALIGNMENT",
        text: "Regarding personal growth...",
        left: "I want us to grow together always",
        right: "I value independent growth paths",
      },
      {
        id: "GRO3",
        type: "COMPLEMENTARITY",
        text: "In pursuing goals...",
        left: "I provide motivation and drive",
        right: "I provide stability and support",
      },
      {
        id: "GRO4",
        type: "COMPLEMENTARITY",
        text: "During transitions...",
        left: "I focus on possibilities ahead",
        right: "I ensure we maintain stability",
      },
      {
        id: "GRO5",
        type: "BALANCE",
        text: "With new opportunities...",
        left: "I might rush into changes",
        right: "I might resist necessary change",
      },
      {
        id: "GRO6",
        type: "BALANCE",
        text: "When making life decisions...",
        left: "I might overthink and stress",
        right: "I might underthink and miss details",
      }
    ]
  },
  {
    id: 5,
    title: "Social life",
    description: "Managing relationships and boundaries",
    questions: [
      {
        id: "SOC1",  // Changed from E1
        type: "ALIGNMENT",
        text: "Regarding our relationship privacy...",
        left: "I prefer keeping things between us",
        right: "I need outside perspectives",
      },
      {
        id: "SOC2",
        type: "ALIGNMENT",
        text: "With family involvement...",
        left: "I want close, regular connection",
        right: "I prefer more independence",
      },
      {
        id: "SOC3",
        type: "COMPLEMENTARITY",
        text: "In social situations...",
        left: "I create energy and connection",
        right: "I maintain boundaries and balance",
      },
      {
        id: "SOC4",
        type: "COMPLEMENTARITY",
        text: "When others need support...",
        left: "I readily offer our help",
        right: "I protect our resources",
      },
      {
        id: "SOC5",
        type: "BALANCE",
        text: "With outside influences...",
        left: "I might let others affect us too much",
        right: "I might isolate us too much",
      },
      {
        id: "SOC6",
        type: "BALANCE",
        text: "In maintaining friendships...",
        left: "I might overextend us socially",
        right: "I might limit our connections",
      }
    ]
  },
  {
    id: 6,
    title: "Future goals",
    description: "Vision alignment and life direction",
    questions: [
      {
        id: "FUT1",  // Changed from P1
        type: "ALIGNMENT",
        text: "In building our future...",
        left: "I need clear long-term plans",
        right: "I prefer staying open to possibilities",
      },
      {
        id: "FUT2",
        type: "ALIGNMENT",
        text: "Regarding life priorities...",
        left: "I focus on achievement and growth",
        right: "I focus on wellbeing and balance",
      },
      {
        id: "FUT3",
        type: "COMPLEMENTARITY",
        text: "In pursuing dreams...",
        left: "I generate ideas and momentum",
        right: "I create practical pathways",
      },
      {
        id: "FUT4",
        type: "COMPLEMENTARITY",
        text: "When setting goals...",
        left: "I push for bigger possibilities",
        right: "I ensure sustainable approaches",
      },
      {
        id: "FUT5",
        type: "BALANCE",
        text: "With our resources...",
        left: "I might risk too much for growth",
        right: "I might be too cautious",
      },
      {
        id: "FUT6",
        type: "BALANCE",
        text: "In life direction...",
        left: "I might push too hard forward",
        right: "I might resist needed movement",
      }
    ]
  },
  {
    id: 7,
    title: "Parenting values",
    description: "Child-rearing philosophy and approaches",
    questions: [
      {
        id: "PAR1",  // Changed from PV1
        type: "ALIGNMENT",
        text: "Regarding childhood structure...",
        left: "I believe in clear routines and rules",
        right: "I believe in natural consequences",
      },
      {
        id: "PAR2",
        type: "ALIGNMENT",
        text: "About children's education...",
        left: "I prioritize academic achievement",
        right: "I prioritize emotional intelligence",
      },
      {
        id: "PAR3",
        type: "COMPLEMENTARITY",
        text: "When children struggle...",
        left: "I provide solutions and guidance",
        right: "I help them find their own way",
      },
      {
        id: "PAR4",
        type: "COMPLEMENTARITY",
        text: "In parenting roles...",
        left: "I naturally lead and direct",
        right: "I naturally nurture and support",
      },
      {
        id: "PAR5",
        type: "BALANCE",
        text: "With children's independence...",
        left: "I might be too protective",
        right: "I might give too much freedom",
      },
      {
        id: "PAR6",
        type: "BALANCE",
        text: "Regarding discipline...",
        left: "I might be too strict",
        right: "I might be too lenient",
      }
    ]
  },
  {
    id: 8,
    title: "Finances",
    description: "Money management and financial values",
    questions: [
      {
        id: "FIN1",  // Changed from FH1
        type: "ALIGNMENT",
        text: "Regarding monthly income...",
        left: "I believe in shared accounts only",
        right: "I prefer keeping separate accounts",
      },
      {
        id: "FIN2",
        type: "ALIGNMENT",
        text: "With unexpected money...",
        left: "I prioritize saving for security",
        right: "I prioritize enjoying the present",
      },
      {
        id: "FIN3",
        type: "COMPLEMENTARITY",
        text: "In financial decisions...",
        left: "I focus on growth opportunities",
        right: "I focus on security and stability",
      },
      {
        id: "FIN4",
        type: "COMPLEMENTARITY",
        text: "Managing daily expenses...",
        left: "I track and optimize spending",
        right: "I maintain the bigger picture",
      },
      {
        id: "FIN5",
        type: "BALANCE",
        text: "With luxury purchases...",
        left: "I might spend too impulsively",
        right: "I might be too restrictive",
      },
      {
        id: "FIN6",
        type: "BALANCE",
        text: "Regarding debt...",
        left: "I'm too comfortable with it",
        right: "I'm too afraid of it",
      }
    ]
  }
];

export default categories;