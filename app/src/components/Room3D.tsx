import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Room3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const getSize = () => {
      const w = mount.clientWidth;
      return { w, h: w };
    };
    let { w, h } = getSize();

    // ---- scene ----
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

    // Re-read size after layout so the grid column (33vw) is resolved
    requestAnimationFrame(() => {
      const s = getSize();
      renderer.setSize(s.w, s.h);
      camera.updateProjectionMatrix();
    });

    // ---- lights ----
    const amb = new THREE.AmbientLight(0x4a5566, 0.6);
    scene.add(amb);

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

    const lampColor = 0xffb878;
    const lampLight = new THREE.PointLight(lampColor, 4.0, 8, 1.6);
    lampLight.castShadow = true;
    lampLight.shadow.mapSize.set(1024, 1024);
    lampLight.shadow.bias = -0.001;
    scene.add(lampLight);

    // ---- palette ----
    const COLORS = {
      bedFrame: '#3a3a3a',
      mattress: '#5a5a5a',
      duvet: '#7a7a7a',
      pillow: '#6a6a6a',
      nightstand: '#363636',
      lampBase: '#202020',
      lampShade: '#ffd9a8',
      desk: '#3c3c3c',
      deskTop: '#4a4a4a',
      chair: '#2a2a2a',
      chairCushion: '#3a3a3a',
      skin: '#a87a5e',
      hair: '#1a1a1a',
      shirt: '#454545',
      pants: '#2a2a2a',
      laptopBody: '#222222',
      laptopScreen: '#88c4ff',
      handle: '#1a1a1a',
      plantPot: '#2e2e2e',
      plantLeaf: '#5a6a5a',
      plantLeafDark: '#3e4a3e',
      art: '#2a2a2a',
      artInside: '#4a4a4a',
    };

    const M = (color: string, opts: { r?: number; m?: number; flat?: boolean } = {}) =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: opts.r ?? 0.8,
        metalness: opts.m ?? 0,
        flatShading: opts.flat ?? false,
      });

    const room = new THREE.Group();
    scene.add(room);

    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.55 });
    const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0;
    shadowPlane.receiveShadow = true;
    room.add(shadowPlane);

    const enableShadows = (obj: THREE.Object3D) => {
      obj.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) {
          (o as THREE.Mesh).castShadow = true;
          (o as THREE.Mesh).receiveShadow = true;
        }
      });
    };

    // ---- bed ----
    const bed = new THREE.Group();
    const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.5, 3.6), M(COLORS.bedFrame, { r: 0.9 }));
    bedFrame.position.set(0, 0.25, 0);
    bed.add(bedFrame);
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.35, 3.5), M(COLORS.mattress, { r: 0.95 }));
    mattress.position.set(0, 0.55, 0);
    bed.add(mattress);
    const duvet = new THREE.Mesh(new THREE.BoxGeometry(2.32, 0.18, 2.6), M(COLORS.duvet, { r: 1 }));
    duvet.position.set(0, 0.78, 0.2);
    bed.add(duvet);
    bed.position.set(1.5, 0, -2.0);
    enableShadows(bed);
    room.add(bed);

    const pillow = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.22, 0.7), M(COLORS.pillow, { r: 1 }));
    pillow.position.set(1.5, 0.86, -3.3);
    pillow.rotation.x = -0.05;
    pillow.castShadow = true;
    pillow.receiveShadow = true;
    room.add(pillow);

    // ---- nightstand ----
    const ns = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 0.9), M(COLORS.nightstand, { r: 0.9 }));
    ns.position.set(-0.4, 0.35, -3.0);
    ns.castShadow = true;
    ns.receiveShadow = true;
    room.add(ns);
    const drawer = new THREE.Mesh(new THREE.BoxGeometry(0.91, 0.02, 0.7), M(COLORS.bedFrame, { r: 1 }));
    drawer.position.set(-0.4, 0.55, -3.0);
    room.add(drawer);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), M(COLORS.handle, { r: 0.6 }));
    knob.position.set(-0.4, 0.5, -2.55);
    room.add(knob);

    // ---- lamp ----
    const lampGroup = new THREE.Group();
    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.04, 16), M(COLORS.lampBase, { r: 0.6 }));
    lampBase.position.set(0, 0.02, 0);
    lampGroup.add(lampBase);
    const shade = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 32, 24),
      new THREE.MeshStandardMaterial({
        color: COLORS.lampShade,
        roughness: 1,
        emissive: new THREE.Color(lampColor),
        emissiveIntensity: 3.0,
      })
    );
    shade.position.set(0, 0.34, 0);
    lampGroup.add(shade);
    lampGroup.position.set(-0.4, 0.7, -3.0);
    room.add(lampGroup);
    lampLight.position.set(-0.4, 1.04, -3.0);

    // ---- desk ----
    const deskGroup = new THREE.Group();
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.05, 0.7), M(COLORS.deskTop, { r: 0.7 }));
    deskTop.position.set(0, 0.78, 0);
    deskGroup.add(deskTop);
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.78, 0.65), M(COLORS.desk, { r: 0.85 }));
    legL.position.set(-0.75, 0.39, 0);
    deskGroup.add(legL);
    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.78, 0.65), M(COLORS.desk, { r: 0.85 }));
    legR.position.set(0.75, 0.39, 0);
    deskGroup.add(legR);
    const modesty = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.4, 0.03), M(COLORS.desk, { r: 0.85 }));
    modesty.position.set(0, 0.55, -0.32);
    deskGroup.add(modesty);

    // Laptop
    const laptop = new THREE.Group();
    const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 0.30), M(COLORS.laptopBody, { r: 0.5, m: 0.3 }));
    laptopBase.position.set(0, 0.01, 0);
    laptop.add(laptopBase);
    const screenGroup = new THREE.Group();
    const screenBack = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.012), M(COLORS.laptopBody, { r: 0.5, m: 0.3 }));
    screenGroup.add(screenBack);
    const screenGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.38, 0.24),
      new THREE.MeshStandardMaterial({
        color: COLORS.laptopScreen,
        emissive: new THREE.Color(COLORS.laptopScreen),
        emissiveIntensity: 1.4,
        roughness: 1,
      })
    );
    screenGlow.position.z = 0.007;
    screenGroup.add(screenGlow);
    screenGroup.position.set(0, 0.15, -0.14);
    screenGroup.rotation.x = -0.18;
    laptop.add(screenGroup);
    laptop.position.set(0, 0.805, 0.05);
    enableShadows(laptop);
    deskGroup.add(laptop);

    deskGroup.position.set(-2.3, 0, -3.1);
    enableShadows(deskGroup);
    room.add(deskGroup);

    // ---- chair ----
    const chairGroup = new THREE.Group();
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.5), M(COLORS.chair, { r: 0.7 }));
    seat.position.set(0, 0.46, 0);
    chairGroup.add(seat);
    const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.05, 0.46), M(COLORS.chairCushion, { r: 1 }));
    cushion.position.set(0, 0.51, 0);
    chairGroup.add(cushion);
    const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.05), M(COLORS.chair, { r: 0.7 }));
    backrest.position.set(0, 0.84, 0.23);
    chairGroup.add(backrest);
    const chairPost = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.42, 12), M(COLORS.chair, { r: 0.5, m: 0.4 }));
    chairPost.position.set(0, 0.23, 0);
    chairGroup.add(chairPost);
    const chairBase = new THREE.Mesh(new THREE.CylinderGeometry(0.30, 0.32, 0.04, 5), M(COLORS.chair, { r: 0.5, m: 0.4 }));
    chairBase.position.set(0, 0.03, 0);
    chairGroup.add(chairBase);
    chairGroup.position.set(-2.3, 0, -2.45);
    enableShadows(chairGroup);
    room.add(chairGroup);

    // ---- seated person ----
    const person = new THREE.Group();
    const skinMat = M(COLORS.skin, { r: 0.85 });
    const shirtMat = M(COLORS.shirt, { r: 0.95 });
    const pantsMat = M(COLORS.pants, { r: 0.95 });
    const hairMat = M(COLORS.hair, { r: 0.9 });

    const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.18, 0.32), pantsMat);
    pelvis.position.set(0, 0.62, 0.02);
    person.add(pelvis);
    const thighL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.42), pantsMat);
    thighL.position.set(-0.10, 0.59, -0.20);
    person.add(thighL);
    const thighR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.42), pantsMat);
    thighR.position.set(0.10, 0.59, -0.20);
    person.add(thighR);
    const shinL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.42, 0.12), pantsMat);
    shinL.position.set(-0.10, 0.30, -0.40);
    person.add(shinL);
    const shinR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.42, 0.12), pantsMat);
    shinR.position.set(0.10, 0.30, -0.40);
    person.add(shinR);
    const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.22), M('#111', { r: 0.7 }));
    shoeL.position.set(-0.10, 0.06, -0.48);
    person.add(shoeL);
    const shoeR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.22), M('#111', { r: 0.7 }));
    shoeR.position.set(0.10, 0.06, -0.48);
    person.add(shoeR);
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.55, 0.30), shirtMat);
    torso.position.set(0, 0.99, -0.02);
    torso.rotation.x = -0.12;
    person.add(torso);
    const upperArmL = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.32, 0.10), shirtMat);
    upperArmL.position.set(-0.26, 1.02, 0.0);
    upperArmL.rotation.x = -0.4;
    person.add(upperArmL);
    const upperArmR = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.32, 0.10), shirtMat);
    upperArmR.position.set(0.26, 1.02, 0.0);
    upperArmR.rotation.x = -0.4;
    person.add(upperArmR);
    const forearmL = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.30, 0.09), skinMat);
    forearmL.position.set(-0.22, 0.86, -0.22);
    forearmL.rotation.x = -1.25;
    person.add(forearmL);
    const forearmR = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.30, 0.09), skinMat);
    forearmR.position.set(0.22, 0.86, -0.22);
    forearmR.rotation.x = -1.25;
    person.add(forearmR);
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.08, 0.10), skinMat);
    neck.position.set(0, 1.30, -0.04);
    person.add(neck);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.28, 0.26), skinMat);
    head.position.set(0, 1.46, -0.06);
    head.rotation.x = -0.15;
    person.add(head);
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.27), hairMat);
    hair.position.set(0, 1.58, -0.04);
    person.add(hair);
    const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.18, 0.05), hairMat);
    hairBack.position.set(0, 1.48, 0.07);
    person.add(hairBack);

    person.position.set(-2.3, 0, -2.45);
    enableShadows(person);
    room.add(person);

    // ---- plant ----
    const plant = new THREE.Group();
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.45, 24), M(COLORS.plantPot, { r: 0.9 }));
    pot.position.set(0, 0.225, 0);
    plant.add(pot);
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.04, 24), M('#0a0a0a', { r: 1 }));
    soil.position.set(0, 0.46, 0);
    plant.add(soil);
    const leafMat = M(COLORS.plantLeaf, { r: 0.85, flat: true });
    const leafMatDark = M(COLORS.plantLeafDark, { r: 0.85, flat: true });
    const leafPositions: [number, number, number, number, THREE.MeshStandardMaterial][] = [
      [0, 0.7, 0, 0.45, leafMat],
      [-0.18, 0.85, 0.05, 0.32, leafMatDark],
      [0.15, 0.95, -0.1, 0.36, leafMat],
      [0.05, 1.15, 0.12, 0.28, leafMatDark],
      [-0.1, 1.25, -0.05, 0.24, leafMat],
      [0.12, 1.4, 0.0, 0.2, leafMatDark],
    ];
    leafPositions.forEach(([x, y, z, r, mat]) => {
      const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), mat);
      leaf.position.set(x, y, z);
      plant.add(leaf);
    });
    plant.position.set(-3.0, 0, 1.2);
    enableShadows(plant);
    room.add(plant);

    // ---- art (floating) ----
    const artGroup = new THREE.Group();
    const artFrame = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.6, 0.04), M(COLORS.art, { r: 0.9 }));
    artFrame.position.set(0, 0, 0);
    artGroup.add(artFrame);
    const artInside = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.48, 0.02), M(COLORS.artInside, { r: 1 }));
    artInside.position.set(0, 0, 0.02);
    artGroup.add(artInside);
    artGroup.position.set(1.5, 2.6, -3.93);
    enableShadows(artGroup);
    room.add(artGroup);

    // ---- camera orbit/pan controls ----
    const target = new THREE.Vector3(0, 1.0, 0);
    const initialOffset = new THREE.Vector3(9.5, 8.5, 9.5);
    const radius = initialOffset.length();
    let theta = Math.atan2(initialOffset.x, initialOffset.z);
    let phi = Math.acos(initialOffset.y / radius);
    let dragging = false;
    let dragMode: 'orbit' | 'pan' | null = null;
    let lastX = 0, lastY = 0;

    const updateCamera = () => {
      const sinPhi = Math.sin(phi);
      camera.position.set(
        target.x + radius * sinPhi * Math.sin(theta),
        target.y + radius * Math.cos(phi),
        target.z + radius * sinPhi * Math.cos(theta)
      );
      camera.lookAt(target);
    };
    updateCamera();

    const canvas = renderer.domElement;
    canvas.style.cursor = 'grab';
    canvas.style.touchAction = 'none';

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragMode = (e.shiftKey || e.button === 2) ? 'pan' : 'orbit';
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
      e.preventDefault();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      if (e.shiftKey) dragMode = 'pan';
      if (dragMode === 'orbit') {
        const ROT_SPEED = 0.008;
        theta -= dx * ROT_SPEED;
        phi -= dy * ROT_SPEED;
        const EPS = 0.05;
        phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));
      } else {
        const PAN_SPEED = 0.015;
        const right = new THREE.Vector3();
        const up = new THREE.Vector3();
        right.setFromMatrixColumn(camera.matrix, 0);
        up.setFromMatrixColumn(camera.matrix, 1);
        target.addScaledVector(right, -dx * PAN_SPEED);
        target.addScaledVector(up, dy * PAN_SPEED);
      }
      updateCamera();
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      dragMode = null;
      canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    // ---- animate ----
    let raf: number;
    const t0 = performance.now();
    const animate = () => {
      const t = (performance.now() - t0) / 1000;
      lampLight.intensity = 4.0 + Math.sin(t * 4.3) * 0.12 + Math.sin(t * 11.7) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const s = getSize();
      renderer.setSize(s.w, s.h);
      camera.aspect = s.w / s.h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
          else mesh.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        ref={mountRef}
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          background: 'transparent',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          right: 14,
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--fg-3)',
          pointerEvents: 'none',
          opacity: 0.7,
          textAlign: 'right',
          lineHeight: 1.5,
        }}
      >
        drag · orbit<br />
        ⇧ drag · pan
      </div>
    </div>
  );
}
