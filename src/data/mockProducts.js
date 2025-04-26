const mockProducts = [
  {
    id: '1',
    title: "Color & Shapes Puzzle Set",
    description: "A Montessori puzzle that helps toddlers learn shapes and colors through hands-on play.",
    image: { url: "/toy_display.jpg", altText: "Color & Shapes Puzzle" },
    price: "$19.99",
    available: true,
    tags: [
      "trait_Conscientiousness",
      "category_Puzzle",
      "Toy",
      "ageGroup_2-4",
      "brand_MontessoriCo"
    ]
  },
  {
    id: '2',
    title: "Adventure Storybook Bundle",
    description: "Exciting tales for curious minds — perfect for bedtime reading or quiet afternoons.",
    image: { url: "/book_display.jpg", altText: "Adventure Storybooks" },
    price: "$24.99",
    available: true,
    tags: [
      "trait_Openness",
      "category_Storybook",
      "Book",
      "ageGroup_4-6",
      "brand_LittleReaders"
    ]
  },
  {
    id: '3',
    title: "Group Board Game Pack",
    description: "Fun and cooperative games that bring friends and family together — great for extroverted kids!",
    image: { url: "/toy_display.jpg", altText: "Group Board Game" },
    price: "$29.99",
    available: true,
    tags: [
      "trait_Extraversion",
      "category_BoardGame",
      "Game",
      "ageGroup_6-8",
      "brand_PlayTogether"
    ]
  },
  {
    id: '4',
    title: "Mindfulness Toy Kit",
    description: "Soothing, sensory toys designed to help anxious children self-regulate and unwind.",
    image: { url: "/toy_display.jpg", altText: "Mindfulness Toy Kit" },
    price: "$21.00",
    available: true,
    tags: [
      "trait_Neuroticism",
      "category_CalmingToy",
      "Toy",
      "ageGroup_2-4",
      "brand_CalmKids"
    ]
  },
  {
    id: '5',
    title: "Empathy Story Collection",
    description: "Heartwarming books about kindness and understanding for young minds.",
    image: { url: "/book_display.jpg", altText: "Empathy Story Collection" },
    price: "$18.00",
    available: true,
    tags: [
      "trait_Agreeableness",
      "category_Storybook",
      "Book",
      "ageGroup_4-6",
      "brand_LittleReaders"
    ]
  },
  {
    id: '6',
    title: "STEM Robotics Kit",
    description: "Engage curious minds with this beginner-friendly programmable robot.",
    image: { url: "/toy_display.jpg", altText: "STEM Robotics Kit" },
    price: "$39.99",
    available: true,
    tags: [
      "trait_Openness",
      "category_Robotics",
      "Toy",
      "ageGroup_8-10",
      "brand_TechTots"
    ]
  },
  {
    id: '7',
    title: "Story Cubes: Build-A-Story Game",
    description: "Boost storytelling skills and imagination with these fun dice prompts.",
    image: { url: "/toy_display.jpg", altText: "Story Cubes" },
    price: "$14.50",
    available: true,
    tags: [
      "trait_Openness",
      "category_Storytelling",
      "Game",
      "ageGroup_6-8",
      "brand_PlayTogether"
    ]
  },
  {
    id: '8',
    title: "Bedtime Routine Tracker",
    description: "Reward-based planner that helps kids stick to bedtime and morning routines.",
    image: { url: "/toy_display.jpg", altText: "Routine Tracker" },
    price: "$15.99",
    available: true,
    tags: [
      "trait_Conscientiousness",
      "category_Planner",
      "Tool",
      "ageGroup_2-4",
      "brand_CalmKids"
    ]
  },
  {
    id: '9',
    title: "Quiet Time Sensory Book",
    description: "A soft, calming interactive book for moments of mindfulness and rest.",
    image: { url: "/book_display.jpg", altText: "Quiet Time Book" },
    price: "$22.00",
    available: true,
    tags: [
      "trait_Neuroticism",
      "category_SensoryBook",
      "Book",
      "ageGroup_2-4",
      "brand_LittleReaders"
    ]
  },
  {
    id: '10',
    title: "Friendship Bracelet Kit",
    description: "Colorful strings and beads to help children craft and share friendship bracelets.",
    image: { url: "/toy_display.jpg", altText: "Friendship Bracelet Kit" },
    price: "$12.99",
    available: true,
    tags: [
      "trait_Agreeableness",
      "category_CraftKit",
      "Toy",
      "ageGroup_6-8",
      "brand_CreativeKids"
    ]
  },
  {
    id: '11',
    title: "Big Emotions Coloring Book",
    description: "Illustrated scenarios that help children name and express emotions.",
    image: { url: "/book_display.jpg", altText: "Emotions Coloring Book" },
    price: "$9.99",
    available: true,
    tags: [
      "trait_Neuroticism",
      "category_Emotions",
      "Book",
      "ageGroup_2-4",
      "brand_LittleArtists"
    ]
  },
  {
    id: '12',
    title: "Teamwork Card Game",
    description: "Fast-paced game where players must cooperate to win — perfect for bonding!",
    image: { url: "/toy_display.jpg", altText: "Teamwork Game" },
    price: "$17.99",
    available: true,
    tags: [
      "trait_Agreeableness",
      "trait_Extraversion",
      "category_CardGame",
      "Game",
      "ageGroup_6-8",
      "brand_PlayTogether"
    ]
  },
  {
    id: '13',
    title: "Creative Writing Prompt Cards",
    description: "Spark imagination and narrative thinking with 50 creative prompts.",
    image: { url: "/book_display.jpg", altText: "Writing Cards" },
    price: "$13.50",
    available: true,
    tags: [
      "trait_Openness",
      "category_Writing",
      "Book",
      "ageGroup_8-10",
      "brand_LittleWriters"
    ]
  },
  {
    id: '14',
    title: "Organize & Sort Activity Bins",
    description: "Fine-motor toy that helps kids practice sorting by color, shape, and size.",
    image: { url: "/toy_display.jpg", altText: "Sorting Activity Bins" },
    price: "$16.50",
    available: true,
    tags: [
      "trait_Conscientiousness",
      "category_Sorting",
      "Toy",
      "ageGroup_2-4",
      "brand_MontessoriCo"
    ]
  },
  {
    id: '15',
    title: "Outdoor Explorer Set",
    description: "Binoculars, compass, bug collector and more — for your curious little adventurer.",
    image: { url: "/toy_display.jpg", altText: "Explorer Set" },
    price: "$25.00",
    available: true,
    tags: [
      "trait_Openness",
      "category_Adventure",
      "Toy",
      "ageGroup_6-8",
      "brand_NatureKids"
    ]
  }
];

export default mockProducts;