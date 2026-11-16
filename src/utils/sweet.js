export function makeSweet() {
  const phrases = [
    "Sweet!",
    "Super Sweet!",
    "Totally Sweet!",
    "Sweetly Sweet!",
    "Epic Sweet!",
  ];
  const idx = Math.floor(Math.random() * phrases.length);
  return phrases[idx];
}

export default { makeSweet };