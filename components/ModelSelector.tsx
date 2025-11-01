import React from 'react';
import { type AIModel } from '../types';

interface ModelSelectorProps {
  models: AIModel[];
  selectedModels: Set<string>;
  onToggle: (id: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ models, selectedModels, onToggle }) => {
  return (
    <div className="flex justify-center items-center gap-3 md:gap-4 flex-wrap">
        <span className="text-gray-400 font-medium text-sm hidden sm:block">Search with:</span>
      {models.map((model) => {
        const isSelected = selectedModels.has(model.id);
        const LogoComponent = model.logo;
        return (
          <button
            key={model.id}
            onClick={() => onToggle(model.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all duration-200
              ${isSelected
                ? 'bg-purple-500/20 border-purple-500 text-white'
                : 'bg-gray-800/60 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
              }
            `}
            aria-pressed={isSelected}
          >
            <LogoComponent className="w-5 h-5" />
            <span className="font-semibold text-sm">{model.name}</span>
          </button>
        );
      })}
    </div>
  );
};
