import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faComments } from '@fortawesome/free-regular-svg-icons';
import { faListCheck, faRobot } from '@fortawesome/free-solid-svg-icons';

const features = [
  {
    name: 'Mental Health Assessment',
    description:
      'Check your mental wellbeing with a quick and confidential assessment.',
    icon: () => <FontAwesomeIcon icon={faListCheck} className="h-5 w-5 text-white" />,
  },
  {
    name: 'Read about Mental Health related topics',
    description:
      'Read about some mental health related topics to know more about them.',
    icon: () => <FontAwesomeIcon icon={faPenToSquare} className="h-5 w-5 text-white" />,
  },
  {
    name: '1:1 Chat with AI Therapist',
    description:
      'Get 24/7 support from an AI therapist to manage your mental health.',
    icon: () => <FontAwesomeIcon icon={faRobot} className="h-5 w-5 text-white" />,
  },
  {
    name: 'Anonymous Chatting',
    description:
      'Connect with a supportive community anonymously and share your experiences.',
    icon: () => <FontAwesomeIcon icon={faComments} className="h-6 w-6 text-white" />,
  },
];

const Home3 = () => {
  return (
    <div className="bg-customBg h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        Unlocking Well-Being Excellence
      </h1>
      <h1 className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold text-center mt-4">
        A website to keep track of your mental health, chat anonymously
        and <br /> get a personalized result based on your quiz.
      </h1>
      <div className="mt-12 sm:mt-16 lg:mt-24 max-w-xl sm:max-w-2xl lg:max-w-5xl">
        <dl className="grid grid-cols-1 gap-x-16 gap-y-10 sm:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-12 sm:pl-16">
              <dt className="text-sm sm:text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <feature.icon className="text-white" aria-hidden="true" />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-xs sm:text-sm md:text-base leading-6 text-gray-600">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Home3;
