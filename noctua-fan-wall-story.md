# Mad Max‑Inspired Wall of 100 Noctua Fans

Sasa Karanovic, a Toronto‑based electronics tinkerer and 3‑D‑printing aficionado, woke up one morning with a simple question echoing in his head: **"Why not?"**

He owned the newly released **OpenFAN XL**, an open‑source, open‑hardware fan controller he designed himself. The board boasts ten independent PWM headers, each capable of driving a full‑size Noctua NF‑A12x25. It was built to prove that hobby‑grade hardware could manage a serious cooling load without breaking the bank.

### The Plan

Instead of a modest test rig, Sasa imagined a **wall of a hundred fans** – a literal Mad Max‑style wind tunnel made of whisper‑quiet Noctua blades. The idea was half‑art installation, half‑stress test. If the OpenFAN XL could juggle a 10 × 10 grid, a 50 × 2 strip, why not push it to the limit?

### Building the Grid

1. **Design & Print** – Using his trusty Creality printer, Sasa printed a lattice of interlocking brackets that would hold the fans in a perfect square. The brackets snapped together without screws, keeping the build lightweight and modular.
2. **Wiring** – Each fan was wired to one of the ten PWM outputs on the controller. Five fans per header gave a neat 10‑fan‑per‑channel layout, matching the controller’s intended “10‑header” demo.
3. **Power** – A single 12 V, 30 A supply fed the whole wall. Noctua’s low draw (≈0.13 A per fan at full speed) meant the total load sat comfortably under 13 A, well within the supply’s headroom.
4. **Software** – A tiny Python script on Sasa’s laptop streamed PWM values over USB, animating the wall with wave‑like patterns, breathing cycles, and a dramatic “full‑blast” surge.

### The Video

The resulting video, posted on YouTube, shows three key moments:

- **10 × 10 Grid** – All one hundred fans spin in unison, creating a low‑frequency roar that feels like a desert wind.
- **50 × 2 Strip** – A side‑by‑side demo of a longer, thinner array proving the controller can handle elongated configurations.
- **Controller Limits** – Sasa notes that while the OpenFAN XL handles 100 fans with ease, its current firmware caps out around **200 spinners** before the PWM timers saturate.

### Why It Matters

The experiment is more than a cool visual. It demonstrates that **open‑hardware controllers can replace expensive, proprietary solutions** in high‑density cooling applications—from server farms to custom rigs and even kinetic art installations. By sharing the design files, the code, and the build guide, Sasa invites anyone with a 3‑D printer and a handful of Noctua fans to recreate the wall and push the controller even further.

> *“If you can build a wall of 100 fans because you asked ‘why not’, imagine what you can do when you actually need to cool something.”* – Sasa Karanovic
