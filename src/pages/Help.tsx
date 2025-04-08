import React from 'react';
import { Phone, Mail, MessageCircle, FileText, HelpCircle } from 'lucide-react';

export const Help: React.FC = () => {
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order in real-time by clicking on the 'Track Order' button in your order confirmation email or by visiting the 'Order Tracking' section in your account."
    },
    {
      question: "What if I need to cancel my order?",
      answer: "You can cancel your order within 1 minute of placing it. After that, please contact our customer support for assistance."
    },
    {
      question: "How do I report an issue with my order?",
      answer: "You can report any issues through the 'Help' section in your account or by contacting our 24/7 customer support."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Help Center</h1>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Phone className="w-8 h-8 text-orange-600 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Phone Support</h3>
          <p className="text-gray-600">1-800-FOOD-HUB</p>
          <p className="text-sm text-gray-500">24/7 Available</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Mail className="w-8 h-8 text-orange-600 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Email Support</h3>
          <p className="text-gray-600">help@foodhub.com</p>
          <p className="text-sm text-gray-500">Response within 24h</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <MessageCircle className="w-8 h-8 text-orange-600 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-gray-600">Chat with us</p>
          <p className="text-sm text-gray-500">Average wait: 2 mins</p>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-orange-600" />
                {faq.question}
              </h3>
              <p className="text-gray-600 pl-7">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Help Categories */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow">
          <FileText className="w-8 h-8 text-orange-600" />
          <div className="text-left">
            <h3 className="font-semibold">Order Issues</h3>
            <p className="text-sm text-gray-600">Help with your current or past orders</p>
          </div>
        </button>
        <button className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow">
          <MessageCircle className="w-8 h-8 text-orange-600" />
          <div className="text-left">
            <h3 className="font-semibold">Account & Payment</h3>
            <p className="text-sm text-gray-600">Manage your account settings and payments</p>
          </div>
        </button>
      </div>
    </div>
  );
};