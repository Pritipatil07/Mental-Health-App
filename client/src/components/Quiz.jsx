import React, { useState } from 'react';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Animation4 from '../assets/Animation4.lottie';

const questions = [
    "How often have you felt little interest or pleasure in doing things?",
    "How often have you felt nervous, anxious, or on edge?",
    "How often do you feel tired or have little energy?",
    "How often have you had trouble sleeping, such as falling or staying asleep?",
    "Do you find it hard to focus on tasks or make decisions?",
    "Do you feel restless or find it hard to sit still?",
    "Do you feel disconnected from your surroundings or detached from reality?",
    "Have you experienced physical symptoms like headaches, stomachaches, or chest pain without a clear medical reason?",
    "How often do you feel overwhelmed by your responsibilities?",
    "Do you feel easily irritated or angry?",
];

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(''));
    const [selectedOption, setSelectedOption] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, isLoading] = useState(false);

    const handleAnswer = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
        setSelectedOption(value);
    };

    const handleSubmit = async () => {
        isLoading(true);

        const response = await axios.post('http://localhost:5000/analyze-quiz', {
            questions,
            answers,
        });

        setResult(response.data.response);
        isLoading(false);
    };

    const handleNext = () => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
    };

    return (
        <div>
            <NavbarComponent />
            {result === null ?
                <div className="flex flex-col items-center justify-center min-h-screen bg-customBg -mt-12">
                    <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
                        {!loading &&
                            <div>
                                <h2 className="text-xl font-bold mb-6 text-gray-800">
                                    {questions[currentQuestion]}
                                </h2>
                                <div className="grid grid-cols-1 gap-4 mb-6">
                                    {options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(index, option)}
                                            className={`w-full py-3 px-6 border border-gray-300 rounded-lg text-gray-700 ${selectedOption === option
                                                ? 'bg-indigo-100 border-indigo-500'
                                                : 'hover:bg-indigo-100'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                        disabled={currentQuestion === 0}
                                        className={`py-2 px-4 rounded-lg font-semibold ${currentQuestion === 0
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-indigo-500 text-white hover:bg-indigo-600'
                                            }`}
                                    >
                                        Previous
                                    </button>
                                    {currentQuestion < questions.length - 1 ? (
                                        <button
                                            onClick={handleNext}
                                            disabled={!selectedOption}
                                            className={`py-2 px-4 rounded-lg font-semibold ${!selectedOption
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-indigo-500 text-white hover:bg-indigo-600'
                                                }`}
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!selectedOption}
                                            className={`py-2 px-4 rounded-lg font-semibold ${!selectedOption
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-green-500 text-white hover:bg-green-600'
                                                }`}
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        }
                        {loading && <div className='flex flex-col items-center justify-center'>
                            <h1 className='text-xl font-semibold -mb-10'>Analyzing the quiz answers</h1>
                            <DotLottieReact
                                src={Animation4}
                                loop
                                autoplay
                                className='-mb-12'
                            />
                        </div>}
                    </div>
                </div> :
                <div className="flex flex-col items-center justify-center min-h-screen bg-customBg">
                    <div className="bg-white text-lg shadow-lg rounded-lg p-8 max-w-6xl w-full">
                        {result.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default Quiz;
