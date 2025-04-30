import { TrophyIcon, FireIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ScoreTracker({ currentScore = 0, highScore = 0, streak = 0 }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto">
      <div className="space-y-4">
        {/* Current Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
            <span className="text-gray-600 font-medium">Current Score</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{currentScore}</span>
        </div>

        {/* High Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrophyIcon className="h-6 w-6 text-yellow-500" />
            <span className="text-gray-600 font-medium">High Score</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{highScore}</span>
        </div>

        {/* Current Streak */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FireIcon className="h-6 w-6 text-red-500" />
            <span className="text-gray-600 font-medium">Current Streak</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{streak}</span>
        </div>
      </div>
    </div>
  );
} 