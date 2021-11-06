function removeSpace(str) {
    return typeof str === 'string' ? str.split(' ').join('') : str
}

export default removeSpace