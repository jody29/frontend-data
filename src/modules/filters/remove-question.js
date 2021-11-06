function removeQuestionMark(str) { // function removes question marks
    return typeof str === 'string' ? str.replaceAll('?', '') : str
} // checks if the parameter is a string. If true then remove all question marks. If not true then return string

export default removeQuestionMark