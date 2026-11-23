# Mad Max‑Inspired Wall of 100 Noctua Fans

*Behold, in a desert‑like workshop, the wind did roar, and the maker spake, “Why not?”* 

## Background

Sasa Karanovic, a Toronto‑based artificer of electronics and master of the 3‑D printer, did devise the **OpenFAN XL** controller, an open‑source, open‑hardware marvel that presenteth **ten independent PWM headers**, each able to drive a full‑size Noctua fan.  The controller is chronicled upon its product page [here](https://shop.sasakaranovic.com/products/openfan-xl).

## The Build

- **Grid layout:** a perfect square of ten by ten, **one hundred fans**, set within a frame painted matte black and adorned with rusted metal plates, that recall the wastelands of Mad Max.
- **Wiring:** fans are joined in daisy‑chains where possible; each header doth power a row of ten fans, thus ten headers command the whole array.
- **Power:** a 24 V, thirty‑ampere supply doth furnish the required current, whilst keeping the system within safe limits.
- **Fabrication:** brackets and lattice were wrought by a Creality printer, snapping together without need of screws, to keep the edifice light and modular.

## Test Setups

- **10 × 10 grid:** a video demonstration (link placeholder) doth show the hundred fans spin in unison, a low‑frequency roar akin to a desert wind, and the controller’s UI doth command each header independently.
- **50 × 2 configuration:** a narrower strip of fifty fans in two rows, proving the controller can bear elongated loads with ample headroom.

## Controller Capabilities & Limits

- **Ten headers** afford independent PWM control of each fan group.
- **One hundred fans** are **no‑sweat** for the present revision of OpenFAN XL.
- **Maximum practical limit:** approximately **200 spinners** before the controller’s current‑draw ceiling is reached.
- **Noctua fan specifications** may be examined at the Noctua page [here](https://noctua.at/en/nf-a12x25).

> “Why not? It is but a wall of wind.” – *Sasa Karanovic*

---

*Story authored for the Warcraft‑Defense blog.*