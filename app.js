const fs = require('fs');
const chalk = require('chalk');

// TODO: Import required modules
// Hint: You will need the 'fs' module for reading the file and the 'chalk' library for coloring the words.

/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    return fs.readFileSync('declaration.txt', 'utf8');
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    const wordCount = {};
    const words = content.split(/\W+/).filter(Boolean); // Splitting by non-word characters.

    for (const word of words) {
        const lowerCaseWord = word.toLowerCase();
        if (wordCount[lowerCaseWord]) {
            wordCount[lowerCaseWord]++;
        } else {
            wordCount[lowerCaseWord] = 1;
        }
    }

    return wordCount;
}

/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    if (count === 1) {
        return chalk.blue(word);
    } else if (count >= 2 && count <= 5) {
        return chalk.green(word);
    } else {
        return chalk.red(word);
    }
}

/**
 * Prints the first 15 lines of the content with colored words.
 * @param {string} content The file content.
 * @param {Object} wordCount The word occurrences.
 */
function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        const coloredLine = line.split(/\W+/).filter(Boolean).map(word => {
            return colorWord(word, wordCount[word.toLowerCase()] || 0);
        }).join(' ') + ' ';  // Ensure a trailing space

        console.log(coloredLine);
    }
}


/**
 * Main function to read the file, count the word occurrences and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    // This will execute only if the file is run directly.
    processFile();
}

// TODO: Export the functions for testing
// Hint: You can use the 'module.exports' syntax.

module.exports = {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines
};
