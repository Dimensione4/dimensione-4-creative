import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import {
  useRef,
  Suspense,
  useEffect,
  useState,
  useLayoutEffect,
  useMemo,
} from "react";
import * as THREE from "three";

// Exact 36 circles from the Dimensione 4 logo - DO NOT MODIFY
const SYMBOL_DATA = [
  { x: -0.8078, y: -0.18, r: 0.1423, color: "#178A7A" },
  { x: -0.5534, y: -0.1926, r: 0.0338, color: "#1E9D90" },
  { x: -0.5057, y: -0.3462, r: 0.0489, color: "#1C9F92" },
  { x: -0.7347, y: -0.5124, r: 0.1169, color: "#188F80" },
  { x: -0.5559, y: -0.7544, r: 0.082, color: "#199B8D" },
  { x: -0.6383, y: -0.84, r: 0.0338, color: "#1AA092" },
  { x: -0.382, y: -0.7993, r: 0.082, color: "#1AAE9F" },
  { x: -0.1851, y: -0.7627, r: 0.1169, color: "#18A595" },
  { x: -0.0142, y: -0.8138, r: 0.082, color: "#1ABBAE" },
  { x: 0.107, y: -0.8922, r: 0.0338, color: "#1CC8BD" },
  { x: 0.1915, y: -0.9722, r: 0.0489, color: "#1ECBC0" },
  { x: 0.3775, y: -0.9687, r: 0.1169, color: "#1CD7CD" },
  { x: 0.5522, y: -0.8278, r: 0.1169, color: "#19E1DD" },
  { x: 0.7128, y: -0.6864, r: 0.082, color: "#1DE8E5" },
  { x: 0.8155, y: -0.5024, r: 0.0489, color: "#1FE8E6" },
  { x: 0.9067, y: -0.4086, r: 0.0338, color: "#22F0EF" },
  { x: 0.8768, y: -0.2052, r: 0.082, color: "#21F4F3" },
  { x: 0.9579, y: -0.0568, r: 0.1169, color: "#1FF4F2" },
  { x: 0.9723, y: 0.0011, r: 0.0338, color: "#23FAF9" },
  { x: 0.974, y: 0.1758, r: 0.0489, color: "#25FDFD" },
  { x: 0.8215, y: 0.3476, r: 0.082, color: "#1FF4F3" },
  { x: 0.9378, y: 0.469, r: 0.082, color: "#20F4F4" },
  { x: 0.986, y: 0.5447, r: 0.0338, color: "#1FF3F3" },
  { x: 0.8504, y: 0.6905, r: 0.1169, color: "#1CE7E4" },
  { x: 0.6517, y: 0.6774, r: 0.082, color: "#1ADEDA" },
  { x: 0.5046, y: 0.7777, r: 0.0338, color: "#1ACAC0" },
  { x: 0.2364, y: 0.8467, r: 0.1169, color: "#1CCBC1" },
  { x: 0.0899, y: 0.949, r: 0.0489, color: "#18C2B5" },
  { x: -0.0942, y: 0.9091, r: 0.0338, color: "#18B4A6" },
  { x: -0.2672, y: 0.8521, r: 0.082, color: "#19AFA1" },
  { x: -0.4742, y: 0.7928, r: 0.0489, color: "#198C7C" },
  { x: -0.8264, y: 0.5452, r: 0.1169, color: "#199B8C" },
  { x: -0.8123, y: 0.234, r: 0.082, color: "#188D7E" },
  { x: -0.7459, y: 0.1066, r: 0.0489, color: "#188C7D" },
  { x: -0.6678, y: 0.5954, r: 0.082, color: "#19998B" },
  { x: -0.571, y: 0.8323, r: 0.1423, color: "#178A7A" },
];

const SCALE = 4;

type Dot = { x: number; y: number; z?: number; r: number; color: string };

function easeInOut(t: number) {
  return t * t * (3 - 2 * t); // smoothstep
}

