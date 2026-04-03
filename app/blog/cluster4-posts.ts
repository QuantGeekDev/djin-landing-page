import { BlogPost } from "./posts";

export const cluster4Posts: BlogPost[] = [
  {
    slug: "building-ai-smart-display-hardware",
    title: "Building an AI Smart Display: Hardware Decisions and Trade-offs",
    description:
      "How we chose the RK3566 SoC, 5-inch IPS display, and 4GB RAM for the Jinn HoloBox — and the trade-offs behind every component decision.",
    date: "2026-04-21",
    category: "Engineering",
    tags: [
      "hardware design",
      "smart display hardware",
      "product engineering",
      "RK3566",
      "ARM SoC",
    ],
    author: "Jinn Team",
    readingTime: "8 min read",
    content: `The Jinn HoloBox is built on a Rockchip RK3566 quad-core Cortex-A55 SoC with a Mali-G52 GPU, 4GB LPDDR4 RAM, and a 5-inch 720x1280 IPS display connected over DSI. We chose these components after months of prototyping because they hit the intersection of cost, thermal performance, and AI capability that a \$299 consumer device demands. Here is how we arrived at each decision and what we gave up along the way.

## Why does the SoC matter so much in a smart display?

In a smartphone or laptop, you can compensate for a weak processor with more RAM or a faster SSD. In a smart display with a fixed BOM, the SoC dictates almost everything: what OS you can run, how responsive the UI feels, whether on-device AI is feasible, and how much heat you generate in a fanless enclosure.

We evaluated three SoC families seriously:

| Feature | RK3566 | RK3588 | Amlogic S905X4 |
|---------|--------|--------|----------------|
| CPU | 4x Cortex-A55 @ 1.8 GHz | 4x A76 + 4x A55 @ 2.4 GHz | 4x Cortex-A55 @ 2.0 GHz |
| GPU | Mali-G52 2EE | Mali-G610 MP4 | Mali-G31 MP2 |
| NPU | 0.8 TOPS | 6 TOPS | None |
| RAM support | LPDDR4/4X up to 8 GB | LPDDR4X/5 up to 32 GB | DDR3/4 up to 4 GB |
| Approx. SoC cost (qty 1K) | ~\$8-12 | ~\$35-45 | ~\$6-9 |
| Mainline Linux support | Good (Armbian) | Maturing | Limited |

The RK3588 is the obvious performance king, but at roughly 3-4x the SoC cost it would have pushed our retail price well past \$449. The Amlogic S905X4 is cheaper, but its Mali-G31 GPU struggles with compositing a 720p WebGL UI, and it lacks an NPU entirely. The RK3566 sits in the middle: enough GPU headroom for our Three.js-based avatar renderer, a 0.8 TOPS NPU for future on-device inference, and mature mainline Linux support through Armbian.

## How did we choose the display?

The display decision came down to three constraints: physical size for a countertop device, resolution for readable text, and interface type for driver simplicity.

We tested 3.5-inch, 5-inch, and 7-inch panels. The 3.5-inch felt cramped for anything beyond a clock face. The 7-inch required a larger enclosure that looked out of place on a kitchen counter. The 5-inch panel hit the sweet spot — large enough to show a conversational UI with an avatar, small enough to fit next to a coffee maker.

According to Mordor Intelligence's 2025 smart display market report, the 5-10-inch category accounted for 52.1% of smart display revenue, confirming that this size range dominates consumer adoption.

### Resolution: 720x1280 vs 1080x1920

We prototyped with both. The 1080p panel looked sharper in side-by-side comparisons, but the difference at arm's length (typical smart display viewing distance of 2-4 feet) was negligible. The real cost was GPU load: driving 1080p at 30 fps required roughly 2.25x the pixel fill rate of 720p, which pushed the Mali-G52 harder and increased power draw by about 15% in our thermal testing. At 720p, we maintain a comfortable 30+ fps with headroom for the WebGL avatar renderer.

The DSI (Display Serial Interface) connection was non-negotiable. HDMI would have added a connector, a level shifter, and cable routing complexity. DSI gives us a direct digital link from the SoC to the panel with lower EMI and simpler board layout.

## What about the 4 GB RAM decision?

Our software stack — Node.js runtime worker, Go gateway, Next.js web UI rendered in Chromium — is not lightweight. In our profiling on a 2 GB prototype:

- **Chromium** consumed 400-600 MB rendering the avatar page
- **Node.js runtime worker** used 80-150 MB depending on context window size
- **Go gateway** used 20-40 MB
- **System + kernel** needed ~200 MB

That left almost no headroom on 2 GB. Context switches slowed to a crawl under memory pressure, and the OOM killer occasionally terminated the Node.js worker mid-conversation.

With 4 GB, we have roughly 2.5 GB of working headroom after the base stack loads. That matters for future features: local embedding models, larger plugin sets, or caching conversation history. The LPDDR4 spec also gives us 3200 MT/s bandwidth, which keeps the GPU fed during avatar rendering.

## How do we handle thermals without a fan?

The RK3566 has a TDP of approximately 3-5W under sustained load, which is manageable in a fanless design — but only with careful thermal planning. We use a die-cast aluminum heat spreader bonded to the SoC with a thermal pad. The enclosure has passive convection slots on the back.

During our 72-hour stress test (continuous conversation + avatar rendering + wake word detection), the SoC junction temperature stabilized at 68 degrees C. The Cortex-A55 thermal throttle point is 85 degrees C, so we have a 17-degree margin. In a 35 degrees C ambient environment (hot kitchen), that margin shrinks to about 10 degrees — tight but acceptable.

### What we gave up

A fan would have let us run the CPU at sustained 1.8 GHz under all conditions. Without it, we occasionally see brief thermal throttling to 1.6 GHz during extended conversations in warm rooms. The real-world impact is an extra 50-100 ms of latency on LLM response processing — not perceptible to most users, but it is there.

## Why did we choose eMMC over an SD card?

Early prototypes used microSD cards for storage. They were convenient for development but terrible for reliability. According to a 2024 study by Bunnie Huang on SD card failure modes, consumer microSD cards in always-on embedded devices show a 5-15% annual failure rate due to write amplification on flash cells.

We switched to 16 GB onboard eMMC. It is soldered to the board (no loose connections), has a built-in wear-leveling controller, and supports command queuing for faster random I/O. The trade-off is that storage is not user-replaceable, but for a consumer appliance that is actually a feature — it eliminates a common failure mode.

## What about audio hardware?

Voice is the primary input for the HoloBox, so microphone quality matters more than in a typical display. We use a dual-MEMS microphone array with PDM (Pulse Density Modulation) input. PDM is natively supported by the RK3566's audio subsystem, which means no external ADC chip is needed.

The dual-mic setup enables basic acoustic echo cancellation (AEC) — critical because the HoloBox has a built-in speaker. Without AEC, the wake word engine would trigger on the device's own audio output. We process AEC in software using speexdsp, which adds roughly 2% CPU load on one core.

### Speaker considerations

We use a 1.5W cavity speaker driven by a Class-D amplifier. It is not audiophile quality — it is optimized for speech clarity in the 300 Hz to 3.4 kHz vocal range. We deliberately rolled off bass response below 200 Hz to avoid cabinet resonance in the small enclosure. For users who want better audio, we expose a 3.5mm line-out jack.

### Why PDM over I2S for microphones?

We evaluated both PDM (Pulse Density Modulation) and I2S (Inter-IC Sound) microphone interfaces. I2S microphones are more common in consumer electronics and provide a cleaner digital signal. However, the RK3566's PDM controller supports direct connection to PDM MEMS microphones without an external codec chip — eliminating one component from the BOM and simplifying the PCB layout.

The trade-off: PDM requires more CPU cycles for decimation filtering (converting the 1-bit oversampled stream to usable PCM audio). On the Cortex-A55, this costs approximately 1-2% of one core — acceptable given our CPU budget.

## How does the BOM add up?

We do not publish exact BOM costs, but here is a rough breakdown by category for context:

| Component | Approximate % of BOM |
|-----------|---------------------|
| SoC + RAM + eMMC | ~35% |
| Display panel + touch digitizer | ~25% |
| PCB + passives + connectors | ~15% |
| Enclosure + thermal | ~12% |
| Audio (mics + speaker + amp) | ~8% |
| Power supply + regulation | ~5% |

The display and SoC together account for roughly 60% of hardware cost. This is typical for smart displays — Counterpoint Research's 2025 BOM analysis of the smart display segment found that display and processor consistently represent 55-65% of total component cost.

## What would we change in v2?

Hindsight is valuable. If we were starting the hardware design today:

- **LPDDR4X instead of LPDDR4**: The X variant offers 10-15% lower power consumption at the same bandwidth. We specced LPDDR4 because our initial supplier had better lead times, but LPDDR4X availability has improved.
- **USB-C for power**: Our v1 uses a barrel jack for reliability, but USB-C would simplify the accessory ecosystem.
- **A third microphone**: Moving from 2 to 3 MEMS mics would enable beamforming in addition to AEC, improving wake word detection in noisy kitchens.

## Key takeaways

1. The RK3566 hits a practical sweet spot for AI smart displays: enough compute for a WebGL UI and on-device wake word, with a 0.8 TOPS NPU for future inference — all at a price point that supports a \$299 device.
2. A 5-inch 720p IPS display balances readability, GPU load, and physical footprint for a countertop form factor.
3. 4 GB RAM is the minimum for a Chromium + Node.js + Go stack; 2 GB causes OOM kills under real workloads.
4. Fanless thermal design works for the RK3566's 3-5W TDP but requires careful heat spreader engineering and accepts occasional throttling in hot environments.
5. PDM microphones eliminate the need for an external audio codec, simplifying the BOM, but require CPU-side decimation filtering — a worthwhile trade-off on the Cortex-A55.
6. Every BOM decision is a trade-off chain — cheaper SoC means less GPU headroom, which means lower resolution, which means the display can be cheaper too. The trick is finding the chain that delivers the best user experience at the target price.`,
  },
  {
    slug: "why-linux-over-android",
    title: "Why We Chose Linux Over Android for the HoloBox",
    description:
      "Android dominates smart displays, but we built the Jinn HoloBox on Armbian (Debian-based Linux). Here's why — and what it cost us.",
    date: "2026-04-23",
    category: "Engineering",
    tags: [
      "Linux vs Android IoT",
      "embedded Linux",
      "smart display OS",
      "Armbian",
    ],
    author: "Jinn Team",
    readingTime: "8 min read",
    content: `We chose Armbian — a Debian-based Linux distribution optimized for ARM single-board computers — over Android for the Jinn HoloBox because it gives us full control over the software stack, lower baseline memory usage, and a 10+ year update path without depending on Google's release cycle. This decision shaped everything from our boot time to our update mechanism, and it came with real trade-offs we had to engineer around.

## Why do most smart displays run Android?

It is a fair question. The Amazon Echo Show, Google Nest Hub, and most Chinese smart displays run Android or Android-derived systems. Android offers a mature touch UI framework, a massive app ecosystem, a well-understood security model, and millions of developers who know how to build for it.

According to a 2025 analysis by MicroEJ, Android remains the dominant choice for consumer-facing embedded devices that need polished touchscreen interfaces, particularly in smart home, digital signage, and wearable markets.

So why did we go the other way?

## What are the concrete advantages of Linux for the HoloBox?

### Lower memory footprint

This was the deciding factor. Our RK3566 has 4 GB of RAM, and our application stack (Chromium, Node.js, Go) is already memory-hungry. Android's framework layer — the Java runtime (ART), SurfaceFlinger compositor, SystemUI, and system services — consumes 800 MB to 1.2 GB before a single app launches.

Armbian's base system boots into roughly 180-250 MB of RAM usage (kernel + systemd + core services). That gives our application stack an extra 600-900 MB of headroom compared to Android — the difference between a smooth experience and OOM kills.

| Metric | Armbian (Debian) | Android 14 (AOSP) |
|--------|-----------------|-------------------|
| Base RAM usage (no apps) | ~200 MB | ~900 MB |
| Boot to interactive | ~12 seconds | ~25-35 seconds |
| Minimum viable RAM | 512 MB | 2 GB |
| OS image size | ~1.5 GB | ~4-6 GB |
| OTA update size (typical) | 50-200 MB (apt packages) | 500 MB - 1.5 GB |
| Long-term support | Debian: 5+ years LTS | Google: 3 years typical |

### Faster boot time

The HoloBox is an always-on appliance, but it does reboot — for updates, after power outages, or during debugging. Armbian boots to our application UI in approximately 12 seconds on eMMC. An equivalent Android AOSP build on the same RK3566 hardware took 28-35 seconds in our testing, primarily because of Zygote preloading and the ART compiler warming up.

For context, Amazon's first-generation Echo Show (2017) was reported to take 45+ seconds to boot. While newer models are faster, the Linux advantage in boot time is structural — there is simply less framework to initialize.

### Predictable long-term updates

This is the hidden cost of Android in embedded devices. Google releases a new Android version annually, and each release can introduce breaking changes to the HAL (Hardware Abstraction Layer), requiring BSP (Board Support Package) updates from the SoC vendor. Qualcomm's 2024 developer documentation notes that Android BSP updates typically take 3-6 months to validate for a new Android version, and many SoC vendors stop providing them after 2-3 years.

Armbian, built on Debian stable, follows Debian's release cycle with 5+ years of security support per release. More importantly, kernel updates are decoupled from userspace updates. We can upgrade from Linux 6.12 to 6.18 without rebuilding our entire application stack — something that is practically impossible on Android without a full BSP refresh.

### Direct hardware access

On Android, accessing hardware peripherals (GPIO, I2C, SPI, DSI) requires going through the HAL or writing custom JNI bindings. On Linux, hardware is exposed through standard interfaces: \`/dev\`, \`/sys\`, \`sysfs\`, and device tree overlays.

When we needed to tune DSI display timing parameters to fix a horizontal wrapping artifact on our panel, we could modify device tree properties, rebuild the overlay, and test within minutes. On Android, this would have required modifying the HAL, rebuilding the system image, and flashing — a cycle measured in hours.

## What did we give up by choosing Linux?

Honesty matters here. Choosing Linux cost us real things:

### No native touch UI framework

Android's View system, Material Design components, and touch gesture handling are best-in-class. On Linux, there is no equivalent out of the box. Our solution: we render the entire UI in Chromium (kiosk mode) using Next.js. This works well — web technologies are excellent for UI — but it means we carry the full weight of a browser engine. Chromium on ARM is not lightweight: it uses 400-600 MB of RAM for our avatar page.

A native toolkit like Flutter or Qt would use less memory, but would require rewriting our entire web-based UI. We chose the web stack because it lets us share code between the HoloBox, our mobile app, and the cloud-hosted version.

### Smaller ecosystem for media codecs

Android ships with hardware-accelerated codecs for every common media format. On Armbian, we had to ensure the RK3566's VPU (Video Processing Unit) had proper kernel driver support. The Hantro and rkvdec drivers in mainline Linux now cover H.264, H.265, and VP9 decoding, but setup required more kernel configuration than Android's plug-and-play approach.

### No Google Play Services

This sounds obvious, but it matters for integrations. Google Assistant, Chromecast, and many smart home protocols assume Play Services is available. We chose Home Assistant as our smart home integration layer instead, which is Linux-native and protocol-agnostic.

### Steeper learning curve for contributors

Most embedded developers know Android. Fewer are comfortable with systemd service files, device tree overlays, and Debian packaging. Our contributor documentation has to be more thorough as a result.

### Security patching cadence

Android's monthly security bulletins are a well-oiled machine — Google identifies vulnerabilities, patches them, and pushes updates to OEMs. On Debian/Armbian, security patches come through the standard Debian security team, which is thorough but operates on a different cadence. Critical CVEs are typically patched within days, but less severe issues may take weeks. We supplement this with our own monitoring of the NVD (National Vulnerability Database) for packages in our dependency tree, and we maintain a private patch queue for anything that affects our specific hardware configuration.

## How does the Armbian base system work?

Armbian provides a minimal Debian (or Ubuntu) userspace optimized for ARM SBCs. Key features we rely on:

- **ZRAM**: Compresses a portion of RAM to act as swap, effectively extending usable memory by 30-50% under pressure. This is critical on a 4 GB device.
- **Kernel packaging**: Armbian maintains patched kernels for supported SoCs, handling device tree, driver, and config changes. We run their RK3566 kernel with a handful of custom patches for our specific display panel and audio codec.
- **First-boot configuration**: Armbian's first-run setup handles partition expansion, SSH key generation, and locale configuration — all things we would otherwise have to script ourselves.
- **Headless-friendly**: Armbian's Lite variant (no desktop environment) boots to a multi-user target with roughly 180 MB RAM usage. We add only what we need: Xorg (for Chromium), our application services, and the audio subsystem.

## How do we handle OTA updates?

Android has a well-tested A/B partition OTA update system. On Linux, we built our own using a combination of:

1. **apt package management**: Application updates are delivered as Debian packages through our own apt repository
2. **Systemd service management**: Updated services restart automatically after package installation
3. **Kernel updates**: Delivered separately, applied on next reboot with automatic rollback if the new kernel fails to boot (using GRUB/U-Boot boot counting)
4. **Atomic rollback**: Critical system partitions are snapshotted before updates using btrfs snapshots, allowing full rollback if an update fails

This is more complex than Android's A/B system, but it gives us granular control — we can update just the Node.js runtime worker without touching the kernel, or vice versa.

## How does the development workflow differ?

On Android, the standard development loop is: edit code in Android Studio, build an APK or system image, flash to the device via ADB, test. A full AOSP build takes 30-60 minutes on a powerful workstation (according to Google's AOSP build documentation, 64 GB RAM and 400 GB disk are recommended).

On Armbian, our development loop is: edit code locally, rsync changed files to the device over SSH, restart the affected systemd service. Turnaround time is 5-15 seconds. For kernel changes, we cross-compile on a build server (Armbian's build framework on a 16-core workstation compiles a kernel in ~8 minutes) and deploy the resulting .deb package.

This faster iteration cycle compounds over months of development. We estimate the Linux development workflow saved us 2-3 hours per day compared to the Android build-flash-test cycle during the intensive EVT phase.

## Would we make the same choice again?

Yes, but with a caveat. For a consumer product where the primary interaction is voice and a simple visual UI, Linux is the right foundation. The memory savings alone justify the choice — that 600-900 MB of extra headroom is the difference between running the AI stack comfortably and fighting the OOM killer.

However, if we were building a device where users install third-party apps, consume media from streaming services, or expect a phone-like touch experience, Android would be the pragmatic choice. The HoloBox is not a tablet — it is an AI appliance — and that distinction makes Linux the better fit.

## Key takeaways

1. Armbian uses roughly 200 MB of base RAM compared to Android's 900 MB — on a 4 GB device, that extra headroom is the difference between a stable AI stack and frequent OOM kills.
2. Linux boots to interactive UI in ~12 seconds vs. 28-35 seconds for Android AOSP on the same RK3566 hardware.
3. Debian's 5+ year LTS cycle decouples OS updates from SoC vendor BSP releases, solving the embedded Android update cliff.
4. The main trade-off is the lack of a native touch UI framework — we compensate by rendering the full UI in Chromium, which works but is not free in terms of memory.
5. For an AI appliance (voice-first, single-purpose), Linux is the right OS. For a general-purpose consumer device with app stores and media playback, Android still wins.`,
  },
  {
    slug: "running-ai-on-arm-rk3566",
    title: "Running AI on ARM: Performance Lessons from the RK3566",
    description:
      "What we learned about running wake word detection, LLM inference, and WebGL rendering on a quad-core Cortex-A55 with 0.8 TOPS NPU.",
    date: "2026-04-25",
    category: "Engineering",
    tags: [
      "ARM AI performance",
      "RK3566 AI",
      "edge AI hardware",
      "on-device inference",
    ],
    author: "Jinn Team",
    readingTime: "9 min read",
    content: `The RK3566's quad-core Cortex-A55 at 1.8 GHz with a 0.8 TOPS NPU can run on-device wake word detection at under 10% CPU load and process audio in real time — but it cannot run LLM inference locally. The key to AI on low-power ARM is being ruthless about what runs on-device versus in the cloud, and optimizing the boundary between them for perceived latency.

## What AI workloads does the HoloBox actually run on-device?

Not everything labeled "AI" needs a GPU cluster. The HoloBox runs three AI-adjacent workloads locally:

1. **Wake word detection** (openWakeWord): Listens continuously for "Hey Jinn" using a ~1.3 MB ONNX model. This is the most latency-sensitive task — it must respond within 100 ms of the user finishing the wake phrase.
2. **Audio preprocessing**: Voice activity detection (VAD), acoustic echo cancellation (AEC), and audio feature extraction. These are lightweight DSP operations but must run in real time on every audio frame.
3. **WebGL avatar rendering**: A Three.js-based VRM avatar that responds to conversation state. This is GPU-bound, running on the Mali-G52.

Everything else — LLM inference, speech-to-text, text-to-speech — runs in the cloud via the user's own API keys. This is a deliberate architectural choice, not a compromise.

## How does the Cortex-A55 perform for audio AI?

The Cortex-A55 is ARM's efficiency core, designed for low power rather than peak throughput. In Geekbench 5, the RK3566 scores approximately 155 single-core and 452 multi-core — roughly equivalent to a 2014-era smartphone. That sounds dire, but audio AI workloads have different requirements than the benchmarks measure.

Wake word detection processes 16 kHz mono audio in 80 ms frames. Each frame requires:
- Mel spectrogram computation (~0.5 ms on one A55 core)
- Neural network inference through the wake word model (~2-3 ms)
- Post-processing and threshold comparison (~0.1 ms)

Total: approximately 3-4 ms per 80 ms frame, or about 4-5% of a single core's capacity. The openWakeWord project documentation confirms that a single Raspberry Pi 3 core (also Cortex-A53, the A55's predecessor) can run 15-20 models simultaneously in real time.

### CPU budget breakdown

We profile CPU usage continuously during development. Here is a representative snapshot during an active conversation:

| Process | CPU usage (% of 4 cores) |
|---------|-------------------------|
| Chromium (avatar rendering) | 25-40% |
| Node.js runtime worker | 8-15% |
| openWakeWord | 3-5% |
| Go gateway | 1-3% |
| Audio pipeline (ALSA + AEC) | 2-4% |
| System (kernel, systemd, Xorg) | 5-8% |
| **Total** | **44-75%** |

This leaves 25-56% headroom depending on the conversation phase. Idle (wake word listening only) drops total CPU usage to roughly 15-20%.

## What about the 0.8 TOPS NPU?

The RK3566 includes Rockchip's RKNN NPU rated at 0.8 TOPS (tera operations per second). For context, that is approximately:

| Device | NPU / AI accelerator | TOPS |
|--------|---------------------|------|
| RK3566 | RKNN | 0.8 |
| RK3588 | RKNN | 6.0 |
| Google Coral | Edge TPU | 4.0 |
| Apple A17 Pro | Neural Engine | 35.0 |
| Nvidia Jetson Orin Nano | CUDA + DLA | 40.0 |

At 0.8 TOPS, the NPU is useful for lightweight classification and detection models — think object recognition on camera frames or keyword spotting — but not for running transformer-based language models. A 7-billion parameter LLM quantized to INT4 requires roughly 10-15 TOPS for acceptable token generation speed (5+ tokens/second). The RK3566 NPU is an order of magnitude short.

We currently do not use the NPU in production. Our wake word model runs on the CPU via ONNX Runtime because the CPU path is fast enough (3-4 ms per frame) and avoids the complexity of the RKNN SDK. We are evaluating NPU-accelerated VAD models for a future release, where offloading audio classification to the NPU could free 3-5% of CPU headroom.

## Why not run a small language model locally?

We tested this. We ran TinyLlama 1.1B (INT4 quantized) on the RK3566 CPU using llama.cpp:

- **Model load time**: 8.2 seconds
- **Prompt processing**: 2.1 tokens/second (for a 100-token prompt)
- **Token generation**: 1.4 tokens/second
- **RAM usage**: 890 MB

At 1.4 tokens/second, generating a 50-word response takes roughly 25 seconds. Compare that to GPT-4o via API at 50-80 tokens/second — the cloud path delivers a complete response before the local model has generated the first sentence.

More critically, the 890 MB RAM usage would consume most of our working headroom, leaving the system unstable. We concluded that local LLM inference on the RK3566 is technically possible but practically unusable for conversational AI.

### The hybrid architecture

Instead of running everything locally or everything in the cloud, we split workloads by latency sensitivity:

| Workload | Where it runs | Why |
|----------|--------------|-----|
| Wake word detection | On-device (CPU) | Must be always-on, <100 ms response |
| Voice activity detection | On-device (CPU) | Real-time audio processing |
| Echo cancellation | On-device (CPU) | Hardware-coupled, latency-critical |
| Speech-to-text | Cloud (API) | Requires large acoustic models |
| LLM reasoning | Cloud (API) | Requires 7B+ parameter models |
| Text-to-speech | Cloud (API) | Neural TTS models are too large for local |
| Avatar rendering | On-device (GPU) | Visual feedback must be immediate |
| Smart home commands | On-device (gateway) | Local network, low latency |

This split means the HoloBox is always responsive to voice (local wake word + VAD) even when the internet is slow, while leveraging cloud compute for the heavy AI workloads.

## How does the Mali-G52 GPU handle avatar rendering?

The Mali-G52 2EE in the RK3566 supports OpenGL ES 3.2, Vulkan 1.1, and has a theoretical fill rate of 6.8 Gpix/s. In practice, rendering our VRM avatar is the most demanding GPU task.

Our avatar pipeline:
1. Load a VRM model (optimized to ~1000 triangles, single mesh, single material)
2. Replace standard MToon materials with MeshBasicMaterial (unlit) to skip lighting calculations
3. Render at 0.75x device pixel ratio (effectively 540x960) and upscale
4. Cap frame rate at 30 fps via requestAnimationFrame throttling

With these optimizations, we achieve 28-35 fps on the HoloBox. Without them — using the stock VRM materials with lighting, at full resolution, at 60 fps — we measured 4-8 fps. The 98-mesh, 55,000-triangle original avatar model rendered at 1.6 fps before we switched to an optimized 2,130-triangle model.

### GPU optimization lessons

- **Draw calls matter more than triangle count** on mobile GPUs. Going from 98 draw calls (one per mesh) to 1 draw call improved fps by 10x, even though triangle count only dropped 25x.
- **Unlit materials are essential**. MeshBasicMaterial skips the fragment shader lighting calculations that dominate GPU time on the Mali-G52.
- **Resolution scaling is free performance**. Rendering at 0.75x DPR saves 44% of fragment shader work. On a 5-inch screen at arm's length, the quality difference is imperceptible.
- **Texture size matters**. We cap all textures at 512x512 pixels. The Mali-G52 has limited texture cache, and larger textures cause cache thrashing that tanks performance.

## What are the thermal implications of sustained AI workloads?

Running wake word detection, audio processing, and avatar rendering simultaneously puts the RK3566 under sustained ~50-60% CPU + moderate GPU load. In our thermal testing:

- **Idle** (wake word only): SoC junction ~45 degrees C, power draw ~1.8W
- **Active conversation** (full stack): SoC junction ~65 degrees C, power draw ~3.5W
- **Stress test** (max CPU + GPU): SoC junction ~72 degrees C, power draw ~4.8W

The Cortex-A55 throttles at 85 degrees C, so even under stress we maintain a 13-degree margin in a 25 degrees C ambient environment. The key insight: the A55's efficiency means sustained AI workloads are thermally feasible without a fan, which would not be true with higher-performance A76 cores drawing 2-3x the power.

## What would more compute buy us?

If we had the RK3588's 6 TOPS NPU and A76 cores, we could realistically run:
- On-device speech-to-text (Whisper tiny/base) at near real-time speed
- Small language models (1-3B parameters) for offline fallback responses
- More complex avatar rendering with real-time lip sync and physics

These are features we want for a future high-end variant. But for the \$299 HoloBox, the RK3566 handles the workloads that matter most — always-on listening and responsive visual feedback — while the cloud handles the heavy lifting.

## Key takeaways

1. The RK3566's Cortex-A55 cores handle wake word detection at 3-5% CPU load per model — audio AI is computationally light compared to language model inference.
2. The 0.8 TOPS NPU is an order of magnitude too small for LLM inference (which needs 10-15+ TOPS for usable speed), but adequate for lightweight classification tasks.
3. Local LLM inference on the RK3566 produces only 1.4 tokens/second with TinyLlama 1.1B — unusable for conversation but a useful benchmark for future hardware planning.
4. GPU draw calls, not triangle count, are the primary performance bottleneck on mobile GPUs. Reducing from 98 to 1 draw call improved avatar rendering by 10x.
5. The hybrid architecture — latency-sensitive tasks on-device, compute-intensive tasks in the cloud — is the pragmatic approach for sub-\$300 AI hardware.
6. Thermal headroom of 13+ degrees C under stress means sustained AI workloads are feasible in a fanless enclosure with the A55's efficiency cores.`,
  },
  {
    slug: "jinn-wake-word-system",
    title: "How We Designed the Jinn Wake Word System",
    description:
      "Inside the Jinn HoloBox wake word pipeline: why we chose openWakeWord, how we tuned for <5% false reject rates, and what it takes to listen 24/7 on ARM.",
    date: "2026-04-27",
    category: "Engineering",
    tags: [
      "wake word detection",
      "on-device wake word",
      "voice activation",
      "openWakeWord",
    ],
    author: "Jinn Team",
    readingTime: "8 min read",
    content: `The Jinn HoloBox uses openWakeWord, an open-source framework, to listen for "Hey Jinn" entirely on-device — no audio leaves the hardware until the wake phrase is detected. We chose it over commercial alternatives because it is Apache 2.0 licensed, runs at under 5% CPU on our Cortex-A55, and delivers a false acceptance rate below 0.5 per hour with threshold tuning — meeting our targets for a device that listens 24/7.

## Why does wake word detection matter so much?

Wake word detection is the first interaction a user has with a voice assistant. If it fails — either by not recognizing a legitimate command (false reject) or by activating when no one said the wake phrase (false accept) — the entire product feels broken.

Consider the math of always-on listening. A device that is active 16 hours per day processes roughly 57,600 seconds of audio daily. At a false acceptance rate of even 1 per hour, that is 16 spurious activations per day — enough to make users unplug the device. Conversely, a false reject rate above 10% means the user has to repeat themselves every tenth command, which destroys the conversational flow.

Our targets:
- **False reject rate**: <5% (miss no more than 1 in 20 legitimate commands)
- **False acceptance rate**: <0.5 per hour (fewer than 8 spurious activations in a 16-hour day)
- **Detection latency**: <200 ms from end of wake phrase to system response
- **CPU usage**: <10% of a single core (to leave headroom for other tasks)

## How did we evaluate wake word engines?

We tested three engines head-to-head on the RK3566 hardware:

| Feature | openWakeWord | Picovoice Porcupine | Snowboy |
|---------|-------------|-------------------|---------|
| License | Apache 2.0 (fully open) | Free for ≤3 users; commercial from \$6,000 | Apache 2.0 (unmaintained) |
| Last updated | 2025 (active) | 2026 (active) | 2020 (archived) |
| Custom wake word | Yes (synthetic data training) | Yes (console + fine-tuning) | Yes (user recordings) |
| Model size | ~1.3 MB (ONNX) | ~2 MB (proprietary) | ~3 MB |
| CPU usage (RK3566) | 3-5% single core | 2-3% single core | 8-12% single core |
| False reject rate (our testing) | 4.2% at tuned threshold | 3.1% at default | 11.8% at default |
| False accept rate (our testing) | 0.3/hour at tuned threshold | 0.2/hour at default | 1.4/hour at default |
| Platform support | Python, C (via ONNX) | Python, C, Java, JS, Go, Swift | Python, C++ |
| Noise robustness | Good (trained on diverse audio) | Excellent (proprietary noise augmentation) | Fair |

### Why not Porcupine?

Porcupine had the best raw accuracy in our testing. Its false reject rate of 3.1% and false acceptance rate of 0.2/hour were slightly better than openWakeWord. So why did we not use it?

Licensing. Picovoice's free tier is limited to projects with no more than three active users. For a consumer product shipping thousands of units, commercial licensing starts at \$6,000 and scales per device. For an open-source hardware project targeting a \$299 price point, a per-device licensing fee on the wake word engine directly conflicts with our goal of keeping the software stack free.

Additionally, Porcupine's models are proprietary binary blobs. We cannot inspect, modify, or audit them — a problem for a device that is always listening in people's homes. With openWakeWord, every layer of the model is inspectable.

### Why not Snowboy?

Snowboy was a popular open-source option, but it has been unmaintained since Kitt.ai was acquired by Baidu in 2020. In our testing, its false reject rate of 11.8% was more than double our target. According to Picovoice's open-source wake word benchmark, Porcupine achieves 11x better accuracy and 6.5x faster inference than Snowboy on equivalent hardware. Snowboy is no longer a viable choice for production use.

## How does the openWakeWord pipeline work?

The detection pipeline processes audio in four stages:

### 1. Audio capture and preprocessing

Audio comes from our dual-MEMS PDM microphone array through ALSA at 16 kHz, 16-bit mono. Before reaching the wake word model, the signal passes through:

- **Acoustic echo cancellation (AEC)**: Removes the device's own speaker output from the microphone signal using speexdsp. Without this, the wake word engine would trigger on TTS playback.
- **Automatic gain control (AGC)**: Normalizes volume levels so the model sees consistent input regardless of whether the user is 2 feet or 10 feet away.

### 2. Feature extraction

openWakeWord converts raw audio into mel spectrograms — a frequency-domain representation that mirrors human auditory perception. The mel spectrogram computation uses an ONNX implementation of PyTorch's melspectrogram function with fixed parameters (80 mel bands, 25 ms window, 10 ms hop).

Each inference processes an 80 ms audio frame, producing a feature vector that captures the spectral characteristics of that moment in time.

### 3. Neural network inference

The core model is a small neural network (~1.3 MB) that takes a sliding window of mel spectrogram frames and outputs a probability that the wake phrase was spoken. The model architecture uses a combination of convolutional and recurrent layers optimized for streaming audio — it processes frames sequentially without needing to buffer the entire utterance.

On the RK3566, inference takes approximately 2-3 ms per frame using ONNX Runtime on the CPU. We evaluated running on the 0.8 TOPS NPU via Rockchip's RKNN SDK, but the CPU path was already fast enough that the added complexity of NPU integration was not justified.

### 4. Threshold and smoothing

The raw model output is a probability between 0 and 1. We apply a tuned threshold (calibrated per model) and temporal smoothing to convert this into a binary detection decision.

Threshold tuning is the most important step for production quality. openWakeWord's documentation targets <5% false reject rates and <0.5/hour false accept rates with appropriate threshold tuning. We spent two weeks tuning thresholds using a test corpus of:
- 500 positive samples ("Hey Jinn" spoken by 25 different speakers, various distances and noise levels)
- 200 hours of negative audio (TV shows, music, household conversations, kitchen noise)

The final threshold was set at 0.72 for our "Hey Jinn" model — high enough to reject most environmental noise, low enough to catch natural variations in how people say the phrase.

## How did we train a custom "Hey Jinn" model?

openWakeWord supports training custom wake word models using synthetic speech data. The process:

1. **Generate synthetic utterances**: Using text-to-speech engines (Google TTS, Azure TTS, and others), we generated approximately 5,000 synthetic recordings of "Hey Jinn" with varying speaker characteristics, accents, speeds, and emphasis patterns.

2. **Collect negative samples**: We assembled a negative dataset from publicly available audio corpora — LibriSpeech, Common Voice, and AudioSet — representing the range of non-wake-word audio the model will encounter in daily use.

3. **Data augmentation**: Each synthetic sample was augmented with room impulse responses (simulating different room acoustics), background noise at various SNR levels, and pitch/speed variations. This expanded our effective training set to ~50,000 samples.

4. **Model training**: The model was trained using openWakeWord's training pipeline, which handles architecture selection, hyperparameter optimization, and validation against held-out test sets.

5. **On-device validation**: The trained model was tested on the actual RK3566 hardware with real microphones in realistic environments (kitchen, living room, bedroom with fan noise).

The entire training pipeline runs on a standard development machine with a GPU — no specialized hardware needed. Training a new wake word model takes approximately 4-6 hours.

## What are the hardest real-world challenges?

### TV and smart speaker interference

The most common false acceptance trigger is not random noise — it is human speech from television. TV dialogue contains a much wider range of phonemes and speech patterns than environmental noise, and occasionally a character will say something that sounds vaguely like "Hey Jinn."

We mitigate this with the AEC pipeline (which removes audio playing from the HoloBox's own speaker) and by training the model on negative samples that include TV and podcast audio. For external audio sources (a TV across the room), the model relies on the spectral differences between live speech directed at the device and broadcast audio arriving from a distance.

### Cocktail party problem

When multiple people are talking simultaneously, the wake word engine must detect "Hey Jinn" spoken by one person through the voices of others. This is fundamentally hard with a dual-mic setup — beamforming with two microphones provides only limited spatial filtering.

Our current approach: we tune the model to be slightly more sensitive (lower threshold) in detected multi-speaker environments, accepting a marginally higher false acceptance rate in exchange for fewer missed detections. A three-microphone array in a future hardware revision would significantly improve this.

### Accents and speech patterns

"Hey Jinn" is phonetically simple, but speakers vary enormously. Some pronounce "Jinn" with a hard J, others soften it. Some pause between "Hey" and "Jinn," others run them together. Children's voices have fundamentally different spectral characteristics than adult voices.

Our synthetic training data covers many of these variations, but we continue to collect anonymized (opt-in) detection metrics from beta testers to identify weak spots. The model has been retrained twice since initial deployment based on this feedback.

## How do we measure production performance?

We track three metrics in production (with user consent):

- **Detection rate**: Percentage of intended activations that are detected (target: >95%)
- **False activations per day**: Tracked via a lightweight counter that increments each time the wake word pipeline activates without subsequent speech input (target: <8 per 16-hour day)
- **Detection latency**: Time from end of wake phrase audio to system acknowledgment (target: <200 ms, measured: 80-120 ms typically)

These metrics are aggregated and anonymized — we never record or transmit raw audio. The detection latency of 80-120 ms is well within our 200 ms target, leaving comfortable margin for the audio pipeline to hand off to the speech-to-text service.

## Key takeaways

1. openWakeWord delivers <5% false reject rate and <0.5/hour false acceptance rate with proper threshold tuning — competitive with commercial solutions at zero licensing cost.
2. On the RK3566 Cortex-A55, wake word inference takes 2-3 ms per 80 ms audio frame, using only 3-5% of a single CPU core — lightweight enough to run 24/7 without impact on other workloads.
3. Acoustic echo cancellation is not optional for a device with a built-in speaker — without it, the wake word engine triggers on the device's own TTS output.
4. Threshold tuning against a representative test corpus (500+ positive samples, 200+ hours of negative audio) is the single highest-impact step for production wake word quality.
5. Synthetic speech training data works well for custom wake words, but real-world edge cases (TV interference, accents, multi-speaker environments) require ongoing model refinement based on production telemetry.`,
  },
  {
    slug: "prototype-to-preorder",
    title: "From Prototype to Pre-Order: The Jinn HoloBox Story",
    description:
      "The real timeline, mistakes, and lessons from taking the Jinn HoloBox from a dev board on a desk to a $299 pre-order product.",
    date: "2026-04-29",
    category: "Engineering",
    tags: [
      "startup hardware",
      "hardware startup journey",
      "product development",
      "Kickstarter hardware",
    ],
    author: "Jinn Team",
    readingTime: "9 min read",
    content: `The Jinn HoloBox went from a dev board taped to a 5-inch display to a \$299 pre-order product over 14 months. We bricked prototypes, fought kernel driver bugs that took weeks to diagnose, threw out our first enclosure design, and learned that hardware startups are about managing the gap between what you imagine and what physics allows. This is the honest story.

## How did the project start?

The HoloBox started as a personal project in late 2024. The original question was simple: can you build an AI assistant that lives on your countertop, runs on open-source software, and does not send every word you say to a corporate cloud by default?

The first prototype was embarrassingly simple: a Raspberry Pi 4 running a Python script that chained together openWakeWord for wake word detection, Whisper for speech-to-text, GPT-4 for reasoning, and ElevenLabs for text-to-speech. The display was an HDMI monitor propped up on a stack of books. It worked — barely — and the response latency was 5-8 seconds.

But it proved the concept. You could say "Hey Jinn, what's on my calendar today?" and get a spoken response. That was enough to start asking: what would it take to make this a real product?

## What was the timeline?

Here is the actual timeline, not the one we planned:

| Phase | Planned | Actual | What went wrong |
|-------|---------|--------|-----------------|
| Concept + proof of concept | 2 months | 3 months | Underestimated audio pipeline complexity |
| SoC selection + eval boards | 1 month | 2 months | First choice (Allwinner H6) had poor mainline Linux support |
| EVT (engineering validation) | 3 months | 5 months | Display driver issues, kernel panic on suspend/resume |
| Software stack port | 2 months | 4 months | Chromium GPU acceleration on ARM took 6 weeks alone |
| DVT (design validation) | 2 months | 3 months | Thermal design failed first test, required enclosure redesign |
| PVT (production validation) | 1 month | 2 months | Microphone array placement caused acoustic resonance |
| Pre-order launch | — | Month 14 | — |
| **Total** | **11 months** | **14 months** | **27% schedule overrun** |

A 27% schedule overrun is actually modest for hardware. According to a 2024 Kickstarter analysis of hardware projects, the median delay between campaign end and first delivery is 4.5 months, and roughly 30% of hardware projects deliver more than 6 months late.

## What happened during EVT?

EVT (Engineering Validation Test) is where you take your working prototype and build it on the actual production hardware for the first time. For us, that meant moving from the Pi 4 to an RK3566-based board with our chosen display panel, microphone array, and speaker.

### The display nightmare

The 5-inch IPS panel we selected uses a Himax HX8394 display controller connected via DSI (Display Serial Interface). On the Raspberry Pi, we used HDMI — simple, standardized, and decades of driver maturity. DSI is a different world.

The first time we powered on the panel, we got a horizontal wrapping artifact — the image was shifted approximately 160 pixels to the right, with the rightmost portion wrapping to the left edge. It looked like a CRT with bad horizontal sync.

Diagnosing this took three weeks. The root cause turned out to be two separate issues: a non-deterministic DSI FIFO byte alignment problem (the DSI controller's internal buffer was sometimes misaligned after initialization, causing pixel data to arrive at the wrong column), and a VOP2 (Video Output Processor) timing mismatch between the kernel's display driver and the panel's expected input timing.

The fix involved patching the DW-MIPI-DSI Rockchip kernel driver to properly sequence PHY initialization, and discovering that the panel vendor's recommended HBP (Horizontal Back Porch) timing of 217 cycles differed significantly from the mainline kernel default of 43 cycles. The vendor value compensated for a VOP2 pipeline delay that the kernel driver documentation did not mention.

### The I2C bus death

Two months into EVT, we discovered that the HoloBox would reliably lose communication with its PMIC (Power Management IC) approximately 30 seconds after boot. The PMIC sits on the I2C0 bus alongside the RTC (real-time clock), and when the bus died, we lost the ability to manage power rails — including CPU voltage regulation.

The root cause: the RK809 PMIC kernel driver shared initialization code with the RK817 (a different chip used in tablets). The RK817 init sequence included writes to audio codec registers that do not exist on the RK809. These invalid writes were corrupting the I2C bus state, causing an SDA-stuck-low condition that required a bus reset to recover.

The fix was a kernel patch that split the RK809 and RK817 initialization paths. This bug took two weeks to diagnose because the symptoms (GPU driver errors, fan controller timeouts, occasional kernel panics) appeared to be unrelated to I2C — the PMIC bus failure cascaded into every subsystem that depended on PMIC-regulated power rails.

## What did we learn about thermal design?

Our first enclosure was a 3D-printed PLA shell with no thermal management. The SoC hit 85 degrees C (the thermal throttle point) within 4 minutes of sustained conversation, and the UI became noticeably laggy as the CPU throttled from 1.8 GHz to 1.2 GHz.

The second revision added a die-cast aluminum heat spreader bonded to the SoC with a graphite thermal interface material. We also added convection slots to the rear of the enclosure. This brought the steady-state temperature down to 68 degrees C under sustained load — a 17-degree margin to the throttle point.

The lesson: thermal design is not optional for always-on devices, even with a low-power SoC. The RK3566's 3-5W TDP sounds tiny compared to a laptop's 45W, but in a sealed enclosure with no airflow, even 3W generates enough heat to throttle within minutes.

## How did the software stack evolve?

The software architecture went through three major iterations:

### V1: Monolithic Python (months 1-3)

Everything in one Python process. Simple, but slow: the GIL (Global Interpreter Lock) meant wake word detection and audio processing competed for the same thread. Response latency was 5-8 seconds, and the system could not detect the wake word while processing a response.

### V2: Microservices in Python + Node.js (months 4-7)

We split into separate processes: Python for wake word detection, Node.js for the LLM runtime and plugin system, a basic HTTP server for the web UI. This fixed the concurrency problem but created a new one — inter-process communication overhead and the complexity of coordinating state across three processes.

### V3: Go gateway + Node.js worker + Next.js web (months 8-14)

The current architecture. A Go gateway handles routing, retry logic, and connection management. A Node.js runtime worker manages the LLM conversation loop and plugin execution. The Next.js web UI renders in Chromium. Communication between the gateway and worker uses Unix domain sockets and Protocol Buffers for minimal overhead.

Each iteration was a rewrite, and each rewrite taught us something. The Go gateway alone reduced P99 request routing latency from 45 ms (Node.js HTTP) to 3 ms (Go + UDS + protobuf). For a voice assistant where every millisecond of perceived latency matters, this was worth the rewrite cost.

## What surprised us about manufacturing?

We have not reached mass production yet — our pre-order campaign funds the first production run. But the PVT (Production Validation Test) phase taught us several things:

### Component sourcing is a negotiation

The RK3566 SoC, LPDDR4 RAM, and eMMC flash are all commodity parts with multiple suppliers. But the specific 5-inch DSI panel we designed around was available from only two manufacturers. When our primary supplier quoted a 12-week lead time for the quantities we needed, we had to qualify the second supplier's panel — which had slightly different timing parameters, requiring another round of display driver tuning.

### Microphone placement is acoustics, not geometry

We initially placed the MEMS microphones symmetrically on the top edge of the PCB, assuming that centered placement would optimize pickup. In practice, one microphone was 3mm from the speaker cavity, creating an acoustic coupling path that degraded echo cancellation performance by 8 dB.

The fix was moving one microphone to the opposite edge of the board and adjusting the AEC filter coefficients. This required a PCB revision — not a software fix.

### Regulatory certification is a timeline risk

FCC Part 15 certification (required for any electronic device sold in the US) requires testing at an accredited lab. The testing itself takes 2-3 days, but lab scheduling lead times can be 4-8 weeks. We booked our lab slot two months in advance and still had to reschedule once due to a PCB change.

## What does the pre-order model look like?

We chose a pre-order model (\$299 pre-order, \$449 retail) rather than a traditional Kickstarter because it gives us more control over the customer relationship and does not lock us into Kickstarter's platform fees (which run 5-10% including payment processing).

The pre-order funds cover:
- First production run tooling and manufacturing
- Component procurement for the initial batch
- Regulatory certification (FCC, CE)
- Packaging and fulfillment setup

We are transparent with pre-order customers about the timeline and risks. Hardware is unpredictable, and we would rather under-promise and over-deliver than pad a campaign page with optimistic dates.

## What would we do differently?

### Start with the display driver

If we could rewind, we would prototype the DSI display integration in week one, not month three. The display driver consumed more engineering time than any other single component. The lesson: start with the hardest hardware integration first, because every week you delay it is a week you might discover a show-stopping problem.

### Budget for three PCB revisions

We planned for two revisions and needed three. The microphone placement issue was not catchable in simulation — it only emerged with real audio testing on the physical board. Industry wisdom says plan for three to five revisions for a new consumer electronics product, and we now understand why.

### Hire a thermal engineer earlier

We treated thermal design as a "we'll figure it out" item and paid for it with an enclosure redesign. A thermal simulation early in the process would have caught the issue before we committed to the first enclosure tooling.

## Where are we now?

The HoloBox is in the final PVT stage. We have validated:
- Thermal performance across ambient temperatures from 15 to 40 degrees C
- Audio quality with the revised microphone placement
- 72-hour continuous operation stability
- OTA update mechanism (tested with 50 beta units)
- Display reliability across 1,000+ power cycles

Pre-orders are open, and we are on track for first shipments. The software stack — fully open source on GitHub — continues to improve weekly. Every commit, every driver patch, every thermal test result is part of the public repository.

Hardware is hard. It is also the most rewarding kind of engineering, because at the end of the process you have a physical thing that sits on someone's kitchen counter and makes their day a little easier. That is worth 14 months of kernel panics and display driver debugging.

## Key takeaways

1. Plan for 25-30% schedule overrun on hardware projects — our 14 months vs. planned 11 months (27% overrun) is typical for first-time consumer hardware.
2. Start with the hardest hardware integration first. Our DSI display driver consumed more engineering hours than any other component and should have been week-one work.
3. Budget for three PCB revisions minimum. Physical acoustic issues (microphone-speaker coupling) cannot be caught in simulation alone.
4. Thermal design is not optional, even for 3-5W devices. A fanless RK3566 will throttle within minutes in a sealed enclosure without a proper heat spreader.
5. Software architecture will change at least twice. Our stack went from monolithic Python to microservices to Go+Node.js+Next.js — each rewrite was justified by measurable performance gains.
6. Be honest with customers about timelines and risks. Hardware is unpredictable, and transparency builds more trust than optimistic launch dates.`,
  },
];
