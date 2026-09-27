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

    // Check initial mode
    let isLightMode = document.documentElement.getAttribute("data-theme") === "light";

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const darkFogColor = 0x070b14; // Deep Dark Blue / Midnight Navy
    const lightFogColor = 0xe2e8f0; // Soothing Light Slate Grey
    scene.fog = new THREE.FogExp2(isLightMode ? lightFogColor : darkFogColor, 0.0016);

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
    renderer.setClearColor(isLightMode ? 0xe2e8f0 : 0x070b14, 0.98);
    container.appendChild(renderer.domElement);

    // --- 3D Geometric Instanced Floating Polyhedrons / Cubes ---
    const instanceCount = 650;
    const geometry = new THREE.BoxGeometry(7, 7, 7);
    
    // Cyber Material
    const material = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x64748b : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: isLightMode ? 0.45 : 0.38,
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, instanceCount);
    const dummy = new THREE.Object3D();
    const particleData = [];

    // Distinct Theme Palettes:
    // Dark: Cyber Sky Blue, Deep Royal Blue, Soft Icy Cyan, Midnight Indigo
    const darkPalette = [
      new THREE.Color("#38bdf8"),
      new THREE.Color("#2563eb"),
      new THREE.Color("#7dd3fc"),
      new THREE.Color("#1e3a8a"),
    ];

    // Light: Slate, Steel Grey, Subtle Blue
    const lightPalette = [
      new THREE.Color("#64748b"),
      new THREE.Color("#94a3b8"),
      new THREE.Color("#3b82f6"),
      new THREE.Color("#cbd5e1"),
    ];

    let currentPalette = isLightMode ? lightPalette : darkPalette;

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
      instancedMesh.setColorAt(i, currentPalette[Math.floor(Math.random() * currentPalette.length)]);

      particleData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.35,
          (Math.random() - 0.5) * 0.35,
          (Math.random() - 0.5) * 0.35
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

      const col = currentPalette[Math.floor(Math.random() * currentPalette.length)];
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
      opacity: isLightMode ? 0.45 : 0.5,
      blending: isLightMode ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);

    // --- Autonomous Looping + Interactive Mouse Parallax ---
    const clock = new THREE.Clock();
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.12;
      mouseY = (e.clientY - windowHalfY) * 0.12;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Live Light/Dark Theme Switching Observer ---
    const updateThemeMode = () => {
      const light = document.documentElement.getAttribute("data-theme") === "light";
      isLightMode = light;
      renderer.setClearColor(light ? 0xe2e8f0 : 0x070b14, 0.98);
      if (scene.fog) {
        scene.fog.color.set(light ? lightFogColor : darkFogColor);
      }
      material.color.set(light ? 0x64748b : 0x38bdf8);
      material.opacity = light ? 0.45 : 0.38;
      dustMaterial.opacity = light ? 0.45 : 0.5;
      dustMaterial.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      dustMaterial.needsUpdate = true;
      material.needsUpdate = true;

      currentPalette = light ? lightPalette : darkPalette;
      for (let i = 0; i < instanceCount; i++) {
        instancedMesh.setColorAt(i, currentPalette[Math.floor(Math.random() * currentPalette.length)]);
      }
      if (instancedMesh.instanceColor) {
        instancedMesh.instanceColor.needsUpdate = true;
      }

      const colAttr = dustGeometry.attributes.color;
      if (colAttr) {
        for (let i = 0; i < dustCount * 3; i += 3) {
          const col = currentPalette[Math.floor(Math.random() * currentPalette.length)];
          colAttr.array[i] = col.r;
          colAttr.array[i + 1] = col.g;
          colAttr.array[i + 2] = col.b;
        }
        colAttr.needsUpdate = true;
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          updateThemeMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // --- Continuous Looping Animation Frame ---
    const currentDummy = new THREE.Object3D();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Continuous autonomous movement - loops smoothly on its own without needing mouse
      const autoOrbitX = Math.sin(elapsedTime * 0.22) * 110 + Math.cos(elapsedTime * 0.09) * 45;
      const autoOrbitY = Math.cos(elapsedTime * 0.16) * 70 + Math.sin(elapsedTime * 0.07) * 35;
      const autoOrbitZ = Math.sin(elapsedTime * 0.12) * 55;

      // Smooth camera interpolation combining autonomous loop + mouse parallax
      targetX += (mouseX + autoOrbitX - targetX) * 0.025;
      targetY += (mouseY + autoOrbitY - targetY) * 0.025;
      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.position.z = 700 + autoOrbitZ;
      camera.lookAt(0, 0, 0);

      // Slow scene rotation & drift
      scene.rotation.y = elapsedTime * 0.025;
      scene.rotation.x = Math.sin(elapsedTime * 0.015) * 0.06;
      dustPoints.rotation.y = elapsedTime * 0.035;
      dustPoints.rotation.x = Math.cos(elapsedTime * 0.02) * 0.05;

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
      observer.disconnect();
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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-500"
    />
  );
}
