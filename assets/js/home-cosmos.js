const THREE_MODULE_URL = "https://cdn.jsdelivr.net/npm/three@0.167.1/build/three.module.min.js";
const SEQUENCE_INTERVAL_MS = 2400;
const STORY_CARD_SELECTOR = [
  ".resume-panel",
  ".thinking-card",
  ".topic-item",
  ".contact-panel",
  ".calendar-panel",
  ".service-card",
  ".process-card",
  ".demo-card"
].join(", ");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  if (inMax === inMin) {
    return outMin;
  }

  const normalized = (value - inMin) / (inMax - inMin);
  return outMin + normalized * (outMax - outMin);
}

function createGlowTexture(THREE) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255, 248, 223, 1)");
  gradient.addColorStop(0.28, "rgba(242, 208, 126, 0.9)");
  gradient.addColorStop(0.7, "rgba(216, 166, 69, 0.2)");
  gradient.addColorStop(1, "rgba(216, 166, 69, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function buildRibbon(THREE, points, color, opacity) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity
  });

  return new THREE.Line(geometry, material);
}

function buildRing(THREE, radius, color, opacity, yScale = 0.46) {
  const points = [];

  for (let index = 0; index <= 180; index += 1) {
    const angle = (index / 180) * Math.PI * 2;
    const ripple = Math.sin(angle * 3) * 0.14;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * (radius * yScale + ripple),
        Math.sin(angle * 2) * 0.28
      )
    );
  }

  return buildRibbon(THREE, points, color, opacity);
}

