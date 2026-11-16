export function makeSwag() {
  const phrases = [
    "Swag!",
    "Super Swag!",
    "Totally Swag!",
    "Swaggy Swag!",
    "Epic Swag!",
  ];
  const idx = Math.floor(Math.random() * phrases.length);
  return phrases[idx];
}

export default { makeSwag };