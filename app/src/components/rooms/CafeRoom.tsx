import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createRoomScene, buildCharacter, buildCafeChair, buildPlant, buildMug, makeM, warmEmissive, coolEmissive } from './roomUtils';

export function CafeRoom() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const { room, warmLight, renderer, enableShadows, startAnimate, setupControls, setupResize, dispose } = createRoomScene(mount);
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
    pendantG.position.set(0, 2.20, -1.6);
    room.add(pendantG);
    warmLight.position.set(0, 1.28, -1.6);

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

    // ── cool-accent screen on counter (tablet/display) ──
    const tabletG = new THREE.Group();
    tabletG.add(mesh(new THREE.BoxGeometry(0.28, 0.20, 0.03), M('#1a1a1a', { r: 0.5 }), 0, 0, 0));
    const tabScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.16), coolEmissive());
    tabScreen.position.z = 0.016;
    tabletG.add(tabScreen);
    tabletG.position.set(-2.60, 1.18, -1.96);
    tabletG.rotation.y = 0.3;
    room.add(tabletG);

    // ── character (sitting-cafe at bistro table) ──
    const person = buildCharacter('sitting-cafe');
    person.position.set(0, 0, -1.0);
    enableShadows(person);
    room.add(person);

    // ── plant in corner ──
    const plant = buildPlant(M);
    plant.position.set(2.2, 0, -0.8);
    enableShadows(plant);
    room.add(plant);

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
    </div>
  );
}

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  return m;
}
