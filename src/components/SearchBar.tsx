import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { SearchFilters } from '../types';
import { skillCategories, availabilityOptions } from '../utils/mockData';

interface SearchBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export function SearchBar({ filters, onFiltersChange }: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const skillSuggestions = [
    'React', 'Python', 'JavaScript', 'TypeScript', 'UI/UX Design',
    'Machine Learning', 'Data Science', 'Photography', 'Video Editing',
    'Digital Marketing', 'SEO', 'Content Writing', 'Graphic Design'
  ];

  useEffect(() => {
    if (filters.query) {
      const filtered = skillSuggestions.filter(skill =>
        skill.toLowerCase().includes(filters.query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [filters.query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: '',
      skillCategory: 'All Categories',
      availability: 'Any Time',
      minRating: 0
    });
  };

  const activeFiltersCount = [
    filters.skillCategory !== 'All Categories',
    filters.availability !== 'Any Time',
    filters.minRating > 0
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div ref={searchRef} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search skills, names, or keywords..."
            value={filters.query}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-300 ${
              showFilters || activeFiltersCount > 0
                ? 'text-cyan-400 bg-cyan-500/20'
                : 'text-slate-400 hover:text-cyan-400'
            }`}
          >
            <Filter className="w-4 h-4" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-xl z-10">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  handleFilterChange('query', suggestion);
                  setShowSuggestions(false);
                }}
                className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-700/50 hover:text-cyan-400 transition-all duration-300 first:rounded-t-xl last:rounded-b-xl"
              >
                <Search className="inline w-4 h-4 mr-2 text-slate-500" />
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <X className="w-4 h-4" />
              <span className="text-sm">Clear All</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Skill Category */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Skill Category
              </label>
              <select
                value={filters.skillCategory}
                onChange={(e) => handleFilterChange('skillCategory', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
              >
                {skillCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
              >
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Minimum Rating
              </label>
              <select
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.0}>4.0+ Stars</option>
                <option value={3.5}>3.5+ Stars</option>
                <option value={3.0}>3.0+ Stars</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}