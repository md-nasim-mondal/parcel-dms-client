import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className='min-h-screen py-20 bg-slate-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
         <div className="flex flex-col items-center mb-10">
            <div className='w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4'>
               <FileText className='w-8 h-8 text-blue-600 dark:text-blue-400' />
            </div>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center'>
               Terms of Service
            </h1>
             <p className="text-gray-500 mt-2">Last updated: December 24, 2025</p>
         </div>
        
        <div className='max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm space-y-8'>
          <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>1. Acceptance of Terms</h2>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
              By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>2. Description of Service</h2>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
              SwiftDrop provides a platform for connecting senders with delivery personnel to facilitate the delivery of parcels. We do not take possession of items and are not a carrier or courier service provider.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>3. User Responsibilities</h2>
            <ul className='list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4'>
               <li>You agree to provide accurate and complete information when creating an account.</li>
               <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
               <li>You agree not to use our services for any illegal or unauthorized purpose.</li>
               <li>You verify that you have the right to send the items you are requesting delivery for.</li>
            </ul>
          </section>

           <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>4. Prohibited Items</h2>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
              You may not use our service to deliver illegal items, hazardous materials, firearms, or any other items prohibited by law or our policies.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>5. Limitation of Liability</h2>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
              To the fullest extent permitted by law, SwiftDrop shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

            <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>6. Changes to Terms</h2>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
              We reserve the right to modify these terms at any time. We will provide notice of any material changes by posting the new terms on our site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
