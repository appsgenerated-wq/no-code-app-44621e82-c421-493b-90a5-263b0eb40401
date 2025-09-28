import React from 'react';
import config from '../constants';
import { ShieldCheckIcon, RocketLaunchIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin }) => {
  const features = [
    {
      name: 'Secure Backend',
      description: 'Powered by Manifest, ensuring robust security and policies.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Instant API',
      description: 'A complete REST API for all your data, generated automatically.',
      icon: RocketLaunchIcon,
    },
    {
      name: 'React SDK',
      description: 'Seamless integration with your frontend using the official Manifest SDK.',
      icon: CodeBracketIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
            <div>
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Welcome to FoodApp
                </h1>
                <p className="mt-6 text-xl text-gray-500">
                  Discover and order from the best local restaurants. A complete application built on React and a Manifest-powered backend.
                </p>
              </div>

              <div className="mt-12 sm:flex">
                <button
                  onClick={() => onLogin('user@manifest.build', 'password')}
                  className="block w-full sm:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login as Demo User
                </button>
                <a
                  href={`${config.BACKEND_URL}/admin`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 sm:mt-0 sm:ml-4 block w-full sm:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Admin Panel
                </a>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
                <svg className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0" width={404} height={392} fill="none" viewBox="0 0 404 392">
                  <defs>
                    <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={392} fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
                </svg>
              </div>
              <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
                <img
                  className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"
                  alt="Food platter"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-white py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-indigo-600 uppercase">Powered by Manifest</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Everything you need for a modern web app
            </p>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((featureItem) => (
                  <div key={featureItem.name} className="pt-6">
                    <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                            <featureItem.icon className="h-6 w-6 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{featureItem.name}</h3>
                        <p className="mt-5 text-base text-gray-500">{featureItem.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
