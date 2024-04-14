function normalizeURL(url) {
    const urlObj = new URL(url);

    // normalize protocol and space in search
    let path = `${urlObj.hostname}${urlObj.pathname}${urlObj.search}`;

    // normalize slash
    path = (path.slice(-1) === '/') ? path.slice(0, -1) : path;

    return path;

}


module.exports = {
    normalizeURL
}