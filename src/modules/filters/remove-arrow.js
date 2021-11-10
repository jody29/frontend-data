function removeArrow(str) {
    return typeof str === 'string' ? str.replace('>=', '') : str
} 

export default removeArrow