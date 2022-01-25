export function formatStringDate(input: string) {
    const dateVersion = new Date(input);
    if (!dateVersion) return input;
    return dateVersion.toLocaleDateString();
}

export function formatStringTime(input: string) {
    const dateVersion = new Date(input);
    if (!dateVersion) return input;
    return dateVersion.toLocaleTimeString();
}

// Todo: Use the .env file in dev too, but currently causing interesting Cors issues.
export const webApiUrl =
    process.env.NODE_ENV === "development" ? "https://localhost:7014/api" : process.env.REACT_APP_API_URL;

export function isNullOrWhitespace(inputStr: any) {
    return !inputStr || !inputStr.trim();
}
