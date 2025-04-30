import { Link } from 'react-router-dom';
import { ChartBarIcon, TrophyIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Compare Search Trends',
    description: 'Guess which term is searched more on Google. Test your knowledge of global trends and interests.',
    icon: ChartBarIcon,
  },
  {
    name: 'Compete & Learn',
    description: 'Challenge yourself and others while learning about what the world is searching for.',
    icon: TrophyIcon,
  },
  {
    name: 'Discover Insights',
    description: 'Gain fascinating insights into search patterns and popular topics across the internet.',
    icon: LightBulbIcon,
  },
];

export default function Landing() {
  return (
    <div className="bg-background">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden">
        <div className="container py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Test Your Knowledge of{' '}
              <span className="text-primary">Google Search Trends</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Challenge yourself with our interactive game where you guess which search term is more popular.
              Learn about global trends while having fun!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/play" className="btn-primary">
                Start Playing
              </Link>
              <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Learn More <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="py-24 sm:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">How It Works</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to know about Trends Guess
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A fun and educational game that challenges your knowledge of what people are searching for on Google.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to test your knowledge?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Join thousands of players and start guessing search trends now.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/play" className="btn-primary">
                Play Now
              </Link>
              <Link to="/leaderboard" className="btn-secondary">
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 