function armArc({
  centerX,
  centerY,
  startAngle,
  endAngle,
  radiusStart,
  radiusEnd,
  count,
  rMin,
  rMax,
  colorFrom,
  colorTo,
  zWeave,
}: {
  centerX: number;
  centerY: number;
  startAngle: number;
  endAngle: number;
  radiusStart: number;
  radiusEnd: number;
  count: number;
  rMin: number;
  rMax: number;
  colorFrom: string;
  colorTo: string;
  zWeave: number;
}): Dot[] {
  const c1 = new THREE.Color(colorFrom);
  const c2 = new THREE.Color(colorTo);

  const dots: Dot[] = [];

  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const tt = easeInOut(t);

    const angle = lerp(startAngle, endAngle, tt);
    const radius = lerp(radiusStart, radiusEnd, tt);

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    // ✅ dimensione: estremità piccole, centro grande
    const rr = lerp(rMin, rMax, bell(tt));

    // ✅ gradiente colore lungo braccio
    const col = c1.clone().lerp(c2, tt);

    // ✅ interlaccio in profondità
    const z = (tt - 0.5) * 2 * zWeave;

    dots.push({
      x,
      y,
      z,
      r: rr,
      color: `#${col.getHexString()}`,
    });
  }

  return dots;
}

function sortByAngle(dots: Dot[]) {
  return [...dots].sort((a, b) => {
    const ta = Math.atan2(a.y, a.x);
    const tb = Math.atan2(b.y, b.x);
    return ta - tb;
  });
}

function armIdFromSpiral(theta: number, rho: number, spiral = 1.65) {
  // theta: -PI..PI  -> 0..2PI
  const t = theta < 0 ? theta + Math.PI * 2 : theta;

  // spiral: più alto = più twist portale
  const v = t + rho * spiral;

  const arm = Math.floor((v / (Math.PI * 2)) * 4) % 4;
  return arm;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function normalize(vx: number, vy: number) {
  const len = Math.hypot(vx, vy) || 1;
  return { nx: vx / len, ny: vy / len };
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function easeInOutCubic(t: number) {
  // return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function polarToXY(angle: number, radius: number) {
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

function bell(t: number) {
  return Math.sin(t * Math.PI);
}

// function generateInterlacedArms(): Dot[] {
//   // Usa direttamente i dati del logo originale!
//   return SYMBOL_DATA.map((dot) => ({
//     x: dot.x,
//     y: dot.y,
//     z: 0, // Inizialmente flat, poi aggiungiamo depth nell'animazione
//     r: dot.r,
//     color: dot.color,
//   }));
// }

function leftMost(dots: Dot[]) {
  return dots.reduce((acc, d) => (d.x < acc.x ? d : acc), dots[0]);
}

function rightMost(dots: Dot[]) {
  return dots.reduce((acc, d) => (d.x > acc.x ? d : acc), dots[0]);
}

function leftMostBig(dots: Dot[], minR = 0.09) {
  const pool = dots.filter((d) => d.r >= minR);
  const arr = pool.length ? pool : dots;
  return arr.reduce((acc, d) => (d.x < acc.x ? d : acc), arr[0]);
}

function rightMostBig(dots: Dot[], minR = 0.09) {
  const pool = dots.filter((d) => d.r >= minR);
  const arr = pool.length ? pool : dots;
  return arr.reduce((acc, d) => (d.x > acc.x ? d : acc), arr[0]);
}

function bezier2(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  t: number,
) {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}

function bezier2Tangent(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  t: number,
) {
  // derivative of quadratic bezier
  const x = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
  const y = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);

  const len = Math.hypot(x, y) || 1;
  return { x: x / len, y: y / len };
}

function armBezierInterlaced({
  from,
  to,
  control,
  count,
  rMin,
  rMax,
  colorFrom,
  colorTo,
  zWeave,
  weaveAmp,
  weaveFreq,
  weavePhase,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  control: { x: number; y: number };
  count: number;
  rMin: number;
  rMax: number;
  colorFrom: string;
  colorTo: string;
  zWeave: number;

  // ✅ NEW
  weaveAmp: number; // quanto esce/entra (0.06..0.20)
  weaveFreq: number; // quante onde (di solito 1)
  weavePhase: number; // fase (0..PI)
}): Dot[] {
  const c1 = new THREE.Color(colorFrom);
  const c2 = new THREE.Color(colorTo);

  const dots: Dot[] = [];

  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const tt = easeInOut(t);

    // base bezier point
    const p = bezier2(from, control, to, tt);

    // tangent + normal
    const tan = bezier2Tangent(from, control, to, tt);
    const normal = { x: -tan.y, y: tan.x }; // rotate 90°

    // ✅ offset oscillante sulla normale (weaving)
    const wave = Math.sin(tt * Math.PI * weaveFreq + weavePhase); // -1..+1
    const offset = wave * weaveAmp;

    const x = p.x + normal.x * offset;
    const y = p.y + normal.y * offset;

    // size + color
    const rr = lerp(rMin, rMax, bell(tt));
    const col = c1.clone().lerp(c2, tt);

    // ✅ z weaving coordinato alla wave (perfetto effetto sopra/sotto)
    const z = wave * zWeave;

    dots.push({
      x,
      y,
      z,
      r: rr,
      color: `#${col.getHexString()}`,
    });
  }

  return dots;
}

function armBezier({
  from,
  to,
  control,
  count,
  rMin,
  rMax,
  colorFrom,
  colorTo,
  zWeave,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  control: { x: number; y: number };
  count: number;
  rMin: number;
  rMax: number;
  colorFrom: string;
  colorTo: string;
  zWeave: number;
}): Dot[] {
  const c1 = new THREE.Color(colorFrom);
  const c2 = new THREE.Color(colorTo);

  const dots: Dot[] = [];

  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const tt = easeInOut(t);

    // Quadratic Bezier
    const x =
      (1 - tt) * (1 - tt) * from.x +
      2 * (1 - tt) * tt * control.x +
      tt * tt * to.x;

    const y =
      (1 - tt) * (1 - tt) * from.y +
      2 * (1 - tt) * tt * control.y +
      tt * tt * to.y;

    const rr = lerp(rMin, rMax, bell(tt));
    const col = c1.clone().lerp(c2, tt);

    const z = (tt - 0.5) * 2 * zWeave;

    dots.push({
      x,
      y,
      z,
      r: rr,
      color: `#${col.getHexString()}`,
    });
  }

  return dots;
}

