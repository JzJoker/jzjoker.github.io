import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createRoomScene, buildCharacter, buildChair, buildMug, makeM, warmEmissive, coolEmissive } from './roomUtils';

export function ClassroomRoom() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const { room, warmLight, renderer, enableShadows, startAnimate, setupControls, setupResize, dispose, setTarget } = createRoomScene(mount);
    setTarget(0.7, 1.0, -0.7);
    const M = makeM;

    // ── student desk ──
    const deskG = new THREE.Group();
    deskG.add(mesh(new THREE.BoxGeometry(0.72, 0.05, 0.52), M('#333333', { r: 0.80 }), 0, 0.76, 0));
    const legMat = M('#252525', { r: 0.85 });
    [[-0.33, -0.22], [-0.33, 0.22], [0.33, -0.22], [0.33, 0.22]].forEach(([x, z]) => {
      deskG.add(mesh(new THREE.BoxGeometry(0.05, 0.76, 0.05), legMat, x, 0.38, z));
    });
    deskG.position.set(-0.5, 0, -2.2);
    enableShadows(deskG);
    room.add(deskG);

    // ── chair tucked under desk ──
    const chair = buildChair(M);
    chair.position.set(-0.5, 0, -1.8);
    enableShadows(chair);
    room.add(chair);

    // ── closed notebook on desk ──
    const notebook = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.022, 0.18), M('#2e2e2e', { r: 1 }));
    notebook.position.set(-0.60, 0.792, -2.28);
    room.add(notebook);
    // notebook spine
    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.026, 0.18), M('#222'));
    spine.position.set(-0.716, 0.792, -2.28);
    room.add(spine);

    // ── pencil (thin cylinder, slightly tilted) ──
    const pencil = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.30, 6), M('#3a3020', { r: 0.85 }));
    pencil.position.set(-0.42, 0.790, -2.14);
    pencil.rotation.z = 0.25;
    pencil.rotation.y = 0.4;
    room.add(pencil);
    // pencil tip
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.007, 0.022, 6), M('#a87a5e', { r: 0.9 }));
    tip.position.set(-0.46, 0.790, -2.10);
    tip.rotation.z = 0.25;
    tip.rotation.y = 0.4;
    room.add(tip);

    // ── coffee mug on desk ──
    const mug = buildMug(M);
    mug.position.set(-0.28, 0.787, -2.32);
    enableShadows(mug);
    room.add(mug);

    // ── banker's-style desk lamp ──
    const lampG = new THREE.Group();
    // base
    lampG.add(mesh(new THREE.BoxGeometry(0.14, 0.025, 0.10), M('#1a1a1a', { r: 0.6 }), 0, 0.012, 0));
    // stem
    lampG.add(mesh(new THREE.BoxGeometry(0.030, 0.34, 0.030), M('#1e1e1e', { r: 0.7 }), 0, 0.195, 0));
    // rectangular shade
    const shadeMat = warmEmissive();
    lampG.add(mesh(new THREE.BoxGeometry(0.22, 0.10, 0.12), shadeMat, 0, 0.42, 0));
    // shade open bottom (slightly larger dark rectangle)
    lampG.add(mesh(new THREE.BoxGeometry(0.22, 0.015, 0.12), M('#111'), 0, 0.37, 0));
    lampG.position.set(-0.22, 0.787, -2.44);
    enableShadows(lampG);
    room.add(lampG);
    warmLight.position.set(-0.22, 1.10, -2.28);

    // ── tall bookshelf behind desk ──
    const shelfG = new THREE.Group();
    // body
    shelfG.add(mesh(new THREE.BoxGeometry(0.54, 1.64, 0.38), M('#1c1c1c', { r: 0.85 }), 0, 0.82, 0));
    // shelves
    [-0.60, -0.22, 0.16, 0.54].forEach((y) => {
      shelfG.add(mesh(new THREE.BoxGeometry(0.54, 0.022, 0.38), M('#141414', { r: 0.9 }), 0, 0.82 + y, 0));
    });
    // books on shelves (varied widths and slightly different dark hues)
    const bookConfigs: [number, number, number, number, string][] = [
      // [x, shelf_y, width, height, color]
      [-0.18, -0.52, 0.06, 0.22, '#2a2a2a'], [-0.10, -0.52, 0.08, 0.20, '#242424'],
      [-0.00, -0.52, 0.05, 0.24, '#303030'], [ 0.07, -0.52, 0.07, 0.19, '#1e1e1e'],
      [-0.20, -0.14, 0.09, 0.21, '#262626'], [-0.08, -0.14, 0.06, 0.23, '#2e2e2e'],
      [ 0.01, -0.14, 0.08, 0.18, '#222222'], [ 0.11, -0.14, 0.05, 0.22, '#282828'],
      [-0.18,  0.24, 0.07, 0.20, '#1e2828'], [-0.08,  0.24, 0.06, 0.22, '#28281e'],
      [ 0.00,  0.24, 0.09, 0.18, '#2a2a2a'], [ 0.11,  0.24, 0.05, 0.24, '#242424'],
    ];
    bookConfigs.forEach(([bx, by, bw, bh, bc]) => {
      const book = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 0.30), M(bc, { r: 0.9 }));
      book.position.set(bx, 0.82 + by + bh / 2 + 0.014, 0);
      shelfG.add(book);
    });
    shelfG.position.set(1.60, 0, -2.8);
    enableShadows(shelfG);
    room.add(shelfG);

    // ── floating whiteboard / chalkboard ──
    const boardG = new THREE.Group();
    boardG.add(mesh(new THREE.BoxGeometry(1.10, 0.70, 0.04), M('#1a1a1a', { r: 0.9 }), 0, 0, 0));
    // board surface with cool emissive (recently written on)
    const boardSurface = new THREE.Mesh(new THREE.PlaneGeometry(1.02, 0.62), coolEmissive());
    boardSurface.position.z = 0.022;
    boardG.add(boardSurface);
    // frame edges
    [[-0.55, 0, 0.88, 0.04], [0.55, 0, 0.88, 0.04], [0, 0.35, 0.04, 1.10], [0, -0.35, 0.04, 1.10]].forEach(([x, y, h, w]) => {
      boardG.add(mesh(new THREE.BoxGeometry(w as number, h as number, 0.05), M('#222'), x as number, y as number, 0));
    });
    boardG.position.set(1.60, 1.70, -3.55);
    room.add(boardG);

    // ── character sitting at student desk ──
    const person = buildCharacter('sitting');
    person.position.set(-0.5, 0, -1.8);
    enableShadows(person);
    room.add(person);

    // ── small plant on bookshelf top ──
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.14, 12), M('#252525', { r: 0.9 }));
    pot.position.set(1.75, 1.71, -2.8);
    room.add(pot);
    const leafS = new THREE.Mesh(new THREE.IcosahedronGeometry(0.10, 0), M('#3a4a3a', { r: 0.85 }));
    leafS.position.set(1.75, 1.87, -2.8);
    room.add(leafS);

    // ── overhead fill light (no visible fixture) ──
    const overheadLight = new THREE.PointLight(0xd0dce8, 1.8, 8, 1.5);
    overheadLight.position.set(-0.5, 3.2, -2.0);
    room.add(overheadLight);

    // animate
    const stopAnimate = startAnimate((t) => {
      warmLight.intensity = 2.0 + Math.sin(t * 4.5) * 0.07 + Math.sin(t * 12.1) * 0.03;
      person.position.y = Math.sin(t * 1.8) * 0.012;
    });
    const stopControls = setupControls();
    const stopResize = setupResize();

    return () => { stopAnimate(); stopControls(); stopResize(); dispose(); };
  }, []);

  return <RoomMount mountRef={mountRef} />;
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
