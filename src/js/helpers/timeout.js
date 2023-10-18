export const clearTimeOutArray = (timeOutArray) => {
    timeOutArray.forEach(element => {
        clearTimeout(element)
    });
}