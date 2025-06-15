export const uuidv4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const initFromLocalStorage = (): [] => 
    JSON.parse(localStorage.getItem("journalData") ?? '[]');

export const checkLocalStorage = (): boolean =>
    !!localStorage.getItem("journalData");

export const setLocalStorage = (data: object[]): void => {
    localStorage.removeItem('journalData');
    localStorage.setItem("journalData", JSON.stringify(data));
}

export const clearLocalStorage = (): void => 
    localStorage.clear();