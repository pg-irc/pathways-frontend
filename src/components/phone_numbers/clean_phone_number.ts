export const cleanPhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber === '(none)') {
        return '';
    }
    const semicolon = phoneNumber.indexOf(';');
    if (semicolon > 0) {
        return phoneNumber.substring(0, semicolon);
    }
    const space = phoneNumber.indexOf(' ');
    if (space > 0) {
        return phoneNumber.substring(0, space);
    }
    return phoneNumber;
};
