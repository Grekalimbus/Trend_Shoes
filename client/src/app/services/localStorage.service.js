const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refreshToken";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const AMOUNT = "amount";

export function setTokens({
    refreshToken,
    accessToken,
    userId,
    expiresIn = 3600
}) {
    // expiresDate - момент, к которому истечёт expiresIn
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USERID_KEY, userId);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}
export function deleteTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}
export function getAmount() {
    localStorage.getItem(AMOUNT);
}
export function setAmount(balance) {
    localStorage.setItem(AMOUNT, balance);
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}
export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

const localStorageService = {
    setTokens,
    setAmount,
    getAmount,
    deleteTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId
};
export default localStorageService;
