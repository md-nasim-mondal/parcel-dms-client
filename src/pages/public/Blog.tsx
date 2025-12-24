import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "The Future of Last-Mile Delivery",
      excerpt: "Exploring how drones and autonomous vehicles are reshaping the logistics landscape and what it means for your deliveries.",
      author: "John Smith",
      date: "Dec 20, 2025",
      category: "Technology",
      image: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      id: 2,
      title: "Sustainable Packaging 101",
      excerpt: "A comprehensive guide to eco-friendly packaging materials that can help reduce environmental impact without compromising safety.",
      author: "Sarah Chen",
      date: "Dec 18, 2025",
      category: "Sustainability",
      image: "bg-green-100 dark:bg-green-900/30"
    },
    {
      id: 3,
      title: "Holiday Shipping Deadlines 2025",
      excerpt: "Don't miss out! Here are the crucial dates you need to know to ensure your gifts arrive in time for the holiday season.",
      author: "Admin Team",
      date: "Dec 15, 2025",
      category: "News",
      image: "bg-red-100 dark:bg-red-900/30"
    },
    {
      id: 4,
      title: "Optimizing Supply Chains",
      excerpt: "Tips and strategies for small businesses to streamline their supply chain operations and reduce shipping costs.",
      author: "Mike Johnson",
      date: "Dec 10, 2025",
      category: "Business",
      image: "bg-amber-100 dark:bg-amber-900/30"
    },
    {
       id: 5,
       title: "Understanding International Customs",
       excerpt: "Navigating the complexities of international shipping laws and custom regulations to avoid delays.",
       author: "Emily Davis",
       date: "Dec 05, 2025",
       category: "Guide",
       image: "bg-purple-100 dark:bg-purple-900/30"
    },
     {
       id: 6,
       title: "Customer Success Stories",
       excerpt: "Real-world examples of how SwiftDrop helped businesses scale their operations and improve customer satisfaction.",
       author: "John Smith",
       date: "Nov 28, 2025",
       category: "Case Study",
       image: "bg-indigo-100 dark:bg-indigo-900/30"
    }
  ];

  return (
    <div className='min-h-screen py-20 bg-slate-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <div className="text-center mb-16">
           <h1 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white'>
            Our Blog
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Latest news, insights, and guides from the world of logistics and delivery.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {posts.map((post) => (
            <Card key={post.id} className='overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 flex flex-col h-full'>
               {/* Placeholder for Image */}
              <div className={`h-48 ${post.image} w-full flex items-center justify-center`}>
                  <span className="text-gray-400 font-semibold opacity-50">Image: {post.category}</span>
              </div>
              
              <CardContent className='p-6 flex flex-col flex-grow'>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.date}
                  </span>
                   <span className="flex items-center text-blue-600 dark:text-blue-400">
                    <Tag className="w-3 h-3 mr-1" />
                    {post.category}
                  </span>
                </div>

                <h2 className='text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                
                <p className='text-gray-600 dark:text-gray-300 mb-6 text-sm line-clamp-3'>
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                   <div className="flex items-center text-xs font-medium text-gray-900 dark:text-white">
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-2">
                         <User className="w-3 h-3" />
                      </div>
                      {post.author}
                   </div>
                   <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700 hover:bg-transparent">
                      Read More <ArrowRight className="ml-1 w-3 h-3" />
                   </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
