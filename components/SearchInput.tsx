import React from 'react';
import { PaperclipIcon } from './icons';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  isButtonDisabled: boolean;
  generationMode: 'text' | 'image';
  onModeChange: (mode: 'text' | 'image') => void;
  onFileUpload: () => void;
  isFileUploadDisabled: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  query, setQuery, onSearch, isLoading, isButtonDisabled, 
  generationMode, onModeChange, onFileUpload, isFileUploadDisabled 
}) => {
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative flex items-center shadow-lg rounded-full bg-gray-800 focus-within:ring-2 focus-within:ring-purple-500 transition-shadow duration-300">
        <div className="pl-3 flex items-center">
            <button 
              onClick={onFileUpload}
              disabled={isFileUploadDisabled || isLoading}
              className="p-2 text-gray-400 hover:text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Attach file"
              title="Attach an image"
            >
              <PaperclipIcon className="w-5 h-5" />
            </button>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={generationMode === 'text' ? 'Ask anything or describe an image...' : 'Describe the image you want to create...'}
          className="w-full py-4 pl-2 pr-56 bg-transparent text-white focus:outline-none"
          disabled={isLoading}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <div className="bg-gray-700 p-1 rounded-full flex text-sm">
                <button 
                    onClick={() => onModeChange('text')}
                    className={`px-3 py-1 rounded-full ${generationMode === 'text' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                >
                    Text
                </button>
                <button 
                    onClick={() => onModeChange('image')}
                    className={`px-3 py-1 rounded-full ${generationMode === 'image' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                >
                    Image
                </button>
            </div>
            <button
              onClick={onSearch}
              disabled={isButtonDisabled}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? '...' : 'Go'}
            </button>
        </div>
      </div>
    </div>
  );
};
