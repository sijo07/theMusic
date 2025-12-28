/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Deep background palette (Matte Black / Grey)
                deep: '#121212',
                midnight: '#18181b',
                slate: '#27272a',

                // Glass settings (usually controlled via opacity in class, but we can define presets)
                glass: 'rgba(255, 255, 255, 0.05)',
                glassBorder: 'rgba(255, 255, 255, 0.1)',

                // Neons
                neonPink: '#ff00cc',
                neonBlue: '#3333ff',
                neonPurple: '#bf00ff',

                textBase: '#FFFFFF',
                textSubdued: 'rgba(255, 255, 255, 0.6)',
            },
            fontFamily: {
                sans: ['"Outfit"', '"Circular Std"', 'sans-serif'], // More modern/geometric
                display: ['"Syne"', 'sans-serif'], // For big headers
            },
            backgroundImage: {
                'main-gradient': 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'neon': '0 0 10px rgba(255, 0, 204, 0.5), 0 0 20px rgba(255, 0, 204, 0.3)',
            }
        },
    },
    plugins: [],
}
