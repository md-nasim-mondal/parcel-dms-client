import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Shield,
    Award,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    ArrowRight
} from 'lucide-react';
import { Logo } from '@/assets/icons/Logo';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto container space-y-8 px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center">
              <Logo size="lg" />
            </div>

            <p className="max-w-md text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              Your trusted partner for fast, reliable, and secure parcel delivery services. 
              We deliver your packages with care and precision across the country.
            </p>

            {/* Social Links */}
             <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-lg">Company</p>
            <ul className="mt-4 space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Services', href: '/services' },
                { label: 'Careers', href: '/careers' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact Us', href: '/contact' }
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm block py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-lg">Contact</p>
             <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="text-sm">support@swiftdrop.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="text-sm">123 Delivery St, New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-lg">Newsletter</p>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Subscribe to get latest updates and offers.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Subscribe <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {currentYear} SwiftDrop Parcel Delivery. All rights reserved.
            </p>

            {/* Additional Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
             <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                <Shield className="w-3 h-3 text-green-600 dark:text-green-400" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                <Award className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">PCI Compliant</span>
              </div>
               <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">24/7 Support</span>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
}