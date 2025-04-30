import { Link, useLocation } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ComingSoon() {
  const location = useLocation();
  const pageName = location.pathname.substring(1).charAt(0).toUpperCase() + 
                  location.pathname.slice(2);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-max mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {pageName} Coming Soon
        </h1>
        <p className="mt-4 text-base text-gray-500">
          We're working hard to bring you this feature. Stay tuned!
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 