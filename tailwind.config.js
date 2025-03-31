/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                md: '2rem',
                lg: '4rem'
            }
        },
        screens: {
            sm: '375px',
            md: '768px',
            lg: '1200px'
        },
        extends: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
        },
    },
    plugins: [],
}