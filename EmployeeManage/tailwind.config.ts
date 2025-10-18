import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'header-bg': '#4149b2',
                'sidebar-bg': '#0092bd',
                'sidebar-hover': '#007fcb',
                'sidebar-active': '#0068c8',
                'content-bg': '#f3f4fc',
            }
        },
    },
    plugins: [],
}

export default config;