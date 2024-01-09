function CleanString(text) {
    // This regex pattern matches any character that is not a letter, number, whitespace, or null character
    const pattern = /[^a-zA-Z0-9\s]|\x00/g;
    const cleanedText = text.replace(pattern, '');
    return cleanedText;
}
module.exports = CleanString;