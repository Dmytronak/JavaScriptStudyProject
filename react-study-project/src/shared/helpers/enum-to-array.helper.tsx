export const EnumToArrayHelper = (data: Object): number[] => {
    const response = Object.keys(data)
        .map(x => parseInt(x))
        .filter(x => !isNaN(x));
    return response;
}