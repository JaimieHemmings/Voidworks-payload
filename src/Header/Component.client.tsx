'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Squash as Hamburger } from 'hamburger-react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Web Development', href: '/services/web' },
      { label: 'Design', href: '/services/design' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

export const HeaderClient: React.FC<any> = ({ headerData }) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <header className="w-full bg-payload shadow-md sticky top-0 z-[999] w-full left-0">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-white">
          {' '}
          VoidWorks
        </Link>
        {/* Desktop Nav & Social - hidden on md and below */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li
                key={item.label}
                className={item.dropdown ? 'relative group inline-block' : 'relative inline-block'}
              >
                <Link href={item.href} className="px-3 py-2 hover:bg-gray-100 rounded text-white">
                  {item.label}
                </Link>
                {item.dropdown && (
                  <ul className="absolute left-0 top-full bg-white shadow-lg z-10 hidden group-hover:block whitespace-nowrap">
                    {item.dropdown.map((drop) => (
                      <li key={drop.label}>
                        <Link
                          href={drop.href}
                          className="block px-4 py-2 hover:bg-gray-100 text-white"
                        >
                          {drop.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {/* Social Icons with react-icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-blue-500"
            >
              <FaTwitter size={24} className="text-white" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-gray-700"
            >
              <FaGithub size={24} className="text-white" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-700"
            >
              <FaLinkedin size={24} className="text-white" />
            </a>
          </div>
        </div>
        {/* Hamburger - visible on md and below */}
        <div className="md:hidden flex items-center">
          <Hamburger toggled={isOpen} toggle={setOpen} size={24} color="white" />
        </div>
        {/* Mobile Nav Slideout */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-payload shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-8">
              <Hamburger toggled={isOpen} toggle={setOpen} size={24} color="white" />
            </div>
            <ul className="flex flex-col gap-6">
              {navItems.map((item) => (
                <li key={item.label} className="relative">
                  <Link
                    href={item.href}
                    className="px-3 py-2 rounded text-white text-lg"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <ul className="pl-4 mt-2">
                      {item.dropdown.map((drop) => (
                        <li key={drop.label}>
                          <Link
                            href={drop.href}
                            className="block px-3 py-2 rounded text-white text-base"
                            onClick={() => setOpen(false)}
                          >
                            {drop.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 mt-auto">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-blue-500"
              >
                <FaTwitter size={24} className="text-white" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-gray-700"
              >
                <FaGithub size={24} className="text-white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-blue-700"
              >
                <FaLinkedin size={24} className="text-white" />
              </a>
            </div>
          </div>
        </div>
        {/* Overlay for closing mobile nav */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-payload bg-opacity-40 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </nav>
    </header>
  )
}
