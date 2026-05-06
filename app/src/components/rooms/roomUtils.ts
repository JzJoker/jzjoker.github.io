import * as THREE from 'three';

export type Pose = 'sitting' | 'sitting-cafe';

export type MatFn = (color: string, opts?: { r?: number; m?: number }) => THREE.MeshStandardMaterial;

// ─── shared material helpers ───────────────────────────────────────────────

export function makeM(color: string, opts: { r?: number; m?: number } = {}): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness: opts.r ?? 0.8, metalness: opts.m ?? 0 });
}

export function warmEmissive(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: '#ffb878', roughness: 1,
    emissive: new THREE.Color('#ffb878'), emissiveIntensity: 2.5,
  });
}

export function coolEmissive(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: '#4a5a7a', roughness: 1,
    emissive: new THREE.Color('#4a5a7a'), emissiveIntensity: 0.4,
  });
}

// ─── character builder ─────────────────────────────────────────────────────

export function buildCharacter(pose: Pose): THREE.Group {
  const person = new THREE.Group();
  const skin = makeM('#a87a5e', { r: 0.85 });
  const shirt = makeM('#454545', { r: 0.95 });
  const pants = makeM('#2a2a2a', { r: 0.95 });
  const hair = makeM('#1a1a1a', { r: 0.9 });
  const shoe = makeM('#111', { r: 0.7 });

  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    person.add(m);
    return m;
  };

  // ── lower body (same for all seated poses) ──
  add(new THREE.BoxGeometry(0.36, 0.18, 0.32), pants, 0, 0.62, 0.02);
  add(new THREE.BoxGeometry(0.14, 0.14, 0.42), pants, -0.10, 0.59, -0.20);
  add(new THREE.BoxGeometry(0.14, 0.14, 0.42), pants,  0.10, 0.59, -0.20);
  add(new THREE.BoxGeometry(0.12, 0.42, 0.12), pants, -0.10, 0.30, -0.40);
  add(new THREE.BoxGeometry(0.12, 0.42, 0.12), pants,  0.10, 0.30, -0.40);
  add(new THREE.BoxGeometry(0.14, 0.06, 0.22), shoe,  -0.10, 0.06, -0.48);
  add(new THREE.BoxGeometry(0.14, 0.06, 0.22), shoe,   0.10, 0.06, -0.48);

  if (pose === 'sitting') {
    // torso leaning slightly toward desk
    add(new THREE.BoxGeometry(0.46, 0.55, 0.30), shirt, 0, 0.99, -0.02, -0.12);
    // upper arms reaching forward
    add(new THREE.BoxGeometry(0.10, 0.32, 0.10), shirt, -0.26, 1.02, 0.0, -0.4);
    add(new THREE.BoxGeometry(0.10, 0.32, 0.10), shirt,  0.26, 1.02, 0.0, -0.4);
    // forearms down to keyboard
    add(new THREE.BoxGeometry(0.09, 0.30, 0.09), skin, -0.22, 0.86, -0.22, -1.25);
    add(new THREE.BoxGeometry(0.09, 0.30, 0.09), skin,  0.22, 0.86, -0.22, -1.25);
    add(new THREE.BoxGeometry(0.10, 0.04, 0.12), skin, -0.18, 0.82, -0.36);
    add(new THREE.BoxGeometry(0.10, 0.04, 0.12), skin,  0.18, 0.82, -0.36);
    // head
    add(new THREE.BoxGeometry(0.10, 0.08, 0.10), skin, 0, 1.30, -0.04);
    add(new THREE.BoxGeometry(0.26, 0.28, 0.26), skin, 0, 1.46, -0.06, -0.15);
    add(new THREE.BoxGeometry(0.28, 0.12, 0.27), hair, 0, 1.58, -0.04);
    add(new THREE.BoxGeometry(0.27, 0.18, 0.05), hair, 0, 1.48,  0.07);

  } else if (pose === 'sitting-cafe') {
    // torso leaning forward more (holding a cup)
    add(new THREE.BoxGeometry(0.46, 0.55, 0.30), shirt, 0, 0.99, -0.04, -0.20);
    // left arm resting on table
    add(new THREE.BoxGeometry(0.10, 0.32, 0.10), shirt, -0.26, 1.00, 0.0, -0.5);
    add(new THREE.BoxGeometry(0.09, 0.30, 0.09), skin,  -0.22, 0.84, -0.24, -1.3);
    add(new THREE.BoxGeometry(0.10, 0.04, 0.12), skin,  -0.18, 0.80, -0.38);
    // right arm raised — holding cup
    add(new THREE.BoxGeometry(0.10, 0.32, 0.10), shirt, 0.26, 1.05, 0.0, -1.2, 0, -0.2);
    add(new THREE.BoxGeometry(0.09, 0.28, 0.09), skin,  0.26, 1.22, -0.18, -0.4);
    add(new THREE.BoxGeometry(0.10, 0.04, 0.10), skin,  0.26, 1.36, -0.22);
    // tiny cup in raised hand
    const cupHeld = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.032, 0.07, 8), makeM('#2a2a2a', { r: 0.9 }));
    cupHeld.position.set(0.26, 1.43, -0.22);
    person.add(cupHeld);
    // head – slightly looking down at cup / table
    add(new THREE.BoxGeometry(0.10, 0.08, 0.10), skin, 0, 1.28, -0.06);
    add(new THREE.BoxGeometry(0.26, 0.28, 0.26), skin, 0, 1.44, -0.06, -0.10);
    add(new THREE.BoxGeometry(0.28, 0.12, 0.27), hair, 0, 1.56, -0.04);
    add(new THREE.BoxGeometry(0.27, 0.18, 0.05), hair, 0, 1.46,  0.07);
  }

  return person;
}

