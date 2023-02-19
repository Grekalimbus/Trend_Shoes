const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refreshToken";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const BALANCE = "balance";
const AMOUNT = "amount";

export function setTokens({
    refreshToken,
    accessToken,
    userId,
    expiresIn = 3600,
    balance
}) {
    // expiresDate - момент, к которому истечёт expiresIn
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USERID_KEY, userId);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
    localStorage.setItem(BALANCE, balance);
}
export function deleteTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(BALANCE);
}
export function getAmount() {
    localStorage.getItem(AMOUNT);
}
export function setBalance(newBalance) {
    localStorage.setItem(BALANCE, newBalance);
}
export function getBalance() {
    return localStorage.getItem(BALANCE);
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
    getAmount,
    deleteTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getBalance,
    setBalance,
    getUserId
};
export default localStorageService;