function generateDimensione4LogoDots(): Dot[] {
  // ✅ parametri globali (tuning)
  const baseRadius = 1.0; // raggio medio del logo
  const weaveRadius = 0.18; // quanto “interno/esterno” si intreccia
  const armSpan = Math.PI * 0.56; // 0.6 - ampiezza arco (semi-ish ma più corto)
  const countMain = 10; // quante sfere per braccio (tuning)
  const rMin = 0.03;
  const rMax = 0.16;

  // ✅ piccoli shift per ottenere l’effetto “non perfettamente centrato”
  const shiftBottomX = 0.08; // braccio basso shift a dx
  const shiftLeftY = 0.0;
  const shiftRightY = 0.0;

  // ✅ Z interlace
  const zWeave = 0.08;

  // colori coerenti al brand
  const leftFrom = "#178A7A";
  const leftTo = "#1ABBAE";
  const rightFrom = "#19E1DD";
  const rightTo = "#25FDFD";

  const dots: Dot[] = [];

  // TOP arm (orizzontale sopra)
  const topDots = armArc({
    centerX: 0,
    centerY: 0,
    startAngle: Math.PI / 2 + armSpan,
    endAngle: Math.PI / 2 - armSpan,
    radiusStart: baseRadius + weaveRadius,
    radiusEnd: baseRadius - weaveRadius,
    count: countMain,
    rMin,
    rMax,
    colorFrom: leftFrom,
    colorTo: rightTo,
    zWeave,
  });

  dots.push(...topDots);

  // RIGHT arm (verticale a destra)
  // dots.push(
  //   ...armArc({
  //     centerX: 0,
  //     centerY: shiftRightY,
  //     startAngle: 0 + armSpan,
  //     endAngle: 0 - armSpan,
  //     radiusStart: baseRadius - weaveRadius, // inner
  //     radiusEnd: baseRadius + weaveRadius, // outer
  //     count: countMain,
  //     rMin,
  //     rMax,
  //     colorFrom: rightFrom,
  //     colorTo: rightTo,
  //     zWeave: -zWeave, // alterna profondità
  //   })
  // );

  // BOTTOM arm (orizzontale sotto, shiftato a dx)
  const bottomDots = armArc({
    centerX: shiftBottomX,
    centerY: 0,
    startAngle: -Math.PI / 2 + armSpan,
    endAngle: -Math.PI / 2 - armSpan,
    radiusStart: baseRadius + weaveRadius,
    radiusEnd: baseRadius - weaveRadius,
    count: countMain,
    rMin,
    rMax,
    colorFrom: leftFrom,
    colorTo: rightFrom,
    zWeave,
  });

  dots.push(...bottomDots);

  // LEFT arm (verticale a sinistra)
  // dots.push(
  //   ...armArc({
  //     centerX: 0,
  //     centerY: shiftLeftY,
  //     startAngle: Math.PI + armSpan,
  //     endAngle: Math.PI - armSpan,
  //     radiusStart: baseRadius + weaveRadius, // outer
  //     radiusEnd: baseRadius - weaveRadius, // inner
  //     count: countMain,
  //     rMin,
  //     rMax,
  //     colorFrom: leftFrom,
  //     colorTo: rightFrom,
  //     zWeave: -zWeave,
  //   })
  // );

  // ------------------------------------
  // LEFT ARM (fit in gap TOP<->BOTTOM)
  // ------------------------------------
  const topLeft = leftMostBig(topDots, 0.09);
  const bottomLeft = leftMostBig(bottomDots, 0.09);

  // CONTROL POINT: spinge la curva fuori e dentro al gap
  const leftBulgeX = Math.min(topLeft.x, bottomLeft.x) - 0.55; // slider: -0.40..-0.70
  const leftBulgeY = (topLeft.y + bottomLeft.y) / 2;

  const leftDots = armBezierInterlaced({
    from: { x: topLeft.x, y: topLeft.y },
    to: { x: bottomLeft.x, y: bottomLeft.y },
    control: { x: leftBulgeX, y: leftBulgeY },

    count: countMain,
    rMin,
    rMax,
    colorFrom: leftFrom,
    colorTo: rightFrom,

    // ✅ questo deve essere "non troppo alto"
    zWeave: 0.1,

    // ✅ tuning: questi 3 sono il “segreto”
    weaveAmp: 0.14, // quanto entra/esce nel gap
    weaveFreq: 1, // 1 onda pulita
    weavePhase: Math.PI / 2, // così il centro è massimo
  });
  dots.push(...leftDots);

  // ------------------------------------
  // LEFT ARM (same shape as TOP/BOTTOM)
  // ------------------------------------
  // const leftDots = armArc({
  //   // centro leggermente più a sinistra per entrare nel gap
  //   centerX: -0.10,     // slider: -0.06 .. -0.14
  //   centerY: 0.00,

  //   // arco verticale sinistro (semicerchio)
  //   startAngle: Math.PI / 2 + armSpan,
  //   endAngle: -Math.PI / 2 - armSpan,

  //   // weaving coerente
  //   radiusStart: baseRadius - weaveRadius,  // inner
  //   radiusEnd: baseRadius + weaveRadius,    // outer

  //   count: countMain,
  //   rMin,
  //   rMax,

  //   colorFrom: leftFrom,
  //   colorTo: rightFrom,

  //   zWeave: -zWeave,
  // });

  // dots.push(...leftDots);

  return dots;
}