// ─── scene bootstrap ───────────────────────────────────────────────────────

export interface RoomScene {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  room: THREE.Group;
  warmLight: THREE.PointLight;
  enableShadows: (obj: THREE.Object3D) => void;
  startAnimate: (onFrame: (t: number) => void) => () => void;
  setupControls: () => () => void;
  setupResize: () => () => void;
  dispose: () => void;
}

export function createRoomScene(mount: HTMLDivElement): RoomScene {
  const getSize = () => ({ w: mount.clientWidth, h: mount.clientWidth });
  const { w, h } = getSize();

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
  camera.position.set(9.5, 8.5, 9.5);
  camera.lookAt(0, 1.0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);
  renderer.domElement.style.background = 'transparent';

  requestAnimationFrame(() => {
    const s = getSize();
    renderer.setSize(s.w, s.h);
    camera.updateProjectionMatrix();
  });

  // ── lights ──
  scene.add(new THREE.AmbientLight(0x4a5566, 0.6));

  const coolKey = new THREE.DirectionalLight(0x9fb4cc, 0.55);
  coolKey.position.set(-6, 9, 4);
  coolKey.castShadow = true;
  coolKey.shadow.mapSize.set(1024, 1024);
  coolKey.shadow.camera.left = -6;
  coolKey.shadow.camera.right = 6;
  coolKey.shadow.camera.top = 6;
  coolKey.shadow.camera.bottom = -6;
  coolKey.shadow.camera.near = 0.1;
  coolKey.shadow.camera.far = 25;
  coolKey.shadow.bias = -0.0008;
  scene.add(coolKey);

  const coolFill = new THREE.DirectionalLight(0x6a7a90, 0.25);
  coolFill.position.set(8, 4, 8);
  scene.add(coolFill);

  const warmLight = new THREE.PointLight(0xffb878, 2, 4, 2);
  warmLight.castShadow = true;
  warmLight.shadow.mapSize.set(512, 512);
  warmLight.shadow.bias = -0.001;
  scene.add(warmLight);

  // ── room group + shadow catcher ──
  const room = new THREE.Group();
  scene.add(room);

  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.ShadowMaterial({ opacity: 0.55 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.receiveShadow = true;
  room.add(shadowPlane);

  const enableShadows = (obj: THREE.Object3D) => {
    obj.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; }
    });
  };

  // ── orbit / pan controls ──
  const target = new THREE.Vector3(0, 1.0, 0);
  const offset = new THREE.Vector3(9.5, 8.5, 9.5);
  const radius = offset.length();
  let theta = Math.atan2(offset.x, offset.z);
  let phi = Math.acos(offset.y / radius);

  const updateCamera = () => {
    const sp = Math.sin(phi);
    camera.position.set(
      target.x + radius * sp * Math.sin(theta),
      target.y + radius * Math.cos(phi),
      target.z + radius * sp * Math.cos(theta),
    );
    camera.lookAt(target);
  };
  updateCamera();

  const setupControls = () => {
    const canvas = renderer.domElement;
    canvas.style.cursor = 'grab';
    canvas.style.touchAction = 'none';
    let drag = false;
    let mode: 'orbit' | 'pan' | null = null;
    let lx = 0, ly = 0;

    const onDown = (e: PointerEvent) => {
      drag = true; mode = (e.shiftKey || e.button === 2) ? 'pan' : 'orbit';
      lx = e.clientX; ly = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
      e.preventDefault();
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - lx, dy = e.clientY - ly;
      lx = e.clientX; ly = e.clientY;
      if (e.shiftKey) mode = 'pan';
      if (mode === 'orbit') {
        theta -= dx * 0.008;
        phi = Math.max(0.05, Math.min(Math.PI - 0.05, phi - dy * 0.008));
      } else {
        const r = new THREE.Vector3(), u = new THREE.Vector3();
        r.setFromMatrixColumn(camera.matrix, 0);
        u.setFromMatrixColumn(camera.matrix, 1);
        target.addScaledVector(r, -dx * 0.015);
        target.addScaledVector(u, dy * 0.015);
      }
      updateCamera();
    };
    const onUp = (e: PointerEvent) => {
      drag = false; mode = null;
      canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = 'grab';
    };
    const noCtx = (e: Event) => e.preventDefault();

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('contextmenu', noCtx);
    return () => {
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      canvas.removeEventListener('contextmenu', noCtx);
    };
  };

  // ── animate ──
  const startAnimate = (onFrame: (t: number) => void) => {
    let raf: number;
    const t0 = performance.now();
    const tick = () => {
      onFrame((performance.now() - t0) / 1000);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  };

  // ── resize ──
  const setupResize = () => {
    const ro = new ResizeObserver(() => {
      const s = getSize();
      renderer.setSize(s.w, s.h);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    });
    ro.observe(mount);
    return () => ro.disconnect();
  };

  const dispose = () => {
    renderer.dispose();
    if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    scene.traverse((obj) => {
      const m = obj as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      if (m.material) {
        if (Array.isArray(m.material)) m.material.forEach((x) => x.dispose());
        else m.material.dispose();
      }
    });
  };

  return { scene, renderer, camera, room, warmLight, enableShadows, startAnimate, setupControls, setupResize, dispose };
}

