import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Shield, Truck, Star } from "lucide-react"; // Import Star and User
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ServiceDetails() {
  const { id } = useParams();

  // Mock Data (matches Services.tsx)
  const service = {
      id: id,
      title: "Express Delivery", // Dynamic based on ID in real app
      description: "Fastest delivery option for urgent parcels. Guaranteed same-day or next-day delivery depending on location.",
      price: "$19.99",
      features: [
          "Same-day delivery in metro areas",
          "Real-time GPS tracking",
          "Priority handling and support",
          "SMS and Email notifications",
          "Money-back guarantee for delays",
          "Insurance included up to $500"
      ],
      specs: [
          { label: "Max Weight", value: "20kg" },
          { label: "Dimensions", value: "Up to 100cm" },
          { label: "Coverage", value: "Nationwide" },
          { label: "Cut-off Time", value: "2:00 PM" }
      ],
      reviews: [
          { id: 1, user: "Alice Johnson", rating: 5, comment: "Amazing speed! Delivered within 4 hours.", date: "2 days ago" },
          { id: 2, user: "Mark Smith", rating: 4, comment: "Great service, but a bit pricey.", date: "1 week ago" },
          { id: 3, user: "Sarah Williams", rating: 5, comment: "Life saver! Needed documents sent urgently.", date: "2 weeks ago" }
      ],
      relatedServices: [
           { id: "standard-delivery", title: "Standard Delivery", price: "From $9.99" },
           { id: "international-shipping", title: "International Shipping", price: "From $29.99" }
      ]
  };

  return (
    <div className='min-h-screen py-20 bg-slate-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent hover:text-blue-600">
           <Link to="/services"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
                        <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        {service.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {service.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {service.features.map((feature, i) => (
                            <div key={i} className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">How it works</h2>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 text-blue-600 font-bold flex-shrink-0">1</div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Book your delivery</h3>
                                <p className="text-gray-600 dark:text-gray-400">Select Express Delivery at checkout or booking form.</p>
                            </div>
                        </div>
                         <div className="flex items-start">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 text-blue-600 font-bold flex-shrink-0">2</div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">We pick it up</h3>
                                <p className="text-gray-600 dark:text-gray-400">Our courier arrives at your location within the scheduled window.</p>
                            </div>
                        </div>
                         <div className="flex items-start">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 text-blue-600 font-bold flex-shrink-0">3</div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Fast Delivery</h3>
                                <p className="text-gray-600 dark:text-gray-400">Package is delivered to the recipient with priority handling.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                 <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Customer Reviews</h2>
                    <div className="space-y-6">
                        {service.reviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback>{review.user[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{review.user}</p>
                                            <p className="text-xs text-gray-500">{review.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300 dark:text-gray-600"}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                        <div className="mb-6">
                            <span className="text-sm text-gray-500 block mb-1">Starting from</span>
                            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{service.price}</span>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4" size="lg">
                            Book Now
                        </Button>
                        <p className="text-xs text-center text-gray-500">
                             No hidden fees. Cancel anytime.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
                     <CardContent className="p-6">
                        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Service Specifications</h3>
                        <div className="space-y-3">
                            {service.specs.map((spec, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className="text-gray-500">{spec.label}</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                     </CardContent>
                </Card>

                 <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                    <CardContent className="p-6 flex items-start gap-4">
                         <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                         <div>
                             <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Secure & Insured</h4>
                             <p className="text-sm text-blue-700 dark:text-blue-300">
                                 Every package is insured up to $500 against loss or damage.
                             </p>
                         </div>
                    </CardContent>
                </Card>

                {/* Related Services */}
                <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                         <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Related Services</h3>
                         <div className="space-y-4">
                             {service.relatedServices.map((related) => (
                                 <Link key={related.id} to={`/services/${related.id}`} className="block group">
                                     <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                         <div>
                                             <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{related.title}</p>
                                             <p className="text-xs text-gray-500">{related.price}</p>
                                         </div>
                                         <Truck className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                     </div>
                                 </Link>
                             ))}
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
