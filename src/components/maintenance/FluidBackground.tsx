import { useEffect, useRef, useCallback } from "react";

interface FluidBackgroundProps {
  className?: string;
}

// Fluid simulation configuration
const CONFIG = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  DENSITY_DISSIPATION: 0.97,
  VELOCITY_DISSIPATION: 0.98,
  PRESSURE_ITERATIONS: 20,
  CURL: 30,
  SPLAT_RADIUS: 0.25,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLORFUL: true,
  BLOOM: true,
  BLOOM_INTENSITY: 0.8,
  SUNRAYS: true,
  SUNRAYS_WEIGHT: 1.0,
};

// Color palette inspired by dimensione4.it (teal/cyan variations)
const COLORS = [
  { r: 0.07, g: 0.65, b: 0.64 }, // Teal primary
  { r: 0.14, g: 0.90, b: 0.90 }, // Cyan accent
  { r: 0.05, g: 0.45, b: 0.55 }, // Deep teal
  { r: 0.20, g: 0.75, b: 0.80 }, // Light cyan
  { r: 0.03, g: 0.35, b: 0.40 }, // Dark teal
];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export function FluidBackground({ className = "" }: FluidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const pointerRef = useRef({ x: 0, y: 0, dx: 0, dy: 0, down: false, moved: false });
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programsRef = useRef<any>({});
  const fboRef = useRef<any>({});

  // Vertex shader
  const baseVertexShader = `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
    void main () {
      vUv = aPosition * 0.5 + 0.5;
      vL = vUv - vec2(texelSize.x, 0.0);
      vR = vUv + vec2(texelSize.x, 0.0);
      vT = vUv + vec2(0.0, texelSize.y);
      vB = vUv - vec2(0.0, texelSize.y);
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  // Fragment shaders
  const displayShader = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uBloom;
    void main () {
      vec3 color = texture2D(uTexture, vUv).rgb;
      color = pow(color, vec3(0.45));
      color *= 1.0 + uBloom * 0.3;
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const splatShader = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;
    void main () {
      vec2 p = vUv - point.xy;
      p.x *= aspectRatio;
      vec3 splat = exp(-dot(p, p) / radius) * color;
      vec3 base = texture2D(uTarget, vUv).xyz;
      gl_FragColor = vec4(base + splat, 1.0);
    }
  `;

  const advectionShader = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;
    void main () {
      vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
      gl_FragColor = dissipation * texture2D(uSource, coord);
    }
  `;

  const divergenceShader = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;
      float div = 0.5 * (R - L + T - B);
      gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
  `;

  const curlShader = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
      float L = texture2D(uVelocity, vL).y;
      float R = texture2D(uVelocity, vR).y;
      float T = texture2D(uVelocity, vT).x;
      float B = texture2D(uVelocity, vB).x;
      float vorticity = R - L - T + B;
      gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
  `;

  const vorticityShader = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;
    void main () {
      float L = texture2D(uCurl, vL).x;
      float R = texture2D(uCurl, vR).x;
      float T = texture2D(uCurl, vT).x;
      float B = texture2D(uCurl, vB).x;
      float C = texture2D(uCurl, vUv).x;
      vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
      force /= length(force) + 0.0001;
      force *= curl * C;
      force.y *= -1.0;
      vec2 vel = texture2D(uVelocity, vUv).xy;
      gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
    }
  `;

  const pressureShader = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float C = texture2D(uPressure, vUv).x;
      float divergence = texture2D(uDivergence, vUv).x;
      float pressure = (L + R + B + T - divergence) * 0.25;
      gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
  `;

  const gradientSubtractShader = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity.xy -= vec2(R - L, T - B);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `;

  const clearShader = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;
    void main () {
      gl_FragColor = value * texture2D(uTexture, vUv);
    }
  `;

  const compileShader = useCallback((gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }, []);

  const createProgram = useCallback((gl: WebGLRenderingContext, vertexShader: string, fragmentShader: string) => {
    const program = gl.createProgram();
    if (!program) return null;
    const vs = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) return null;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return null;
    }
    return program;
  }, [compileShader]);

  const createFBO = useCallback((gl: WebGLRenderingContext, w: number, h: number, internalFormat: number, format: number, type: number, filter: number) => {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return {
      texture,
      fbo,
      width: w,
      height: h,
      attach: (id: number) => {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      }
    };
  }, []);

  const createDoubleFBO = useCallback((gl: WebGLRenderingContext, w: number, h: number, internalFormat: number, format: number, type: number, filter: number) => {
    let fbo1 = createFBO(gl, w, h, internalFormat, format, type, filter);
    let fbo2 = createFBO(gl, w, h, internalFormat, format, type, filter);

    return {
      width: w,
      height: h,
      texelSizeX: 1.0 / w,
      texelSizeY: 1.0 / h,
      get read() { return fbo1; },
      set read(value) { fbo1 = value; },
      get write() { return fbo2; },
      set write(value) { fbo2 = value; },
      swap() {
        const temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      }
    };
  }, [createFBO]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    glRef.current = gl;

    // Enable extensions
    gl.getExtension("OES_texture_float");
    gl.getExtension("OES_texture_float_linear");

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create programs
    const displayProgram = createProgram(gl, baseVertexShader, displayShader);
    const splatProgram = createProgram(gl, baseVertexShader, splatShader);
    const advectionProgram = createProgram(gl, baseVertexShader, advectionShader);
    const divergenceProgram = createProgram(gl, baseVertexShader, divergenceShader);
    const curlProgram = createProgram(gl, baseVertexShader, curlShader);
    const vorticityProgram = createProgram(gl, baseVertexShader, vorticityShader);
    const pressureProgram = createProgram(gl, baseVertexShader, pressureShader);
    const gradientSubtractProgram = createProgram(gl, baseVertexShader, gradientSubtractShader);
    const clearProgram = createProgram(gl, baseVertexShader, clearShader);

    programsRef.current = {
      display: displayProgram,
      splat: splatProgram,
      advection: advectionProgram,
      divergence: divergenceProgram,
      curl: curlProgram,
      vorticity: vorticityProgram,
      pressure: pressureProgram,
      gradientSubtract: gradientSubtractProgram,
      clear: clearProgram,
    };

    // Create vertex buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

    // Init FBOs
    const simRes = CONFIG.SIM_RESOLUTION;
    const dyeRes = CONFIG.DYE_RESOLUTION;

    const texType = gl.FLOAT;
    const rgba = gl.RGBA;

    fboRef.current = {
      dye: createDoubleFBO(gl, dyeRes, dyeRes, rgba, rgba, texType, gl.LINEAR),
      velocity: createDoubleFBO(gl, simRes, simRes, rgba, rgba, texType, gl.LINEAR),
      divergence: createFBO(gl, simRes, simRes, rgba, rgba, texType, gl.NEAREST),
      curl: createFBO(gl, simRes, simRes, rgba, rgba, texType, gl.NEAREST),
      pressure: createDoubleFBO(gl, simRes, simRes, rgba, rgba, texType, gl.NEAREST),
    };

    // Utility functions
    const blit = (target: any) => {
      if (target == null) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };

    const splat = (x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) => {
      const { splat: splatProgram } = programsRef.current;
      if (!splatProgram) return;

      gl.useProgram(splatProgram);

      const positionLoc = gl.getAttribLocation(splatProgram, "aPosition");
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1i(gl.getUniformLocation(splatProgram, "uTarget"), fboRef.current.velocity.read.attach(0));
      gl.uniform1f(gl.getUniformLocation(splatProgram, "aspectRatio"), canvas.width / canvas.height);
      gl.uniform2f(gl.getUniformLocation(splatProgram, "point"), x, y);
      gl.uniform3f(gl.getUniformLocation(splatProgram, "color"), dx, dy, 0.0);
      gl.uniform1f(gl.getUniformLocation(splatProgram, "radius"), CONFIG.SPLAT_RADIUS / 100.0);
      blit(fboRef.current.velocity.write);
      fboRef.current.velocity.swap();

      gl.uniform1i(gl.getUniformLocation(splatProgram, "uTarget"), fboRef.current.dye.read.attach(0));
      gl.uniform3f(gl.getUniformLocation(splatProgram, "color"), color.r, color.g, color.b);
      blit(fboRef.current.dye.write);
      fboRef.current.dye.swap();
    };

    // Simulation step
    const step = (dt: number) => {
      const programs = programsRef.current;
      const fbos = fboRef.current;

      gl.disable(gl.BLEND);

      // Curl
      gl.useProgram(programs.curl);
      const curlPosLoc = gl.getAttribLocation(programs.curl, "aPosition");
      gl.enableVertexAttribArray(curlPosLoc);
      gl.vertexAttribPointer(curlPosLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(gl.getUniformLocation(programs.curl, "texelSize"), fbos.velocity.texelSizeX, fbos.velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(programs.curl, "uVelocity"), fbos.velocity.read.attach(0));
      blit(fbos.curl);

      // Vorticity
      gl.useProgram(programs.vorticity);
      const vortPosLoc = gl.getAttribLocation(programs.vorticity, "aPosition");
      gl.enableVertexAttribArray(vortPosLoc);
      gl.vertexAttribPointer(vortPosLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(gl.getUniformLocation(programs.vorticity, "texelSize"), fbos.velocity.texelSizeX, fbos.velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(programs.vorticity, "uVelocity"), fbos.velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(programs.vorticity, "uCurl"), fbos.curl.attach(1));
      gl.uniform1f(gl.getUniformLocation(programs.vorticity, "curl"), CONFIG.CURL);
      gl.uniform1f(gl.getUniformLocation(programs.vorticity, "dt"), dt);
      blit(fbos.velocity.write);
      fbos.velocity.swap();

      // Divergence
      gl.useProgram(programs.divergence);
      const divPosLoc = gl.getAttribLocation(programs.divergence, "aPosition");
      gl.enableVertexAttribArray(divPosLoc);
      gl.vertexAttribPointer(divPosLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(gl.getUniformLocation(programs.divergence, "texelSize"), fbos.velocity.texelSizeX, fbos.velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(programs.divergence, "uVelocity"), fbos.velocity.read.attach(0));
      blit(fbos.divergence);

      // Clear pressure
      gl.useProgram(programs.clear);
      const clearPosLoc = gl.getAttribLocation(programs.clear, "aPosition");
      gl.enableVertexAttribArray(clearPosLoc);
      gl.vertexAttribPointer(clearPosLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1i(gl.getUniformLocation(programs.clear, "uTexture"), fbos.pressure.read.attach(0));
      gl.uniform1f(gl.getUniformLocation(programs.clear, "value"), 0.8);
      blit(fbos.pressure.write);
      fbos.pressure.swap();

      // Pressure iterations
      gl.useProgram(programs.pressure);
      const pressPosLoc = gl.getAttribLocation(programs.pressure, "aPosition");
      gl.enableVertexAttribArray(pressPosLoc);
      gl.vertexAttribPointer(pressPosLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(gl.getUniformLocation(programs.pressure, "texelSize"), fbos.velocity.texelSizeX, fbos.velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(programs.pressure, "uDivergence"), fbos.divergence.attach(0));
      for (let i = 0; i < CONFIG.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(gl.getUniformLocation(programs.pressure, "uPressure"), fbos.pressure.read.attach(1));
        blit(fbos.pressure.write);
        fbos.pressure.swap();
      }

      // Gradient Subtract
      gl.useProgram(programs.gradientSubtract);
      const gradPosLoc = gl.getAttribLocation(programs.gradientSubtract, "aPosition");
      gl.enableVertexAttribArray(gradPosLoc);
      gl.vertexAttribPointer(gradPosLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(gl.getUniformLocation(programs.gradientSubtract, "texelSize"), fbos.velocity.texelSizeX, fbos.velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(programs.gradientSubtract, "uPressure"), fbos.pressure.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(programs.gradientSubtract, "uVelocity"), fbos.velocity.read.attach(1));
      blit(fbos.velocity.write);
      fbos.velocity.swap();

      // Advect velocity
      gl.useProgram(programs.advection);
      const advPosLoc = gl.getAttribLocation(programs.advection, "aPosition");
      gl.enableVertexAttribArray(advPosLoc);
      gl.vertexAttribPointer(advPosLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(gl.getUniformLocation(programs.advection, "texelSize"), fbos.velocity.texelSizeX, fbos.velocity.texelSizeY);
      gl.uniform1i(gl.getUniformLocation(programs.advection, "uVelocity"), fbos.velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(programs.advection, "uSource"), fbos.velocity.read.attach(0));
      gl.uniform1f(gl.getUniformLocation(programs.advection, "dt"), dt);
      gl.uniform1f(gl.getUniformLocation(programs.advection, "dissipation"), CONFIG.VELOCITY_DISSIPATION);
      blit(fbos.velocity.write);
      fbos.velocity.swap();

      // Advect dye
      gl.uniform1i(gl.getUniformLocation(programs.advection, "uVelocity"), fbos.velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(programs.advection, "uSource"), fbos.dye.read.attach(1));
      gl.uniform1f(gl.getUniformLocation(programs.advection, "dissipation"), CONFIG.DENSITY_DISSIPATION);
      blit(fbos.dye.write);
      fbos.dye.swap();
    };

    // Render
    const render = () => {
      const { display } = programsRef.current;
      if (!display) return;

      gl.useProgram(display);
      const posLoc = gl.getAttribLocation(display, "aPosition");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1i(gl.getUniformLocation(display, "uTexture"), fboRef.current.dye.read.attach(0));
      gl.uniform1f(gl.getUniformLocation(display, "uBloom"), CONFIG.BLOOM_INTENSITY);
      blit(null);
    };

    // Animation loop
    let lastTime = Date.now();
    let autoSplatTimer = 0;

    const animate = () => {
      const now = Date.now();
      let dt = (now - lastTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastTime = now;

      // Auto splat for ambient effect
      autoSplatTimer += dt;
      if (autoSplatTimer > 0.5) {
        autoSplatTimer = 0;
        const x = Math.random();
        const y = Math.random();
        const dx = (Math.random() - 0.5) * CONFIG.SPLAT_FORCE * 0.1;
        const dy = (Math.random() - 0.5) * CONFIG.SPLAT_FORCE * 0.1;
        const color = getRandomColor();
        splat(x, y, dx, dy, color);
      }

      // Handle pointer movement
      if (pointerRef.current.moved) {
        pointerRef.current.moved = false;
        const color = getRandomColor();
        splat(
          pointerRef.current.x,
          pointerRef.current.y,
          pointerRef.current.dx * CONFIG.SPLAT_FORCE,
          pointerRef.current.dy * CONFIG.SPLAT_FORCE,
          color
        );
      }

      step(dt);
      render();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initial splats
    for (let i = 0; i < 5; i++) {
      const color = getRandomColor();
      const x = Math.random();
      const y = Math.random();
      const dx = (Math.random() - 0.5) * 1000;
      const dy = (Math.random() - 0.5) * 1000;
      splat(x, y, dx, dy, color);
    }

    animate();

    // Event handlers
    const updatePointer = (x: number, y: number) => {
      const rect = canvas.getBoundingClientRect();
      const newX = (x - rect.left) / rect.width;
      const newY = 1.0 - (y - rect.top) / rect.height;

      if (pointerRef.current.x !== 0 || pointerRef.current.y !== 0) {
        pointerRef.current.dx = newX - pointerRef.current.x;
        pointerRef.current.dy = newY - pointerRef.current.y;
        pointerRef.current.moved = true;
      }

      pointerRef.current.x = newX;
      pointerRef.current.y = newY;
    };

    const onMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      updatePointer(touch.clientX, touch.clientY);
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createProgram, createFBO, createDoubleFBO]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ touchAction: "none" }}
    />
  );
}
