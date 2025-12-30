/*
  Scraper for BeyondChats Blog
  --------------------------------
  Navigates to the LAST page of https://beyondchats.com/blogs/,
  collects the 5 oldest articles, extracts title and full content,
  then sends to backend CRUD API.
*/

const fetch = require('node-fetch');
const cheerio = require('cheerio');
require('dotenv').config();

const API_BASE = process.env.API_BASE_URL || 'http://localhost:4000';
const BLOG_BASE = 'https://beyondchats.com/blogs/';

// Helper: extract article links from a page
function extractArticleLinks($) {
  const links = [];
  $('a[href*="/blogs/"]').each((_, el) => {
    const href = $(el).attr('href') || '';
    // Match individual blog posts, not tag/category/page links
    if (
      href.match(/\/blogs\/[a-z0-9-]+\/?$/) &&
      !href.includes('/tag/') &&
      !href.includes('/page/') &&
      !href.includes('/author/')
    ) {
      const full = href.startsWith('http') ? href : `https://beyondchats.com${href}`;
      links.push(full);
    }
  });
  return [...new Set(links)];
}

// Helper: scrape full article content
async function scrapeArticle(url) {
  try {
    const res = await fetch(url, { timeout: 15000 });
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $('h1').first().text().trim() || url.split('/').filter(Boolean).pop();
    
    // Try to get article content from common selectors
    let content = '';
    const selectors = ['article', '.entry-content', '.post-content', '.blog-content', 'main'];
    for (const sel of selectors) {
      const text = $(sel).first().text().trim();
      if (text && text.length > content.length) {
        content = text;
      }
    }
    
    // Fallback to body text
    if (!content || content.length < 200) {
      content = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 8000);
    }

    return { title, url, content };
  } catch (err) {
    console.error(`Failed to scrape ${url}:`, err.message);
    return null;
  }
}

// Find last page number
async function findLastPage() {
  const res = await fetch(BLOG_BASE);
  const html = await res.text();
  const $ = cheerio.load(html);
  
  let maxPage = 1;
  $('a[href*="/page/"]').each((_, el) => {
    const href = $(el).attr('href') || '';
    const match = href.match(/\/page\/(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxPage) maxPage = num;
    }
  });
  
  return maxPage;
}

async function scrape() {
  console.log('🔍 Finding last page of BeyondChats blog...');
  const lastPage = await findLastPage();
  console.log(`📄 Last page is: ${lastPage}`);

  // Collect articles from last pages (work backwards to get oldest)
  let allArticleUrls = [];
  for (let page = lastPage; page >= Math.max(1, lastPage - 2) && allArticleUrls.length < 10; page--) {
    const pageUrl = page === 1 ? BLOG_BASE : `${BLOG_BASE}page/${page}/`;
    console.log(`📖 Scanning page ${page}...`);
    
    try {
      const res = await fetch(pageUrl);
      const html = await res.text();
      const $ = cheerio.load(html);
      const links = extractArticleLinks($);
      allArticleUrls = allArticleUrls.concat(links);
    } catch (err) {
      console.error(`Failed to fetch page ${page}:`, err.message);
    }
  }

  // Deduplicate and take 5 oldest (from bottom of list)
  allArticleUrls = [...new Set(allArticleUrls)];
  const oldest5 = allArticleUrls.slice(-5);
  console.log(`\n✅ Found ${oldest5.length} oldest articles:`);
  oldest5.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));

  // Scrape each article and save to backend
  console.log('\n📝 Scraping article content...');
  for (const url of oldest5) {
    const article = await scrapeArticle(url);
    if (!article) continue;

    console.log(`  → ${article.title}`);
    
    try {
      const saveRes = await fetch(`${API_BASE}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article.title,
          url: article.url,
          originalContent: article.content
        })
      });
      
      if (!saveRes.ok) {
        console.error(`    ❌ Failed to save: ${saveRes.status}`);
      } else {
        console.log(`    ✅ Saved to database`);
      }
    } catch (err) {
      console.error(`    ❌ API error: ${err.message}`);
    }
  }

  console.log('\n🎉 Scraping complete!');
}

scrape().catch(console.error);
