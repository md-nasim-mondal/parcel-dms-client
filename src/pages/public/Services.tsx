import { Link } from "react-router";
import {
  Truck,
  Package,
  Clock,
  Shield,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Services() {
  const services = [
    {
      icon: Truck,
      title: "Express Delivery",
      description: "Same-day and next-day delivery options for urgent packages",
      features: [
        "Same-day delivery",
        "Real-time tracking",
        "Priority handling",
        "SMS notifications",
      ],
      price: "From $19.99",
      popular: true,
    },
    {
      icon: Package,
      title: "Standard Delivery",
      description: "Reliable 3-5 business days delivery for regular packages",
      features: [
        "3-5 business days",
        "Package tracking",
        "Email updates",
        "Secure handling",
      ],
      price: "From $9.99",
      popular: false,
    },
    {
      icon: Globe,
      title: "International Shipping",
      description: "Global delivery services to over 50 countries worldwide",
      features: [
        "Worldwide coverage",
        "Customs clearance",
        "Insurance included",
        "Tracking available",
      ],
      price: "From $29.99",
      popular: false,
    },
    {
      icon: Shield,
      title: "Secure Delivery",
      description:
        "Enhanced security measures for valuable and sensitive items",
      features: [
        "Signature required",
        "Insurance up to $5000",
        "Special handling",
        "24/7 monitoring",
      ],
      price: "From $24.99",
      popular: false,
    },
    {
      icon: Users,
      title: "Business Solutions",
      description: "Customized logistics solutions for businesses of all sizes",
      features: [
        "Bulk discounts",
        "Dedicated account manager",
        "API integration",
        "Monthly reports",
      ],
      price: "Custom pricing",
      popular: true,
    },
    {
      icon: MapPin,
      title: "Local Courier",
      description: "Fast and efficient local delivery within the city",
      features: [
        "2-hour delivery",
        "Local expertise",
        "Multiple stops",
        "Flexible scheduling",
      ],
      price: "From $14.99",
      popular: false,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Quickest delivery times in the industry with optimized routes",
    },
    {
      icon: Shield,
      title: "100% Secure",
      description:
        "Advanced security protocols and insurance coverage for peace of mind",
    },
    {
      icon: Clock,
      title: "24/7 Tracking",
      description: "Real-time package tracking available anytime, anywhere",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personalized customer support for all your delivery needs",
    },
  ];

  return (
    <div className='min-h-screen pt-20'>
      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900'>
        <div className='container mx-auto px-4 text-center'>
          <div className='flex justify-center mb-6'>
            <div className='w-24 h-24 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center shadow-sm'>
              <Package className='w-12 h-12 text-blue-600 dark:text-blue-400' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white'>
            Our Delivery Services
          </h1>
          <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Discover our comprehensive range of delivery solutions designed to
            meet all your shipping needs with reliability and efficiency.
          </p>
        </div>
      </section>

      {/* Features Overview */}
      <section className='py-20 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
              Why Choose Our Services?
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              We combine cutting-edge technology with exceptional service to
              deliver outstanding results every time.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='border-0 shadow-sm hover:shadow-md transition-shadow bg-transparent text-center'>
                <CardContent className='p-6'>
                  <div className='w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <feature.icon className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                  </div>
                  <h3 className='text-xl font-semibold mb-3 text-gray-900 dark:text-white'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className='py-20 bg-slate-50 dark:bg-gray-800'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
              Our Delivery Solutions
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              Choose from our wide range of services tailored to meet your
              specific needs
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {services.map((service, index) => (
              <Card
                key={index}
                className={`border-0 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  service.popular
                    ? "ring-2 ring-blue-200 dark:ring-blue-800 relative"
                    : ""
                }`}>
                {service.popular && (
                  <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                    <span className='bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium'>
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className='p-6'>
                  <div className='w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4'>
                    <service.icon className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                  </div>

                  <h3 className='text-xl font-semibold mb-3 text-gray-900 dark:text-white'>
                    {service.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300 mb-4 leading-relaxed'>
                    {service.description}
                  </p>

                  <div className='mb-6'>
                    <div className='text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
                      {service.price}
                    </div>
                    <ul className='space-y-2'>
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                          <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    asChild
                    className='w-full'
                    variant={service.popular ? "default" : "outline"}>
                    <Link
                      to='/register'
                      className={`flex items-center justify-center ${service.popular && "text-white"}`}>
                      Get Started <ArrowRight className='w-4 h-4 ml-2' />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className='py-20 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white'>
            Service Comparison
          </h2>

          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='border-b-2 border-gray-200 dark:border-gray-700'>
                  <th className='text-left p-4 font-semibold text-gray-900 dark:text-white'>
                    Features
                  </th>
                  <th className='text-center p-4 font-semibold text-gray-900 dark:text-white'>
                    Standard
                  </th>
                  <th className='text-center p-4 font-semibold text-blue-600 dark:text-blue-400'>
                    Express
                  </th>
                  <th className='text-center p-4 font-semibold text-gray-900 dark:text-white'>
                    International
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Delivery Time", "3-5 days", "Same day", "5-10 days"],
                  ["Tracking", "Basic", "Real-time", "Advanced"],
                  ["Insurance", "Up to $100", "Up to $500", "Up to $1000"],
                  ["Support", "Email", "24/7 Phone", "Dedicated"],
                  ["Signature", "Optional", "Required", "Required"],
                ].map((row, index) => (
                  <tr
                    key={index}
                    className='border-b border-gray-100 dark:border-gray-800'>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`p-4 ${
                          cellIndex === 0
                            ? "font-semibold text-gray-900 dark:text-white"
                            : "text-center text-gray-600 dark:text-gray-300"
                        }`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/30'>
        <div className='container mx-auto px-4 text-center'>
          <div className='max-w-2xl mx-auto'>
            <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
              Ready to Ship Your Package?
            </h2>
            <p className='text-lg mb-8 text-gray-600 dark:text-gray-300'>
              Join thousands of satisfied customers who trust us with their
              deliveries every day.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                asChild
                size='lg'
                className='bg-blue-600 hover:bg-blue-700 text-white'>
                <Link to='/register'>Create Account</Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20'>
                <Link to='/contact'>Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
