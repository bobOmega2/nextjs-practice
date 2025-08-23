// Database name
const database = 'TechNewsBiasTrackerDB';

// Create or switch to the database
use(database);

db.yourCollection.deleteMany({});