/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// Database name
const database = 'TechNewsBiasTrackerDB';

// Create or switch to the database
use(database);

// Create collections for your project
db.createCollection('articles');     // Stores tech news articles
db.createCollection('biasScores');   // Stores bias ratings per article
db.createCollection('users');        // Optional: stores user profiles (if needed)
db.createCollection('articleFeedback'); // Optional: stores comments, AI ratings, etc.

/* Example of creating a collection with validation rules (optional)
db.createCollection('biasScores', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["articleId", "scaleName", "value", "submittedAt"],
      properties: {
        articleId: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        scaleName: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        value: {
          bsonType: "int",
          minimum: 0,
          maximum: 100,
          description: "must be an integer between 0 and 100"
        },
        submittedAt: {
          bsonType: "date",
          description: "must be a date and is required"
        },
        userId: {
          bsonType: "string",
          description: "optional user ID who submitted the rating"
        }
      }
    }
  }
});
*/

console.log("Database and collections created successfully.");
