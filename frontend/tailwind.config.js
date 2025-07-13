/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,scss,ts}'],
    theme: {
        extend: {
            colors: {
                'black-palette': {
                    50:'#e0e0e0',
                    100:'#b3b3b3',
                    200:'#808080',
                    300:'#4d4d4d',
                    400:'#262626',
                    500:'#000000',
                    600:'#000000',
                    700:'#000000',
                    800:'#000000',
                    900:'#000000',
                },
            },
        },
    },
    plugins: [],
};
