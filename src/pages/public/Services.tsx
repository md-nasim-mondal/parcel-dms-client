import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
    Truck,
    Package,
    Clock,
    Shield,
    Globe,
    Zap, MapPin,
    Users,
    Search,
    Filter,
    ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const services = [
    {
      id: "express-delivery",
      icon: Truck,
      title: "Express Delivery",
      description: "Same-day and next-day delivery options for urgent packages",
      features: [
        "Same-day delivery",
        "Real-time tracking",
        "Priority handling",
        "SMS notifications",
      ],
      price: 19.99,
      displayPrice: "From $19.99",
      popular: true,
      category: "express",
    },
    {
      id: "standard-delivery",
      icon: Package,
      title: "Standard Delivery",
      description: "Reliable 3-5 business days delivery for regular packages",
      features: [
        "3-5 business days",
        "Package tracking",
        "Email updates",
        "Secure handling",
      ],
      price: 9.99,
      displayPrice: "From $9.99",
      popular: false,
      category: "standard",
    },
    {
      id: "international-shipping",
      icon: Globe,
      title: "International Shipping",
      description: "Global delivery services to over 50 countries worldwide",
      features: [
        "Worldwide coverage",
        "Customs clearance",
        "Insurance included",
        "Tracking available",
      ],
      price: 29.99,
      displayPrice: "From $29.99",
      popular: false,
      category: "international",
    },
    {
      id: "secure-delivery",
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
      price: 24.99,
      displayPrice: "From $24.99",
      popular: false,
      category: "specialized",
    },
    {
      id: "business-solutions",
      icon: Users,
      title: "Business Solutions",
      description: "Customized logistics solutions for businesses of all sizes",
      features: [
        "Bulk discounts",
        "Dedicated account manager",
        "API integration",
        "Monthly reports",
      ],
      price: 99.99, // illustrative
      displayPrice: "Custom pricing",
      popular: true,
      category: "business",
    },
    {
      id: "local-courier",
      icon: MapPin,
      title: "Local Courier",
      description: "Fast and efficient local delivery within the city",
      features: [
        "2-hour delivery",
        "Local expertise",
        "Multiple stops",
        "Flexible scheduling",
      ],
      price: 14.99,
      displayPrice: "From $14.99",
      popular: false,
      category: "express",
    },
    // Adding more implementation demo items for pagination
    {
      id: "freight-shipping",
      icon: Truck,
      title: "Freight Shipping",
      description: "Heavy cargo transport for large scale logistics",
      features: ["Pallet shipping", "LTL & FTL", "Cargo tracking"],
      price: 150.00,
      displayPrice: "From $150.00",
      popular: false,
      category: "business",
    },
    {
      id: "eco-delivery",
      icon: Zap,
      title: "Eco-Friendly Delivery",
      description: "Carbon neutral delivery options using electric vehicles",
      features: ["Zero emission", "Green packaging", "Certified"],
      price: 12.99,
      displayPrice: "From $12.99",
      popular: false,
      category: "standard",
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

  // Filtering and Sorting Logic
  const filteredServices = useMemo(() => {
    let result = [...services];

    // Search
    if (searchQuery) {
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category Filter
    if (categoryFilter !== "all") {
      result = result.filter((s) => s.category === categoryFilter);
    }

    // Sort
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [services, searchQuery, categoryFilter, sortOption]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const currentServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900'>
        <div className='container mx-auto px-4 text-center'>
          <div className='flex justify-center mb-6'>
             <div className='w-24 h-24 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center shadow-sm'>
                <Package className='w-12 h-12 text-blue-600 dark:text-blue-400' />
             </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white'>
            Explore Our Services
          </h1>
          <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
             Browse through our comprehensive list of delivery solutions. Find the perfect plan that suits your timeline and budget.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className='sticky top-16 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 py-4 shadow-sm'>
        <div className='container mx-auto px-4'>
           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                 <Input 
                    placeholder="Search services..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[140px]">
                      <div className="flex items-center gap-2">
                         <Filter className="w-4 h-4" />
                         <SelectValue placeholder="Category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="express">Express</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="specialized">Specialized</SelectItem>
                    </SelectContent>
                  </Select>

                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <ArrowUpDown className="w-4 h-4" />
                        Sort by
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSortOption("default")}>
                        Recommended
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption("price-asc")}>
                        Price: Low to High
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption("price-desc")}>
                        Price: High to Low
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption("name-asc")}>
                        Name: A to Z
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </div>
           </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className='py-12 bg-slate-50 dark:bg-gray-800 min-h-[500px]'>
        <div className='container mx-auto px-4'>
          {currentServices.length > 0 ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {currentServices.map((service) => (
                <Card
                  key={service.id}
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
                  <CardContent className='p-6 h-full flex flex-col'>
                    <div className='w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4'>
                      <service.icon className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                    </div>

                    <h3 className='text-xl font-semibold mb-3 text-gray-900 dark:text-white'>
                      {service.title}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow'>
                      {service.description}
                    </p>

                    <div className='mt-auto pt-6 border-t border-gray-100 dark:border-gray-700'>
                      <div className='text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
                        {service.displayPrice}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                          <Button asChild variant="outline" className="w-full">
                            <Link to={`/services/${service.id}`}>Details</Link>
                          </Button>
                          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            <Link to="/register">Book Now</Link>
                          </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
             <div className="text-center py-20">
                <p className="text-xl text-gray-500">No services found matching your criteria.</p>
                <Button variant="link" onClick={() => { setSearchQuery(""); setCategoryFilter("all"); }}>
                   Clear Filters
                </Button>
             </div>
          )}

           {/* Pagination */}
           {totalPages > 1 && (
             <div className="flex justify-center mt-12 gap-2">
                <Button 
                   variant="outline" 
                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                   disabled={currentPage === 1}
                >
                   Previous
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                   <Button 
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                      className={currentPage === i + 1 ? "bg-blue-600 hover:bg-blue-700" : ""}
                   >
                      {i + 1}
                   </Button>
                ))}
                 <Button 
                   variant="outline" 
                   onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                   disabled={currentPage === totalPages}
                >
                   Next
                </Button>
             </div>
           )}
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
    </div>
  );
}