function generateInterlacedArms(): Dot[] {
  // ✅ start from original
  const base: Dot[] = SYMBOL_DATA.map((d) => ({ ...d, z: 0 }));

  // ✅ group by arm based on angle
  const arms: Dot[][] = [[], [], [], []];

  base.forEach((d) => {
    const theta = Math.atan2(d.y, d.x);
    const rho = Math.hypot(d.x, d.y);

    const arm = armIdFromSpiral(theta, rho, 1.65);
    arms[arm].push({ ...d });
  });

  // order points inside each arm along angle (so "t" makes sense)
  for (let k = 0; k < 4; k++) {
    arms[k] = sortByAngle(arms[k]);
  }

  // ✅ apply weave: inner→outer + z depth interlace
  const weaveStrength = 0.16; // quanto entra/esce radialmente
  const depth = 0.18; // offset z per “sotto/sopra”

  const result: Dot[] = [];

  for (let k = 0; k < 4; k++) {
    const arm = arms[k];
    const dir = k % 2 === 0 ? 1 : -1; // alterna

    arm.forEach((d, i) => {
      const theta = Math.atan2(d.y, d.x);
      const rho = Math.hypot(d.x, d.y);

      const t = arm.length <= 1 ? 0 : i / (arm.length - 1);
      const s = smoothstep(t);

      const dir = k % 2 === 0 ? 1 : -1;

      // 🔥 twist angolare: crea la spirale vera
      const twist = (s - 0.5) * 0.55 * dir;

      // nuovo angolo
      const newTheta = theta + twist;

      // radial offset come prima
      const radialOffset = (s - 0.5) * 2 * weaveStrength * dir;

      // nuovo raggio
      const rho2 = rho + radialOffset;

      // coordinate finali
      const x2 = Math.cos(newTheta) * rho2;
      const y2 = Math.sin(newTheta) * rho2;

      // ✅ “sopra/sotto” (Z): centro del braccio più evidente
      const z2 = (s - 0.5) * 2 * depth * dir;

      result.push({
        ...d,
        x: x2,
        y: y2,
        z: z2,
      });
    });
  }

  return result;
}

