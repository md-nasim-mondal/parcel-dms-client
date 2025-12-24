import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, FileQuestion, MessageCircle } from "lucide-react";
import { Link } from "react-router";

export default function Support() {
  const faqs = [
    {
      question: "How do I track my parcel?",
      answer: "You can track your parcel by entering the tracking ID on our homepage or in the 'Track Parcel' page. You will see real-time updates on your package's location and status."
    },
    {
      question: "What are the prohibited items?",
      answer: "We do not transport hazardous materials, illegal substances, firearms, explosives, or perishable goods without proper packaging. Please refer to our Terms of Service for a full list."
    },
    {
       question: "How do I change my delivery address?",
       answer: "If your parcel status is 'Pending', you can update the delivery address from your dashboard. Once it is 'In Transit', please contact our support team immediately for assistance."
    },
    {
       question: "What payment methods do you accept?",
       answer: "We accept all major credit cards (Visa, MasterCard, Amex), PayPal, and mobile banking solutions like bKash and Nagad."
    },
    {
       question: "How do I become a delivery personnel?",
       answer: "You can register as a delivery personnel by selecting the 'Delivery Man' role during sign-up. You will need to submit verification documents and undergo a background check."
    }
  ];

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-gray-900'>
      {/* Hero */}
      <section className='bg-blue-600 dark:bg-blue-900 py-16 text-center text-white'>
        <div className='container mx-auto px-4'>
         <HelpCircle className="w-16 h-16 mx-auto mb-6 text-white/20" />
          <h1 className='text-4xl font-bold mb-4'>How can we help you?</h1>
          <div className='max-w-2xl mx-auto relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
            <Input 
               placeholder='Search for answers...' 
               className='pl-10 h-12 bg-white text-gray-900 border-none'
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid md:grid-cols-3 gap-8'>
           {/* Sidebar / Categories */}
           <div className="space-y-6">
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Categories</h3>
                  <ul className="space-y-2">
                     {['General', 'Shipping', 'Tracking', 'Billing', 'Account'].map((cat, i) => (
                        <li key={i}>
                           <button className="text-left w-full px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                              {cat}
                           </button>
                        </li>
                     ))}
                  </ul>
               </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30 text-center">
                  <MessageCircle className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Still need help?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Our support team is just a click away.</p>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                     <Link to="/contact">Contact Support</Link>
                  </Button>
               </div>
           </div>

           {/* Main FAQ */}
           <div className="md:col-span-2">
               <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                  <FileQuestion className="w-6 h-6 text-blue-600" /> Frequently Asked Questions
               </h2>
               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <Accordion type="single" collapsible className="w-full">
                     {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                           <AccordionTrigger className="text-left text-gray-900 dark:text-gray-100 font-medium hover:text-blue-600 dark:hover:text-blue-400">
                              {faq.question}
                           </AccordionTrigger>
                           <AccordionContent className="text-gray-600 dark:text-gray-300">
                              {faq.answer}
                           </AccordionContent>
                        </AccordionItem>
                     ))}
                  </Accordion>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
}