// ─── reusable furniture helpers ────────────────────────────────────────────

/** Desk chair (pedestal base, cushion, backrest) centred at origin, seat at y≈0.51 */
export function buildChair(M: MatFn): THREE.Group {
  const g = new THREE.Group();
  const dark = M('#252525', { r: 0.7 });
  const cushion = M('#303030', { r: 1 });
  g.add(obj(new THREE.BoxGeometry(0.50, 0.06, 0.50), dark, 0, 0.46, 0));
  g.add(obj(new THREE.BoxGeometry(0.46, 0.05, 0.46), cushion, 0, 0.51, 0));
  g.add(obj(new THREE.BoxGeometry(0.50, 0.65, 0.05), dark, 0, 0.82, 0.23));
  g.add(obj(new THREE.CylinderGeometry(0.04, 0.04, 0.42, 10), dark, 0, 0.23, 0));
  g.add(obj(new THREE.CylinderGeometry(0.28, 0.30, 0.04, 5), dark, 0, 0.03, 0));
  return g;
}

/** Minimal cafe chair (square seat, thin backrest, four straight legs) */
export function buildCafeChair(M: MatFn): THREE.Group {
  const g = new THREE.Group();
  const mat = M('#252525', { r: 0.85 });
  g.add(obj(new THREE.BoxGeometry(0.42, 0.04, 0.42), mat, 0, 0.46, 0));
  g.add(obj(new THREE.BoxGeometry(0.42, 0.52, 0.03), mat, 0, 0.74, 0.20));
  [[-0.18, -0.18], [-0.18, 0.18], [0.18, -0.18], [0.18, 0.18]].forEach(([x, z]) => {
    g.add(obj(new THREE.BoxGeometry(0.03, 0.46, 0.03), mat, x, 0.23, z));
  });
  return g;
}

/** Small potted plant */
export function buildPlant(M: MatFn): THREE.Group {
  const g = new THREE.Group();
  g.add(obj(new THREE.CylinderGeometry(0.18, 0.14, 0.28, 14), M('#252525', { r: 0.9 }), 0, 0.14, 0));
  g.add(obj(new THREE.CylinderGeometry(0.17, 0.17, 0.03, 14), M('#111', { r: 1 }), 0, 0.29, 0));
  const leaf = M('#3a4a3a', { r: 0.85 });
  const leafD = M('#2e3e2e', { r: 0.85 });
  [[0, 0.55, 0, 0.20, leaf], [-0.12, 0.70, 0.06, 0.16, leafD], [0.10, 0.80, -0.06, 0.14, leaf],
   [0.04, 0.93, 0.08, 0.12, leafD], [-0.06, 1.04, -0.04, 0.10, leaf]].forEach(([x, y, z, r, m]) => {
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(r as number, 0), m as THREE.Material);
    mesh.position.set(x as number, y as number, z as number);
    g.add(mesh);
  });
  return g;
}

/** Coffee mug (cylinder body + inner dark disc) */
export function buildMug(M: MatFn, color = '#2e2e2e'): THREE.Group {
  const g = new THREE.Group();
  g.add(obj(new THREE.CylinderGeometry(0.055, 0.048, 0.10, 12), M(color, { r: 0.9 }), 0, 0.05, 0));
  g.add(obj(new THREE.CylinderGeometry(0.044, 0.044, 0.015, 12), M('#111'), 0, 0.098, 0));
  return g;
}

// ─── internal helper ───────────────────────────────────────────────────────
function obj(geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  return m;
}
