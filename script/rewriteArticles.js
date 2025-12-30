/*
  Article Rewrite Script
  ----------------------
  1. Fetches articles from backend CRUD API
  2. Searches Google for article title → gets 2 reference URLs
  3. Scrapes content from reference articles
  4. Calls LLM (OpenAI/Gemini) to rewrite the original article
  5. Updates article via CRUD API with rewritten content + citations
  
  Required env vars:
  - API_BASE_URL (default: http://localhost:4000)
  - GOOGLE_API_KEY (for Custom Search)
  - GOOGLE_CX (Search Engine ID)
  - LLM_API_KEY (OpenAI or Gemini key)
  - LLM_PROVIDER (openai or gemini, default: gemini)
*/

const fetch = require('node-fetch');
const cheerio = require('cheerio');
require('dotenv').config();

const API_BASE = process.env.API_BASE_URL || 'http://localhost:4000';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
const GOOGLE_CX = process.env.GOOGLE_CX || '';
const LLM_API_KEY = process.env.LLM_API_KEY || '';
const LLM_PROVIDER = process.env.LLM_PROVIDER || 'gemini';

// ============ CRUD API Functions ============

async function fetchArticles() {
  const res = await fetch(`${API_BASE}/articles`);
  if (!res.ok) throw new Error(`Failed to fetch articles: ${res.status}`);
  return res.json();
}

async function updateArticle(id, payload) {
  const res = await fetch(`${API_BASE}/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to update article: ${res.status}`);
  return res.json();
}

// ============ Google Search Function ============

async function searchGoogle(query) {
  if (!GOOGLE_API_KEY || !GOOGLE_CX) {
    console.log('  ⚠️  Google API keys not configured, using mock references');
    return [
      'https://www.ibm.com/topics/chatbots',
      'https://www.salesforce.com/blog/what-is-a-chatbot/'
    ];
  }

  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(query)}&num=5`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      console.log('  ⚠️  No Google results found');
      return [];
    }

    // Filter for blog/article URLs (not the original site)
    const refs = data.items
      .filter(item => !item.link.includes('beyondchats.com'))
      .slice(0, 2)
      .map(item => item.link);

    return refs;
  } catch (err) {
    console.error('  ❌ Google search failed:', err.message);
    return [];
  }
}

// ============ Web Scraping Function ============

async function scrapeUrl(url) {
  try {
    const res = await fetch(url, { 
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ArticleBot/1.0)' }
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    // Remove scripts, styles, nav, footer
    $('script, style, nav, footer, header, aside').remove();

    // Try to get main content
    let content = '';
    const selectors = ['article', 'main', '.content', '.post-content', '.entry-content'];
    for (const sel of selectors) {
      const text = $(sel).text().trim();
      if (text && text.length > content.length) {
        content = text;
      }
    }

    // Fallback
    if (!content || content.length < 200) {
      content = $('body').text().trim();
    }

    // Clean and truncate
    content = content.replace(/\s+/g, ' ').slice(0, 5000);
    return content;
  } catch (err) {
    console.error(`  ❌ Failed to scrape ${url}:`, err.message);
    return '';
  }
}

// ============ LLM Rewrite Functions ============

async function rewriteWithGemini(original, references) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${LLM_API_KEY}`;
  
  const prompt = `You are an expert content writer. Rewrite the following article to make it more engaging and informative. 
Use the reference articles to enhance the content with additional insights, but maintain the original article's core message.
Match the professional tone and formatting style of the reference articles.
Make the content comprehensive yet easy to read.

ORIGINAL ARTICLE:
${original.slice(0, 4000)}

REFERENCE ARTICLE 1:
${references[0]?.slice(0, 2000) || 'No reference available'}

REFERENCE ARTICLE 2:
${references[1]?.slice(0, 2000) || 'No reference available'}

Please rewrite the article now. Output ONLY the rewritten article content, no explanations.`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
      }
    })
  });

  const data = await res.json();
  
  if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }
  
  throw new Error('Gemini API returned invalid response');
}

