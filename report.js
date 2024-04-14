function printReport(pages) {
    console.log('reporting pages...');
    const pagesArray = [];
    for (const p in pages) {
        pagesArray.push(p);
    }
    pagesArray.sort((a, b) => {
        return pages[b] - pages[a];
    })

    for (const p of pagesArray) {
        const count = pages[p];
        const url = `https://${p}`;
        console.log(`Found ${count} internal links to ${url}`);
    }
}

module.exports = {
    printReport
}