import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createRoomScene, buildCharacter, buildCafeChair, buildPlant, buildMug, makeM, warmEmissive, coolEmissive } from './roomUtils';

export function CafeRoom() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const { room, warmLight, renderer, enableShadows, startAnimate, setupControls, setupResize, dispose, setCameraPosition } = createRoomScene(mount);
    setCameraPosition(12.0, 7.2, 11.0);
    const M = makeM;

    // ── round bistro table ──
    const tableG = new THREE.Group();
    // tabletop
    tableG.add(mesh(new THREE.CylinderGeometry(0.42, 0.40, 0.05, 28), M('#2e2e2e', { r: 0.8 }), 0, 0.78, 0));
    // pedestal leg
    tableG.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.73, 10), M('#222', { r: 0.7 }), 0, 0.39, 0));
    // foot base
    tableG.add(mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.035, 16), M('#222', { r: 0.7 }), 0, 0.017, 0));
    tableG.position.set(0, 0, -1.6);
    enableShadows(tableG);
    room.add(tableG);

    // ── two cafe chairs ──
    const chairFront = buildCafeChair(M);
    chairFront.position.set(0, 0, -1.0); // front (toward camera)
    enableShadows(chairFront);
    room.add(chairFront);

    const chairBack = buildCafeChair(M);
    chairBack.position.set(0, 0, -2.2); // back (away from camera)
    chairBack.rotation.y = Math.PI;
    enableShadows(chairBack);
    room.add(chairBack);

    // ── coffee cup on table ──
    const cup = new THREE.Group();
    cup.add(mesh(new THREE.CylinderGeometry(0.052, 0.044, 0.09, 12), M('#2a2a2a', { r: 0.9 }), 0, 0.045, 0));
    // saucer
    cup.add(mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.015, 14), M('#282828', { r: 0.8 }), 0, -0.008, 0));
    // coffee surface (dark disc)
    cup.add(mesh(new THREE.CylinderGeometry(0.044, 0.044, 0.01, 12), M('#111'), 0, 0.088, 0));
    // tiny handle (thin box on the side)
    cup.add(mesh(new THREE.BoxGeometry(0.012, 0.05, 0.04), M('#2a2a2a', { r: 0.9 }), 0.062, 0.044, 0));
    cup.position.set(0.18, 0.793, -1.42);
    enableShadows(cup);
    room.add(cup);

    // ── open notebook on table ──
    // two thin tilted planes suggest open pages
    const nbkL = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.012, 0.26), M('#3a3a3a', { r: 1 }));
    nbkL.position.set(-0.12, 0.793, -1.62);
    nbkL.rotation.z = 0.08;
    room.add(nbkL);
    const nbkR = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.012, 0.26), M('#363636', { r: 1 }));
    nbkR.position.set(0.10, 0.793, -1.62);
    nbkR.rotation.z = -0.08;
    room.add(nbkR);
    // spine
    const nbkSpine = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.018, 0.26), M('#222'));
    nbkSpine.position.set(-0.01, 0.799, -1.62);
    room.add(nbkSpine);

    // ── pastry on a plate ──
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.012, 14), M('#282828', { r: 0.8 }));
    plate.position.set(-0.22, 0.788, -1.48);
    room.add(plate);
    const pastry = new THREE.Mesh(new THREE.IcosahedronGeometry(0.05, 0), M('#3a2e22', { r: 1 }));
    pastry.position.set(-0.22, 0.808, -1.48);
    room.add(pastry);

    // ── pendant lamp above table ──
    const pendantG = new THREE.Group();
    // cord (thin cylinder from ceiling)
    pendantG.add(mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.85, 6), M('#1a1a1a', { r: 0.7 }), 0, -0.425, 0));
    // dome shade
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.58),
      warmEmissive(),
    );
    dome.position.y = -0.87;
    dome.rotation.z = Math.PI;
    pendantG.add(dome);
    pendantG.position.set(0, 3.00, -1.6);
    room.add(pendantG);
    warmLight.position.set(0, 2.08, -1.6);

    // ── glass entrance doors (left wall) ──
    const glassMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8ab0c8'),
      transparent: true,
      opacity: 0.15,
      roughness: 0.0,
      metalness: 0.3,
    });
    const frameMat = M('#1c1c1c', { r: 0.6 });
    [-0.25, -0.85].forEach((dz) => {
      const doorG = new THREE.Group();
      // vertical stiles
      doorG.add(mesh(new THREE.BoxGeometry(0.05, 2.10, 0.06), frameMat, 0, 1.05, -0.25));
      doorG.add(mesh(new THREE.BoxGeometry(0.05, 2.10, 0.06), frameMat, 0, 1.05,  0.25));
      // top & bottom rails
      doorG.add(mesh(new THREE.BoxGeometry(0.05, 0.06, 0.55), frameMat, 0, 2.08, 0));
      doorG.add(mesh(new THREE.BoxGeometry(0.05, 0.06, 0.55), frameMat, 0, 0.03, 0));
      // mid rail
      doorG.add(mesh(new THREE.BoxGeometry(0.05, 0.05, 0.55), frameMat, 0, 1.05, 0));
      // glass panels (upper + lower pane)
      [1.58, 0.53].forEach((py) => {
        const pane = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.96), glassMat);
        pane.rotation.y = Math.PI / 2;
        pane.position.set(0.026, py, 0);
        doorG.add(pane);
      });
      doorG.position.set(-3.40, 0, dz);
      room.add(doorG);
    });

    // ── large horizontal window (left wall, beside doors) ──
    const windowG = new THREE.Group();
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(2.10, 1.10), glassMat);
    pane.rotation.y = Math.PI / 2;
    pane.position.set(0.026, 0, 0);
    windowG.add(pane);
    // border: top, bottom, left, right strips
    windowG.add(mesh(new THREE.BoxGeometry(0.05, 0.06, 2.14), frameMat,  0,  0.58, 0));
    windowG.add(mesh(new THREE.BoxGeometry(0.05, 0.06, 2.14), frameMat,  0, -0.58, 0));
    windowG.add(mesh(new THREE.BoxGeometry(0.05, 1.22, 0.06), frameMat,  0,  0, -1.08));
    windowG.add(mesh(new THREE.BoxGeometry(0.05, 1.22, 0.06), frameMat,  0,  0,  1.08));
    windowG.position.set(-3.40, 1.50, 1.20);
    room.add(windowG);

    // ── mat in front of counter ──
    const mat = new THREE.Mesh(
      new THREE.BoxGeometry(1.50, 0.018, 0.90),
      M('#1e1a14', { r: 1 }),
    );
    mat.position.set(-2.3, 0.009, -1.58);
    room.add(mat);

    // ── counter with espresso machine ──
    const counterG = new THREE.Group();
    counterG.add(mesh(new THREE.BoxGeometry(1.50, 0.90, 0.50), M('#1e1e1e', { r: 0.85 }), 0, 0.45, 0));
    // counter top
    counterG.add(mesh(new THREE.BoxGeometry(1.52, 0.04, 0.52), M('#2a2a2a', { r: 0.7 }), 0, 0.92, 0));
    counterG.position.set(-2.3, 0, -2.2);
    enableShadows(counterG);
    room.add(counterG);

    // espresso machine on counter
    const machG = new THREE.Group();
    // main body
    machG.add(mesh(new THREE.BoxGeometry(0.42, 0.38, 0.28), M('#1a1a1a', { r: 0.6, m: 0.15 }), 0, 0.19, 0));
    // rounded top cap
    machG.add(mesh(new THREE.BoxGeometry(0.44, 0.06, 0.30), M('#1c1c1c', { r: 0.5, m: 0.1 }), 0, 0.41, 0));
    // spout (protruding forward)
    machG.add(mesh(new THREE.BoxGeometry(0.05, 0.05, 0.10), M('#181818', { r: 0.6, m: 0.2 }), 0, 0.16, 0.19));
    // warm-glow indicator dot
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 8, 8),
      new THREE.MeshStandardMaterial({ color: '#ffb878', emissive: new THREE.Color('#ffb878'), emissiveIntensity: 3.5, roughness: 1 }),
    );
    dot.position.set(0.15, 0.32, 0.142);
    machG.add(dot);
    machG.position.set(-2.3, 0.94, -2.1);
    enableShadows(machG);
    room.add(machG);

    // accent light above espresso machine
    const machLight = new THREE.PointLight(0xfff0e0, 1.4, 2.5, 2);
    machLight.position.set(-2.3, 2.0, -2.0);
    room.add(machLight);

    // ── coffee bean canister beside machine ──
    const canisterG = new THREE.Group();
    // glass body
    const glassCanisMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c8ddd0'),
      transparent: true,
      opacity: 0.22,
      roughness: 0.05,
      metalness: 0.1,
    });
    canisterG.add(mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.30, 14), glassCanisMat, 0, 0.15, 0));
    // lid
    canisterG.add(mesh(new THREE.CylinderGeometry(0.082, 0.082, 0.035, 14), M('#252525', { r: 0.4, m: 0.2 }), 0, 0.318, 0));
    // lid knob
    canisterG.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.022, 10), M('#2a2a2a', { r: 0.5 }), 0, 0.346, 0));
    // coffee beans inside
    const beanMat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#3a1a08'), roughness: 0.95 });
    const layers: { y: number; rings: { r: number; n: number }[] }[] = [
      { y: 0.018, rings: [{ r: 0, n: 1 }, { r: 0.036, n: 7 }, { r: 0.060, n: 11 }] },
      { y: 0.038, rings: [{ r: 0.020, n: 4 }, { r: 0.047, n: 9 }, { r: 0.064, n: 12 }] },
      { y: 0.058, rings: [{ r: 0, n: 1 }, { r: 0.034, n: 7 }, { r: 0.058, n: 11 }] },
      { y: 0.078, rings: [{ r: 0.022, n: 4 }, { r: 0.045, n: 9 }, { r: 0.062, n: 12 }] },
      { y: 0.098, rings: [{ r: 0, n: 1 }, { r: 0.037, n: 7 }, { r: 0.060, n: 10 }] },
      { y: 0.118, rings: [{ r: 0.024, n: 5 }, { r: 0.050, n: 9 }] },
      { y: 0.136, rings: [{ r: 0, n: 1 }, { r: 0.035, n: 7 }] },
    ];
    layers.forEach(({ y, rings }) => {
      rings.forEach(({ r, n }) => {
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 + y * 3.7;
          const b = new THREE.Mesh(new THREE.SphereGeometry(0.013, 6, 4), beanMat);
          b.position.set(r * Math.cos(a), y, r * Math.sin(a));
          b.scale.set(1, 0.65, 0.7);
          b.rotation.y = a;
          canisterG.add(b);
        }
      });
    });
    canisterG.position.set(-1.88, 0.94, -2.1);
    room.add(canisterG);

    // ── cool-accent screen on counter (tablet/display) ──
    const tabletG = new THREE.Group();
    tabletG.add(mesh(new THREE.BoxGeometry(0.28, 0.20, 0.03), M('#1a1a1a', { r: 0.5 }), 0, 0, 0));
    const tabScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.16), coolEmissive());
    tabScreen.position.z = 0.016;
    tabletG.add(tabScreen);
    tabletG.position.set(-2.60, 1.18, -1.96);
    tabletG.rotation.y = 0.3;
    room.add(tabletG);

    // ── menu boards above counter ──
    // left board: "georgie's cafe" text
    const leftCanvas = document.createElement('canvas');
    leftCanvas.width = 256; leftCanvas.height = 384;
    const lc = leftCanvas.getContext('2d')!;
    lc.fillStyle = '#1a1710';
    lc.fillRect(0, 0, 256, 384);
    lc.fillStyle = '#7a6535';
    lc.textAlign = 'center';
    lc.font = 'italic 34px Georgia, serif';
    lc.fillText("georgie's", 128, 165);
    lc.font = 'bold 44px Georgia, serif';
    lc.fillText('cafe', 128, 218);
    // decorative rule lines
    lc.strokeStyle = '#4a3d1e';
    lc.lineWidth = 2;
    lc.beginPath(); lc.moveTo(40, 135); lc.lineTo(216, 135); lc.stroke();
    lc.beginPath(); lc.moveTo(40, 238); lc.lineTo(216, 238); lc.stroke();
    const leftTex = new THREE.CanvasTexture(leftCanvas);

    // right board: coffee mug icon with steam
    const rightCanvas = document.createElement('canvas');
    rightCanvas.width = 256; rightCanvas.height = 384;
    const rc = rightCanvas.getContext('2d')!;
    rc.fillStyle = '#1a1710';
    rc.fillRect(0, 0, 256, 384);
    rc.strokeStyle = '#7a6535';
    rc.lineWidth = 7;
    rc.lineCap = 'round';
    rc.lineJoin = 'round';
    // mug body
    rc.beginPath();
    rc.roundRect(72, 175, 110, 85, 10);
    rc.stroke();
    // handle
    rc.beginPath();
    rc.arc(182, 217, 24, -Math.PI * 0.55, Math.PI * 0.55);
    rc.stroke();
    // base plate
    rc.lineWidth = 5;
    rc.beginPath(); rc.moveTo(62, 260); rc.lineTo(194, 260); rc.stroke();
    // steam wisps
    rc.lineWidth = 5;
    ([100, 128, 156] as number[]).forEach((sx) => {
      rc.beginPath();
      rc.moveTo(sx, 168);
      rc.bezierCurveTo(sx - 10, 148, sx + 10, 128, sx, 108);
      rc.stroke();
    });
    const rightTex = new THREE.CanvasTexture(rightCanvas);

    ([{ x: -1.85, tex: leftTex }, { x: -2.75, tex: rightTex }] as { x: number; tex: THREE.CanvasTexture }[]).forEach(({ x, tex }) => {
      const boardG = new THREE.Group();
      boardG.add(mesh(new THREE.BoxGeometry(0.58, 0.82, 0.04), M('#1a1a1a', { r: 0.9 }), 0, 0, 0));
      const surf = new THREE.Mesh(
        new THREE.PlaneGeometry(0.50, 0.74),
        new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: new THREE.Color('#ffffff'), emissiveIntensity: 0.25, roughness: 1 }),
      );
      surf.position.z = 0.022;
      boardG.add(surf);
      boardG.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.28, 6), M('#111'), 0, 0.55, 0));
      boardG.position.set(x, 1.95, -3.40);
      room.add(boardG);
    });

    // ── laptop on cafe table ──
    const laptopG = new THREE.Group();
    // keyboard base
    laptopG.add(mesh(new THREE.BoxGeometry(0.42, 0.016, 0.33), M('#1e1e1e', { r: 0.5, m: 0.2 }), 0, 0.008, 0));
    // screen lid (tilted back ~23° from vertical)
    const lidBox = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.27, 0.012), M('#1a1a1a', { r: 0.5 }));
    lidBox.position.set(0, 0.140, -0.218);
    lidBox.rotation.x = -0.4;
    laptopG.add(lidBox);
    // screen glow
    const lidGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.23), coolEmissive());
    lidGlow.position.set(0, 0.143, -0.212);
    lidGlow.rotation.x = -0.4;
    laptopG.add(lidGlow);
    laptopG.position.set(0.05, 0.806, -1.60);
    room.add(laptopG);

    // ── character (sitting-cafe at bistro table) ──
    const person = buildCharacter('sitting');
    person.position.set(0, 0, -1.0);
    enableShadows(person);
    room.add(person);

    // ── plant in corner ──
    const plant = buildPlant(M);
    plant.position.set(2.2, 0, -0.8);
    enableShadows(plant);
    room.add(plant);

    // ── daylight bleeding through window and doors ──
    const daylightColor = 0xffecd6;
    // window
    const winLight = new THREE.PointLight(daylightColor, 1.0, 8.0, 0.8);
    winLight.position.set(-3.75, 1.50, 1.20);
    room.add(winLight);
    // doors
    [-0.25, -0.85].forEach((dz) => {
      const doorLight = new THREE.PointLight(daylightColor, 0.8, 7.0, 0.8);
      doorLight.position.set(-3.75, 1.05, dz);
      room.add(doorLight);
    });

    // ── overhead fill light (no visible fixture) ──
    const overheadLight = new THREE.PointLight(0xd0dce8, 1.8, 8, 1.5);
    overheadLight.position.set(0, 3.2, -1.6);
    room.add(overheadLight);

    // animate
    const stopAnimate = startAnimate((t) => {
      warmLight.intensity = 2.0 + Math.sin(t * 3.8) * 0.10 + Math.sin(t * 10.5) * 0.04;
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
