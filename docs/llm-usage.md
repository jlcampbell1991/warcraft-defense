# Using Large Language Models (LLMs) in **warcraft‑defense**

## Overview
Large Language Models (LLMs) such as OpenAI’s GPT‑4 family can augment **warcraft‑defense** in several ways:
- **AI‑assisted level design** – generate enemy wave configurations or map layouts.
- **Dynamic dialogue** – produce contextual NPC chatter or flavor text.
- **Strategic hints** – give players real‑time tactical advice during a match.

This guide explains **why** you might want to call an LLM, **where** to hook it into the existing codebase, and provides a **minimal, copy‑pasteable example**.

---

## Integration Points
| Area | Typical Use‑Case | Where to Call |
|------|------------------|---------------|
| `src/ui.js` | Show a “Hint” button that fetches a tactical tip. | Inside the click‑handler or a helper exported from UI.
| Development scripts (e.g., `scripts/generate‑waves.js`) | Auto‑generate enemy wave JSON files. | Stand‑alone Node script that writes to `src/data/`.
| `src/entities/` (optional) | Enrich unit descriptions or back‑story text. | When constructing a unit object, call a helper that returns a description.

> **Note** – The codebase currently has no LLM wrapper. The snippets below use a plain `fetch` call; you can replace it with a dedicated client library if desired.

---

## Example: Fetch a Tactical Hint
```js
// docs/llm-usage.md – Example: Get a tactical hint from OpenAI
async function getTacticalHint(gameState) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
  }

  const prompt = `You are an AI advisor for a tower‑defense game.
Current wave: ${gameState.wave}
Player towers: ${gameState.towers.map(t => t.type).join(', ')}
Provide a short tactical hint (max 2 sentences).`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 60,
    }),
  });

  if (!response.ok) {
    // Basic rate‑limit handling – callers can retry with back‑off
    throw new Error(`OpenAI request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() ?? '';
}
```
*Place this function in a utility module (e.g., `src/llm.js`) and import it where needed, such as the UI hint button handler.*

---

## Required Configuration
| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` (or `process.env.OPENAI_API_KEY`) | Your secret key for the OpenAI HTTP API. **Never commit** this value to source control.
| Optional `LLM_ENDPOINT` | Override the default `https://api.openai.com/v1/chat/completions` for self‑hosted models.

Typical setup for local development (Unix shell):
```bash
export OPENAI_API_KEY='sk-…'
# optional custom endpoint
export LLM_ENDPOINT='https://my‑selfhosted‑model.local/v1/chat/completions'
```
The environment variables are read at runtime; no additional config files are required.

---

## Best‑Practice Tips
1. **Rate‑limit & caching** – Store recent hints in a short‑lived in‑memory cache (e.g., a `Map`) to avoid duplicate calls.
2. **Prompt engineering** – Keep prompts concise; include only the data the model needs. Use delimiters if you embed JSON.
3. **Token limits** – Trim `gameState` data (e.g., only recent towers) to stay under the model’s context window.
4. **Error handling** – Gracefully fallback to a static hint when the API is unavailable or returns `429`.
5. **Security** – Never log the full prompt or response in production logs; mask user‑provided data.
6. **Testing** – Mock the `fetch` call in unit tests; avoid real network requests in CI.

---

## FAQ
**Q: Do I need a server‑side proxy to keep the API key secret?**
A: For production builds you should route LLM requests through a backend that injects the key, because client‑side JavaScript can expose the key to users. The example here is meant for development or trusted internal tools.

**Q: Can I use a different LLM provider?**
A: Yes. Replace the endpoint URL and payload format according to the provider’s API spec. The surrounding code (environment handling, error handling) remains the same.

**Q: How do I limit the number of hints per game session?**
A: Implement a simple counter or timestamp check in the UI layer before calling `getTacticalHint`.

---

## References
- OpenAI API docs: <https://platform.openai.com/docs/api-reference/chat/create>
- Prompt design guide: <https://github.com/openai/prompt‑engineering>
- Rate‑limit strategies: <https://cloud.google.com/apis/design/design_patterns#exponential_backoff>