async function rewriteWithOpenAI(original, references) {
  const url = 'https://api.openai.com/v1/chat/completions';
  
  const prompt = `You are an expert content writer. Rewrite the following article to make it more engaging and informative. 
Use the reference articles to enhance the content with additional insights, but maintain the original article's core message.
Match the professional tone and formatting style of the reference articles.

ORIGINAL ARTICLE:
${original.slice(0, 4000)}

REFERENCE ARTICLE 1:
${references[0]?.slice(0, 2000) || 'No reference available'}

REFERENCE ARTICLE 2:
${references[1]?.slice(0, 2000) || 'No reference available'}

Output ONLY the rewritten article content.`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LLM_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2048
    })
  });

  const data = await res.json();
  
  if (data.choices && data.choices[0]?.message?.content) {
    return data.choices[0].message.content;
  }
  
  throw new Error('OpenAI API returned invalid response');
}

async function rewriteWithLLM(original, references) {
  if (!LLM_API_KEY) {
    console.log('  ⚠️  LLM API key not configured, returning mock rewrite');
    return `[REWRITTEN VERSION]\n\n${original.slice(0, 500)}...\n\n[This is a placeholder. Configure LLM_API_KEY to enable AI rewriting.]`;
  }

  try {
    if (LLM_PROVIDER === 'openai') {
      return await rewriteWithOpenAI(original, references);
    } else {
      return await rewriteWithGemini(original, references);
    }
  } catch (err) {
    console.error('  ❌ LLM rewrite failed:', err.message);
    return null;
  }
}

// ============ Main Process ============

async function main() {
  console.log('🚀 Starting article rewrite process...\n');
  
  // Check configuration
  console.log('📋 Configuration:');
  console.log(`   API Base: ${API_BASE}`);
  console.log(`   Google API: ${GOOGLE_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   LLM Provider: ${LLM_PROVIDER}`);
  console.log(`   LLM API Key: ${LLM_API_KEY ? '✅ Configured' : '❌ Not configured'}\n`);

  // Fetch articles
  console.log('📥 Fetching articles from backend...');
  const articles = await fetchArticles();
  console.log(`   Found ${articles.length} articles\n`);

  if (articles.length === 0) {
    console.log('❌ No articles found. Run scrape.js first.');
    return;
  }

  // Process each article
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    console.log(`\n[${ i + 1}/${articles.length}] Processing: ${article.title}`);
    
    // Skip if already rewritten
    if (article.rewrittenContent && !article.rewrittenContent.includes('[REWRITTEN VERSION]')) {
      console.log('   ⏭️  Already rewritten, skipping');
      continue;
    }

    // Step 1: Google search
    console.log('   🔍 Searching Google for references...');
    const refUrls = await searchGoogle(article.title);
    console.log(`   📎 Found ${refUrls.length} reference URLs`);

    // Step 2: Scrape reference articles
    console.log('   📄 Scraping reference content...');
    const refContents = [];
    for (const url of refUrls) {
      const content = await scrapeUrl(url);
      if (content) {
        refContents.push(content);
        console.log(`      ✅ ${url.slice(0, 50)}...`);
      }
    }

    // Step 3: Rewrite with LLM
    console.log('   🤖 Rewriting with LLM...');
    const rewritten = await rewriteWithLLM(article.originalContent || '', refContents);
    
    if (!rewritten) {
      console.log('   ❌ Rewrite failed, skipping');
      continue;
    }

    // Step 4: Add citations and update
    const citations = refUrls.length > 0 ? refUrls : ['No external references used'];
    const finalContent = `${rewritten}\n\n---\n\n**References:**\n${refUrls.map((url, idx) => `${idx + 1}. ${url}`).join('\n')}`;

    console.log('   💾 Saving to database...');
    await updateArticle(article._id, {
      rewrittenContent: finalContent,
      citations: refUrls
    });
    
    console.log('   ✅ Article updated successfully!');
    
    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n\n🎉 All articles processed!');
}

main().catch(console.error);
