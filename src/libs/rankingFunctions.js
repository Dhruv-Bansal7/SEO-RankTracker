const puppeteer = require("puppeteer");

export async function getKeywordRank(domain, keyword) {
    const browser = await puppeteer.launch({
        headless: "shell", // Use new headless mode for better real-browser behavior
        args: [],
        defaultViewport : {width : 1280 , height : 800}
    });
    const page = await browser.newPage();

    let found = false;
    let position = -1;
    let currentPage = 1;
    const resultsPerPage = 10;
    
    // Loop through 10 pages
    while (currentPage <= 10 && !found) {
        const start = (currentPage - 1) * resultsPerPage;
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}&start=${start}`;
        
        await page.goto(searchUrl,{timeout:60000});
        // Extract search results
        const results = await page.$$eval('#search a > h3', elems => {
            return elems.map(h3 => {
                const title = h3.innerText;
                const link = h3.parentElement.href;
                return { title, link };
            });
        });

        // Check if the domain is in the current page of results
        position = results.findIndex(resultItem => resultItem.link.includes(domain));
        if (position !== -1) {
            position += start + 1; // Adjust the position for the overall ranking
            found = true;
        }

        currentPage++;
    }

    await page.close();
    await browser.close();

    const ans = position === -1 ? 0 : position;
    console.log({ ans, domain, keyword });
    return ans;
}
