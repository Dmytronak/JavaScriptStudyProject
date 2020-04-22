
export const yearRangeValidator = (value: number):boolean => {
    let maxYear = new Date().getFullYear();
    let minYear = 1920;
    if (value > maxYear || value < minYear) {
        return true;
    } 
    return false;
}

