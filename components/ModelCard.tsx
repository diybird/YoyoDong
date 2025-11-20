
import React from 'react';
import { ModelData } from '../types';

interface ModelCardProps {
  model: ModelData;
  isSelected: boolean;
  onToggleCompare: (model: ModelData) => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, isSelected, onToggleCompare }) => {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Image': return '🎨';
      case 'Video': return '🎬';
      case 'Audio': return '🎵';
      default: return '🤖';
    }
  };

  return (
    <div 
      className={`
        group relative bg-surface border rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 flex flex-col h-full
        ${isSelected ? 'border-primary ring-1 ring-primary' : 'border-surfaceHighlight hover:border-primary/50'}
      `}
    >
      {/* Badge */}
      {model.badge && (
        <div className="absolute -top-3 left-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
          {model.badge}
        </div>
      )}

      {/* Header */}
      <div className="mb-4 mt-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {getCategoryIcon(model.category)} {model.name}
          </h3>
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={() => onToggleCompare(model)}
            className="w-5 h-5 accent-primary cursor-pointer rounded border-gray-600 bg-gray-700"
            aria-label={`Select ${model.name} for comparison`}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3 text-sm">
          <span className="px-2 py-1 rounded bg-surfaceHighlight text-secondary font-medium">
            {model.developer}
          </span>
          <span className="px-2 py-1 rounded bg-indigo-900/30 text-indigo-300 border border-indigo-500/20">
            {model.price}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-5 leading-relaxed line-clamp-3 flex-grow">
        {model.description}
      </p>

      {/* Features */}
      <div className="mb-5">
        <div className="flex flex-wrap gap-2">
          {model.features.slice(0, 3).map((feature, idx) => (
            <span key={idx} className="text-xs px-2 py-1 rounded bg-primary/10 text-indigo-200 border border-primary/20 whitespace-nowrap">
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-auto pt-4 border-t border-surfaceHighlight flex items-center justify-between gap-3">
        
        {model.link ? (
          <a 
            href={model.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Visit Website
          </a>
        ) : (
           <span className="text-sm text-gray-600 cursor-not-allowed">No Link</span>
        )}

        {model.apiPrice && (
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 uppercase font-bold">API Price</span>
            <span className="text-xs font-mono text-gray-300 bg-surfaceHighlight px-1.5 py-0.5 rounded">
              {model.apiPrice}
            </span>
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent group-hover:border-primary/20 transition-colors duration-300"></div>
    </div>
  );
};

export default ModelCard;