async function initThreeField(hero, container, canvas, reducedMotion) {
  if (!container || !canvas || reducedMotion || typeof window.WebGLRenderingContext === "undefined") {
    hero.classList.add("is-cosmos-fallback");
    return;
  }

  let THREE;

  try {
    THREE = await import(THREE_MODULE_URL);
  } catch (error) {
    console.warn("Three.js scene could not be loaded.", error);
    hero.classList.add("is-cosmos-fallback");
    return;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.2, 8.8);

  const stage = new THREE.Group();
  scene.add(stage);

  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 1200;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const warmA = new THREE.Color(0xffefc0);
  const warmB = new THREE.Color(0xd9ab55);
  const colorMix = new THREE.Color();

  for (let index = 0; index < particleCount; index += 1) {
    const stride = index * 3;
    const angle = Math.random() * Math.PI * 2;
    const radius = 1 + Math.random() * 3.2;
    const lift = (Math.random() - 0.5) * 4.8;
    const drift = Math.sin(angle * 3 + lift) * 0.16;

    positions[stride] = Math.cos(angle) * radius + drift;
    positions[stride + 1] = lift * 0.7;
    positions[stride + 2] = Math.sin(angle) * radius * 0.52;

    colorMix.copy(warmA).lerp(warmB, Math.random());
    colors[stride] = colorMix.r;
    colors[stride + 1] = colorMix.g;
    colors[stride + 2] = colorMix.b;
  }

  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const glowTexture = createGlowTexture(THREE);
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.12,
    map: glowTexture,
    transparent: true,
    opacity: 0.86,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  stage.add(particles);

  const rings = [
    buildRing(THREE, 1.6, 0xf0d38c, 0.3),
    buildRing(THREE, 2.35, 0xe2b458, 0.24),
    buildRing(THREE, 3.1, 0xfff4d5, 0.18, 0.38)
  ];

  rings[0].rotation.x = 0.7;
  rings[1].rotation.x = -0.42;
  rings[2].rotation.x = 1.1;
  rings[2].rotation.z = 0.55;
  rings.forEach((ring) => stage.add(ring));

  const ribbonA = buildRibbon(
    THREE,
    [
      new THREE.Vector3(-2.9, -1.2, -0.2),
      new THREE.Vector3(-1.2, -0.4, 0.75),
      new THREE.Vector3(0.4, 0.2, -0.3),
      new THREE.Vector3(2.6, 1.2, 0.55)
    ],
    0xe1bc6c,
    0.18
  );
  const ribbonB = buildRibbon(
    THREE,
    [
      new THREE.Vector3(-2.4, 1.5, 0.4),
      new THREE.Vector3(-0.4, 0.5, -0.65),
      new THREE.Vector3(1.2, -0.35, 0.45),
      new THREE.Vector3(3.1, -1.55, -0.1)
    ],
    0xfff4d3,
    0.16
  );

  ribbonA.rotation.z = -0.22;
  ribbonB.rotation.z = 0.16;
  stage.add(ribbonA, ribbonB);

  const ambientLight = new THREE.AmbientLight(0xfff2cb, 1.1);
  const pointLight = new THREE.PointLight(0xffd98a, 2.6, 18, 2);
  pointLight.position.set(2.8, 2.2, 5.8);
  stage.add(ambientLight, pointLight);

  const pointer = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 };
  let width = 1;
  let height = 1;
  let frameId = 0;
  let destroyed = false;

  const resize = () => {
    const rect = container.getBoundingClientRect();
    width = Math.max(rect.width, 1);
    height = Math.max(rect.height, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  const render = (time) => {
    if (destroyed) {
      return;
    }

    const seconds = time * 0.001;
    pointer.currentX += (pointer.targetX - pointer.currentX) * 0.045;
    pointer.currentY += (pointer.targetY - pointer.currentY) * 0.045;

    stage.rotation.y = seconds * 0.08 + pointer.currentX * 0.36;
    stage.rotation.x = Math.sin(seconds * 0.42) * 0.08 + pointer.currentY * 0.22;
    stage.position.y = Math.sin(seconds * 0.55) * 0.16;

    particles.rotation.y = -seconds * 0.035;
    particles.rotation.z = seconds * 0.04;
    particleMaterial.opacity = 0.8 + Math.sin(seconds * 0.9) * 0.06;

    rings.forEach((ring, index) => {
      ring.rotation.z += 0.0012 + index * 0.0003;
      ring.material.opacity = 0.15 + (Math.sin(seconds * 1.4 + index) + 1) * 0.08;
    });

    ribbonA.rotation.z = -0.22 + Math.sin(seconds * 0.6) * 0.1;
    ribbonB.rotation.z = 0.16 - Math.cos(seconds * 0.5) * 0.08;

    camera.position.x = pointer.currentX * 1.15;
    camera.position.y = -pointer.currentY * 0.84 + 0.2;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(render);
  };

  frameId = window.requestAnimationFrame(render);

  hero.__homeCosmosCleanup = () => {
    destroyed = true;
    window.cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    renderer.dispose();
    particleGeometry.dispose();
    particleMaterial.dispose();
    glowTexture?.dispose();
    rings.forEach((ring) => {
      ring.geometry.dispose();
      ring.material.dispose();
    });
    ribbonA.geometry.dispose();
    ribbonA.material.dispose();
    ribbonB.geometry.dispose();
    ribbonB.material.dispose();
  };

  hero.__homeCosmosPointer = pointer;
}

function activateSequence(nodes, panels, index) {
  nodes.forEach((node, nodeIndex) => {
    node.classList.toggle("is-active", nodeIndex === index);
  });

  panels.forEach((panel, panelIndex) => {
    panel.classList.toggle("is-active", panelIndex === index);
  });
}

function initScrollStages() {
  const stages = Array.from(document.querySelectorAll("[data-scroll-stage]"));
  if (!stages.length) {
    return () => {};
  }

  stages.forEach((stage) => {
    Array.from(stage.querySelectorAll(STORY_CARD_SELECTOR)).forEach((card, index) => {
      card.style.setProperty("--story-order", String(index));
      card.style.setProperty("--story-depth", `${index * 18}px`);
    });
  });

  let frameHandle = 0;

  const update = () => {
    frameHandle = 0;
    const viewportHeight = window.innerHeight || 1;

    stages.forEach((stage) => {
      const rect = stage.getBoundingClientRect();
      const progress = clamp(
        mapRange(viewportHeight - rect.top, viewportHeight * 0.12, viewportHeight + rect.height * 0.36, 0, 1),
        0,
        1
      );
      const cards = Array.from(stage.querySelectorAll(STORY_CARD_SELECTOR));

      stage.style.setProperty("--section-progress", progress.toFixed(4));
      stage.classList.toggle("is-active", progress > 0.04 && progress < 0.98);

      cards.forEach((card, index) => {
        const cardProgress = clamp(progress * 1.18 - index * 0.08, 0, 1);
        card.style.setProperty("--story-card-progress", cardProgress.toFixed(4));
      });
    });
  };

  const requestUpdate = () => {
    if (frameHandle) {
      return;
    }

    frameHandle = window.requestAnimationFrame(update);
  };

  requestUpdate();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  return () => {
    if (frameHandle) {
      window.cancelAnimationFrame(frameHandle);
    }

    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
  };
}

function initHomeHero() {
  const hero = document.querySelector("[data-home-hero]");
  if (!hero) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cosmos = hero.querySelector("[data-home-cosmos]");
  const canvas = hero.querySelector("[data-home-cosmos-canvas]");
  const sequenceNodes = Array.from(hero.querySelectorAll("[data-sequence-step]"));
  const sequencePanels = Array.from(hero.querySelectorAll("[data-sequence-panel]"));
  const pointer = { targetX: 0, targetY: 0 };
  const cleanupStages = initScrollStages();

  let activeIndex = 0;
  let sequenceTimer = 0;

  const setSequenceFromScroll = () => {
    const rect = hero.getBoundingClientRect();
    const progress = clamp(mapRange(window.innerHeight - rect.top, 0, window.innerHeight + rect.height * 0.45, 0, 1), 0, 1);
    hero.style.setProperty("--hero-scroll-progress", progress.toFixed(4));

    if (!sequenceNodes.length) {
      return;
    }

    const derivedIndex = Math.round(progress * (sequenceNodes.length - 1));
    if (derivedIndex !== activeIndex) {
      activeIndex = derivedIndex;
      activateSequence(sequenceNodes, sequencePanels, activeIndex);
    }
  };

  const updatePointer = (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    pointer.targetX = clamp(x, -1, 1);
    pointer.targetY = clamp(y, -1, 1);

    hero.style.setProperty("--hero-tilt-x", pointer.targetX.toFixed(4));
    hero.style.setProperty("--hero-tilt-y", pointer.targetY.toFixed(4));
    hero.style.setProperty("--hero-shift-x", (pointer.targetX * 0.9).toFixed(4));
    hero.style.setProperty("--hero-shift-y", (pointer.targetY * 0.6).toFixed(4));
    hero.style.setProperty("--hero-shift-x-px", `${pointer.targetX * 26}px`);
    hero.style.setProperty("--hero-shift-y-px", `${pointer.targetY * 18}px`);

    if (hero.__homeCosmosPointer) {
      hero.__homeCosmosPointer.targetX = pointer.targetX;
      hero.__homeCosmosPointer.targetY = pointer.targetY;
    }
  };

  const resetPointer = () => {
    pointer.targetX = 0;
    pointer.targetY = 0;
    hero.style.setProperty("--hero-tilt-x", "0");
    hero.style.setProperty("--hero-tilt-y", "0");
    hero.style.setProperty("--hero-shift-x", "0");
    hero.style.setProperty("--hero-shift-y", "0");
    hero.style.setProperty("--hero-shift-x-px", "0px");
    hero.style.setProperty("--hero-shift-y-px", "0px");

    if (hero.__homeCosmosPointer) {
      hero.__homeCosmosPointer.targetX = 0;
      hero.__homeCosmosPointer.targetY = 0;
    }
  };

  const liveObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        hero.classList.toggle("is-live", entry.isIntersecting);
      });
    },
    { threshold: 0.32 }
  );

  liveObserver.observe(hero);
  hero.addEventListener("pointermove", updatePointer);
  hero.addEventListener("pointerleave", resetPointer);
  hero.addEventListener("pointercancel", resetPointer);
  window.addEventListener("scroll", setSequenceFromScroll, { passive: true });
  window.addEventListener("resize", setSequenceFromScroll);

  if (sequenceNodes.length) {
    activateSequence(sequenceNodes, sequencePanels, activeIndex);
  }

  if (!reducedMotion && sequenceNodes.length > 1) {
    sequenceTimer = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % sequenceNodes.length;
      activateSequence(sequenceNodes, sequencePanels, activeIndex);
      hero.style.setProperty("--hero-scroll-progress", (activeIndex / (sequenceNodes.length - 1)).toFixed(4));
    }, SEQUENCE_INTERVAL_MS);
  }

  setSequenceFromScroll();
  initThreeField(hero, cosmos, canvas, reducedMotion);

  window.addEventListener(
    "pagehide",
    () => {
      liveObserver.disconnect();
      window.clearInterval(sequenceTimer);
      cleanupStages();
      hero.removeEventListener("pointermove", updatePointer);
      hero.removeEventListener("pointerleave", resetPointer);
      hero.removeEventListener("pointercancel", resetPointer);
      window.removeEventListener("scroll", setSequenceFromScroll);
      window.removeEventListener("resize", setSequenceFromScroll);
      hero.__homeCosmosCleanup?.();
    },
    { once: true }
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomeHero, { once: true });
} else {
  initHomeHero();
}
