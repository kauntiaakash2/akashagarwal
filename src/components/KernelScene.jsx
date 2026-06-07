import React from "react";
import * as THREE from "three";
import { executionThreads, kernelZones, skillClusters } from "../data/kernelPortfolio.js";

const ACCENT = "#ff3b30";
const NODE_WHITE = "#e8e8e8";
const VOID = "#030303";
const CAMERA_LOOK_AHEAD = 0.015;

const cameraPathPoints = [
  new THREE.Vector3(0, 1.6, 14),
  new THREE.Vector3(0.6, 1.1, 7),
  new THREE.Vector3(-2.8, 0.7, 0),
  new THREE.Vector3(1.8, 0.9, -8),
  new THREE.Vector3(0, 1.2, -15),
];

const cameraPath = new THREE.CatmullRomCurve3(cameraPathPoints, false, "catmullrom", 0.35);
const lookPath = new THREE.CatmullRomCurve3(
  cameraPathPoints.map((point) => point.clone().add(new THREE.Vector3(0, 0, -3.6))),
  false,
  "catmullrom",
  0.35,
);

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if (material.map) material.map.dispose();
        material.dispose();
      });
    }
  });
}

function createArchitecturalGrid(scene) {
  const gridMaterial = new THREE.LineBasicMaterial({ color: 0x2a2a2a, transparent: true, opacity: 0.52 });
  const accentMaterial = new THREE.LineBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.7 });
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  for (let index = -12; index <= 12; index += 1) {
    vertices.push(-8, -2.15, index * 1.2, 8, -2.15, index * 1.2);
    vertices.push(index * 0.75, -2.15, 8, index * 0.75, -2.15, -18);
  }

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  const grid = new THREE.LineSegments(geometry, gridMaterial);
  scene.add(grid);

  const axisGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, -2.04, 10),
    new THREE.Vector3(0, -2.04, -18),
  ]);
  const axis = new THREE.Line(axisGeometry, accentMaterial);
  scene.add(axis);

  return [grid, axis];
}


