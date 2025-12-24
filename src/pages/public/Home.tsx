import { useState } from "react";
import { Link } from "react-router";
import {
    Truck,
    Package,
    ArrowRight,
    Clock,
    Shield,
    MapPin,
    Users,
    Star,
    CheckCircle,
    Heart,
    Zap,
    Plus,
    Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqData = [
    {
      q: "How do I track my package?",
      a: "Simply visit our tracking page and enter your tracking ID for real-time updates on your package location and estimated delivery time. You'll receive detailed information about your package's journey from pickup to delivery.",
    },
    {
      q: "What are your delivery hours?",
      a: "We deliver Monday through Saturday from 8:00 AM to 8:00 PM. Sunday deliveries are available for premium services. Emergency deliveries can be arranged with prior notice for an additional fee.",
    },
    {
      q: "Do you offer package insurance?",
      a: "Yes, all our premium plans include insurance coverage up to $5000. Standard and express plans offer optional insurance add-ons starting at $2.99 for basic coverage.",
    },
    {
      q: "How long does international shipping take?",
      a: "International delivery times vary by destination. Typically, it takes 5-10 business days for most countries. Express international options are available for faster delivery in 3-5 business days.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and for business accounts, we offer net-30 payment terms upon credit approval.",
    },
    {
      q: "Can I change the delivery address after shipping?",
      a: "Yes, address changes are possible before the package is out for delivery. There's a $5 address change fee. Contact our support team as soon as possible to request this service.",
    },
  ];

  return (
    <div className='min-h-screen'>
      {/* Hero Section - Interactive & Functional */}
      <section className='relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900 overflow-hidden'>
         {/* Background Decoration */}
        <div className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className='container mx-auto px-4 text-center z-10 pt-20 pb-32'>
          <div className='flex justify-center mb-8 animate-fade-in-up'>
            <div className='relative'>
              <div className='w-24 h-24 bg-white/50 dark:bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform'>
                <Package className='w-12 h-12 text-blue-600 dark:text-blue-400' />
              </div>
              <div className='absolute -bottom-4 -right-4 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center shadow-md animate-bounce'>
                <Truck className='w-6 h-6 text-green-600 dark:text-green-400' />
              </div>
            </div>
          </div>

          <h1 className='text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight animate-fade-in-up animation-delay-100'>
            Delivery Made <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600'>Simple</span>
          </h1>
          <p className='text-lg md:text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200'>
            Connect with the fastest logistics network. Whether it's local or international, 
            we ensure your parcel arrives safely and on time.
          </p>
          
          {/* Tracking Input - Functional Highlight */}
          <div className="max-w-xl mx-auto mb-10 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-2 animate-fade-in-up animation-delay-300">
             <input 
                type="text" 
                placeholder="Enter Tracking ID (e.g. TRK-12345678)" 
                className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-400 w-full"
             />
             <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 w-full sm:w-auto">
                Track
             </Button>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400'>
             <Button
              asChild
              variant='outline'
              size='lg'
              className='border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20'>
              <Link to='/register'>Get Started</Link>
            </Button>
            <Button
              asChild
              variant='ghost'
              size='lg'
              className='text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'>
              <Link to='/contact'>Contact Sales</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
            <div className="w-8 h-12 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center pt-2 opacity-60">
                <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-scroll"></div>
            </div>
        </div>
      </section>

      {/* Trusted Partners Section - New Section */}
      <section className="py-12 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">Trusted by 500+ Businesses</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Fallback to text if icons missing, using simple placeholders for 'Logos' */}
                {['Amazon', 'eBay', 'Shopify', 'Walmart', 'AliExpress'].map(brand => (
                    <span key={brand} className="text-xl font-bold text-gray-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 cursor-default">{brand}</span>
                ))}
            </div>
        </div>
      </section>

      {/* Features Section - Light Background */}
      <section className='py-20 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
              Why Choose SwiftDrop?
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              We combine cutting-edge technology with personalized service to
              deliver exceptional experiences every time.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                icon: Clock,
                title: "Lightning Fast",
                desc: "Express delivery options with real-time tracking",
              },
              {
                icon: Shield,
                title: "Secure & Safe",
                desc: "Advanced security measures for your packages",
              },
              {
                icon: MapPin,
                title: "Wide Coverage",
                desc: "Nationwide delivery network",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className='border-0 shadow-sm hover:shadow-md transition-shadow bg-transparent'>
                <CardContent className='p-6 text-center'>
                  <div className='w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <feature.icon className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                  </div>
                  <h3 className='text-xl font-semibold mb-3 text-gray-900 dark:text-white'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Soft Background */}
      <section className='py-20 bg-slate-50 dark:bg-gray-800'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white'>
            How It Works
          </h2>
          <div className='grid md:grid-cols-4 gap-8'>
            {[
              {
                step: "01",
                title: "Create Shipment",
                desc: "Easy online booking process",
                icon: Package,
              },
              {
                step: "02",
                title: "We Pick Up",
                desc: "Schedule pickup at your convenience",
                icon: Truck,
              },
              {
                step: "03",
                title: "Track Live",
                desc: "Real-time package tracking",
                icon: MapPin,
              },
              {
                step: "04",
                title: "Safe Delivery",
                desc: "Secure handover to recipient",
                icon: CheckCircle,
              },
            ].map((step, index) => (
              <div key={index} className='text-center group'>
                <div className='w-20 h-20 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-shadow'>
                  <step.icon className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                </div>
                <div className='text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2'>
                  STEP {step.step}
                </div>
                <h3 className='text-lg font-semibold mb-2 text-gray-900 dark:text-white'>
                  {step.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-300 text-sm'>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics - Subtle Background */}
      <section className='py-20 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/30'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-4 gap-8 text-center'>
            {[
              { number: "50K+", label: "Happy Customers", icon: Heart },
              { number: "98%", label: "Success Rate", icon: CheckCircle },
              { number: "500+", label: "Cities Served", icon: MapPin },
              { number: "24/7", label: "Support", icon: Users },
            ].map((stat, index) => (
              <div key={index} className='group'>
                <div className='w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm'>
                  <stat.icon className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                </div>
                <div className='text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white'>
                  {stat.number}
                </div>
                <div className='text-gray-600 dark:text-gray-300 font-medium'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Light Background */}
      <section className='py-20 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white'>
            What Our Customers Say
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {[1, 2, 3].map((_, index) => (
              <Card
                key={index}
                className='border-0 shadow-sm hover:shadow-md transition-shadow bg-transparent'>
                <CardContent className='p-6'>
                  <div className='flex items-center mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-5 h-5 text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                  <p className='text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
                    "SwiftDrop has transformed how we handle logistics. Their
                    service is reliable, and the tracking system gives us
                    complete peace of mind."
                  </p>
                  <div className='flex items-center'>
                    <div className='w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center mr-4'>
                      <Users className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                    </div>
                    <div>
                      <div className='font-semibold text-gray-900 dark:text-white'>
                        Sarah Johnson
                      </div>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Business Owner
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans - Soft Background */}
      <section className='py-20 bg-slate-50 dark:bg-gray-800'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white'>
            Delivery Plans
          </h2>
          <div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
            {[
              {
                name: "Standard",
                price: "৳150",
                icon: Package,
                features: [
                  "3-5 Business Days",
                  "Basic Tracking",
                  "Email Updates",
                  "Safe Handling",
                ],
              },
              {
                name: "Express",
                price: "৳200",
                icon: Truck,
                features: [
                  "Next Day Delivery",
                  "Priority Handling",
                  "SMS Alerts",
                  "Signature Required",
                  "Live Tracking",
                ],
              },
              {
                name: "Premium",
                price: "৳250",
                icon: Zap,
                features: [
                  "Same Day Delivery",
                  "Dedicated Support",
                  "Insurance Included",
                  "24/7 Tracking",
                  "White Glove Service",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`p-8 text-center border-0 shadow-sm hover:shadow-md transition-all duration-300 ${
                  index === 1
                    ? "ring-2 ring-blue-200 dark:ring-blue-800 bg-blue-50 dark:bg-blue-900/20"
                    : "bg-white dark:bg-gray-700"
                }`}>
                <CardContent className='p-0'>
                  <div className='w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <plan.icon className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                  </div>
                  <h3 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
                    {plan.name}
                  </h3>
                  <div className='text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6'>
                    {plan.price}
                  </div>
                  <ul className='space-y-3 mb-8'>
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${index === 1 && "text-white"}`}
                    variant={index === 1 ? "default" : "outline"}>
                    <Link to='/register'>Choose Plan</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Subtle Gradient */}
      <section className='py-20 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/30'>
        <div className='container mx-auto px-4 text-center'>
          <div className='max-w-2xl mx-auto'>
            <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
              Ready to Get Started?
            </h2>
            <p className='text-lg mb-8 text-gray-600 dark:text-gray-300'>
              Join thousands of satisfied customers who trust us with their
              important deliveries.
            </p>
            <Button
              asChild
              size='lg'
              className='bg-blue-600 hover:bg-blue-700 text-white'>
              <Link to='/register' className='flex items-center'>
                Create Your Account <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section - Interactive */}
      <section className='py-20 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4 max-w-4xl'>
          <h2 className='text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white'>
            Frequently Asked Questions
          </h2>
          <div className='space-y-4 dark:bg-slate-800/40 p-3 md:p-6 lg:p-8 rounded-2xl'>
            {faqData.map((faq, index) => (
              <Card
                key={index}
                className='border-0 dark:bg-slate-800/40 shadow-sm hover:shadow-md transition-all duration-200 p-0'>
                <CardContent className='p-0'>
                  <button
                    onClick={() => toggleFaq(index)}
                    className='w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg'>
                    <h3 className='font-semibold text-lg text-gray-900 dark:text-white pr-4'>
                      {faq.q}
                    </h3>
                    <div className='flex-shrink-0 w-6 h-6 flex items-center justify-center'>
                      {openFaqIndex === index ? (
                        <Minus className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                      ) : (
                        <Plus className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                      )}
                    </div>
                  </button>

                  <div
                    className={`px-6 pb-5 transition-all duration-300 ease-in-out ${
                      openFaqIndex === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden hidden"
                    }`}>
                    <div className='pt-2 border-t border-gray-100 dark:border-gray-700'>
                      <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Help CTA */}
          <div className='text-center mt-12'>
            <p className='text-gray-600 dark:text-gray-300 mb-4'>
              Still have questions? We're here to help!
            </p>
            <Button
              asChild
              variant='outline'
              className='border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20'>
              <Link to='/contact' className='flex items-center'>
                Contact Support <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Blog/News Section - New Section */}
      <section className='py-20 bg-slate-50 dark:bg-gray-800/50'>
         <div className='container mx-auto px-4'>
            <div className="flex justify-between items-end mb-12">
               <div>
                  <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
                     Latest Updates
                  </h2>
                  <p className='text-gray-600 dark:text-gray-300 max-w-2xl'>
                     Insights, industry news, and guides for efficient shipping.
                  </p>
               </div>
               <Button variant="link" className="text-blue-600 dark:text-blue-400 hidden sm:flex">
                  View All Posts <ArrowRight className="ml-2 w-4 h-4" />
               </Button>
            </div>
           
            <div className='grid md:grid-cols-3 gap-8'>
               {[
                  {
                     title: "Holiday Shipping Deadlines 2025",
                     category: "News",
                     date: "Dec 15, 2025",
                     image: "bg-red-100 dark:bg-red-900/20"
                  },
                   {
                     title: "New International Routes Added",
                     category: "Expansion",
                     date: "Dec 10, 2025",
                     image: "bg-blue-100 dark:bg-blue-900/20"
                  },
                   {
                     title: "Sustainable Packaging Guide",
                     category: "Tips",
                     date: "Nov 28, 2025",
                     image: "bg-green-100 dark:bg-green-900/20"
                  }
               ].map((post, index) => (
                  <Card key={index} className='overflow-hidden hover:shadow-lg transition-shadow border-none'>
                     <div className={`h-48 ${post.image} w-full`}></div>
                     <CardContent className='p-6'>
                        <div className="flex gap-2 mb-3">
                           <span className="text-xs font-semibold px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                              {post.category}
                           </span>
                           <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" /> {post.date}
                           </span>
                        </div>
                        <h3 className='text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 transition-colors cursor-pointer'>
                           {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                           Stay updated with the latest shipping trends and important announcements to ensure your deliveries are always on time.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400">
                           Read More
                        </Button>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}
