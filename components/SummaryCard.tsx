import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, SparklesIcon } from './icons';

interface SummaryCardProps {
  summary: string;
  isLoading: boolean;
  error: string | null;
}

const SkeletonLoader: React.FC = () => (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
);

export const SummaryCard: React.FC<SummaryCardProps> = ({ summary, isLoading, error }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    const handleCopy = () => {
        if(summary) {
            navigator.clipboard.writeText(summary);
            setCopied(true);
        }
    };

  return (
    <div className="mt-8 bg-gray-900/50 border-2 border-purple-500/50 rounded-xl shadow-2xl overflow-hidden">
      <header className="flex items-center justify-between p-4 bg-gray-800/80 border-b border-purple-500/30">
        <div className="flex items-center gap-3">
          <SparklesIcon className="w-6 h-6 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">Collated Summary</h2>
        </div>
        <button 
            onClick={handleCopy}
            className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            disabled={isLoading || !summary}
            aria-label="Copy summary"
        >
            {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
        </button>
      </header>
      <div className="p-5">
        {isLoading ? (
            <SkeletonLoader />
        ) : error ? (
            <p className="text-red-400">{error}</p>
        ) : (
          <p className="text-gray-300 whitespace-pre-wrap">{summary}</p>
        )}
      </div>
    </div>
  );
};
