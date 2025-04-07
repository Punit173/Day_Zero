import { motion } from 'framer-motion';

const Features = () => {
    const features = [
        {
            title: "AI-Powered Credit Scoring",
            description: "Our advanced AI algorithms analyze farming patterns and market data to provide accurate credit scores for smallholder farmers.",
            icon: "🤖",
            color: "bg-blue-50"
        },
        {
            title: "Hyperlocal Advisory Services",
            description: "Get personalized farming advice based on your location, crop type, and local weather conditions.",
            icon: "🌍",
            color: "bg-green-50"
        },
        {
            title: "Market Access Platform",
            description: "Connect directly with buyers and get the best prices for your produce through our AI-driven market linkages.",
            icon: "📈",
            color: "bg-yellow-50"
        },
        {
            title: "Weather Intelligence",
            description: "Receive accurate weather forecasts and alerts to optimize your farming decisions.",
            icon: "🌤️",
            color: "bg-purple-50"
        },
        {
            title: "Digital Financial Services",
            description: "Access loans, insurance, and other financial products tailored for farmers.",
            icon: "💳",
            color: "bg-red-50"
        },
        {
            title: "Community Support",
            description: "Join a network of farmers to share experiences and learn from each other.",
            icon: "👥",
            color: "bg-indigo-50"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Features</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover how KrishiMitra empowers farmers with cutting-edge technology and comprehensive support.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`${feature.color} rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow`}
                        >
                            <div className="text-5xl mb-6">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features; 