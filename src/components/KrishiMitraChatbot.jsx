import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const KrishiMitraChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const genAI = new GoogleGenerativeAI("AIzaSyCJ9B9D93cw0ZPIakN5kQpT0IIkI5VOZwI");
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const prompt = `You are a specialized chatbot for KrishiMitra, an AI platform for farmers. 
      Only answer questions related to the following information about KrishiMitra:
      
      KrishiMitra is an integrated AI platform designed to empower smallholder farmers by addressing three critical challenges:
      1. Financial exclusion
      2. Lack of advisory services
      3. Inefficient market linkages
      
      Key Features:
      - Financial Inclusion: AI credit scoring using alternate data
      - Smart Farming: Voice AI for personalized advisories
      - Market Linkage: Direct connection to bulk buyers
      
      USP:
      - First unified platform for credit, advisory, and market access
      - Voice-first, low-tech interface
      - Closed-loop sustainability
      
      Intended Impact:
      - Economic: 20-30% income increase
      - Social: 10M+ smallholders in 5 years
      - Environmental: 25% reduction in resource wastage
      
      If the question is not related to this information, politely inform the user that you can only answer questions about KrishiMitra. Also don't add any bold text in it.
      
      Question: ${input}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const botMessage = { text, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                text: "I'm sorry, I encountered an error. Please try again later.",
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-200 z-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                </svg>
            </button>

            {/* Chat Popup */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl z-50">
                    <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold">KrishiMitra Assistant</h2>
                            <p className="text-sm">Ask me anything about KrishiMitra</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user'
                                        ? 'bg-green-100 text-green-900'
                                        : 'bg-gray-100 text-gray-900'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 text-gray-900 rounded-lg p-3">
                                    Thinking...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about KrishiMitra..."
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default KrishiMitraChatbot; 