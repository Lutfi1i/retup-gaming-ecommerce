import React from 'react';

const Warranty = () => {
    return (
        <div className="max-w-3xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-indigo-700">Warranty Information</h1>
            <p className="mb-6 text-gray-700">
                Thank you for shopping at <span className="font-semibold text-indigo-600">Retup Gaming Ecommerce</span>. We stand behind the quality of our products and offer the following warranty policy:
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-3 text-indigo-600">Warranty Coverage</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li>All products are covered by a limited warranty for manufacturing defects.</li>
                <li>The warranty period is <span className="font-medium text-indigo-700">1 year</span> from the date of purchase unless stated otherwise.</li>
                <li>This warranty covers hardware failures and defects under normal use.</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-8 mb-3 text-indigo-600">What is Not Covered</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li>Damage caused by misuse, accidents, or unauthorized modifications.</li>
                <li>Normal wear and tear.</li>
                <li>Consumable parts such as batteries, unless failure has occurred due to a defect.</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-8 mb-3 text-indigo-600">How to Claim Warranty</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-800">
                <li>
                    Contact our customer support at{' '}
                    <a
                        href="mailto:support@retupgaming.com"
                        className="text-indigo-600 underline hover:text-indigo-800"
                    >
                        support@retupgaming.com
                    </a>{' '}
                    with your order details and a description of the issue.
                </li>
                <li>Provide photos or videos if possible to help us assess the problem.</li>
                <li>Our team will guide you through the warranty claim process.</li>
            </ol>
            <p className="mt-8 text-gray-700">
                For further questions, please contact our support team. Thank you for choosing <span className="font-semibold text-indigo-600">Retup Gaming Ecommerce</span>!
            </p>
        </div>
    );
};

export default Warranty;