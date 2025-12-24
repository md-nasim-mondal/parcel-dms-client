import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className='min-h-screen py-20 bg-slate-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
         <div className="flex flex-col items-center mb-10">
            <div className='w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4'>
               <Shield className='w-8 h-8 text-blue-600 dark:text-blue-400' />
            </div>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center'>
               Privacy Policy
            </h1>
            <p className="text-gray-500 mt-2">Last updated: December 24, 2025</p>
         </div>
        
        <div className='max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm space-y-8'>
          <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>1. Information We Collect</h2>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed mb-4'>
              We collect information you provide directly to us when you create an account, request a delivery, or contact us for support. This may include your name, email address, phone number, and delivery addresses.
            </p>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
               We also automatically collect certain information when you access our services, such as your IP address, browser type, and device information.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>2. How We Use Your Information</h2>
            <ul className='list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4'>
               <li>To provide, maintain, and improve our services.</li>
               <li>To process transactions and send you related information.</li>
               <li>To send you technical notices, updates, security alerts, and support messages.</li>
               <li>To monitor and analyze trends, usage, and activities in connection with our services.</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>3. Information Sharing</h2>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
              We do not share your personal information with third parties except as described in this policy. We may share your information with third-party service providers who perform services on our behalf, such as payment processing and data analysis.
            </p>
          </section>

           <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>4. Data Security</h2>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
              We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>5. Contact Us</h2>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
              If you have any questions about this Privacy Policy, please contact us at privacy@swiftdrop.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
