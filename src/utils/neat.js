export function makeNeat() {
  const phrases = [
    "Neat!",
    "Super Neat!",
    "Totally Neat!",
    "Neatly Neat!",
    "Epic Neat!",
  ];
  const idx = Math.floor(Math.random() * phrases.length);
  return phrases[idx];
}

export default { makeNeat };
