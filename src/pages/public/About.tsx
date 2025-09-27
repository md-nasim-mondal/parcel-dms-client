import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Clock,
  MapPin,
  Rocket,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      bio: "15+ years in logistics",
      specialty: "Business Strategy",
    },
    {
      name: "Sarah Chen",
      role: "Operations Director",
      bio: "Supply chain expert",
      specialty: "Operations",
    },
    {
      name: "Mike Johnson",
      role: "Technology Lead",
      bio: "Software architect",
      specialty: "Innovation",
    },
    {
      name: "Emily Davis",
      role: "Customer Success",
      bio: "Client relations specialist",
      specialty: "Support",
    },
  ];

  return (
    <div className='min-h-screen pt-20'>
      {/* Hero Section - Soft Gradient */}
      <section className='py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900'>
        <div className='container mx-auto px-4 text-center'>
          <div className='flex justify-center mb-6'>
            <div className='w-24 h-24 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center shadow-sm'>
              <Rocket className='w-12 h-12 text-blue-600 dark:text-blue-400' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white'>
            About SwiftDrop
          </h1>
          <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            We're revolutionizing parcel delivery with technology-driven
            solutions and unwavering commitment to customer satisfaction.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className='py-20 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
                Our Mission
              </h2>
              <p className='text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
                To provide fast, reliable, and affordable parcel delivery
                services that connect people and businesses across the nation
                with care and precision.
              </p>
              <div className='space-y-4'>
                <div className='flex items-center text-gray-700 dark:text-gray-300'>
                  <Target className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-3' />
                  <span>Deliver excellence in every package</span>
                </div>
                <div className='flex items-center text-gray-700 dark:text-gray-300'>
                  <Heart className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-3' />
                  <span>Customer-centric approach</span>
                </div>
                <div className='flex items-center text-gray-700 dark:text-gray-300'>
                  <Eye className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-3' />
                  <span>Transparent operations</span>
                </div>
              </div>
            </div>
            <div className='bg-slate-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700'>
              <div className='w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6'>
                <Eye className='w-8 h-8 text-blue-600 dark:text-blue-400' />
              </div>
              <h3 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
                Our Vision
              </h3>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                To become the leading parcel delivery service provider by
                leveraging cutting-edge technology and sustainable practices,
                making shipping seamless for everyone while maintaining our
                commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className='py-20 bg-slate-50 dark:bg-gray-800'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white'>
            Our Story
          </h2>
          <div className='max-w-4xl mx-auto'>
            <div className='grid md:grid-cols-2 gap-8 items-center'>
              <div>
                <p className='text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
                  Founded in 2020, SwiftDrop started as a small local delivery
                  service with a simple goal: to make parcel delivery faster and
                  more reliable for small businesses in our community.
                </p>
                <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
                  What began as a single van operation has grown into a
                  nationwide service provider, delivering millions of packages
                  annually while maintaining our core values of trust,
                  reliability, and exceptional customer service.
                </p>
              </div>
              <div className='bg-white dark:bg-gray-700 rounded-2xl p-8 border border-gray-100 dark:border-gray-600'>
                <div className='text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4'>
                  2020
                </div>
                <p className='text-gray-600 dark:text-gray-300'>
                  The year we started our journey with a single van and big
                  dreams
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className='py-20 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white'>
            Our Values
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                icon: Clock,
                title: "Reliability",
                desc: "Consistent on-time delivery you can count on every time",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "Highest standards in package handling and customer care",
              },
              {
                icon: Users,
                title: "Teamwork",
                desc: "Collaborative approach to solve challenges together",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className='border-0 shadow-sm hover:shadow-md transition-shadow bg-transparent'>
                <CardContent className='p-6 text-center'>
                  <div className='w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <value.icon className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                  </div>
                  <h3 className='text-xl font-semibold mb-3 text-gray-900 dark:text-white'>
                    {value.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                    {value.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-20 bg-slate-50 dark:bg-gray-800'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white'>
            Meet Our Team
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className='border-0 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-700'>
                <CardContent className='p-6 text-center'>
                  <div className='w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <Users className='w-10 h-10 text-blue-600 dark:text-blue-400' />
                  </div>
                  <h3 className='text-lg font-semibold mb-1 text-gray-900 dark:text-white'>
                    {member.name}
                  </h3>
                  <p className='text-blue-600 dark:text-blue-400 mb-2 font-medium'>
                    {member.role}
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
                    {member.bio}
                  </p>
                  <div className='text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-600 rounded-full px-3 py-1 inline-block'>
                    {member.specialty}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className='py-20 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white'>
            Our Achievements
          </h2>
          <div className='grid md:grid-cols-4 gap-8 text-center'>
            {[
              {
                icon: Award,
                number: "2023",
                label: "Best Delivery Service Award",
                desc: "Industry recognition",
              },
              {
                icon: MapPin,
                number: "500+",
                label: "Cities Served",
                desc: "Nationwide coverage",
              },
              {
                icon: Users,
                number: "50K+",
                label: "Happy Customers",
                desc: "Trusted by many",
              },
              {
                icon: Shield,
                number: "99.2%",
                label: "Success Rate",
                desc: "Proven reliability",
              },
            ].map((achievement, index) => (
              <div key={index} className='group'>
                <div className='w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm'>
                  <achievement.icon className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                </div>
                <div className='text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white'>
                  {achievement.number}
                </div>
                <div className='text-gray-900 dark:text-white font-semibold mb-1'>
                  {achievement.label}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-300'>
                  {achievement.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
