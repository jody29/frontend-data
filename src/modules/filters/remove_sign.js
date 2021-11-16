function removeSign(str) {
    return typeof str === 'string' ? str.replace('(O.)', '') : str
}

export default removeSign