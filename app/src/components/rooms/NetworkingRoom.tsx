import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createRoomScene, buildPlant, makeM, warmEmissive } from './roomUtils';
import type { MatFn } from './roomUtils';

export function NetworkingRoom() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const { room, warmLight, enableShadows, startAnimate, setupControls, setupResize, dispose, setCameraPosition, setTarget } = createRoomScene(mount);
    setCameraPosition(11.0, 7.8, 10.0);
    setTarget(0, 0.8, -0.5);
    const M = makeM;

    // ── cocktail high-top table ──
    const buildHighTop = (x: number, z: number) => {
      const g = new THREE.Group();
      g.add(mesh(new THREE.CylinderGeometry(0.38, 0.36, 0.06, 24), M('#2e2e2e', { r: 0.75 }), 0, 1.06, 0));
      g.add(mesh(new THREE.CylinderGeometry(0.030, 0.030, 1.00, 10), M('#1e1e1e', { r: 0.65 }), 0, 0.53, 0));
      g.add(mesh(new THREE.CylinderGeometry(0.20, 0.22, 0.04, 16), M('#1a1a1a', { r: 0.7 }), 0, 0.02, 0));
      g.position.set(x, 0, z);
      enableShadows(g);
      room.add(g);
    };

    buildHighTop(-1.2, -1.5);
    buildHighTop( 1.5, -0.8);
    buildHighTop(-3.2, -0.8);

    // ── champagne flutes ──
    const glassMat = new THREE.MeshStandardMaterial({
      color: '#c4ddd8', transparent: true, opacity: 0.32, roughness: 0.04, metalness: 0.08,
    });
    const placeFlute = (x: number, z: number) => {
      const g = new THREE.Group();
      g.add(mesh(new THREE.CylinderGeometry(0.048, 0.026, 0.15, 10), glassMat, 0, 0.075, 0));
      g.add(mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.05, 8), M('#1e1e1e', { r: 0.4 }), 0, -0.025, 0));
      g.add(mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.010, 10), M('#1e1e1e', { r: 0.4 }), 0, -0.056, 0));
      g.position.set(x, 1.09, z);
      room.add(g);
    };
    placeFlute(-1.05, -1.35);
    placeFlute(-1.32, -1.60);
    placeFlute( 1.64, -0.92);

    // ── bar counter ──
    const barG = new THREE.Group();
    barG.add(mesh(new THREE.BoxGeometry(3.40, 1.10, 0.55), M('#1c1c1c', { r: 0.85 }), 0, 0.55, 0));
    barG.add(mesh(new THREE.BoxGeometry(3.44, 0.05, 0.58), M('#2a2a2a', { r: 0.55 }), 0, 1.125, 0));
    barG.position.set(0.3, 0, -3.5);
    enableShadows(barG);
    room.add(barG);

    // shelf behind bar
    room.add(mesh(new THREE.BoxGeometry(2.90, 0.04, 0.26), M('#202020', { r: 0.8 }), 0.3, 2.20, -3.86));

    // bottles on shelf
    [-1.1, -0.65, -0.20, 0.25, 0.70, 1.15].forEach((bx, i) => {
      const h = 0.24 + (i % 2) * 0.08;
      const cols = ['#1a2a1a', '#1a1a28', '#2a1a10', '#182018', '#12121e', '#201610'];
      const col = cols[i % 6];
      const btl = new THREE.Group();
      btl.add(mesh(new THREE.CylinderGeometry(0.028, 0.032, h, 10), M(col, { r: 0.3, m: 0.06 }), 0, h / 2, 0));
      btl.add(mesh(new THREE.CylinderGeometry(0.014, 0.022, 0.06, 8), M(col, { r: 0.3 }), 0, h + 0.03, 0));
      btl.position.set(bx + 0.3, 2.22, -3.84);
      room.add(btl);
    });

    // ── event sign above bar ──
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512; signCanvas.height = 128;
    const sc = signCanvas.getContext('2d')!;
    sc.fillStyle = '#151515';
    sc.fillRect(0, 0, 512, 128);
    sc.fillStyle = '#c8a455';
    sc.textAlign = 'center';
    sc.font = 'bold 36px Georgia, serif';
    sc.fillText('NYC TECH WEEK', 256, 50);
    sc.font = '18px Georgia, serif';
    sc.fillStyle = '#8a7040';
    sc.fillText('NETWORKING · SPRING 2026', 256, 86);
    sc.strokeStyle = '#5a4428';
    sc.lineWidth = 2;
    sc.beginPath(); sc.moveTo(30, 66); sc.lineTo(482, 66); sc.stroke();
    const signTex = new THREE.CanvasTexture(signCanvas);
    const signG = new THREE.Group();
    signG.add(mesh(new THREE.BoxGeometry(1.70, 0.42, 0.05), M('#181818', { r: 0.9 }), 0, 0, 0));
    const signSurf = new THREE.Mesh(
      new THREE.PlaneGeometry(1.60, 0.32),
      new THREE.MeshStandardMaterial({ map: signTex, emissiveMap: signTex, emissive: new THREE.Color('#ffffff'), emissiveIntensity: 0.45, roughness: 1 }),
    );
    signSurf.position.z = 0.026;
    signG.add(signSurf);
    signG.position.set(0.3, 2.72, -3.62);
    room.add(signG);

    // ── Justin's character (standing, holding drink) ──
    const person = buildStandingPerson(M);
    person.position.set(-1.2, 0, -0.9);
    person.rotation.y = 0.5;
    enableShadows(person);
    room.add(person);

    // name badge on chest
    room.add((() => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.065, 0.008), new THREE.MeshStandardMaterial({ color: '#f2f2f0', roughness: 0.95 }));
      b.position.set(-1.10, 1.36, -1.04);
      b.rotation.y = 0.5;
      return b;
    })());

    // ── two background attendees ──
    const personB = buildStandingPerson(M, '#4e3e30', '#2e3a3a', '#242428');
    personB.position.set(1.8, 0, -1.1);
    personB.rotation.y = -0.7 + Math.PI;
    enableShadows(personB);
    room.add(personB);

    const personC = buildStandingPerson(M, '#3e3428', '#383030', '#1e2020');
    personC.position.set(1.2, 0, -0.4);
    personC.rotation.y = Math.PI * 0.75 - Math.PI;
    enableShadows(personC);
    room.add(personC);

    // ── pendant lights above each table ──
    [{ x: -1.2, z: -1.5 }, { x: 1.5, z: -0.8 }, { x: -3.2, z: -0.8 }].forEach(({ x, z }) => {
      const pg = new THREE.Group();
      pg.add(mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.72, 6), M('#181818', { r: 0.7 }), 0, -0.36, 0));
      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.6),
        warmEmissive(),
      );
      dome.position.y = -0.75;
      dome.rotation.z = Math.PI;
      pg.add(dome);
      pg.position.set(x, 3.0, z);
      room.add(pg);
      const pl = new THREE.PointLight(0xffb878, 1.0, 3.2, 2);
      pl.position.set(x, 2.2, z);
      room.add(pl);
    });

    warmLight.position.set(-1.2, 2.2, -1.5);
    warmLight.intensity = 2.0;

    // ── plant in corner ──
    const plant = buildPlant(M);
    plant.position.set(2.8, 0, -3.0);
    enableShadows(plant);
    room.add(plant);

    // ── overhead cool fill ──
    const fill = new THREE.PointLight(0xb8c8e0, 1.2, 10, 1.5);
    fill.position.set(0, 3.6, -1.5);
    room.add(fill);

    // ── bar accent light ──
    const barLight = new THREE.PointLight(0xffe8c0, 1.2, 4, 2);
    barLight.position.set(0.3, 2.8, -3.2);
    room.add(barLight);

    // ── animate ──
    const stopAnimate = startAnimate((t) => {
      warmLight.intensity = 2.0 + Math.sin(t * 3.5) * 0.10 + Math.sin(t * 10.1) * 0.04;
      person.position.y  = Math.sin(t * 1.7) * 0.008;
      personB.position.y = Math.sin(t * 2.0 + 1.1) * 0.007;
      personC.position.y = Math.sin(t * 1.5 + 2.4) * 0.008;
    });

    const stopControls = setupControls();
    const stopResize = setupResize();
    return () => { stopAnimate(); stopControls(); stopResize(); dispose(); };
  }, []);

  return <RoomMount mountRef={mountRef} />;
}

