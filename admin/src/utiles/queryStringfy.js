const queryStringfy = (obj) => {
    return '?' + Object.keys(obj).reduce((total, curr) => {
        return [...total,`${curr}=${obj[curr]}`]
    }, []).join('&')
}
export default queryStringfy

