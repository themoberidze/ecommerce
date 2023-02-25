import decode from "jwt-decode";

export const checkTokenValidity = (token) => {
    const expirationDate = decode(token).exp;
    const isExpired = expirationDate * 1000 < new Date().getTime();
    return isExpired;
};

export const getUserInitials = (firstName, LastName) => {
    if (!firstName || !LastName) {
        return "";
    }
    const initials = `${firstName.charAt(0)}${LastName.charAt(0)}`
    return initials.toUpperCase();
};

export const isUserAdmin = (userInfo) => {
    return userInfo?.role?.includes("admin");
};