function buildStandingPerson(M: MatFn, skinColor = '#a87a5e', shirtColor = '#454545', pantsColor = '#2a2a2a'): THREE.Group {
  const p = new THREE.Group();
  const skin  = M(skinColor,  { r: 0.85 });
  const shirt = M(shirtColor, { r: 0.95 });
  const pants = M(pantsColor, { r: 0.95 });
  const hair  = M('#1a1a1a', { r: 0.9 });
  const shoe  = M('#111', { r: 0.7 });

  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, rx = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, 0, rz);
    p.add(m);
  };

  // feet
  add(new THREE.BoxGeometry(0.13, 0.06, 0.22), shoe, -0.10, 0.03,  0.04);
  add(new THREE.BoxGeometry(0.13, 0.06, 0.22), shoe,  0.10, 0.03,  0.04);
  // shins
  add(new THREE.BoxGeometry(0.11, 0.42, 0.11), pants, -0.10, 0.27, 0);
  add(new THREE.BoxGeometry(0.11, 0.42, 0.11), pants,  0.10, 0.27, 0);
  // thighs
  add(new THREE.BoxGeometry(0.13, 0.42, 0.13), pants, -0.10, 0.69, 0);
  add(new THREE.BoxGeometry(0.13, 0.42, 0.13), pants,  0.10, 0.69, 0);
  // hips
  add(new THREE.BoxGeometry(0.36, 0.18, 0.28), pants, 0, 0.99, 0);
  // torso
  add(new THREE.BoxGeometry(0.44, 0.54, 0.28), shirt, 0, 1.35, 0);
  // left arm (relaxed, down)
  add(new THREE.BoxGeometry(0.10, 0.30, 0.10), shirt, -0.27, 1.22, 0);
  add(new THREE.BoxGeometry(0.09, 0.28, 0.09), skin,  -0.27, 0.96, 0);
  // right arm (raised, holding drink)
  add(new THREE.BoxGeometry(0.10, 0.30, 0.10), shirt, 0.27, 1.40, -0.06, -0.50);
  add(new THREE.BoxGeometry(0.09, 0.26, 0.09), skin,  0.25, 1.57, -0.14,  0.10);
  // champagne flute in right hand
  const flute = new THREE.Mesh(
    new THREE.CylinderGeometry(0.042, 0.024, 0.13, 8),
    new THREE.MeshStandardMaterial({ color: '#c4ddd8', transparent: true, opacity: 0.38, roughness: 0.05, metalness: 0.08 }),
  );
  flute.position.set(0.25, 1.68, -0.17);
  p.add(flute);
  // neck
  add(new THREE.BoxGeometry(0.10, 0.08, 0.10), skin, 0, 1.66, 0);
  // head
  add(new THREE.BoxGeometry(0.26, 0.28, 0.26), skin, 0, 1.82, 0);
  add(new THREE.BoxGeometry(0.28, 0.12, 0.27), hair, 0, 1.94, 0);
  add(new THREE.BoxGeometry(0.27, 0.18, 0.05), hair, 0, 1.84, 0.12);

  return p;
}

function RoomMount({ mountRef }: { mountRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div ref={mountRef} style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', background: 'transparent' }} />
      <div style={{ position: 'absolute', bottom: 12, right: 14, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-3)', pointerEvents: 'none', opacity: 0.7, textAlign: 'right', lineHeight: 1.5 }}>
        drag · orbit<br />
        ⇧ drag · pan
      </div>
    </div>
  );
}

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  return m;
}
