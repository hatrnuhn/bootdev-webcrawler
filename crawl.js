const { JSDOM } = require('jsdom')

function normalizeURL(url) {
    const urlObj = new URL(url);

    // normalize protocol and space in search
    let path = `${urlObj.hostname}${urlObj.pathname}${urlObj.search}`;

    // normalize slash
    path = (path.slice(-1) === '/') ? path.slice(0, -1) : path;

    return path;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const rootURL = new URL(baseURL);
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');

    anchors.forEach((a, i) => {
        try {
            let url = null;
            if (!a.hostname) {
                if (a.href[0] !== '/') {
                    return;
                }

                url = new URL(a.href, rootURL).href;
            } else {
                url = a.href;
            }

            if (!urls.includes(url)) {
                urls.push(url);
            }
        } catch (err) {
            throw err;
        }
    })

    return urls;
}

async function crawlPage(baseURL, currentURL, pages) {
    const base = new URL(baseURL);
    const current = new URL(currentURL);
    if (base.hostname !== current.hostname) {
        return pages;
    }

    const currentNorm = normalizeURL(currentURL);
    if (currentNorm in pages) {
        pages[currentNorm]++;
        return pages;
    } else {
        pages[currentNorm] = 1;
    }

    console.log(`crawling ${currentURL}`);

    let resp = null;
    try {
        resp = await fetch(currentURL);
        
        if (resp.status < 200 && resp.status > 299) {
            throw new Error(`request failed: ${resp.status}`);
        }

        const contentType = resp.headers.get('Content-Type');

        if (!contentType.includes('text/html')){
            throw new Error(`non-html response: ${contentType}`);
        }
    } catch (err) {
        console.log(err.message);
        return pages;
    }

    const urls = getURLsFromHTML(await resp.text(), currentURL);

    for (const url of urls) {
        pages = await crawlPage(baseURL, url, pages);
    }

    return pages;
}

module.exports = {
    crawlPage,
    normalizeURL,
    getURLsFromHTML
}