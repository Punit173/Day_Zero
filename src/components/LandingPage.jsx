import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import video from '../assets/video.mp4'

const LandingPage = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                        src={video}
                        poster="/farmers-working-poster.jpg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-4"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        KrishiMitra
                    </h1>
                    <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                        Empowering smallholder farmers through AI-driven solutions for financial inclusion, advisory services, and market access.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                        Get Started
                    </motion.button>
                </motion.div>
            </section>

            {/* Features Section */}
            <section ref={ref} className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={fadeInUp}
                        className="text-4xl font-bold text-center mb-16 text-gray-800"
                    >
                        Our Integrated Solutions
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Financial Inclusion",
                                description: "AI-powered credit scoring for smallholder farmers",
                                icon: "💰"
                            },
                            {
                                title: "Hyperlocal Advisory",
                                description: "Personalized agricultural guidance via SMS/IVR/WhatsApp",
                                icon: "🌱"
                            },
                            {
                                title: "Market Access",
                                description: "AI-driven market linkages for better prices",
                                icon: "📈"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                variants={fadeInUp}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-20 bg-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
                        <p className="text-xl max-w-3xl mx-auto">
                            To create a farmer-centric ecosystem that synergizes credit scoring, hyperlocal advisory, and AI-driven market access into a seamless workflow, ensuring inclusivity for all farmers regardless of their technological access.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-8 text-gray-800">Ready to Transform Agriculture?</h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Join KrishiMitra today and be part of the agricultural revolution.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                            Contact Us
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
