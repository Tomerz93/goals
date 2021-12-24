
const parseToJSON = (doc: any) => {
    const data = doc.data();
    return {
        ...data,
        createdAt: data?.createdAt.toMills() ?? 0,
        updatedAt: data?.updatedAt.toMills() ?? 0,
    };
};
export {
    parseToJSON
}  