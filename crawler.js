const HCCrawler = require('headless-chrome-crawler');
const RedisCache = require('headless-chrome-crawler/cache/redis');
const JSONLineExporter = require('headless-chrome-crawler/exporter/json-line');

const FILE = './tmp/result.json';

const exporter = new JSONLineExporter({
    file: FILE,
    fields: ['options', 'response'],
});

const cache = new RedisCache({ host: '127.0.0.1', port: 6379 });

(async () => {
    const crawler = await HCCrawler.launch({
        persistCache: true, // Set true so that cache won't be cleared when closing the crawler
        cache,
        exporter,
        // Function to be evaluated in browsers
        evaluatePage: (() => {

        }),
        // Function to be called with evaluated results from browsers
        onSuccess: (result => {
            console.log(result);
        }),
    });
    // Queue a request
    // await crawler.queue('https://m.weibo.cn/');
    await crawler.queue('https://www.toutiao.com/');
    // Queue multiple requests
    // await crawler.queue(['https://example.net/', 'https://example.org/']);
    // Queue a request with custom options
    // await crawler.queue({
    //     url: 'https://m.weibo.cn/',
    //     // Enable screenshot by passing options
    //     screenshot: {
    //
    //     },
    // });
    await crawler.onIdle(); // Resolved when no queue is left
    await crawler.close(); // Close the crawler
})();