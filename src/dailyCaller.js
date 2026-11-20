// src/dailyCaller.js
// Implements fetching a short news snippet from The Daily Caller and displaying it in a modal.

const API_ENDPOINT = 'https://api.dailycaller.com/v1/latest'; // Placeholder endpoint; replace with real API if available.

/**
 * Fetch the latest article data.
 * Expected JSON shape: { title: string, excerpt: string, url: string }
 */
export async function fetchDailyCallerArticle() {
  try {
    const response = await fetch(API_ENDPOINT, { mode: 'cors' });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();
    // Guard against missing fields
    const title = data.title || 'Untitled';
    const excerpt = data.excerpt || '';
    const url = data.url || '#';
    return { title, excerpt, url };
  } catch (err) {
    console.error('Failed to fetch Daily Caller article:', err);
    throw err;
  }
}

/**
 * Show the Daily Caller modal with fetched content.
 */
export async function showDailyCaller() {
  const modal = document.getElementById('dailyCallerModal');
  const body = document.getElementById('dailyCallerBody');
  if (!modal || !body) {
    console.error('Daily Caller modal elements not found');
    return;
  }
  // Show loading state
  body.innerHTML = '<p>Loading…</p>';
  modal.style.display = 'flex';
  try {
    const { title, excerpt, url } = await fetchDailyCallerArticle();
    body.innerHTML = `
      <h2>${title}</h2>
      <p>${excerpt}</p>
      <p><a href="${url}" target="_blank" style="color:#4af;">Read full article</a></p>
    `;
  } catch (e) {
    body.innerHTML = '<p>Unable to load Daily Caller news. Please try again later.</p>';
  }
}
