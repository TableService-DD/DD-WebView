/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.js',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6A00',
        menuSection: '#EFEFEF',
        textGray: '#343434',
        grayLight: '#848484',
      },
    },
  },
  plugins: [],
};
