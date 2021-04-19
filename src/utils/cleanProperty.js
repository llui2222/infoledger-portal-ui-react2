export const cleanProperty = (obj) => {
    const propNames = Object.getOwnPropertyNames(obj);
    const result = {}
    for (let i = 0; i < propNames.length; i++) {
        const propName = propNames[i];
        if (obj[propName] !== null && obj[propName] !== undefined) {
            result[propName] = obj[propName]
        }
    }

    return result
}