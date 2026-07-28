import React, { useState } from 'react';
import { Link } from 'react-router';
import { useToast } from '../../../context/ToastContext';

const Footer = () => {
    const [ email, setEmail ] = useState('');
    const { addToast } = useToast();

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            addToast({ message: 'Please enter a valid email address.', type: 'error' });
            return;
        }
        addToast({
            message: 'Thank you for subscribing to the Snitch Private Dispatch.',
            type: 'success'
        });
        setEmail('');
    };

    return (
        <footer
            className="w-full border-t text-[#1b1c1a] selection:bg-[#C9A96E]/30"
            style={{ backgroundColor: '#141413', color: '#fbf9f6', borderColor: '#262422', fontFamily: "'Inter', sans-serif" }}
        >
            {/* ── Top Newsletter Section ── */}
            <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-20 pb-16 border-b" style={{ borderColor: '#262422' }}>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                    <div className="max-w-lg">
                        <span className="text-[10px] uppercase tracking-[0.24em] font-medium" style={{ color: '#C9A96E' }}>
                            Private Dispatch
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-light mt-2 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            Join the Snitch Archive
                        </h2>
                        <p className="text-xs leading-relaxed text-[#a39b91]">
                            Receive early access to seasonal curations, private atelier releases, and editorial lookbooks directly in your inbox.
                        </p>
                    </div>

                    <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email address..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-5 py-3.5 bg-[#1b1c1a] text-xs text-[#fbf9f6] border border-[#33302c] focus:border-[#C9A96E] focus:outline-none w-full sm:w-72 transition-colors"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                        <button
                            type="submit"
                            className="px-8 py-3.5 text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#C9A96E] text-[#141413] hover:bg-[#d8bb82] transition-colors cursor-pointer flex-shrink-0"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* ── Main Links Grid ── */}
            <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-2 flex flex-col justify-between pr-4">
                        <div>
                            <Link
                                to="/"
                                className="text-2xl font-medium tracking-[0.35em] uppercase hover:opacity-80 transition-opacity"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}
                            >
                                Snitch.
                            </Link>
                            <p className="text-xs leading-relaxed mt-4 max-w-sm text-[#a39b91]">
                                Defined by understated luxury, architectural silhouettes, and impeccable craftsmanship. Designed in Paris, tailored for the global archive.
                            </p>
                        </div>

                        <div className="mt-8 text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-medium">
                            Complimentary Express Global Shipping & Returns
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.24em] font-semibold mb-6 text-[#C9A96E]">
                            Collections
                        </h4>
                        <ul className="space-y-3.5 text-xs text-[#a39b91]">
                            <li><Link to="/" className="hover:text-[#fbf9f6] transition-colors">Curated Archive</Link></li>
                            <li><Link to="/" className="hover:text-[#fbf9f6] transition-colors">New Arrivals</Link></li>
                            <li><Link to="/" className="hover:text-[#fbf9f6] transition-colors">Essential Tailoring</Link></li>
                            <li><Link to="/" className="hover:text-[#fbf9f6] transition-colors">Leather Goods</Link></li>
                            <li><Link to="/" className="hover:text-[#fbf9f6] transition-colors">Footwear Collection</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.24em] font-semibold mb-6 text-[#C9A96E]">
                            Client Services
                        </h4>
                        <ul className="space-y-3.5 text-xs text-[#a39b91]">
                            <li><span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Complimentary Express Shipping</span></li>
                            <li><span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Returns & Exchanges</span></li>
                            <li><span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Authenticity Guarantee</span></li>
                            <li><span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Garment Care & Repair</span></li>
                            <li><span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Contact Concierge</span></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.24em] font-semibold mb-6 text-[#C9A96E]">
                            Atelier
                        </h4>
                        <ul className="space-y-3.5 text-xs text-[#a39b91]">
                            <li><span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Our Philosophy</span></li>
                            <li><span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Sustainable Sourcing</span></li>
                            <li><span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Artisanal Craftsmanship</span></li>
                            <li><span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Editorial Journal</span></li>
                            <li><span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Press & Media</span></li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="border-t py-8" style={{ borderColor: '#262422' }}>
                <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-[#7A6E63]">
                    <div>
                        © 2026 SNITCH ATELIER. ALL RIGHTS RESERVED.
                    </div>
                    <div className="flex gap-6">
                        <span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Terms of Service</span>
                        <span className="hover:text-[#fbf9f6] cursor-pointer transition-colors">Cookie Preferences</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
