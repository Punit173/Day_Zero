import { motion } from 'framer-motion';

const About = () => {
    const stats = [
        { label: "Farmers Served", value: "50,000+" },
        { label: "Districts Covered", value: "100+" },
        { label: "Success Rate", value: "95%" },
        { label: "Years of Experience", value: "5+" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-green-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl font-bold mb-6">About KrishiMitra</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            Empowering farmers with technology-driven solutions for a sustainable agricultural future.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-lg p-8 mb-16"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-600">
                            KrishiMitra is dedicated to transforming agriculture in India by leveraging cutting-edge technology
                            to provide comprehensive solutions for smallholder farmers. We believe in creating a sustainable
                            ecosystem where technology and traditional farming knowledge work together to improve yields,
                            increase income, and ensure food security.
                        </p>
                    </motion.div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-lg p-6 text-center"
                            >
                                <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Values Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Innovation",
                                description: "We constantly innovate to provide the best technological solutions for farmers.",
                                icon: "💡"
                            },
                            {
                                title: "Sustainability",
                                description: "Our solutions promote sustainable farming practices for long-term benefits.",
                                icon: "🌱"
                            },
                            {
                                title: "Inclusivity",
                                description: "We ensure our solutions are accessible to all farmers, regardless of their technical expertise.",
                                icon: "🤝"
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-lg p-6"
                            >
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About; 