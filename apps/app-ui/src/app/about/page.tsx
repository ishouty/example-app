import React from 'react';

export const metadata = {
  title: 'About Us',
  description: 'Learn more about our team and mission',
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 ">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            Welcome to our company! We are committed to providing the best
            services for our customers. Our team is composed of passionate
            professionals dedicated to innovation and excellence.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
            urna ac felis auctor vehicula. Mauris fermentum libero ut justo
            lacinia, non convallis tortor malesuada. Quisque sit amet tortor sed
            est ultrices suscipit vel ut sapien.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Our Team
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Curabitur fringilla, nisl ut consequat egestas, nisi est suscipit
            lacus, non blandit erat ligula vitae est. Integer ultrices neque id
            urna ultricies, sed volutpat orci elementum. Aliquam erat volutpat.
          </p>
        </div>
      </div>
    </div>
  );
}
