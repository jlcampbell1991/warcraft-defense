// src/story.js
export const STORY_TEXT = `Israeli Israel's new parliament on Wednesday took a first step to set up a state commission of inquiry into the security failures that led to Hamas's unprecedented October 7, 2023 attack, a move long opposed by caretaker Prime Minister Benjamin Netanyahu. FRANCE 24's Selina Sykes reports.`;

export function showStory() {
  // If an overlay already exists, just show it
  let overlay = document.getElementById('storyOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
    return;
  }
  overlay = document.createElement('div');
  overlay.id = 'storyOverlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '2000';
  overlay.style.color = 'white';
  overlay.style.padding = '20px';
  overlay.style.boxSizing = 'border-box';
  overlay.style.textAlign = 'center';

  const container = document.createElement('div');
  container.style.maxWidth = '800px';
  container.style.background = '#222';
  container.style.padding = '20px';
  container.style.borderRadius = '8px';
  container.style.boxShadow = '0 0 10px #000';

  const title = document.createElement('h2');
  title.textContent = 'News Story';
  container.appendChild(title);

  const paragraph = document.createElement('p');
  paragraph.textContent = STORY_TEXT;
  container.appendChild(paragraph);

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.style.marginTop = '12px';
  closeBtn.style.padding = '6px 12px';
  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
  container.appendChild(closeBtn);

  overlay.appendChild(container);
  document.body.appendChild(overlay);
}
