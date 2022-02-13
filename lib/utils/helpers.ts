const getUniqueId = () => Math.random().toString(36).slice(2, 9);
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export {
    getUniqueId,
    capitalize

}