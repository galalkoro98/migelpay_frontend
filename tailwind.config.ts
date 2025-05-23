import type { Config } from "tailwindcss";
import * as rtl from "tailwindcss-rtl";

export default {
    content: [
        "./src/index/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/config/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [rtl],
    darkMode: "class",
    safelist: [
        'bg-gray-900',
        'bg-gray-800',
        'bg-gray-700',
        'bg-gray-600',
        'bg-gray-500',
        'bg-gray-400',
        'bg-gray-300',
        'bg-gray-200',
        'bg-gray-100',
        'text-white',
        'text-gray-900',
        'text-gray-800',
        'text-gray-700',
        'text-gray-600',
        'text-gray-500',
        'text-gray-400',
        'text-gray-300',
        'text-gray-200',
        'text-gray-100'
    ],
} satisfies Config;
