import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createRoomScene, buildCharacter, buildChair, buildPlant, buildMug, makeM, warmEmissive, coolEmissive } from './roomUtils';

export function OfficeRoom() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const { room, warmLight, enableShadows, startAnimate, setupControls, setupResize, dispose } = createRoomScene(mount);
    const M = makeM;

    // ── wide desk (extended to cover accessories) ──
    const deskG = new THREE.Group();
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.05, 0.72), M('#3a3a3a', { r: 0.75 }));
    deskTop.position.y = 0.80;
    deskG.add(deskTop);
    const legMat = M('#272727', { r: 0.85 });
    [[-1.60, 0], [1.60, 0]].forEach(([x]) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.80, 0.07), legMat);
      leg.position.set(x as number, 0.40, 0);
      deskG.add(leg);
    });
    const crossbar = new THREE.Mesh(new THREE.BoxGeometry(3.28, 0.04, 0.04), legMat);
    crossbar.position.set(0, 0.16, 0);
    deskG.add(crossbar);
    deskG.position.set(-1.3, 0, -2.6);
    enableShadows(deskG);
    room.add(deskG);

    // ── monitor ──
    const monG = new THREE.Group();
    monG.add(mesh(new THREE.BoxGeometry(0.28, 0.03, 0.20), M('#1e1e1e', { r: 0.7 }), 0, 0.015, 0));
    monG.add(mesh(new THREE.BoxGeometry(0.07, 0.32, 0.07), M('#1e1e1e', { r: 0.7 }), 0, 0.175, 0));
    const monBody = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.44, 0.04), M('#1a1a1a', { r: 0.5 }));
    monBody.position.set(0, 0.55, 0);
    monG.add(monBody);
    const monGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 0.37), coolEmissive());
    monGlow.position.set(0, 0.55, 0.022);
    monG.add(monGlow);
    monG.position.set(-2.1, 0.80, -2.95);
    enableShadows(monG);
    room.add(monG);

    // ── second monitor (center of desk) ──
    const mon2G = new THREE.Group();
    mon2G.add(mesh(new THREE.BoxGeometry(0.28, 0.03, 0.20), M('#1e1e1e', { r: 0.7 }), 0, 0.015, 0));
    mon2G.add(mesh(new THREE.BoxGeometry(0.07, 0.32, 0.07), M('#1e1e1e', { r: 0.7 }), 0, 0.175, 0));
    const mon2Body = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.44, 0.04), M('#1a1a1a', { r: 0.5 }));
    mon2Body.position.set(0, 0.55, 0);
    mon2G.add(mon2Body);
    const mon2Glow = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 0.37), coolEmissive());
    mon2Glow.position.set(0, 0.55, 0.022);
    mon2G.add(mon2Glow);
    mon2G.position.set(-1.3, 0.80, -2.95);
    enableShadows(mon2G);
    room.add(mon2G);


    // ── keyboard ──
    const kbG = new THREE.Group();
    // body
    kbG.add(mesh(new THREE.BoxGeometry(0.58, 0.014, 0.22), M('#1e1e1e', { r: 0.7 }), 0, 0.007, 0));
    // key rows (4 thin raised strips)
    [-0.07, -0.02, 0.03, 0.08].forEach((rz) => {
      kbG.add(mesh(new THREE.BoxGeometry(0.52, 0.006, 0.036), M('#252525', { r: 0.8 }), 0, 0.017, rz));
    });
    // small trackpad
    kbG.add(mesh(new THREE.BoxGeometry(0.16, 0.004, 0.10), M('#1a1a1a', { r: 0.4 }), 0, 0.016, 0.082));
    kbG.position.set(-1.3, 0.827, -2.42);
    room.add(kbG);

    // ── pen cup + pens ──
    const penCup = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.050, 0.12, 12), M('#2a2a2a', { r: 0.9 }));
    penCup.position.set(0.30, 0.88, -2.85);
    room.add(penCup);
    [['#3a3a3a', -0.02, 0.1], ['#2a3a2a', 0, 0], ['#3a2a2a', 0.022, -0.08]].forEach(([c, xo, rz]) => {
      const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.18, 6), M(c as string));
      pen.position.set(0.30 + (xo as number), 0.965, -2.85);
      pen.rotation.z = rz as number;
      room.add(pen);
    });

    // ── coffee mug ──
    const mug = buildMug(M);
    mug.position.set(0.05, 0.827, -2.80);
    enableShadows(mug);
    room.add(mug);

    // ── desk lamp (articulated arm) — back-left corner ──
    const lampG = new THREE.Group();
    lampG.add(mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.025, 12), M('#1a1a1a', { r: 0.6 }), 0, 0.012, 0));
    // lower arm — bottom sits on base top (y=0.025), tilts right
    const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.32, 8), M('#202020', { r: 0.6 }));
    arm1.position.set(0.044, 0.179, 0);
    arm1.rotation.z = 0.28;
    lampG.add(arm1);
    // upper arm — bottom connects to arm1 top, bends back left
    const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.28, 8), M('#202020', { r: 0.6 }));
    arm2.position.set(0.015, 0.452, 0);
    arm2.rotation.z = -0.55;
    lampG.add(arm2);
    // dome shade — sits at arm2 top
    const shade = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55),
      warmEmissive(),
    );
    shade.position.set(-0.06, 0.57, 0);
    shade.rotation.z = Math.PI;
    lampG.add(shade);
    lampG.position.set(-2.60, 0.827, -2.98);
    enableShadows(lampG);
    room.add(lampG);
    warmLight.position.set(-2.60, 1.18, -2.85);

    // ── filing cabinet ──
    const cabG = new THREE.Group();
    cabG.add(mesh(new THREE.BoxGeometry(0.60, 1.40, 0.40), M('#1e1e1e', { r: 0.85 }), 0, 0.70, 0));
    [-0.30, 0, 0.30].forEach((dy) => {
      cabG.add(mesh(new THREE.BoxGeometry(0.61, 0.018, 0.41), M('#141414', { r: 0.9 }), 0, 0.70 + dy, 0));
      cabG.add(mesh(new THREE.BoxGeometry(0.14, 0.03, 0.018), M('#2e2e2e', { r: 0.5 }), 0, 0.70 + dy - 0.11, 0.21));
    });
    cabG.position.set(-3.50, 0, -2.6);
    enableShadows(cabG);
    room.add(cabG);

    // ── desk chair ──
    const chair = buildChair(M);
    chair.position.set(-1.3, 0, -2.0);
    enableShadows(chair);
    room.add(chair);

    // ── character sitting at desk ──
    const person = buildCharacter('sitting');
    person.position.set(-1.3, 0, -2.0);
    enableShadows(person);
    room.add(person);

    // ── plant in corner ──
    const plant = buildPlant(M);
    plant.position.set(-3.1, 0, 0.2);
    enableShadows(plant);
    room.add(plant);

    // ── floating wall art ──
    const artG = new THREE.Group();
    artG.add(mesh(new THREE.BoxGeometry(0.72, 0.50, 0.04), M('#2a2a2a', { r: 0.9 }), 0, 0, 0));
    artG.add(mesh(new THREE.BoxGeometry(0.60, 0.38, 0.02), M('#1a1a1a', { r: 1 }), 0, 0, 0.018));
    artG.position.set(1.30, 2.10, -3.50);
    room.add(artG);

    // ── overhead fill light (no visible fixture) ──
    const overheadLight = new THREE.PointLight(0xd0dce8, 1.8, 8, 1.5);
    overheadLight.position.set(-0.8, 3.2, -1.8);
    room.add(overheadLight);

    // animate
    const stopAnimate = startAnimate((t) => {
      warmLight.intensity = 2.0 + Math.sin(t * 4.1) * 0.08 + Math.sin(t * 11.3) * 0.04;
      person.position.y = Math.sin(t * 1.8) * 0.012;
    });
    const stopControls = setupControls();
    const stopResize = setupResize();

    return () => { stopAnimate(); stopControls(); stopResize(); dispose(); };
  }, []);

  return <RoomMount mountRef={mountRef} />;
}

// ─── shared mount JSX ────────────────────────────────────────────────────────
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

// ─── local mesh helper ───────────────────────────────────────────────────────
function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  return m;
}
