const Parser = require('rss-parser');

// Initialize with User-Agent to avoid 403 Forbidden from some servers
const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
    timeout: 5000, // 5 second timeout
});

const FEED_URLS = [
    'https://rss.sciencedaily.com/health_medicine.xml', // Often more reliable for bots
    'https://www.medicalnewstoday.com/feed/featured',
    'http://feeds.bbci.co.uk/news/health/rss.xml'
];

exports.getHealthNews = async (req, res) => {
    let feed = null;
    let successUrl = null;

    // Try feeds sequentially until one works
    for (const url of FEED_URLS) {
        try {
            console.log(`Attempting to fetch RSS from: ${url}`);
            feed = await parser.parseURL(url);
            if (feed && feed.items && feed.items.length > 0) {
                successUrl = url;
                break; // Stop if successful
            }
        } catch (err) {
            console.warn(`Failed to fetch ${url}: ${err.message}`);
            // Continue to next feed
        }
    }

    if (!feed) {
        console.error("All RSS feeds failed.");
        return res.status(500).json({
            success: false,
            message: "Unable to fetch news from any source. Please try again later.",
            data: [] // Return empty array so frontend doesn't crash on map
        });
    }

    try {
        // Transform to our simple format
        const articles = feed.items.slice(0, 3).map(item => ({
            id: item.guid || item.link || Math.random().toString(),
            title: item.title,
            snippet: item.contentSnippet || item.content || "No summary available.",
            source: feed.title || 'Health News',
            link: item.link,
            date: item.pubDate ? new Date(item.pubDate).toLocaleDateString() : 'Recent'
        }));

        res.status(200).json({
            success: true,
            data: articles
        });
    } catch (transformError) {
        console.error("RSS Transform Error:", transformError);
        res.status(500).json({
            success: false,
            message: "Error processing news data",
            error: transformError.message
        });
    }
};
