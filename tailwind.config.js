/** @type {import('tailwindcss').Config} */
export default {
    // 🔥 IMPORTANT: Enables dark mode using class
    darkMode: "class",

    // 🔍 Tell Tailwind where to scan files
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            // Optional: you can add custom colors/fonts here later
        },
    },

    plugins: [],
};