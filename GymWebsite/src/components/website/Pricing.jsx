import React from 'react';

const PricingCard = ({ title, price, features, bgClass, priceNote }) => {
  return (
    <div className={`w-[300px] m-6 bg-white text-black rounded-xl shadow-2xl   mb-4`}>
      <div className="bg-purple-100 p-4 rounded-xl">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">Best for {title.toLowerCase()} projects</p>
        <div className="mt-6">
          <span className="text-4xl font-bold ">${price}</span>
          <span className="text-lg font-medium">/mo</span>
        </div>
        <p className="text-sm text-gray-500 mt-1 mb-6">{priceNote}</p>
        
      </div>
      <div className="bg-white p-4 rounded-2xl">
        <ul className="list-none space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="material-icons text-green-400">check_circle</span>
              <span className="ml-2">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      title: 'Basic Membership',
      price: 29.99,
      priceNote: '$29.99/month',
      bgClass: 'bg-blue-500',
      features: [
        'Access to basic gym equipment',
        'Personal locker',
        'Basic fitness classes',
        'General gym support',
        'Limited hours access',
      ],
    },
    {
      title: 'Standard Membership',
      price: 49.99,
      priceNote: '$49.99/month',
      bgClass: 'bg-green-500',
      features: [
        'Access to full gym equipment',
        'Personal locker',
        'Advanced fitness classes',
        'Personal trainer sessions (limited)',
        'Extended hours access',
      ],
    },
    {
      title: 'Premium Membership',
      price: 79.99,
      priceNote: '$79.99/month',
      bgClass: 'bg-red-500',
      features: [
        'Access to full gym equipment',
        'Priority locker',
        'Unlimited fitness classes',
        'Personal trainer sessions (unlimited)',
        '24/7 gym access',
      ],
    },
  ];

  return (
    <div className="p-8 flex justify-center items-center">
      <div className="flex flex-col lg:flex-row lg:gap-x-16">
        {plans.map((plan, index) => (
          <div key={index} className="w-full md:w-1/3 px-2 mb-4">
            <PricingCard {...plan} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
