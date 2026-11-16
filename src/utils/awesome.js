export function makeAwesome() {
  const phrases = [
    "Awesome!",
    "Super Awesome!",
    "Totally Awesome!",
    "Awesomely Awesome!",
    "Epic Awesome!",
  ];
  const idx = Math.floor(Math.random() * phrases.length);
  return phrases[idx];
}

export default { makeAwesome };
