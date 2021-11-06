function removeStripes(str) {
    return typeof str === 'string' ? str.replaceAll('-', '') : str
}

export default removeStripes