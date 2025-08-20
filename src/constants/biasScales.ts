  // TODO: Move mongoDB logic from api/news/[id]/route.ts to a NEW FILE (ex. create lib/articleService.ts)

  // TODO: Change folder name from "constants" to something else 

  // Bias scale values stored (harcoded for now, will be from a database later)
  // This says: any object of type "BiasScale" must have these properties (name, minLabel, maxLabel, value)
  type BiasScale = {
  articleId: string;
  name: string;
  minLabel: string;
  maxLabel: string;
  value: number; 
};


// Getting a random integar
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

// Function that returns an array of BiasScale objects
export function getScales(articleId: string): BiasScale[] {
  return [
    { articleId, name: "Social Issues", minLabel: "Progressive", maxLabel: "Traditional", value: getRandomInt(100) },
    { articleId, name: "Economic", minLabel: "Left-leaning", maxLabel: "Right-leaning", value: getRandomInt(100)  },
    { articleId, name: "Cultural Perspectives", minLabel: "Inclusive", maxLabel: "Exclusive", value: getRandomInt(100)  },
    { articleId, name: "Technology", minLabel: "Progress", maxLabel: "Caution", value: getRandomInt(100) },
  ];
}



