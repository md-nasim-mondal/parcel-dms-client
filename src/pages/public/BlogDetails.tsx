import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Calendar, Tag } from "lucide-react";

export default function BlogDetails() {
  const { id } = useParams();

  // Mock data - in real app would fetch by ID
  const post = {
      title: "The Future of Last-Mile Delivery",
      content: `
        <p class="mb-4">The logistics industry is undergoing a massive transformation, driven by rapid advancements in technology. Last-mile delivery—the final leg of the supply chain—is particularly ripe for innovation.</p>
        <p class="mb-4">Autonomous vehicles and drones are no longer just science fiction; they are actively being tested and deployed in various markets. These technologies promise to reduce delivery times and costs significantly.</p>
        <h3 class="text-xl font-bold mb-2 mt-6">The Role of AI</h3>
        <p class="mb-4">Artificial Intelligence plays a crucial role in route optimization, demand forecasting, and inventory management. By analyzing vast amounts of data, AI can predict delivery windows with unprecedented accuracy.</p>
        <h3 class="text-xl font-bold mb-2 mt-6">Sustainability</h3>
        <p class="mb-4">As e-commerce continues to grow, so does the environmental impact of delivery fleets. Electric vehicles and sustainable packaging solutions are becoming standard practices for forward-thinking logistics companies.</p>
      `,
      author: "John Smith",
      date: "Dec 20, 2025",
      category: "Technology",
      image: "bg-blue-100 dark:bg-blue-900/30"
  };

  return (
    <div className='min-h-screen py-20 bg-slate-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4 max-w-4xl'>
        <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent hover:text-blue-600">
           <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog</Link>
        </Button>

        <article className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
           <div className={`w-full h-64 ${post.image} rounded-xl mb-8 flex items-center justify-center`}>
               <span className="text-gray-400 font-semibold opacity-50">Feature Image</span>
           </div>

           <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
               <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {post.date}</span>
               <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {post.author}</span>
               <span className="flex items-center text-blue-600 dark:text-blue-400"><Tag className="w-4 h-4 mr-1" /> {post.category}</span>
           </div>

           <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
               {post.title} {id && <span className="text-gray-400 text-lg ml-2">#{id}</span>}
           </h1>

           <div 
               className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
               dangerouslySetInnerHTML={{ __html: post.content }}
           />
        </article>
      </div>
    </div>
  );
}
