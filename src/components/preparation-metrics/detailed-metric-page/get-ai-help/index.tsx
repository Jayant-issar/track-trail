import React, { useState } from 'react';
import { getAiHelpAction } from '@/actions/perpTracker';

const GetAiHelp = ({ metricName, token }: { metricName: string; token?: string }) => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleGetHelp = async () => {
    if (!inputText.trim()) {
      setError('Please enter a question');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      const result = await getAiHelpAction(
        {
          context: metricName,
          prompt: inputText
        },
      );

      if (result?.error) {
        setError(result.error.message);
        return;
      }

      if (result?.data?.text) {
        setResponse(result.data.text);
      }
    } catch (err) {
      setError(err.message || 'Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResponse('');
    setInputText('');
    setIsExpanded(true);
    setError('');
  };

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-semibold mb-6">Get AI Help</h2>
      <textarea
        className="w-full h-32 bg-gray-700/20 border border-gray-700 rounded-lg p-3 text-gray-100 focus:outline-none focus:border-purple-500"
        placeholder={`Ask for help with your ${metricName} problems...`}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      
      {error && <p className="text-red-400 mt-2">{error}</p>}
      
      <div className="flex gap-3">
        <button 
          onClick={handleGetHelp}
          disabled={isLoading}
          className={`mt-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg transition-all duration-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-pink-600'
          }`}
        >
          {isLoading ? 'Generating...' : 'Get Help'}
        </button>

        {response && (
          <button
            onClick={handleReset}
            className="mt-3 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        )}
      </div>

      {response && (
        <div className="mt-6 bg-gray-700/20 rounded-lg">
          <div className="flex justify-between items-center p-4 cursor-pointer" 
               onClick={() => setIsExpanded(!isExpanded)}>
            <h3 className="text-lg font-medium">AI Response:</h3>
            <svg
              className={`w-6 h-6 transform transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {isExpanded && (
            <div className="p-4 pt-0">
              <p className="whitespace-pre-wrap">{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GetAiHelp;