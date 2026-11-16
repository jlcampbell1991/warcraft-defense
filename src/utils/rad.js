export function makeRad() {
  const phrases = [
    "Rad!",
    "Super Rad!",
    "Totally Rad!",
    "Radically Rad!",
    "Epic Rad!",
  ];
  const idx = Math.floor(Math.random() * phrases.length);
  return phrases[idx];
}

export default { makeRad };