function BlenderLogo({
  viewSize,
  padding = 0.35,
}: {
  viewSize: number;
  padding?: number;
}) {
  const gltf = useGLTF("/Logo3D_Dimensione4_Blender_Simbolo_O.gltf");
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useLayoutEffect(() => {
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.scale.set(1, 1, 1);
    scene.updateWorldMatrix(true, true);

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const smallestAxis =
      size.x <= size.y && size.x <= size.z
        ? "x"
        : size.y <= size.x && size.y <= size.z
          ? "y"
          : "z";

    if (smallestAxis === "x") {
      scene.rotation.y = -Math.PI / 2;
    } else if (smallestAxis === "y") {
      scene.rotation.x = Math.PI / 2;
    }

    scene.updateWorldMatrix(true, true);

    const box2 = new THREE.Box3().setFromObject(scene);
    const size2 = new THREE.Vector3();
    const center2 = new THREE.Vector3();
    box2.getSize(size2);
    box2.getCenter(center2);

    scene.position.sub(center2);

    const maxDim = Math.max(size2.x, size2.y) || 1;
    const scale = (viewSize * padding) / maxDim;
    scene.scale.setScalar(scale);
  }, [scene, viewSize, padding]);

  return <primitive object={scene} />;
}

useGLTF.preload("/Logo3D_Dimensione4_Blender_Simbolo_O.gltf");

// Hook for mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

// Scroll position hook for parallax
function useScrollPosition() {
  const scroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scroll.current = window.scrollY / window.innerHeight;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
}

