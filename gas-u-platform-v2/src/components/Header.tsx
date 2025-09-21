'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <span className="text-2xl font-bold text-blue-600">GAS U</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/">
            <span className="text-gray-600 hover:text-blue-600">Courses</span>
          </Link>
          <Link href="/certification-test">
            <span className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700">
              Certification Test
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
