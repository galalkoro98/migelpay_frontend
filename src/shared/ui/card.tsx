import React, { ReactNode } from 'react';

// Card Component
export function Card({ children, className = "" }: { children: ReactNode, className?: string }) {
    return (
        <div className={`p-6  rounded-xl shadow-lg border ${className}`}>
            {children}
        </div>
    );
}