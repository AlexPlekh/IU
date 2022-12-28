export const isAdult = (dateOfBirth: Date | null) => {
    if (dateOfBirth) return new Date(Date.now() - +dateOfBirth).getFullYear() - 1970 >= 18;
    return false;
};
