// src/pages/profile.js

import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Profile() {
    const [children, setChildren] = useState([
        { name: 'Emily', age: 6, trait: 'Openness' },
    ]);

    const [newChild, setNewChild] = useState({ name: '', age: '', trait: '' });

    const handleAddChild = () => {
        if (newChild.name && newChild.age && newChild.trait) {
            setChildren([...children, newChild]);
            setNewChild({ name: '', age: '', trait: '' });
        }
    };

    return (
        <>
            <Head>
                <title>Profile – AmazingStoreSG</title>
            </Head>
            <Header />

            <main className="pt-20 sm:pt-28 min-h-screen px-4 md:px-8 pb-16">
                <div className="max-w-4xl mx-auto relative">
                    {/* Title */}
                    <h1 className="text-xl sm:text-3xl font-bold text-stone-800 mb-8 text-center">
                        Profile
                    </h1>

                    {/* Profile Details */}
                    <section className="bg-white p-6 rounded-lg shadow-sm mt-8">
                        <h2 className="text-2xl font-bold mb-4 text-stone-800">Profile Details</h2>
                        <div className="space-y-2 text-sm text-stone-700">
                            <p><strong>Name:</strong> John Doe</p>
                            <p><strong>Email:</strong> john@example.com</p>
                            <p><strong>Phone:</strong> +65 9123 4567</p>
                            <p><strong>Shipping Address:</strong> 123 Example Street, Singapore</p>
                        </div>
                    </section>

                    {/* Child Personality Info */}
                    <section className="bg-white p-6 rounded-lg shadow-sm mt-8">
                        <h2 className="text-2xl font-bold mb-4 text-stone-800">Your Children</h2>
                        <div className="space-y-4">
                            {children.map((child, index) => (
                                <div key={index} className="p-4 bg-stone-100 rounded-md">
                                    <p className="text-stone-800"><strong>Name:</strong> {child.name}</p>
                                    <p className="text-stone-700 text-sm"><strong>Age:</strong> {child.age}</p>
                                    <p className="text-stone-700 text-sm"><strong>Personality Trait:</strong> {child.trait}</p>
                                </div>
                            ))}
                        </div>

                        {/* Add New Child */}
                        <div className="mt-6 space-y-3">
                            <h3 className="font-semibold text-stone-700">Add a New Child</h3>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border p-2 rounded"
                                value={newChild.name}
                                onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Age"
                                className="w-full border p-2 rounded"
                                value={newChild.age}
                                onChange={(e) => setNewChild({ ...newChild, age: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Personality Trait (e.g., Openness)"
                                className="w-full border p-2 rounded"
                                value={newChild.trait}
                                onChange={(e) => setNewChild({ ...newChild, trait: e.target.value })}
                            />
                            <button
                                onClick={handleAddChild}
                                className="px-4 py-2 bg-stone-800 text-white rounded hover:bg-stone-700 transition w-full"
                            >
                                Add Child
                            </button>
                        </div>
                    </section>

                    {/* Order History */}
                    <section className="bg-white p-6 rounded-lg shadow-sm mt-8">
                        <h2 className="text-2xl font-bold mb-4 text-stone-800">Order History</h2>
                        <ul className="text-sm text-stone-700 space-y-3">
                            <li>#12345 – Adventure Book Bundle – Delivered</li>
                            <li>#12346 – Puzzle Set – Shipped</li>
                            <li>#12347 – STEM Robotics Kit – Processing</li>
                        </ul>
                    </section>

                </div>
            </main>

            <Footer />
        </>
    );
}