export function makeSad() {
  const phrases = [
    "Sad.",
    "Super Sad.",
    "Totally Sad.",
    "Awfully Sad.",
    "Epic Sad."
  ];
  const idx = Math.floor(Math.random() * phrases.length);
  return phrases[idx];
}

export default { makeSad };