import React from 'react';
import { cn } from "@/lib/utils";

const getStageClasses = (index, currentStageIndex, isMobile = false) => {
  if (index < currentStageIndex) {
    return "bg-[#3A6B4C] text-white"; 
  } else if (index === currentStageIndex) {
    return "bg-[#E6DABE] border-2 border-[#3A6B4C] font-semibold";
  } else {
    return "bg-gray-100 text-gray-500"; 
  }
};

export const StageProgressBar = ({ 
  stages = [], 
  currentStageIndex = 0,
  primaryColor = "#3A6B4C",
  secondaryColor = "#E6DABE"
}) => {
  if (!stages || stages.length === 0) {
    return null;
  }

  // Ensure currentStageIndex is within bounds
  const safeCurrentStageIndex = Math.min(Math.max(currentStageIndex, 0), stages.length - 1);

  return (
    <div className="w-full">
      <div className="hidden md:flex w-full relative h-12">
        {stages.map((stage, index) => (
          <React.Fragment key={index}>
            <div
              className={cn(
                "flex-1 flex items-center justify-center relative",
                "text-sm font-medium transition-colors duration-200",
                getStageClasses(index, safeCurrentStageIndex),
                index === 0 && "rounded-l-lg",
                index === stages.length - 1 && "rounded-r-lg"
              )}
              style={{
                zIndex: stages.length - index,
                backgroundColor: index < safeCurrentStageIndex ? primaryColor : 
                                index === safeCurrentStageIndex ? secondaryColor : "#F3F4F6",
                borderColor: primaryColor
              }}
            >
              <span className="px-2 z-10 truncate">{stage}</span>
              
              {index < stages.length - 1 && (
                <div 
                  className={cn(
                    "absolute right-0 w-4 h-4 transform translate-x-1/2 rotate-45 z-10",
                    index < safeCurrentStageIndex ? "bg-[#3A6B4C]" : 
                    index === safeCurrentStageIndex ? "bg-[#E6DABE] border-t-2 border-r-2 border-[#3A6B4C]" : 
                    "bg-gray-100"
                  )}
                  style={{
                    borderColor: index <= safeCurrentStageIndex ? primaryColor : "#D1D5DB"
                  }}
                />
              )}
            </div>
            
            {index < safeCurrentStageIndex && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg 
                    className="w-3 h-3 text-[#3A6B4C]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="md:hidden space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Current Stage:</span>
          <span 
            className="px-3 py-1 rounded-full text-sm font-semibold" 
            style={{ backgroundColor: secondaryColor, color: primaryColor }}
          >
            {stages[safeCurrentStageIndex]}
          </span>
        </div>
        
        <div className="flex items-center justify-between relative px-4">
          <div 
            className="absolute h-1 top-1/2 left-4 right-4 transform -translate-y-1/2 bg-gray-200 z-0"
            style={{ width: `calc(100% - 2rem)` }}
          >
            <div 
              className="h-full transition-all duration-500" 
              style={{ 
                width: `${(safeCurrentStageIndex / (stages.length - 1)) * 100}%`,
                backgroundColor: primaryColor
              }}
            />
          </div>
          
          {stages.map((_, index) => (
            <div 
              key={index}
              className={cn(
                "relative z-10 w-6 h-6 rounded-full flex items-center justify-center",
                "border-2 transition-colors duration-200",
                index <= safeCurrentStageIndex ? "border-[#3A6B4C]" : "border-gray-300",
                index < safeCurrentStageIndex ? "bg-[#3A6B4C]" : "bg-white"
              )}
            >
              {index < safeCurrentStageIndex ? (
                <svg 
                  className="w-3 h-3 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span 
                  className={cn(
                    "text-xs font-medium",
                    index === safeCurrentStageIndex ? "text-[#3A6B4C]" : "text-gray-500"
                  )}
                >
                  {index + 1}
                </span>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          {stages.map((stage, index) => (
            <span 
              key={index}
              className={cn(
                "w-1/4 text-center px-1 truncate",
                index === safeCurrentStageIndex && "font-semibold text-[#3A6B4C]"
              )}
            >
              {stage}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};