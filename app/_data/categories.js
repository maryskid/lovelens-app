const categories = [
  {
    id: 1,
    title: "Fundamentals",
    description: "Daily organization and practical life",
    questions: [
      {
        id: "F1",
        type: "ALIGNMENT",
        text: "For daily organization...",
        left: "I prefer to plan and anticipate",
        right: "I prefer to adapt day by day",
      },
      {
        id: "F2",
        type: "ALIGNMENT",
        text: "Regarding household expenses...",
        left: "I prefer to budget everything precisely",
        right: "I prefer to manage case by case",
      },
      {
        id: "F3",
        type: "ALIGNMENT",
        text: "Our ideal lifestyle...",
        left: "Fixed and regular schedules",
        right: "A flexible and adaptable rhythm",
      },
      {
        id: "F4",
        type: "COMPLEMENTARITY",
        text: "Regarding household chores...",
        left: "I tend to take immediate action",
        right: "I tend to plan things out",
      },
      {
        id: "F5",
        type: "COMPLEMENTARITY",
        text: "In daily decision making...",
        left: "I tend to make proposals",
        right: "I tend to be more reflective",
      },
      {
        id: "F6",
        type: "BALANCE",
        text: "When facing unexpected situations...",
        left: "I become very anxious",
        right: "I remain completely relaxed",
      }
    ]
  },
  {
    id: 2,
    title: "Communication",
    description: "Communication style and conflict management",
    questions: [
      {
        id: "C1",
        type: "ALIGNMENT",
        text: "In our daily exchanges...",
        left: "I prefer deep discussions",
        right: "I prefer light and simple exchanges",
      },
      {
        id: "C2",
        type: "ALIGNMENT",
        text: "For important decisions...",
        left: "I prefer discussing them immediately",
        right: "I prefer taking time to think alone",
      },
      {
        id: "C3",
        type: "COMPLEMENTARITY",
        text: "In expressing emotions...",
        left: "I am very demonstrative and expressive",
        right: "I am more reserved and internalized",
      },
      {
        id: "C4",
        type: "COMPLEMENTARITY",
        text: "When facing disagreements...",
        left: "I actively seek discussion",
        right: "I step back to let things settle",
      },
      {
        id: "C5",
        type: "BALANCE",
        text: "In conflicts...",
        left: "I can become very confrontational",
        right: "I completely avoid confrontation",
      },
      {
        id: "C6",
        type: "BALANCE",
        text: "Facing criticism...",
        left: "I react very emotionally",
        right: "I remain completely detached",
      }
    ]
  },
  {
    id: 3,
    title: "Intimacy",
    description: "Emotional and physical connection",
    questions: [
      {
        id: "I1",
        type: "ALIGNMENT",
        text: "For moments together...",
        left: "I prefer planned and ritualized moments",
        right: "I prefer spontaneous and unexpected moments",
      },
      {
        id: "I2",
        type: "ALIGNMENT",
        text: "My ideal in a couple...",
        left: "Share maximum activities together",
        right: "Preserve spaces of independence",
      },
      {
        id: "I3",
        type: "ALIGNMENT",
        text: "Regarding physical intimacy...",
        left: "I like it spontaneous and unpredictable",
        right: "I prefer dedicated and anticipated moments",
      },
      {
        id: "I4",
        type: "COMPLEMENTARITY",
        text: "In difficult moments...",
        left: "I tend to verbalize my need for support",
        right: "I tend to show my support through actions",
      },
      {
        id: "I5",
        type: "COMPLEMENTARITY",
        text: "To express my affection...",
        left: "I favor words and discussions",
        right: "I favor gestures and attentions",
      },
      {
        id: "I6",
        type: "BALANCE",
        text: "Regarding our social life...",
        left: "I want us to always be together",
        right: "I want us to be very independent",
      }
    ]
  },
  {
    id: 4,
    title: "Projects",
    description: "Vision of the future and common goals",
    questions: [
      {
        id: "P1",
        type: "ALIGNMENT",
        text: "Regarding the future...",
        left: "I like having precise and detailed plans",
        right: "I prefer letting things happen",
      },
      {
        id: "P2",
        type: "ALIGNMENT",
        text: "For financial decisions...",
        left: "I prefer saving as much as possible",
        right: "I prefer enjoying the present",
      },
      {
        id: "P3",
        type: "ALIGNMENT",
        text: "Facing professional opportunities...",
        left: "Career is an absolute priority",
        right: "Personal life is the absolute priority",
      },
      {
        id: "P4",
        type: "COMPLEMENTARITY",
        text: "In project realization...",
        left: "I am more about action and initiative",
        right: "I am more about reflection and analysis",
      },
      {
        id: "P5",
        type: "COMPLEMENTARITY",
        text: "Facing challenges...",
        left: "I am optimistic and bold",
        right: "I am cautious and forward-thinking",
      },
      {
        id: "P6",
        type: "BALANCE",
        text: "Facing change...",
        left: "I constantly seek novelty",
        right: "I strongly resist any change",
      }
    ]
  },
  {
    id: 5,
    title: "External Relations",
    description: "Relationships with others and the outside world",
    questions: [
      {
        id: "R1",
        type: "ALIGNMENT",
        text: "Regarding our private life...",
        left: "I prefer sharing our life on social media",
        right: "I prefer keeping our life private",
      },
      {
        id: "R2",
        type: "ALIGNMENT",
        text: "Family relationships...",
        left: "Should be very close and frequent",
        right: "Should remain more distant and occasional",
      },
      {
        id: "R3",
        type: "ALIGNMENT",
        text: "Friendships in the couple...",
        left: "I prefer having common friends",
        right: "I prefer keeping our circles separate",
      },
      {
        id: "R4",
        type: "COMPLEMENTARITY",
        text: "In society...",
        left: "I am rather extroverted",
        right: "I am rather introverted",
      },
      {
        id: "R5",
        type: "COMPLEMENTARITY",
        text: "In family relationships...",
        left: "I am a mediator and conciliatory",
        right: "I am a guardian of boundaries",
      },
      {
        id: "R6",
        type: "BALANCE",
        text: "Facing external influences...",
        left: "I am very sensitive to external opinions",
        right: "I am totally impervious to opinions",
      }
    ]
  },
  {
    id: 6,
    title: "Parenting",
    description: "Vision of education and family (current or projected)",
    questions: [
      {
        id: "PA1",
        type: "ALIGNMENT",
        text: "Regarding education...",
        left: "I believe in a strict framework with rules",
        right: "I believe in flexible and adaptive education",
      },
      {
        id: "PA2",
        type: "ALIGNMENT",
        text: "For children's activities...",
        left: "I favor structured activities",
        right: "I favor free and creative time",
      },
      {
        id: "PA3",
        type: "ALIGNMENT",
        text: "Screen time...",
        left: "Should be strictly controlled and limited",
        right: "Can be managed with flexibility",
      },
      {
        id: "PA4",
        type: "COMPLEMENTARITY",
        text: "With children...",
        left: "I am more about authority and framework",
        right: "I am more about listening and support",
      },
      {
        id: "PA5",
        type: "COMPLEMENTARITY",
        text: "For role distribution...",
        left: "I prefer to be the structuring parent",
        right: "I prefer to be the comforting parent",
      },
      {
        id: "PA6",
        type: "BALANCE",
        text: "Facing mischief...",
        left: "I react very firmly",
        right: "I let everything pass without reacting",
      }
    ]
  }
];

export default categories;