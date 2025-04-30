import ScoreTracker from '../components/ScoreTracker';

export default function Play() {
  // Dummy data for demonstration
  const dummyScores = {
    currentScore: 125,
    highScore: 250,
    streak: 5
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Google Trends Guess</h1>
      
      {/* Score Tracker Component */}
      <div className="mb-8">
        <ScoreTracker 
          currentScore={dummyScores.currentScore}
          highScore={dummyScores.highScore}
          streak={dummyScores.streak}
        />
      </div>

      {/* Placeholder for the word guessing game */}
      <div className="text-center text-gray-600">
        Game content coming soon...
      </div>
    </div>
  );
} 