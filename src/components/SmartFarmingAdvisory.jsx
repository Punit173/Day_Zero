import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaCloudSun, FaBug, FaCalendarAlt, FaVolumeUp, FaStop } from 'react-icons/fa';

const SmartFarmingAdvisory = () => {
    const [isListening, setIsListening] = useState(false);
    const [advisory, setAdvisory] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [pestData, setPestData] = useState(null);
    const [cropData, setCropData] = useState(null);
    const [transcript, setTranscript] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isUserDone, setIsUserDone] = useState(false);
    const recognitionRef = useRef(null);
    const speechSynthesisRef = useRef(null);

    // Initialize speech recognition and synthesis
    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setTranscript(transcript);
                setIsUserDone(true);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                speakResponse("Sorry, I couldn't understand that. Could you please repeat?");
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        } else {
            console.error('Speech recognition not supported');
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (speechSynthesisRef.current) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Process voice command when user is done speaking
    useEffect(() => {
        if (isUserDone && transcript) {
            processVoiceCommand(transcript);
            setIsUserDone(false);
        }
    }, [isUserDone, transcript]);

    // Text to speech function
    const speakResponse = (text) => {
        if ('speechSynthesis' in window) {
            setIsSpeaking(true);
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 1;
            utterance.pitch = 1;

            utterance.onend = () => {
                setIsSpeaking(false);
            };

            window.speechSynthesis.speak(utterance);
            speechSynthesisRef.current = utterance;
        }
    };

    // Stop speaking function
    const stopSpeaking = () => {
        if (speechSynthesisRef.current) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    // Process voice commands with context-aware responses
    const processVoiceCommand = (command) => {
        const lowerCommand = command.toLowerCase();

        if (lowerCommand.includes('weather') || lowerCommand.includes('forecast')) {
            if (weatherData) {
                const response = `Current weather conditions: ${weatherData.forecast}. Temperature is ${weatherData.temperature} degrees Celsius with ${weatherData.humidity}% humidity.`;
                speakResponse(response);
                document.getElementById('weather-section').scrollIntoView({ behavior: 'smooth' });
            }
        } else if (lowerCommand.includes('pest') || lowerCommand.includes('insect')) {
            if (pestData) {
                const response = `Pest status: ${pestData.pestLevel} activity detected. ${pestData.recommendedAction}. Mainly affecting ${pestData.affectedCrops.join(' and ')} crops.`;
                speakResponse(response);
                document.getElementById('pest-section').scrollIntoView({ behavior: 'smooth' });
            }
        } else if (lowerCommand.includes('crop') || lowerCommand.includes('harvest')) {
            if (cropData) {
                const response = `Crop advisory: Optimal sowing time is ${cropData.optimalSowingTime}. Expected harvest time is ${cropData.harvestTime}. Recommended crops are ${cropData.recommendedCrops.join(' and ')}.`;
                speakResponse(response);
                document.getElementById('crop-section').scrollIntoView({ behavior: 'smooth' });
            }
        } else if (lowerCommand.includes('refresh') || lowerCommand.includes('update')) {
            loadData();
            speakResponse("Refreshing farming data. Please wait a moment.");
        } else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
            const helpResponse = "I can help you with weather forecasts, pest control information, and crop scheduling. Just ask about weather, pests, or crops. You can also say refresh to update the information.";
            speakResponse(helpResponse);
        } else if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
            speakResponse("Hello! I'm your smart farming assistant. How can I help you today?");
        } else {
            speakResponse("I'm not sure about that. You can ask me about weather, pests, or crops. Or say help to know what I can do.");
        }
    };

    // Mock function to simulate weather data from satellite
    const fetchWeatherData = async () => {
        // In a real application, this would fetch from a weather API
        return {
            temperature: 25,
            humidity: 65,
            rainfall: 0,
            windSpeed: 10,
            forecast: 'Clear skies for the next 3 days'
        };
    };

    // Mock function to simulate pest data
    const fetchPestData = async () => {
        // In a real application, this would fetch from a pest monitoring system
        return {
            pestLevel: 'Low',
            recommendedAction: 'Regular monitoring recommended',
            affectedCrops: ['Wheat', 'Rice']
        };
    };

    // Mock function to simulate crop data
    const fetchCropData = async () => {
        // In a real application, this would fetch from agricultural databases
        return {
            optimalSowingTime: 'Next week',
            harvestTime: 'In 3 months',
            recommendedCrops: ['Wheat', 'Barley']
        };
    };

    const loadData = async () => {
        const weather = await fetchWeatherData();
        const pest = await fetchPestData();
        const crop = await fetchCropData();

        setWeatherData(weather);
        setPestData(pest);
        setCropData(crop);
    };

    useEffect(() => {
        loadData();
    }, []);

    const startListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
            setIsListening(true);
            speakResponse("I'm listening. Please speak your question.");
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
            speakResponse("Stopping voice input. You can start again by clicking the microphone button.");
        }
    };

    const generateAdvisory = () => {
        if (!weatherData || !pestData || !cropData) return 'Loading data...';

        return `
      Weather Advisory: ${weatherData.forecast}
      Temperature: ${weatherData.temperature}°C
      Humidity: ${weatherData.humidity}%
      
      Pest Control: ${pestData.pestLevel} pest activity detected
      Recommended Action: ${pestData.recommendedAction}
      
      Crop Advisory: Optimal sowing time is ${cropData.optimalSowingTime}
      Expected harvest time: ${cropData.harvestTime}
    `;
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Smart Farming Advisory</h2>

            <div className="mb-6">
                <div className="flex gap-4">
                    <button
                        onClick={isListening ? stopListening : startListening}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isListening ? 'bg-red-500' : 'bg-green-500'
                            } text-white`}
                    >
                        {isListening ? (
                            <>
                                <FaMicrophoneSlash /> Stop Listening
                            </>
                        ) : (
                            <>
                                <FaMicrophone /> Start Voice Input
                            </>
                        )}
                    </button>
                    {isSpeaking && (
                        <button
                            onClick={stopSpeaking}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white"
                        >
                            <FaStop /> Stop Response
                        </button>
                    )}
                </div>
                {transcript && (
                    <div className="mt-2 p-2 bg-gray-100 rounded">
                        <p className="text-sm text-gray-700">You said: {transcript}</p>
                    </div>
                )}
                {isSpeaking && (
                    <div className="mt-2 flex items-center gap-2 text-green-600">
                        <FaVolumeUp />
                        <span className="text-sm">Speaking...</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div id="weather-section" className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <FaCloudSun className="text-blue-500" />
                        <h3 className="font-semibold">Weather Alert</h3>
                    </div>
                    {weatherData ? (
                        <p className="text-sm">{weatherData.forecast}</p>
                    ) : (
                        <p className="text-sm">Loading weather data...</p>
                    )}
                </div>

                <div id="pest-section" className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <FaBug className="text-red-500" />
                        <h3 className="font-semibold">Pest Control</h3>
                    </div>
                    {pestData ? (
                        <p className="text-sm">{pestData.recommendedAction}</p>
                    ) : (
                        <p className="text-sm">Loading pest data...</p>
                    )}
                </div>

                <div id="crop-section" className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <FaCalendarAlt className="text-green-500" />
                        <h3 className="font-semibold">Crop Schedule</h3>
                    </div>
                    {cropData ? (
                        <p className="text-sm">
                            Sow: {cropData.optimalSowingTime}
                            <br />
                            Harvest: {cropData.harvestTime}
                        </p>
                    ) : (
                        <p className="text-sm">Loading crop data...</p>
                    )}
                </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Complete Advisory</h3>
                <pre className="whitespace-pre-wrap text-sm">{generateAdvisory()}</pre>
            </div>

            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">Voice Commands</h3>
                <ul className="text-sm list-disc list-inside">
                    <li>Say "weather" or "forecast" to get weather information</li>
                    <li>Say "pest" or "insect" to get pest control information</li>
                    <li>Say "crop" or "harvest" to get crop schedule</li>
                    <li>Say "refresh" or "update" to reload all data</li>
                    <li>Say "help" to know what I can do</li>
                    <li>Say "hello" to start a conversation</li>
                </ul>
            </div>
        </div>
    );
};

export default SmartFarmingAdvisory; 