function createLabelPlane({ title, meta, width = 1.24, height = 1.3, fontScale = 1 }) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#f2f2f2";
  context.font = `${Math.round(38 * fontScale)}px Inter, Arial, sans-serif`;
  context.textBaseline = "top";

  const words = title.toUpperCase().split(" ");
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const test = `${line} ${word}`.trim();
    if (context.measureText(test).width > 390 && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  lines.push(line);

  lines.slice(0, 4).forEach((text, index) => context.fillText(text, 38, 44 + index * 46));
  context.fillStyle = "#ff3b30";
  context.font = `${Math.round(18 * fontScale)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  context.fillText(meta.toUpperCase(), 38, 334);
  context.strokeStyle = "rgba(255, 59, 48, 0.85)";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(38, 392);
  context.lineTo(468, 392);
  context.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
  return new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
}

function createEntryNode(scene) {
  const group = new THREE.Group();
  group.position.set(0, 0.5, 5.2);

  const outer = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.45, 0),
    new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.42, metalness: 0.2, emissive: 0x140301 }),
  );
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(outer.geometry),
    new THREE.LineBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.95 }),
  );

  const slab = new THREE.Mesh(
    new THREE.BoxGeometry(3.9, 0.12, 3.9),
    new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.84, metalness: 0.02 }),
  );
  slab.position.y = -1.42;
  slab.rotation.y = Math.PI / 4;

  group.add(outer, edges, slab);
  scene.add(group);
  return group;
}

function createLogicGates(scene) {
  const clusterNodes = skillClusters.flatMap((cluster, clusterIndex) =>
    cluster.nodes.map((node, nodeIndex) => ({ clusterIndex, nodeIndex, label: node })),
  );

  const geometry = new THREE.BoxGeometry(0.22, 0.22, 0.22);
  const material = new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.58, metalness: 0.05 });
  const mesh = new THREE.InstancedMesh(geometry, material, clusterNodes.length);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.userData.nodes = clusterNodes;
  scene.add(mesh);

  const clusterLabels = skillClusters.map((cluster, clusterIndex) => {
    const label = createLabelPlane({ title: cluster.cluster, meta: cluster.nodes.slice(0, 3).join(" / "), width: 1.55, height: 0.82, fontScale: 0.72 });
    label.position.set(-3.3 + clusterIndex * 3.3, 1.9, -1.55);
    label.rotation.x = -0.08;
    scene.add(label);
    return label;
  });

  const matrix = new THREE.Matrix4();
  const positions = [];
  clusterNodes.forEach((node, index) => {
    const x = -3.3 + node.clusterIndex * 3.3;
    const y = -0.85 + (node.nodeIndex % 3) * 0.82;
    const z = -0.6 - Math.floor(node.nodeIndex / 3) * 1.15;
    const position = new THREE.Vector3(x, y, z);
    positions.push(position);
    matrix.compose(position, new THREE.Quaternion(), new THREE.Vector3(1, 1, 1));
    mesh.setMatrixAt(index, matrix);
  });

  const connectionGeometry = new THREE.BufferGeometry();
  const vertices = [];
  positions.forEach((position, index) => {
    if (index % 6 === 5) return;
    const next = positions[index + 1];
    vertices.push(position.x, position.y, position.z, next.x, next.y, next.z);
  });
  connectionGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  const connections = new THREE.LineSegments(
    connectionGeometry,
    new THREE.LineBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.45 }),
  );
  scene.add(connections);

  return { mesh, connections, positions, clusterLabels };
}

function createExecutionThreads(scene) {
  const plaques = [];
  const material = new THREE.MeshStandardMaterial({ color: 0x0d0d0d, roughness: 0.62, metalness: 0.12 });
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: 0x21100e, roughness: 0.48, metalness: 0.2, emissive: 0x180200 });
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.78 });

  executionThreads.forEach((thread, index) => {
    const plaque = new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.95, 0.18), material.clone());
    plaque.position.set(-3 + index * 2, 0.1 + (index % 2) * 0.42, -9.8 - index * 0.7);
    plaque.rotation.y = -0.32 + index * 0.18;
    plaque.userData = { ...thread, type: "executionThread", index, basePosition: plaque.position.clone(), baseRotationY: plaque.rotation.y };

    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(plaque.geometry), edgeMaterial.clone());
    plaque.add(edge);
    plaque.userData.edge = edge;
    plaque.userData.defaultMaterial = plaque.material;
    plaque.userData.hoverMaterial = hoverMaterial.clone();

    const label = createLabelPlane({ title: thread.title, meta: thread.meta });
    label.position.z = 0.101;
    plaque.add(label);

    scene.add(plaque);
    plaques.push(plaque);
  });

  return plaques;
}

function createCursor(scene) {
  const cursor = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.09, 0.006, 8, 36),
    new THREE.MeshBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.94 }),
  );
  const cross = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-0.16, 0, 0),
      new THREE.Vector3(0.16, 0, 0),
      new THREE.Vector3(0, -0.16, 0),
      new THREE.Vector3(0, 0.16, 0),
    ]),
    new THREE.LineBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.72 }),
  );
  cursor.add(ring, cross);
  cursor.renderOrder = 10;
  scene.add(cursor);
  return cursor;
}

export default function KernelScene({ scrollProgress, pointer, onHoverThread }) {
  const canvasRef = React.useRef(null);
  const stateRef = React.useRef({ hovered: null });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(VOID, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(VOID, 8, 24);

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 70);
    const raycaster = new THREE.Raycaster();
    const pointerVector = new THREE.Vector2();

    const ambient = new THREE.AmbientLight(0xffffff, 0.36);
    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(-3, 5, 8);
    const accent = new THREE.PointLight(0xff3b30, 16, 16);
    accent.position.set(2, 0.6, 2);
    scene.add(ambient, key, accent);

    const disposables = [];
    disposables.push(...createArchitecturalGrid(scene));
    const entryNode = createEntryNode(scene);
    const logicGates = createLogicGates(scene);
    const plaques = createExecutionThreads(scene);
    const webglCursor = createCursor(scene);
    disposables.push(entryNode, logicGates.mesh, logicGates.connections, ...logicGates.clusterLabels, webglCursor, ...plaques);

    let rafId = 0;
    let currentProgress = scrollProgress.current;
    let width = 1;
    let height = 1;

    const resize = () => {
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const setHovered = (nextHovered) => {
      const currentHovered = stateRef.current.hovered;
      if (currentHovered === nextHovered) return;

      if (currentHovered) currentHovered.material = currentHovered.userData.defaultMaterial;
      if (nextHovered) nextHovered.material = nextHovered.userData.hoverMaterial;

      stateRef.current.hovered = nextHovered;
      onHoverThread(nextHovered?.userData ?? null);
    };

    const updateCursor = () => {
      const hovered = stateRef.current.hovered;
      const target = new THREE.Vector3(pointer.current.x * 1.25, -pointer.current.y * 0.7, -2.4).unproject(camera);
      const direction = target.sub(camera.position).normalize();
      const distance = 2.2;
      const cursorTarget = camera.position.clone().add(direction.multiplyScalar(distance));

      if (hovered) {
        const magneticTarget = hovered.position.clone().add(new THREE.Vector3(0, 0.15, 0));
        cursorTarget.lerp(magneticTarget, 0.34);
        webglCursor.scale.lerp(new THREE.Vector3(1.8, 1.8, 1.8), 0.2);
      } else {
        webglCursor.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2);
      }

      webglCursor.position.lerp(cursorTarget, 0.22);
      webglCursor.lookAt(camera.position);
    };

    const render = () => {
      rafId = window.requestAnimationFrame(render);
      currentProgress += (scrollProgress.current - currentProgress) * 0.08;
      const clamped = THREE.MathUtils.clamp(currentProgress, 0, 1);
      const parallax = new THREE.Vector3(pointer.current.x * 0.28, pointer.current.y * 0.2, 0);

      camera.position.copy(cameraPath.getPointAt(clamped)).add(parallax);
      if (stateRef.current.hovered) {
        camera.position.x += (stateRef.current.hovered.position.x - camera.position.x) * 0.035;
        camera.position.y += 0.08;
      }
      const lookAtPoint = lookPath.getPointAt(Math.min(clamped + CAMERA_LOOK_AHEAD, 1));
      camera.lookAt(lookAtPoint.x + pointer.current.x * 0.45, lookAtPoint.y + pointer.current.y * 0.32, lookAtPoint.z);

      entryNode.rotation.x += 0.004;
      entryNode.rotation.y += 0.006;
      logicGates.mesh.rotation.y = Math.sin(performance.now() * 0.00035) * 0.04;

      plaques.forEach((plaque) => {
        const hovered = plaque === stateRef.current.hovered;
        const targetZ = hovered ? plaque.userData.basePosition.z + 0.38 : plaque.userData.basePosition.z;
        const targetY = hovered ? plaque.userData.basePosition.y + 0.1 : plaque.userData.basePosition.y;
        plaque.position.z += (targetZ - plaque.position.z) * 0.11;
        plaque.position.y += (targetY - plaque.position.y) * 0.11;
        plaque.rotation.y += ((hovered ? plaque.userData.baseRotationY - 0.14 : plaque.userData.baseRotationY) - plaque.rotation.y) * 0.12;
      });

      pointerVector.set(pointer.current.x, pointer.current.y);
      raycaster.setFromCamera(pointerVector, camera);
      const hit = raycaster.intersectObjects(plaques, false)[0]?.object ?? null;
      setHovered(hit);
      updateCursor();

      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener("resize", resize);
    render();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      disposables.forEach(disposeObject);
      scene.clear();
    };
  }, [onHoverThread, pointer, scrollProgress]);

  return <canvas ref={canvasRef} className="h-full w-full cursor-none" aria-hidden="true" />;
}
