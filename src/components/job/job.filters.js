'use client'
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle, Sprout } from 'lucide-react';
import { Button } from '../ui/button';

const FilterGroup = ({ title, options, onFilterChange }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-xs font-semibold text-[#3A6B4C] uppercase tracking-wider">
          {title}
        </h4>
        <HelpCircle className="w-4 h-4 text-[#554640]/60 cursor-help hover:text-[#3A6B4C]" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <Button
            variant="ghost"
            key={option.value}
            onClick={() => onFilterChange?.(title, option.value)}
            className={`h-auto px-3 py-2 text-sm justify-between rounded-lg border border-[#e4d9c8] hover:border-[#3A6B4C] transition-colors ${
              option.isActive 
                ? 'bg-[#3A6B4C]/10 border-[#3A6B4C] text-[#2B463C] font-medium' 
                : 'text-[#554640] hover:bg-[#3A6B4C]/5'
            }`}
          >
            <span className="truncate mr-2">{option.label}</span>
            <span className="text-xs rounded-full px-2 py-0.5 min-w-[28px]">
              {option.count}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

const SalaryFilter = () => {
  const [range, setRange] = React.useState([3, 10]);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-xs font-semibold text-[#3A6B4C] uppercase tracking-wider">
          Salary Range (¥M)
        </h4>
        <HelpCircle className="w-4 h-4 text-[#554640]/60 cursor-help hover:text-[#3A6B4C]" />
      </div>
      <div className="space-y-4">
        <div className="relative pt-4">
          <input
            type="range"
            min="3"
            max="15"
            step="1"
            value={range[0]}
            onChange={(e) => setRange([e.target.value, range[1]])}
            className="absolute w-full h-1 bg-[#e4d9c8] rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="3"
            max="15"
            step="1"
            value={range[1]}
            onChange={(e) => setRange([range[0], e.target.value])}
            className="absolute w-full h-1 bg-[#e4d9c8] rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-[#554640]/80 mt-4">
            <span>¥{range[0]}M</span>
            <span>¥{range[1]}M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobFilters = () => {
  const sponsorsVisaOptions = [
    { label: 'Japan Only', count: 160, value: 'japan_only' },
    { label: 'Anywhere', count: 159, value: 'anywhere', isActive: true }, 
  ];

  const japaneseLevelOptions = [
    { label: 'Not Required', count: 131, value: 'none', isActive: true }, 
    { label: 'Business Level', count: 103, value: 'business' },
    { label: 'Conversational', count: 46, value: 'conversational' },
    { label: 'Fluent', count: 38, value: 'fluent' },
    { label: 'Native', count: 1, value: 'native' },
  ];

  const remoteWorkOptions = [
    { label: 'Partial Remote', count: 188, value: 'partial' },
    { label: 'Anywhere in Japan', count: 86, value: 'japan_remote' },
    { label: 'No Remote', count: 18, value: 'none' },
    { label: 'Full Remote', count: 15, value: 'full' },
    { label: 'Worldwide', count: 12, value: 'worldwide' },
  ];

  const seniorityLevelOptions = [
    { label: 'Mid-level or above', count: 137, value: 'mid_plus' },
    { label: 'Senior or above', count: 134, value: 'senior_plus' },
    { label: 'Junior or above', count: 20, value: 'junior_plus' },
    { label: 'New Grad or above', count: 4, value: 'new_grad_plus' },
  ];
  const handleFilterChange = (groupTitle, value) => {
    console.log(`Filter changed in ${groupTitle}: ${value}`);
  };

  return (
    <aside className="px-4 h-fit sticky top-6">
      <div className="flex items-center gap-2 mb-6">
        <Sprout className="h-5 w-5 text-[#3A6B4C]" />
        <h3 className="text-lg font-serif font-semibold text-[#2B463C]">
          Cultivate Your Search
        </h3>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#554640]/60" />
        <Input
          type="search"
          placeholder="Filter positions..."
          className="pl-10 border-[#e4d9c8] focus:border-[#3A6B4C] focus:ring-1 focus:ring-[#3A6B4C]"
          aria-label="Filter jobs"
        />
      </div>

      <FilterGroup title="🌏 Visa Sponsorship" options={sponsorsVisaOptions} onFilterChange={handleFilterChange}/>
      <FilterGroup title="🗾 Japanese Level" options={japaneseLevelOptions} onFilterChange={handleFilterChange} />
      <FilterGroup title="🏠 Remote Options" options={remoteWorkOptions} onFilterChange={handleFilterChange}/>
      <FilterGroup title="📈 Experience Level" options={seniorityLevelOptions} onFilterChange={handleFilterChange}/>
      
      <SalaryFilter />
    </aside>
  );
};

export default JobFilters;