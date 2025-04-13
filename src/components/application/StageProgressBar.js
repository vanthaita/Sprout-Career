import React from 'react';
import { cn } from "@/lib/utils";

const getStageClasses = (index, currentIndex) => {
    if (index < currentIndex) {
        return "bg-[#E6DABE]";
    } else if (index === currentIndex) {
        return "bg-[#3A6B4C] text-white"; 
    } else {
        return "bg-[#E6DABE] opacity-70"; 
    }
};

export const StageProgressBar = ({ stages = [], currentStageIndex = 0 }) => {
    if (!stages || stages.length === 0) {
        return null;
    }

    return (
        <div className="w-full overflow-hidden p-2 md:p-4">
            <div className="flex flex-col md:flex-row w-full">
                {stages.map((stage, index) => (
                    <div
                        key={index}
                        className={cn(
                            "relative flex items-center justify-center h-12 md:h-14 text-xs md:text-sm font-medium text-center transition-colors duration-200",
                            getStageClasses(index, currentStageIndex),
                            "clip-path-chevron",
                            "w-full mb-1 md:mb-0",
                            "md:flex-1 md:min-w-[120px]",
                            index > 0 && "md:ml-[-8px]",
                            index === 0 && "rounded-t md:rounded-l md:rounded-tr-none",
                            index === stages.length - 1 && "rounded-b md:rounded-r md:rounded-bl-none"
                        )}
                        style={{
                            zIndex: stages.length - index,
                        }}
                    >
                        <span className="px-2 z-10 relative truncate">
                            {stage}
                            <span className="md:hidden ml-2">
                                {index === currentStageIndex ? "✓" : ""}
                            </span>
                        </span>
                        {index < currentStageIndex && (
                            <div className="md:hidden absolute top-0 right-0 bg-[#3A6B4C] w-2 h-full"></div>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="flex justify-between mt-1 text-xs text-gray-500 md:hidden">
                {stages.map((_, index) => (
                    <span key={index} className={cn(
                        "w-6 h-6 flex items-center justify-center rounded-full",
                        index <= currentStageIndex ? "bg-[#3A6B4C] text-white" : "bg-gray-200"
                    )}>
                        {index + 1}
                    </span>
                ))}
            </div>
        </div>
    );
};