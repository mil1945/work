export const truncate = (str: any, maxlength: number) => {
    if (str.length > maxlength) {
        return str.slice(0, maxlength - 3) + '...';
    }

    return str;
};
