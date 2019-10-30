const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    plugins: [
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
        purgecss({
          content: ['public/index.html', 'src/**/*.tsx'],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        }),
    ],
};
