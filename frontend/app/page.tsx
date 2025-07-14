import Link from 'next/link'
import { Shield, FileSearch, Globe } from 'lucide-react'

export default function Home() {
  const features = [
    {
      name: 'Media Analysis',
      description: 'Upload images, videos, or audio files to detect potential deepfakes with advanced AI models.',
      icon: Shield,
      href: '/media',
    },
    {
      name: 'News Verification',
      description: 'Verify news articles and text content for misinformation using state-of-the-art fact-checking.',
      icon: FileSearch,
      href: '/news',
    },
    {
      name: 'Browser Extension',
      description: 'Install our browser extension for instant fact-checking while browsing the web.',
      icon: Globe,
      href: '/extension',
    },
  ]

  return (
    <div className="relative isolate">
      {/* Hero section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Detect Deepfakes & Misinformation in Real-time
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              TrueSight AI uses advanced artificial intelligence to help you identify manipulated media
              and verify information across multiple platforms.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/media"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Try It Now
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
              Comprehensive Protection
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to verify digital content
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our suite of tools helps you stay informed and protected in an era of sophisticated
              digital manipulation.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <Link key={feature.name} href={feature.href}>
                  <div className="flex flex-col hover:bg-gray-50 dark:hover:bg-gray-800 p-6 rounded-lg transition-colors">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                      <feature.icon
                        className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                </Link>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
} 