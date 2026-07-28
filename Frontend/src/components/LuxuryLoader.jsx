import React from 'react';

export const LuxurySpinner = ({ size = 'md', className = '' }) => {
    const dimensions = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-10 h-10' : 'w-6 h-6';
    return (
        <div className={`inline-block ${dimensions} ${className}`}>
            <div className="w-full h-full border-2 border-[#C9A96E]/20 border-t-[#C9A96E] rounded-full animate-spin" />
        </div>
    );
};

export const ProductSkeleton = () => {
    return (
        <div className="flex flex-col animate-pulse">
            <div className="aspect-[4/5] bg-[#eae8e5] w-full mb-6" />
            <div className="h-5 bg-[#eae8e5] w-3/4 mb-3" />
            <div className="h-3 bg-[#eae8e5] w-full mb-2" />
            <div className="h-3 bg-[#eae8e5] w-1/2 mb-4" />
            <div className="h-4 bg-[#eae8e5] w-1/4" />
        </div>
    );
};

export const ProductGridSkeleton = ({ count = 4 }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 pb-32">
            {Array.from({ length: count }).map((_, idx) => (
                <ProductSkeleton key={idx} />
            ))}
        </div>
    );
};
