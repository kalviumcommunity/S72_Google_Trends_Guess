import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-max mx-auto text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Sorry, we couldn't find{' '}
          <code className="text-sm font-bold text-gray-900">{location.pathname}</code>
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 