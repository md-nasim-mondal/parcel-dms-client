import { 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Shield,
  Award
} from 'lucide-react';
import { Logo } from '@/assets/icons/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto container space-y-8 px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center">
              <Logo size="lg" />
            </div>

            <p className="mt-4 max-w-md text-gray-600 dark:text-gray-300 leading-relaxed">
              Your trusted partner for fast, reliable, and secure parcel delivery services. 
              We deliver your packages with care and precision across the country.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm">support@swiftdrop.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm">123 Delivery St, City, State 12345</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                <Shield className="w-3 h-3 text-green-600 dark:text-green-400" />
                <span className="text-xs text-green-700 dark:text-green-300">Secure</span>
              </div>
              <div className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                <Award className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-blue-700 dark:text-blue-300">Verified</span>
              </div>
              <div className="flex items-center space-x-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span className="text-xs text-amber-700 dark:text-amber-300">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-lg">Services</p>
            <ul className="mt-4 space-y-3">
              {[
                'Express Delivery',
                'Same-Day Delivery',
                'International Shipping',
                'Package Tracking',
                'Custom Solutions',
                'Business Logistics'
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm flex items-center space-x-2 group"
                  >
                    <Truck className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-lg">Company</p>
            <ul className="mt-4 space-y-3">
              {[
                'About Us',
                'Our Team',
                'Careers',
                'Testimonials',
                'Press Kit',
                'Blog'
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-lg">Support</p>
            <ul className="mt-4 space-y-3">
              {[
                'Help Center',
                'Contact Us',
                'Shipping Info',
                'Returns',
                'Privacy Policy',
                'Terms of Service'
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Delivery Hours */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-300">
                <Clock className="w-4 h-4" />
                <span className="font-medium text-sm">Delivery Hours</span>
              </div>
              <p className="text-blue-700 dark:text-blue-400 text-xs mt-1">
                Mon-Sun: 8:00 AM - 10:00 PM
              </p>
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
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-4 flex justify-center">
            <div className="flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
              <Shield className="w-3 h-3" />
              <span>SSL Secured • PCI Compliant • Trusted Delivery Partner</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}