export const parseError = (error: any) => {
    try {
        return (error?.message || error.error || error).toString();
    } catch (e) {
        return '';
    }
};
