import React from 'react';
import { ModelData } from '../types';

interface ComparisonModalProps {
  models: ModelData[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (model: ModelData) => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ models, isOpen, onClose, onRemove }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface border border-surfaceHighlight rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-slide-up">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-surfaceHighlight bg-surfaceHighlight/20">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            📊 Model Comparison
            <span className="text-sm font-normal text-gray-400 bg-surface px-2 py-1 rounded-md border border-surfaceHighlight">
              {models.length} selected
            </span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-surfaceHighlight rounded-full text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content - Scrollable Grid */}
        <div className="overflow-x-auto p-6 custom-scrollbar">
          <div className="grid gap-6 min-w-max" style={{ gridTemplateColumns: `repeat(${models.length}, minmax(300px, 1fr))` }}>
            {models.map(model => (
              <div key={model.id} className="bg-surfaceHighlight/30 rounded-xl p-5 border border-surfaceHighlight relative flex flex-col h-full">
                 <button 
                    onClick={() => onRemove(model)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-400 transition-colors"
                    title="Remove from comparison"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>

                <h3 className="text-xl font-bold text-primary mb-2">{model.name}</h3>
                <div className="text-sm text-secondary mb-4 font-medium">{model.developer}</div>
                
                <div className="space-y-4 flex-grow">
                  <div>
                    <label className="text-xs text-gray-500 uppercase block mb-1">Category</label>
                    <div className="text-white">{model.category}</div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase block mb-1">Price</label>
                    <div className="text-white font-mono text-sm">{model.price}</div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase block mb-1">Released</label>
                    <div className="text-white">{model.releaseDate}</div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase block mb-1">Features</label>
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                      {model.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase block mb-1">Best For</label>
                    <div className="flex flex-wrap gap-1">
                        {model.tags.map((tag, i) => (
                            <span key={i} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">#{tag}</span>
                        ))}
                    </div>
                  </div>
                </div>
                
                {model.link && (
                    <a 
                        href={model.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-6 block w-full text-center py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors text-sm font-medium"
                    >
                        Visit Website
                    </a>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComparisonModal;