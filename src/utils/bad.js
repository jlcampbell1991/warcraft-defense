export function makeBad() {
  const phrases = [
    "Bad!",
    "Super Bad!",
    "Totally Bad!",
    "Awfully Bad!",
    "Epic Bad!",
  ];
  const idx = Math.floor(Math.random() * phrases.length);
  return phrases[idx];
}

export default { makeBad };