import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">About BookMyShow</h3>
          <p className="text-sm leading-relaxed text-gray-300">
            BookMyShow is India’s largest online entertainment ticketing portal. From movies to plays to events, we get you closer to what you love. Enjoy early access to premieres, exclusive offers, and easy seat selection.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/bookmyshow" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-white transition" />
            </a>
            <a href="https://twitter.com/bookmyshow" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-6 h-6 text-gray-400 hover:text-white transition" />
            </a>
            <a href="https://www.instagram.com/bookmyshow" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6 text-gray-400 hover:text-white transition" />
            </a>
            <a href="https://www.linkedin.com/company/bookmyshow" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-white transition" />
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-conditions" className="hover:text-white transition">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="/refund-policy" className="hover:text-white transition">
                Refund &amp; Cancellation
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="/help" className="hover:text-white transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-white transition">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">Contact & Subscribe</h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p>
              <span className="font-medium">Customer Care:</span> support@bookmyshow.com
            </p>
            <p>
              <span className="font-medium">Phone:</span> +91-1234-567-890
            </p>
            <p>
              <span className="font-medium">Office:</span> 123 Movie Lane, Mumbai, India
            </p>
          </div>
          <form className="mt-4">
            <label htmlFor="newsletter" className="block text-sm font-medium text-gray-300">
              Subscribe to our newsletter
            </label>
            <div className="mt-2 flex">
              <input
                type="email"
                id="newsletter"
                placeholder="Your email address"
                className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-r-md transition"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-700"></div>
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row justify-between items-center gap-4">
<<<<<<< HEAD
    
=======
        <div className="flex items-center gap-4">
          <img src="/assets/visa.png" alt="Visa" className="h-6 brightness-75 hover:brightness-100 transition" />
          <img src="/assets/mastercard.png" alt="MasterCard" className="h-6 brightness-75 hover:brightness-100 transition" />
          <img src="/assets/amex.png" alt="Amex" className="h-6 brightness-75 hover:brightness-100 transition" />
          <img src="/assets/paytm.png" alt="Paytm" className="h-6 brightness-75 hover:brightness-100 transition" />
        </div>
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
        <p className="text-xs text-gray-500">
          © 2025 BookMyShow. All rights reserved. Designed with ❤️ for movie lovers.
        </p>
      </div>
    </footer>
  );
}
