export const userNameValidation = (username) => {
    if (username.indexOf('@') > -1) {
        return false;
    } else {
        return true;
    }
}

export const fieldLengthValidation = (word) => {
    if (word.length < 3) {
        return false;
    } else {
        return true;
    }
}

export const emailValidation = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const fileValidation = (file, format, size) => {
    if (!file || !file.type.includes(format) || file.size > size * 1000000) {
        return false;
    }
    return true;
}

export const descriptionValidation = (description) => {
    return description.length > 500;
}
