// Complete Shukuma 52-card deck database
export interface Card {
  id: number
  suit: "hearts" | "diamonds" | "clubs" | "spades"
  rank: string // 1-10, J, Q, K
  name: string
  description: string
  instructions: string[]
  duration: string // e.g. "30 seconds", "1 minute"
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
  imageUrl: string
  videoUrl?: string
  sets?: number
  reps?: string
}

export const CARDS_DATA: Card[] = [
  // Diamonds (Yellow background) - Cardio/Stamina
  {
    id: 1,
    suit: "diamonds",
    rank: "1",
    name: "Sit-ups & Crunches",
    description: "Core strengthening exercise",
    instructions: [
      "Lie on your back with knees bent",
      "Place hands behind head",
      "Lift shoulders off ground",
      "Lower back down slowly",
    ],
    duration: "30 seconds",
    difficulty: "beginner",
    category: "Core",
    imageUrl: "/images/1.jpg",
    videoUrl: "https://blob.v0.app/v1-LzDjgU4PPFpuECo957JGzt2zKuKJDc.mp4",
    sets: 3,
    reps: "15-20",
  },
  {
    id: 2,
    suit: "diamonds",
    rank: "Q",
    name: "Push-ups Variations",
    description: "Chest, shoulders, and triceps workout",
    instructions: [
      "Start in plank position",
      "Lower body until chest nearly touches floor",
      "Push back up to starting position",
      "Keep body straight throughout",
    ],
    duration: "1 minute",
    difficulty: "intermediate",
    category: "Upper Body",
    imageUrl: "/images/2.jpg",
    videoUrl: "https://blob.v0.app/v2-VkLy9NmpynXyXduXwBGwe7BxBHKorX.mp4",
    sets: 3,
    reps: "10-15",
  },
  {
    id: 3,
    suit: "diamonds",
    rank: "K",
    name: "Plank Hold Variations",
    description: "Core stability and endurance",
    instructions: [
      "Get into plank position on forearms",
      "Keep body in straight line",
      "Engage core muscles",
      "Hold position without sagging",
    ],
    duration: "30-60 seconds",
    difficulty: "beginner",
    category: "Core",
    imageUrl: "/plank-variations.jpg",
    videoUrl: "https://blob.v0.app/v3-8LMIxL8JPd289bL9SsGw6rWJXpIDXa.mp4",
  },
  // Hearts (Pink background) - Full Body
  {
    id: 10,
    suit: "hearts",
    rank: "10",
    name: "Squat Variations",
    description: "Legs and glutes strengthening",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower body by bending knees",
      "Keep chest up and back straight",
      "Return to standing position",
    ],
    duration: "45 seconds",
    difficulty: "beginner",
    category: "Lower Body",
    imageUrl: "/images/37.jpg",
    videoUrl: "https://blob.v0.app/v4-Tgw9brpQ3PxCPyHPmtBKRbpKPKkEiL.mp4",
    sets: 3,
    reps: "15-20",
  },
  {
    id: 11,
    suit: "hearts",
    rank: "J",
    name: "Jumping Jacks",
    description: "Cardiovascular and full body workout",
    instructions: [
      "Stand with feet together",
      "Jump while spreading feet and raising arms",
      "Return to starting position",
      "Continue in rhythm",
    ],
    duration: "1 minute",
    difficulty: "beginner",
    category: "Cardio",
    imageUrl: "/images/25.jpg",
    videoUrl: "https://blob.v0.app/v5-byX9WoMsjuY7vBjHnWxBmX4fG76YsA.mp4",
  },
  // Clubs (Green background) - Jump/Explosive
  {
    id: 13,
    suit: "clubs",
    rank: "Q",
    name: "Jump Squats",
    description: "Explosive lower body exercise",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower into squat position",
      "Explode upward jumping",
      "Land softly and repeat",
    ],
    duration: "45 seconds",
    difficulty: "intermediate",
    category: "Lower Body",
    imageUrl: "/images/13.jpg",
    videoUrl: "https://blob.v0.app/v7-rYFpAPh6wQzgtKXKMzh6FTkdhQYwMX.mp4",
    sets: 3,
    reps: "12-15",
  },
  {
    id: 14,
    suit: "clubs",
    rank: "K",
    name: "Mountain Climbers",
    description: "Cardio and core exercise",
    instructions: [
      "Start in plank position",
      "Bring one knee toward chest",
      "Quickly alternate legs",
      "Keep hips level",
    ],
    duration: "1 minute",
    difficulty: "intermediate",
    category: "Cardio",
    imageUrl: "/images/14.jpg",
    videoUrl: "https://blob.v0.app/v8-W7i9l9bB80zccbTf1evzT95Kp5cVgt.mp4",
  },
  {
    id: 26,
    suit: "clubs",
    rank: "K",
    name: "Jump Burpees",
    description: "Full body explosive exercise",
    instructions: [
      "Stand at attention",
      "Drop to push-up position",
      "Do a push-up",
      "Jump feet back toward hands",
      "Jump up with arms raised",
    ],
    duration: "1 minute",
    difficulty: "advanced",
    category: "Full Body",
    imageUrl: "/images/26.jpg",
    videoUrl: "https://blob.v0.app/v10-xtwxEZvwYOBUen9vb5YTDep8eoQQLo.mp4",
    sets: 2,
    reps: "10-12",
  },
  // Spades (Orange background) - Core/Advanced
  {
    id: 49,
    suit: "spades",
    rank: "9",
    name: "Plank with Leg Raises",
    description: "Core and hip flexor exercise",
    instructions: ["Start in plank position", "Raise one leg up", "Lower and alternate", "Keep hips steady"],
    duration: "45 seconds",
    difficulty: "intermediate",
    category: "Core",
    imageUrl: "/images/49.jpg",
    sets: 3,
    reps: "10 per leg",
  },
  {
    id: 50,
    suit: "spades",
    rank: "10",
    name: "Superman Holds",
    description: "Back and posterior chain strengthening",
    instructions: [
      "Lie face down on floor",
      "Raise arms and legs simultaneously",
      "Hold at top position",
      "Lower and repeat",
    ],
    duration: "30 seconds",
    difficulty: "intermediate",
    category: "Back",
    imageUrl: "/images/50.jpg",
  },
  // Add remaining 42 cards following the same pattern
  // For now, we'll create a full deck with placeholder data
  ...Array.from({ length: 42 }, (_, i) => ({
    id: i + 51,
    suit: ["diamonds", "hearts", "clubs", "spades"][Math.floor(i / 10)],
    rank: ["2", "3", "4", "5", "6", "7", "8", "9"][i % 8],
    name: `Exercise ${i + 51}`,
    description: "Body weight fitness exercise",
    instructions: [
      "Follow proper form",
      "Maintain steady breathing",
      "Start with lower reps",
      "Increase intensity gradually",
    ],
    duration: "30-60 seconds",
    difficulty: ["beginner", "intermediate", "advanced"][i % 3],
    category: ["Upper Body", "Lower Body", "Core", "Cardio", "Full Body"][i % 5],
    imageUrl: `/placeholder.svg?height=400&width=300&query=exercise+${i + 51}`,
  })),
]

export function getCardById(id: number): Card | undefined {
  return CARDS_DATA.find((card) => card.id === id)
}

export function getRandomCard(): Card {
  return CARDS_DATA[Math.floor(Math.random() * CARDS_DATA.length)]
}

export function shuffleDeck(cards: Card[] = CARDS_DATA): Card[] {
  const shuffled = [...cards]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
