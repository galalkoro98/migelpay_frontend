import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
    className?: string;
}
export function Button({ children, onClick, className = "" }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-3 rounded-lg font-semibold  transition duration-300 ${className}`}
        >
            {children}
        </button>
    );
}