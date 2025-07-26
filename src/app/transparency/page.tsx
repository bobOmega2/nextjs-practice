import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

/**
 * Transparency Page - Explains how bias calculation works in the app
 * Shows methodology and bias dimensions tracked
 */
export default function TransparencyPage() {
  return (
    // Main container with padding, max width, and vertical spacing
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Page heading */}
      <h1 className="text-3xl font-bold">How We Calculate Bias</h1>
      
      {/* Methodology Section */}
      <Card>
        <CardHeader>
          <CardTitle>Our Methodology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Introductory paragraph */}
          <p>
            We analyze tech news articles using a combination of AI analysis and 
            community feedback to identify potential biases.
          </p>
          
          {/* Grid of methodology cards - responsive (1 col mobile, 3 col desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* AI Analysis Card */}
            <MethodologyCard 
              title="1. AI Analysis"
              description="Our AI examines language patterns, source history, and framing techniques"
              color="bg-blue-50" // Light blue background
            />
            
            {/* Expert Review Card */}
            <MethodologyCard 
              title="2. Expert Review"
              description="Tech journalists assess the AI's findings"
              color="bg-purple-50" // Light purple background
            />
            
            {/* Community Ratings Card */}
            <MethodologyCard 
              title="3. Community Ratings"
              description="Users like you provide real-world perspective"
              color="bg-green-50" // Light green background
            />
          </div>
        </CardContent>
      </Card>

      {/* Bias Dimensions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Bias Dimensions We Track</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Political Leaning Dimension */}
          <BiasDimension 
            title="Political Leaning"
            description="Left/Right/Neutral"
          />
          
          {/* Corporate Influence Dimension */}
          <BiasDimension 
            title="Corporate Influence"
            description="Favorability toward big tech"
          />
          
          {/* Sensationalism Dimension */}
          <BiasDimension 
            title="Sensationalism"
            description="Headline vs. content accuracy"
          />
          
          {/* Solution Focus Dimension */}
          <BiasDimension 
            title="Solution Focus"
            description="Problem-oriented vs solution-oriented"
          />
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Reusable component for methodology cards
 * @param {string} title - Card title (e.g. "1. AI Analysis")
 * @param {string} description - Explanation of the methodology step
 * @param {string} color - Tailwind background color class (e.g. "bg-blue-50")
 */
function MethodologyCard({ title, description, color }: { 
  title: string; 
  description: string; 
  color: string 
}) {
  return (
    // Container with dynamic background color based on props
    <div className={`p-4 rounded-lg ${color}`}>
      {/* Card title */}
      <h3 className="font-bold mb-2">{title}</h3>
      {/* Card description */}
      <p className="text-sm">{description}</p>
    </div>
  );
}

/**
 * Reusable component for bias dimension items
 * @param {string} title - Dimension name (e.g. "Political Leaning")
 * @param {string} description - Explanation of what this dimension measures
 */
function BiasDimension({ title, description }: { 
  title: string; 
  description: string 
}) {
  return (
    // Container with left accent border and padding
    <div className="border-l-4 border-primary pl-4 py-2">
      {/* Dimension title */}
      <h3 className="font-medium">{title}</h3>
      {/* Dimension description in muted text */}
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}