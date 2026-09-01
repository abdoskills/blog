"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CyberBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const container = containerRef.current;
    let animationFrameId;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 700;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050508, 0.95);
    container.appendChild(renderer.domElement);

    // --- 3D Geometric Instanced Floating Polyhedrons / Cubes ---
    const instanceCount = 650;
    const geometry = new THREE.BoxGeometry(7, 7, 7);
    
    // Custom vertex/fragment material with cyber glow
    const material = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, instanceCount);
    const dummy = new THREE.Object3D();
    const particleData = [];

    // Colors palette (Default Cyber Amber Yellow)
    let currentAccentHex = getComputedStyle(document.documentElement).getPropertyValue("--accent-color").trim() || "#f59e0b";
    
    const getThemeColors = (hex) => {
      const base = new THREE.Color(hex);
      const bright = new THREE.Color(hex).offsetHSL(0.05, 0.2, 0.15);
      const dark = new THREE.Color(hex).offsetHSL(-0.05, -0.1, -0.2);
      const complement = new THREE.Color(hex).offsetHSL(0.5, 0, 0);
      return [base, bright, dark, complement];
    };

    let colors = getThemeColors(currentAccentHex);

    for (let i = 0; i < instanceCount; i++) {
      const x = (Math.random() - 0.5) * 1600;
      const y = (Math.random() - 0.5) * 1600;
      const z = (Math.random() - 0.5) * 1200;

      dummy.position.set(x, y, z);
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const scale = 0.5 + Math.random() * 1.5;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      instancedMesh.setMatrixAt(i, dummy.matrix);
      instancedMesh.setColorAt(i, colors[Math.floor(Math.random() * colors.length)]);

      particleData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        position: new THREE.Vector3(x, y, z),
        rotation: new THREE.Vector3(dummy.rotation.x, dummy.rotation.y, dummy.rotation.z),
        scale: scale,
      });
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }
    scene.add(instancedMesh);

    // --- Ambient Particle Dust (Points) ---
    const dustCount = 1200;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 1800;
      dustPositions[i + 1] = (Math.random() - 0.5) * 1800;
      dustPositions[i + 2] = (Math.random() - 0.5) * 1400;

      const col = colors[Math.floor(Math.random() * colors.length)];
      dustColors[i] = col.r;
      dustColors[i + 1] = col.g;
      dustColors[i + 2] = col.b;
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);

    // --- Interactive Mouse Parallax ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.15;
      mouseY = (e.clientY - windowHalfY) * 0.15;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Animation Loop with Dynamic Theme Color Sync ---
    let lastCheckedHex = currentAccentHex;
    const currentDummy = new THREE.Object3D();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Check if root accent color changed from the color wheel
      const newHex = getComputedStyle(document.documentElement).getPropertyValue("--accent-color").trim();
      if (newHex && newHex !== lastCheckedHex) {
        lastCheckedHex = newHex;
        colors = getThemeColors(newHex);
        material.color.set(newHex);

        for (let i = 0; i < instanceCount; i++) {
          instancedMesh.setColorAt(i, colors[Math.floor(Math.random() * colors.length)]);
        }
        if (instancedMesh.instanceColor) {
          instancedMesh.instanceColor.needsUpdate = true;
        }

        const colAttr = dustGeometry.attributes.color;
        if (colAttr) {
          for (let i = 0; i < dustCount * 3; i += 3) {
            const col = colors[Math.floor(Math.random() * colors.length)];
            colAttr.array[i] = col.r;
            colAttr.array[i + 1] = col.g;
            colAttr.array[i + 2] = col.b;
          }
          colAttr.needsUpdate = true;
        }
      }

      // Smooth camera interpolation
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;
      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      // Slow scene rotation
      scene.rotation.y += 0.0003;
      dustPoints.rotation.y += 0.0004;
      dustPoints.rotation.x += 0.0002;

      // Update instanced mesh positions and rotations
      for (let i = 0; i < instanceCount; i++) {
        const data = particleData[i];

        data.position.add(data.velocity);
        data.rotation.x += data.rotationSpeed.x;
        data.rotation.y += data.rotationSpeed.y;
        data.rotation.z += data.rotationSpeed.z;

        // Wrap around boundaries
        if (data.position.x > 800) data.position.x = -800;
        if (data.position.x < -800) data.position.x = 800;
        if (data.position.y > 800) data.position.y = -800;
        if (data.position.y < -800) data.position.y = 800;
        if (data.position.z > 600) data.position.z = -600;
        if (data.position.z < -600) data.position.z = 600;

        currentDummy.position.copy(data.position);
        currentDummy.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
        currentDummy.scale.set(data.scale, data.scale, data.scale);
        currentDummy.updateMatrix();

        instancedMesh.setMatrixAt(i, currentDummy.matrix);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="cyber-3d-bg"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #0b0f14 0%, #050608 70%, #020304 100%)",
      }}
    />
  );
}
