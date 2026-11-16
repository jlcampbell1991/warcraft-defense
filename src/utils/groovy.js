export function makeGroovy() {
  const phrases = [
    "Groovy!",
    "Super Groovy!",
    "Totally Groovy!",
    "Groovily Groovy!",
    "Epic Groovy!",
  ];
  const idx = Math.floor(Math.random() * phrases.length);
  return phrases[idx];
}

export default { makeGroovy };