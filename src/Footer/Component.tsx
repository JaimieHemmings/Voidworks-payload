import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <h2 className="text-white text-2xl font-bold">Company Name</h2>
              <p className="text-white/80">
                A short description about the company or website goes here.
              </p>
              <div className="space-y-2">
                <div className="text-white/80">
                  Email:{' '}
                  <a href="mailto:info@example.com" className="underline">
                    info@example.com
                  </a>
                </div>
                <div className="text-white/80">
                  Phone:{' '}
                  <a href="tel:+1234567890" className="underline">
                    +1 234 567 890
                  </a>
                </div>
                <div className="text-white/80">Location: City, Country</div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-white/20 pb-3">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-white/80 hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-white/80 hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/80 hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white/80 hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-white/20 pb-3">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/faq" className="text-white/80 hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-white/80 hover:underline">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/80 hover:underline">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-white/80 hover:underline">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-white/20 pb-3">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <p className="text-white/80">Contact us for more information or support.</p>
                <div className="flex gap-3 mt-2">
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-all"
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-blue-400 transition-all"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-pink-500 transition-all"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-all"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">© 2025 Company Name. All rights reserved.</div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-white/60 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
