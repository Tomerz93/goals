const getIsMinLength = (minLength: number) => (val: string) =>
    val.length >= minLength || `Must be at least ${minLength} characters`;

export { getIsMinLength }