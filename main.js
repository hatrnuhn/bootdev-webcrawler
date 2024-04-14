const { crawlPage } = require('./crawl.js');
const { argv } = require('node:process');
const { printReport } = require('./report.js');


function main(){
    try {
        if (argv.length < 3) {
            console.log('missing website argument!');
            return;
        } else if (argv.length > 3) {
            console.log('too many arguments!');
            return;
        }
    
        const baseURL = argv[2];
        console.log(`starting crawler on: ${baseURL}`);
        const pages = crawlPage(baseURL, baseURL, {});
        pages.then((pages) => {
            printReport(pages);
        });
    } catch (err) {
        console.log(err.message);
    }
}

main()
