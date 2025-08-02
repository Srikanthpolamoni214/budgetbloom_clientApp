// FeaturesPreview.jsx
import React from 'react';
import { FaPiggyBank, FaChartLine, FaWallet, FaBell } from 'react-icons/fa';

const features = [
  { icon: <FaPiggyBank />, title: 'Budget Planning', desc: 'Easily set budgets for different categories and track progress.' },
  { icon: <FaChartLine />, title: 'Analytics & Reports', desc: 'Gain insights with visual reports on income, expenses, and savings.' },
  { icon: <FaWallet />, title: 'Expense Tracking', desc: 'Log daily expenses, upload receipts, and categorize transactions.' },
  { icon: <FaBell />, title: 'Smart Alerts', desc: 'Receive notifications for budget limits, bills, and goals.' }
];

const FeaturesPreview = () => {
  return (
    <section className="bg-white">
      <div className="text-center">
        <h4 className="font-bold mb-4">Why Choose BudgetBloom?</h4>
        <div className="features-cd grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
          {features.map((feature, idx) => (
            <div key={idx} style={{marginTop:"-20px",border: "1px solid green"}} className="bg-gray-100  shadow-md hover:shadow-xl transition">
              <div className="text-green-600 text-4xl ">{feature.icon}</div>
              <h5 className="font-semibold ">{feature.title}</h5>
              <p  className="p-features">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesPreview;
