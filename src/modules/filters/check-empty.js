function checkIfEmpty(str) { // funnction checks if a string is empty. If this is true, the function will return 'geen antwoord'
    return typeof str === 'string' && str.length < 1 ? 'geen antwoord' : str
} 

export default checkIfEmpty