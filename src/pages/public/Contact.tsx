import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  HeadphonesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", data);
    reset();
  };

  return (
    <div className='min-h-screen'>
      {/* Hero Section - Soft Gradient */}
      <section className='py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900'>
        <div className='container mx-auto px-4 text-center'>
          <div className='flex justify-center mb-6'>
            <div className='w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm'>
              <MessageCircle className='w-10 h-10 text-blue-600 dark:text-blue-400' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white'>
            Contact Us
          </h1>
          <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Have questions? We're here to help. Get in touch with our team for
            any inquiries about our delivery services.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className='py-20 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-3 gap-8 mb-16'>
            {[
              {
                icon: Phone,
                title: "Phone Support",
                info: "+1 (555) 123-4567",
                desc: "Mon-Sun, 8AM-10PM",
                bg: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
              },
              {
                icon: Mail,
                title: "Email Support",
                info: "support@swiftdrop.com",
                desc: "We reply within 2 hours",
                bg: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
              },
              {
                icon: MapPin,
                title: "Visit Office",
                info: "123 Delivery St, City",
                desc: "Visit our headquarters",
                bg: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
              },
            ].map((contact, index) => (
              <Card
                key={index}
                className='border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br'>
                <CardContent className='p-8 text-center'>
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br ${contact.bg}`}>
                    <contact.icon className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                  </div>
                  <h3 className='text-xl font-semibold mb-3 text-gray-900 dark:text-white'>
                    {contact.title}
                  </h3>
                  <p className='text-lg font-medium mb-2 text-gray-900 dark:text-white'>
                    {contact.info}
                  </p>
                  <p className='text-gray-600 dark:text-gray-300'>
                    {contact.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className='grid lg:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <div>
              <h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
                Send us a Message
              </h2>

              {isSubmitSuccessful ? (
                <Card className='p-8 text-center border-green-200 bg-green-50 dark:bg-green-900/20 border-0 shadow-sm'>
                  <CardContent className='p-0'>
                    <CheckCircle className='w-16 h-16 text-green-600 mx-auto mb-4' />
                    <h3 className='text-2xl font-semibold mb-2 text-gray-900 dark:text-white'>
                      Message Sent!
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
                      Thank you for contacting us. We'll get back to you within
                      24 hours.
                    </p>
                    <Button
                      onClick={() => reset()}
                      variant='outline'
                      className='border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20'>
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <Label
                        htmlFor='name'
                        className='block text-sm font-medium mb-2 text-gray-900 dark:text-white'>
                        Full Name *
                      </Label>
                      <Input
                        id='name'
                        {...register("name")}
                        placeholder='Your full name'
                        className={
                          errors.name
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }
                      />
                      {errors.name && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor='email'
                        className='block text-sm font-medium mb-2 text-gray-900 dark:text-white'>
                        Email Address *
                      </Label>
                      <Input
                        id='email'
                        type='email'
                        {...register("email")}
                        placeholder='your@email.com'
                        className={
                          errors.email
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }
                      />
                      {errors.email && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <Label
                        htmlFor='phone'
                        className='block text-sm font-medium mb-2 text-gray-900 dark:text-white'>
                        Phone Number *
                      </Label>
                      <Input
                        id='phone'
                        {...register("phone")}
                        placeholder='+1 (555) 123-4567'
                        className={
                          errors.phone
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }
                      />
                      {errors.phone && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor='subject'
                        className='block text-sm font-medium mb-2 text-gray-900 dark:text-white'>
                        Subject *
                      </Label>
                      <Input
                        id='subject'
                        {...register("subject")}
                        placeholder='How can we help?'
                        className={
                          errors.subject
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }
                      />
                      {errors.subject && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor='message'
                      className='block text-sm font-medium mb-2 text-gray-900 dark:text-white'>
                      Message *
                    </Label>
                    <Textarea
                      id='message'
                      rows={6}
                      {...register("message")}
                      placeholder='Tell us about your inquiry...'
                      className={
                        errors.message
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }
                    />
                    {errors.message && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className='w-4 h-4 mr-2' />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Office Info */}
            <div>
              <h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
                Visit Our Office
              </h2>
              <Card className='p-6 mb-8 border-0 shadow-sm bg-slate-50 dark:bg-gray-800'>
                <CardContent className='p-0'>
                  <div className='flex items-start mb-6'>
                    <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mr-4'>
                      <MapPin className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                        Headquarters
                      </h3>
                      <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                        123 Delivery Street
                        <br />
                        Suite 100
                        <br />
                        City, State 12345
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start mb-6'>
                    <div className='w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mr-4'>
                      <Clock className='w-6 h-6 text-green-600 dark:text-green-400' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                        Business Hours
                      </h3>
                      <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                        Monday - Friday: 8:00 AM - 8:00 PM
                        <br />
                        Saturday: 9:00 AM - 6:00 PM
                        <br />
                        Sunday: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mr-4'>
                      <HeadphonesIcon className='w-6 h-6 text-purple-600 dark:text-purple-400' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                        Emergency Support
                      </h3>
                      <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                        24/7 Customer Support Hotline
                        <br />
                        +1 (555) 911-HELP
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Quick Links */}
              <Card className='p-6 border-0 shadow-sm bg-white dark:bg-gray-700'>
                <CardContent className='p-0'>
                  <h3 className='font-semibold mb-4 text-gray-900 dark:text-white'>
                    Quick Help
                  </h3>
                  <div className='space-y-3'>
                    {[
                      "How to track my package?",
                      "Delivery time estimates",
                      "Package insurance information",
                      "International shipping rates",
                      "Payment methods accepted",
                    ].map((question, index) => (
                      <a
                        key={index}
                        href='#'
                        className='block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm'>
                        {question}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Subtle Gradient */}
      <section className='py-20 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/30'>
        <div className='container mx-auto px-4 text-center'>
          <div className='max-w-2xl mx-auto'>
            <div className='w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm'>
              <HeadphonesIcon className='w-8 h-8 text-blue-600 dark:text-blue-400' />
            </div>
            <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
              Need Immediate Assistance?
            </h2>
            <p className='text-lg mb-8 text-gray-600 dark:text-gray-300'>
              Call our 24/7 support line for urgent delivery inquiries and
              emergency situations.
            </p>
            <div className='flex items-center justify-center space-x-4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm max-w-md mx-auto'>
              <Phone className='w-6 h-6 text-blue-600 dark:text-blue-400' />
              <span className='text-2xl font-bold text-gray-900 dark:text-white'>
                +1 (555) 123-HELP
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
