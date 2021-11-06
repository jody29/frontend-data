function removeCaps(str) { // function that has a string as parameter and returns this string in lowercase
    return typeof str === 'string' ? str.toLowerCase() : str 
} // i am using a ternary operator instead of an if/else statement here because this is shorter

export default removeCaps