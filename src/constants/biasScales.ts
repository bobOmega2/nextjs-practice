  // TODO: Move mongoDB logic from api/news/[id]/route.ts to a NEW FILE (ex. create lib/articleService.ts)

  // TODO: Change folder name from "constants" to something else 

  // Bias scale values stored (harcoded for now, will be from a database later)
  // This says: any object of type "BiasScale" must have these properties (name, minLabel, maxLabel, value)
  type BiasScale = {
  articleId: string;
  scaleName: string;
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
    { articleId, scaleName: "Social Issues", minLabel: "Progressive", maxLabel: "Traditional", value: 50 },
    { articleId, scaleName: "Economic", minLabel: "Left-leaning", maxLabel: "Right-leaning", value: 50 },
    { articleId, scaleName: "Cultural Perspectives", minLabel: "Inclusive", maxLabel: "Exclusive", value: 50 },
    { articleId, scaleName: "Technology", minLabel: "Progress", maxLabel: "Caution", value: 50 },
  ];
}



