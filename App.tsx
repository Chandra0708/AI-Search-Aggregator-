
import React, { useState, useCallback, useRef } from 'react';
import { SearchInput } from './components/SearchInput';
import { ResultCard } from './components/ResultCard';
import { SummaryCard } from './components/SummaryCard';
// FIX: Import the 'getSummary' function to resolve the "Cannot find name 'getSummary'" error.
import { getAiResponses, getAiImages, getSummary } from './services/geminiService';
import { AI_MODELS } from './constants';
import { type AIResult, type UploadedFile } from './types';
import { GeminiIcon, SparklesIcon, AppLogoIcon } from './components/icons';
import { ModelSelector } from './components/ModelSelector';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedModels, setSelectedModels] = useState<Set<string>>(
    new Set(AI_MODELS.map(m => m.id))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AIResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // New states
  const [generationMode, setGenerationMode] = useState<'text' | 'image'>('text');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [summary, setSummary] = useState<string>('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  
  const handleModelToggle = (id: string) => {
    setSelectedModels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
          alert('File is too large. Please select a file smaller than 2MB.');
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          setUploadedFile({
            name: file.name,
            mimeType: file.type,
            data: base64String,
          });
          // Switch to text mode if a file is uploaded, as it's for context
          setGenerationMode('text');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = useCallback(async () => {
    if (!query.trim() || isLoading || selectedModels.size === 0) return;

    setIsLoading(true);
    setError(null);
    setSummary(''); 
    setSummaryError(null);
    setResults([]);

    const modelsToQuery = AI_MODELS.filter(model => selectedModels.has(model.id));
    
    const loadingResults = modelsToQuery.map(model => ({
        ...model,
        response: '',
        imageUrl: '',
        sources: [],
        isLoading: true,
    }));
    setResults(loadingResults);

    try {
      let responses;
      if (generationMode === 'image') {
        responses = await getAiImages(query, modelsToQuery);
      } else {
        responses = await getAiResponses(query, modelsToQuery, uploadedFile);
      }
      
      for (const res of responses) {
          setResults(prev => prev.map(r => r.id === res.id ? { ...res, isLoading: false } : r));
      }

    } catch (err) {
      setError('An error occurred. Please check your API key and try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, isLoading, selectedModels, generationMode, uploadedFile]);

  const handleSummarize = useCallback(async () => {
    if (isSummarizing || results.some(r => r.isLoading || !r.response)) return;

    setIsSummarizing(true);
    setSummaryError(null);
    setSummary('');

    const combinedResponses = results
      .map(r => `[Source: ${r.name}]\n${r.response}`)
      .join('\n\n---\n\n');

    try {
      const summaryResponse = await getSummary(combinedResponses);
      setSummary(summaryResponse);
    } catch (err) {
      setSummaryError('An error occurred while generating the summary.');
      console.error(err);
    } finally {
      setIsSummarizing(false);
    }
  }, [results, isSummarizing]);
  
  const onModeChange = (mode: 'text' | 'image') => {
      setGenerationMode(mode);
      // Clear file upload if switching to image mode
      if (mode === 'image') {
          setUploadedFile(null);
      }
  }

  const allResultsLoaded = results.length > 0 && !results.some(r => r.isLoading);
  const isSearchDisabled = isLoading || !query.trim() || selectedModels.size === 0;
  
  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 flex flex-col">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg" style={{ display: 'none' }} />
      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <header className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
             <AppLogoIcon className="w-12 h-12 md:w-14 md:h-14" />
             <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">AI Search</span> Aggregator
             </h1>
          </div>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Your multimodal hub. Get text answers, analyze images, or generate new ones.
          </p>
        </header>

        <main>
          <div className="sticky top-0 z-10 pt-4 pb-6 bg-gray-900/80 backdrop-blur-sm">
             <ModelSelector 
                models={AI_MODELS}
                selectedModels={selectedModels}
                onToggle={handleModelToggle}
             />
             <div className="mt-6">
                <SearchInput
                    query={query}
                    setQuery={setQuery}
                    onSearch={handleSearch}
                    isLoading={isLoading}
                    isButtonDisabled={isSearchDisabled}
                    generationMode={generationMode}
                    onModeChange={onModeChange}
                    onFileUpload={() => fileInputRef.current?.click()}
                    isFileUploadDisabled={generationMode === 'image'}
                />
             </div>
             {uploadedFile && (
                <div className="max-w-2xl mx-auto mt-4 p-2 bg-gray-800 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={`data:${uploadedFile.mimeType};base64,${uploadedFile.data}`} alt={uploadedFile.name} className="w-10 h-10 rounded object-cover" />
                        <span className="text-sm text-gray-300 truncate">{uploadedFile.name}</span>
                    </div>
                    <button onClick={() => setUploadedFile(null)} className="text-gray-500 hover:text-white p-1 rounded-full">&times;</button>
                </div>
             )}
              
              {allResultsLoaded && generationMode === 'text' && (
                <div className="mt-6 text-center">
                    <button 
                        onClick={handleSummarize}
                        disabled={isSummarizing}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                    >
                        {isSummarizing ? 'Summarizing...' : <><SparklesIcon className="w-5 h-5" /> Collate &amp; Summarise</>}
                    </button>
                </div>
              )}
          </div>
         
          {error && (
            <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md">
              <p>{error}</p>
            </div>
          )}
          
          {(isSummarizing || summary || summaryError) && generationMode === 'text' && (
            <SummaryCard 
                isLoading={isSummarizing}
                summary={summary}
                error={summaryError}
            />
          )}

          {results.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((result) => (
                <ResultCard key={result.id} result={result} />
              ))}
            </div>
          ) : (
            !isLoading && !error && (
               <div className="text-center mt-16 text-gray-500">
                <div className="inline-block p-6 bg-gray-800/50 rounded-full">
                   <GeminiIcon className="w-16 h-16 text-gray-600" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-gray-400">Ready to explore?</h2>
                <p className="mt-2">Your AI-powered results will appear here.</p>
              </div>
            )
          )}
        </main>
      </div>
       <footer className="text-center py-4 mt-8">
        <p className="text-gray-500 text-sm">Copyright @ Subhadip Chandra</p>
      </footer>
    </div>
  );
};

export default App;
