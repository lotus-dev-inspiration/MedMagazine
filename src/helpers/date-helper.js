const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
}

export const getTime = (date) => {
    return new Date(date).getTime();
}

export const getYear = (date) => {
    return new Date(date).getFullYear();
}

export const getDate = (date) => {
    return new Date(date).getDate();
}

export const getMonthName = (date) => {
    return months[new Date(date).getMonth()];
}

export const getMonthNumber = (date) => {
    return new Date(date).getMonth() + 1;
}