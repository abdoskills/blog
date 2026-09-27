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
    const darkFogColor = 0x0a0a0c; // Vintage Monochrome CRT Deep Charcoal Black
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
    renderer.setClearColor(isLightMode ? 0xe2e8f0 : 0x0a0a0c, 0.98);
    container.appendChild(renderer.domElement);

    // --- 3D Geometric Instanced Floating Polyhedrons / Cubes ---
    const instanceCount = 650;
    const geometry = new THREE.BoxGeometry(7, 7, 7);
    
    // Monochrome Retro Wireframe Material
    const material = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x475569 : 0xd1d5db,
      wireframe: true,
      transparent: true,
      opacity: isLightMode ? 0.45 : 0.38,
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, instanceCount);
    const dummy = new THREE.Object3D();
    const particleData = [];

    // Vintage Black & White / Grayscale TV Palettes:
    // Dark: Crisp White, Silver, Pale Gray, Medium Slate Gray
    const darkPalette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#e5e7eb"),
      new THREE.Color("#d1d5db"),
      new THREE.Color("#9ca3af"),
      new THREE.Color("#6b7280"),
    ];

    // Light: Deep Charcoal, Slate, Medium Grey
    const lightPalette = [
      new THREE.Color("#1f2937"),
      new THREE.Color("#374151"),
      new THREE.Color("#4b5563"),
      new THREE.Color("#6b7280"),
      new THREE.Color("#9ca3af"),
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

    // =========================================================================
    // --- CYBER "RAT" (Remote Access Trojan) RUNNER WITH BLURRED LIGHT TRAIL ---
    // =========================================================================
    const ratGroup = new THREE.Group();

    // 1. Sleek Cyber Rat Body (low-poly tapered cone pointing forward along Z)
    const ratBodyGeo = new THREE.ConeGeometry(3.5, 14, 5);
    ratBodyGeo.rotateX(Math.PI / 2);
    const ratBodyMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x1f2937 : 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const ratBodyMesh = new THREE.Mesh(ratBodyGeo, ratBodyMat);
    ratGroup.add(ratBodyMesh);

    // 2. Cyber Rat Ears
    const ratEarGeo = new THREE.CircleGeometry(1.6, 6);
    const ratEarMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x374151 : 0xd1d5db,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const leftEar = new THREE.Mesh(ratEarGeo, ratEarMat);
    leftEar.position.set(-2, 2.5, 2);
    leftEar.rotation.y = -0.35;
    const rightEar = new THREE.Mesh(ratEarGeo, ratEarMat);
    rightEar.position.set(2, 2.5, 2);
    rightEar.rotation.y = 0.35;
    ratGroup.add(leftEar);
    ratGroup.add(rightEar);

    // 3. Cyber White / Amber Eye Scanner LEDs
    const ratEyeGeo = new THREE.SphereGeometry(0.55, 6, 6);
    const ratEyeMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x111827 : 0xffffff, // Vintage monochrome CRT phosphor white
    });
    const leftEye = new THREE.Mesh(ratEyeGeo, ratEyeMat);
    leftEye.position.set(-1.1, 1.1, 6);
    const rightEye = new THREE.Mesh(ratEyeGeo, ratEyeMat);
    rightEye.position.set(1.1, 1.1, 6);
    ratGroup.add(leftEye);
    ratGroup.add(rightEye);

    // 4. Scurrying Tail
    const ratTailGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -7),
      new THREE.Vector3(0, 1.5, -13),
      new THREE.Vector3(0, 0.5, -20),
    ]);
    const ratTailMat = new THREE.LineBasicMaterial({
      color: isLightMode ? 0x374151 : 0xe5e7eb,
      transparent: true,
      opacity: 0.7,
    });
    const ratTailMesh = new THREE.Line(ratTailGeo, ratTailMat);
    ratGroup.add(ratTailMesh);

    scene.add(ratGroup);

    // --- Blurred Motion Light Trail (Dynamic Points with Canvas Blur Texture + Core Laser) ---
    const TRAIL_LENGTH = 45;
    const trailPositions = new Float32Array(TRAIL_LENGTH * 3);
    const trailColors = new Float32Array(TRAIL_LENGTH * 3);

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      trailPositions[i * 3] = 0;
      trailPositions[i * 3 + 1] = 0;
      trailPositions[i * 3 + 2] = 0;

      const ratio = 1 - i / TRAIL_LENGTH;
      const val = isLightMode ? (0.15 + (1 - ratio) * 0.45) : (0.4 + ratio * 0.6);
      trailColors[i * 3] = val;
      trailColors[i * 3 + 1] = val;
      trailColors[i * 3 + 2] = val;
    }

    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
    trailGeo.setAttribute("color", new THREE.BufferAttribute(trailColors, 3));

    // Dynamic procedural soft-glow radial texture for motion blur
    const createBlurTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      grad.addColorStop(0.25, "rgba(215, 215, 215, 0.75)");
      grad.addColorStop(0.6, "rgba(130, 130, 130, 0.3)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const blurTexture = createBlurTexture();

    const trailMat = new THREE.PointsMaterial({
      size: 18,
      map: blurTexture,
      vertexColors: true,
      transparent: true,
      opacity: isLightMode ? 0.6 : 0.85,
      blending: isLightMode ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });
    const trailPoints = new THREE.Points(trailGeo, trailMat);
    scene.add(trailPoints);

    // Laser Core Line inside the blur for crisp cyber definition
    const laserGeo = new THREE.BufferGeometry();
    laserGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TRAIL_LENGTH * 3), 3));
    const laserMat = new THREE.LineBasicMaterial({
      color: isLightMode ? 0x1f2937 : 0xffffff,
      transparent: true,
      opacity: isLightMode ? 0.45 : 0.85,
      blending: isLightMode ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    const laserLine = new THREE.Line(laserGeo, laserMat);
    scene.add(laserLine);

    // Waypoint Data Boxes for the Rat to dart between
    const waypointBoxes = particleData
      .map((p) => p.position)
      .filter((pos) => Math.abs(pos.x) < 500 && Math.abs(pos.y) < 380 && Math.abs(pos.z) < 320);

    const fallbackWaypoint = new THREE.Vector3(0, 0, 0);
    let ratTargetPos = (waypointBoxes[Math.floor(Math.random() * waypointBoxes.length)] || fallbackWaypoint).clone();
    let ratCurrentPos = (waypointBoxes[Math.floor(Math.random() * waypointBoxes.length)] || fallbackWaypoint).clone();
    let ratState = "SCURRY"; // "SCURRY" or "INSPECT"
    let inspectTimer = 0;
    const historyPositions = [];

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
      renderer.setClearColor(light ? 0xe2e8f0 : 0x0a0a0c, 0.98);
      if (scene.fog) {
        scene.fog.color.set(light ? lightFogColor : darkFogColor);
      }
      material.color.set(light ? 0x475569 : 0xd1d5db);
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

      ratBodyMat.color.set(light ? 0x1f2937 : 0xffffff);
      ratEarMat.color.set(light ? 0x374151 : 0xd1d5db);
      ratEyeMat.color.set(light ? 0x111827 : 0xffffff);
      ratTailMat.color.set(light ? 0x374151 : 0xe5e7eb);
      trailMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      trailMat.opacity = light ? 0.6 : 0.85;
      laserMat.color.set(light ? 0x1f2937 : 0xffffff);
      laserMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
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

      // =====================================================================
      // --- Cyber RAT Scurrying & Blurred Motion Trail Update ---
      // =====================================================================
      if (ratState === "SCURRY") {
        const toTarget = new THREE.Vector3().subVectors(ratTargetPos, ratCurrentPos);
        const distance = toTarget.length();

        if (distance < 16) {
          ratState = "INSPECT";
          inspectTimer = 18 + Math.floor(Math.random() * 22); // Inspect box data
        } else {
          toTarget.normalize();

          // Scurrying scamper wobble (high-frequency side wiggle like a rodent)
          const scamperWobble = Math.sin(elapsedTime * 26) * 1.6;
          const scamperSide = new THREE.Vector3(-toTarget.y, toTarget.x, 0).normalize().multiplyScalar(scamperWobble);

          // Fast sprint burst (5.5 units/frame)
          ratCurrentPos.addScaledVector(toTarget, 5.5).add(scamperSide);

          ratGroup.position.copy(ratCurrentPos);
          const lookPos = ratCurrentPos.clone().add(toTarget);
          ratGroup.lookAt(lookPos);

          // Tail twitching
          ratTailMesh.rotation.x = Math.sin(elapsedTime * 32) * 0.2;
          ratTailMesh.rotation.y = Math.cos(elapsedTime * 28) * 0.3;
        }
      } else if (ratState === "INSPECT") {
        inspectTimer--;
        // Jitter around box data
        ratGroup.position.x = ratCurrentPos.x + (Math.random() - 0.5) * 1.4;
        ratGroup.position.y = ratCurrentPos.y + (Math.random() - 0.5) * 1.4;
        ratTailMesh.rotation.y = Math.sin(elapsedTime * 38) * 0.4;

        if (inspectTimer <= 0) {
          // Select another distant box to scurry to!
          let nextBox = waypointBoxes[Math.floor(Math.random() * waypointBoxes.length)] || fallbackWaypoint;
          while (nextBox.distanceTo(ratCurrentPos) < 120 && waypointBoxes.length > 2) {
            nextBox = waypointBoxes[Math.floor(Math.random() * waypointBoxes.length)];
          }
          ratTargetPos = nextBox.clone();
          ratState = "SCURRY";
        }
      }

      // Record trail history for motion blur
      historyPositions.unshift(ratCurrentPos.clone());
      if (historyPositions.length > TRAIL_LENGTH) {
        historyPositions.pop();
      }

      const tPosAttr = trailGeo.attributes.position;
      const lPosAttr = laserGeo.attributes.position;

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const hp = historyPositions[i] || ratCurrentPos;
        tPosAttr.setXYZ(i, hp.x, hp.y, hp.z);
        lPosAttr.setXYZ(i, hp.x, hp.y, hp.z);
      }
      tPosAttr.needsUpdate = true;
      lPosAttr.needsUpdate = true;

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
      blurTexture.dispose();
      trailGeo.dispose();
      trailMat.dispose();
      laserGeo.dispose();
      laserMat.dispose();
      ratBodyGeo.dispose();
      ratBodyMat.dispose();
      ratEarGeo.dispose();
      ratEarMat.dispose();
      ratEyeGeo.dispose();
      ratEyeMat.dispose();
      ratTailGeo.dispose();
      ratTailMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="cyber-3d-bg"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-500"
    >
      {/* Vintage Old TV CRT Scanlines & Screen Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none crt-tv-overlay" />
    </div>
  );
}