// Interactive circle with glow effect
function GlowSphere({
  x,
  y,
  z = 0,
  r,
  color,
  index,
}: {
  x: number;
  y: number;
  z?: number;
  r: number;
  color: string;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);

  const targetScale = useRef(1);
  const currentScale = useRef(1);

  useFrame((state) => {
    if (!groupRef.current || !glowRef.current || !sphereRef.current) return;

    targetScale.current = hovered ? 1.25 : 1;
    currentScale.current += (targetScale.current - currentScale.current) * 0.12;

    const t = state.clock.elapsedTime;

    // “micro breathing” premium + offset by index
    const pulse = Math.sin(t * 1.1 + index * 0.25) * 0.06 + 1.0;

    groupRef.current.scale.setScalar(currentScale.current);
    glowRef.current.scale.setScalar((hovered ? 1.8 : 1.55) * pulse);

    // Slight z wobble for depth perception + interlacing offset
    // groupRef.current.position.z =
    //   z * SCALE + Math.sin(t * 0.6 + index * 0.3) * 0.06;

    // groupRef.current.position.z = z * SCALE;
    // groupRef.current.rotation.z = -state.clock.elapsedTime * 0.01;
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    // e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  // const radius = r * SCALE * 0.55;
  const radius = r * SCALE;

  return (
    <group
      ref={groupRef}
      // position={[x * SCALE, y * SCALE, 0]}
      position={[x * SCALE, y * SCALE, z * SCALE]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Glow volumetrico */}
      {/* <mesh ref={glowRef} position={[0, 0, -0.15]}>
        <sphereGeometry args={[radius * 1.15, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={hovered ? 0.25 : 0.15}
          emissive={new THREE.Color(color)}
          emissiveIntensity={hovered ? 1.6 : 0.9}
        />
      </mesh> */}

      {/* Sfera principale */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial
          color={color}
          roughness={0.28}
          metalness={0.05}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.22}
        />
      </mesh>
    </group>
  );
}

// Symbol group with clockwise rotation and parallax
function SymbolGroup({
  scrollY,
  viewSize,
}: {
  scrollY: React.MutableRefObject<number>;
  viewSize: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Front face, centered
    groupRef.current.rotation.set(0.1, 5.8, 0);

    // Keep centered
    groupRef.current.position.set(0, -6, 0);
  });

  // useFrame((state) => {
  //   if (!groupRef.current) return;

  //   const t = state.clock.elapsedTime;

  //   // Tilt like the reference image
  //   const tiltX = -0.35;
  //   const tiltY = 0.2;
  //   groupRef.current.rotation.set(tiltX, tiltY, 0);

  //   // Slow clockwise orbit along the circumference
  //   const radius = 0.4;
  //   const speed = 0.25;
  //   groupRef.current.position.x = Math.cos(t * speed) * radius;
  //   groupRef.current.position.z = Math.sin(t * speed) * radius;
  //   groupRef.current.position.y = -0.8;
  // });

  return (
    <group ref={groupRef}>
      <BlenderLogo viewSize={viewSize} />
    </group>
  );
}

function Scene({
  scrollY,
  viewSize,
}: {
  scrollY: React.MutableRefObject<number>;
  viewSize: number;
}) {
  return (
    <>
      <SymbolGroup scrollY={scrollY} viewSize={viewSize} />
      {/* Logo Blender GLTF */}
      {/* <group position={[6.5, 0, 0]}>
        <BlenderLogo scale={2.2} />
      </group> */}
    </>
  );
}

export function Hero3DScene() {
  const isMobile = useIsMobile();
  const scrollY = useScrollPosition();

  const frustumSize = 8;
  const viewSize = frustumSize * 2;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-end pr-[2%] md:pr-[6%]">
      <div
        className="w-[380px] h-[380px] md:w-[500px] md:h-[500px] lg:w-[620px] lg:h-[620px]"
        style={{ aspectRatio: "1 / 1" }}
      >
        <Canvas
          orthographic
          camera={{
            zoom: 2.0,
            position: [0, 0, 12],
            left: -frustumSize,
            right: frustumSize,
            top: frustumSize,
            bottom: -frustumSize,
            near: 0.1,
            far: 100,
          }}
          dpr={isMobile ? 1 : [1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            {/* Adding Lights */}
            <ambientLight intensity={0.9} />
            <directionalLight position={[3, 5, 6]} intensity={1.1} />
            <pointLight
              position={[-11, -2, 6]}
              intensity={1.8}
              color="#22F0EF"
            />
            {/* Orbit Controls */}
            {!isMobile && (
              <OrbitControls
                makeDefault
                enableDamping
                dampingFactor={0.08}
                rotateSpeed={0.55}
                enablePan={true}
                panSpeed={0.6}
                enableZoom={true}
                zoomSpeed={0.9}
                minZoom={0.45}
                maxZoom={2.2}
                target={[0, 0, 0]}
              />
            )}
            <Scene scrollY={scrollY} viewSize={viewSize} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
