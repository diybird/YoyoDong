import React, { useState, useMemo } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import ModelCard from './components/ModelCard';
import StatsBar from './components/StatsBar';
import ComparisonModal from './components/ComparisonModal';
import { MODELS } from './constants';
import { ModelData, ModelCategory } from './types';

const App: React.FC = () => {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ModelCategory | 'All'>('All');
  const [comparisonList, setComparisonList] = useState<ModelData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low'>('newest');

  // Handlers
  const toggleComparison = (model: ModelData) => {
    setComparisonList(prev => {
      const exists = prev.find(m => m.id === model.id);
      if (exists) {
        return prev.filter(m => m.id !== model.id);
      } else {
        if (prev.length >= 4) {
          alert("You can compare up to 4 models at a time.");
          return prev;
        }
        return [...prev, model];
      }
    });
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Filtering and Sorting
  const filteredModels = useMemo(() => {
    let result = MODELS;

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(m => m.category === selectedCategory);
    }

    // Filter by Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(lowerTerm) || 
        m.developer.toLowerCase().includes(lowerTerm) ||
        m.tags.some(t => t.toLowerCase().includes(lowerTerm)) ||
        m.description.toLowerCase().includes(lowerTerm)
      );
    }

    // Sort
    return result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      } else {
        // Rough price sorting logic (parsing '$0.05' etc)
        const getPrice = (s: string) => {
           if (s.toLowerCase().includes('free')) return 0;
           const match = s.match(/\$?(\d+(\.\d+)?)/);
           return match ? parseFloat(match[1]) : 999;
        };
        return getPrice(a.price) - getPrice(b.price);
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen text-gray-100 font-sans selection:bg-primary/30">
      <BackgroundCanvas />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        
        {/* Header */}
        <header className="text-center mb-16 animate-slide-up">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-surfaceHighlight border border-primary/30 text-primary text-sm font-medium">
            Updated for 2025
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            AI Generation Models
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore the bleeding edge of generative AI. Compare features, pricing, and capabilities across Multimodal, Image, Video, and Audio domains.
          </p>
        </header>

        {/* Stats */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <StatsBar models={MODELS} />
        </div>

        {/* Controls Section */}
        <div className="sticky top-4 z-40 bg-background/80 backdrop-blur-lg border border-surfaceHighlight rounded-xl p-4 mb-8 shadow-2xl animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search */}
            <div className="relative w-full md:w-96 group">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input 
                type="text" 
                placeholder="Search models, features, developers..." 
                className="w-full bg-surface border border-surfaceHighlight rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
              {['All', 'Multimodal', 'Image', 'Video', 'Audio'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as ModelCategory | 'All')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === cat 
                      ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                      : 'bg-surfaceHighlight text-gray-400 hover:text-white hover:bg-surfaceHighlight/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort & Compare Action */}
            <div className="flex gap-3 w-full md:w-auto">
                <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-surface border border-surfaceHighlight rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-primary"
                >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                </select>

                <button 
                    onClick={() => comparisonList.length > 0 && setIsModalOpen(true)}
                    disabled={comparisonList.length === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        comparisonList.length > 0 
                        ? 'bg-gradient-to-r from-secondary to-primary text-white shadow-lg shadow-primary/25 hover:scale-105' 
                        : 'bg-surfaceHighlight/50 text-gray-600 cursor-not-allowed'
                    }`}
                >
                    <span>📊 Compare</span>
                    {comparisonList.length > 0 && (
                        <span className="bg-white text-primary px-1.5 py-0.5 rounded text-xs">{comparisonList.length}</span>
                    )}
                </button>
            </div>

          </div>
        </div>

        {/* Grid */}
        {filteredModels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredModels.map((model) => (
                <ModelCard 
                    key={model.id} 
                    model={model} 
                    isSelected={comparisonList.some(m => m.id === model.id)}
                    onToggleCompare={toggleComparison}
                />
            ))}
            </div>
        ) : (
            <div className="text-center py-20 text-gray-500">
                <p className="text-xl">No models found matching your criteria.</p>
                <button onClick={() => {setSearchTerm(''); setSelectedCategory('All')}} className="mt-4 text-primary hover:underline">Clear filters</button>
            </div>
        )}
      </div>

      {/* Modal */}
      <ComparisonModal 
        models={comparisonList}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRemove={toggleComparison}
      />

        {/* Footer */}
      <footer className="border-t border-surfaceHighlight mt-20 bg-surface/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <p className="text-gray-500 text-sm">
                Last Updated: November 2025 | Data compiled from official technical reports and API documentation.
            </p>
            <p className="text-gray-600 text-xs mt-2">
                Pricing estimates may vary by region and usage volume.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;