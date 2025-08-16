  // TODO: Change folder name from "constants" to something else 

  // Bias scale values stored (harcoded for now, will be from a database later)
  // This says: any object of type "BiasScale" must have these properties (name, minLabel, maxLabel, value)
  type BiasScale = {
  
  name: string;
  minLabel: string;
  maxLabel: string;
  value: number; // value user selects
};

// Getting a random integar
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

// Function that returns an array of BiasScale objects
export function getScales(id: string): BiasScale[] {
  return [
    { name: "Social Issues", minLabel: "Progressive", maxLabel: "Traditional", value: getRandomInt(100)},
    { name: "Economic", minLabel: "Left-leaning", maxLabel: "Right-leaning", value: getRandomInt(100)},
    { name: "Cultural Perspectives", minLabel: "Inclusive", maxLabel: "Exclusive", value: getRandomInt(100)},
    { name: "Technology", minLabel: "Progress", maxLabel: "Caution", value: getRandomInt(100)},
  ];
}



