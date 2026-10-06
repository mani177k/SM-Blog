import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  scrollProgress: number;
  onGoalProgress?: (progress: number, isGoal: boolean) => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ scrollProgress, onGoalProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(0);
  const onGoalProgressRef = useRef(onGoalProgress);
  onGoalProgressRef.current = onGoalProgress;

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xF8F7F4, 0.012);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.0);
    sunLight.position.set(15, 25, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const stadiumSpot = new THREE.SpotLight(0xE05A1B, 2.5, 50, Math.PI / 4, 0.4, 1);
    stadiumSpot.position.set(0, -10, 10);
    scene.add(stadiumSpot);

    const rimLight = new THREE.DirectionalLight(0x0C2340, 1.0);
    rimLight.position.set(-15, -15, -10);
    scene.add(rimLight);

    // --- Create Realistic Procedural Soccer Ball Texture ---
    const ballCanvas = document.createElement('canvas');
    ballCanvas.width = 1024;
    ballCanvas.height = 512;
    const ctx = ballCanvas.getContext('2d')!;

    // Base leather texture
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, ballCanvas.width, ballCanvas.height);

    // Subtle leather grain noise
    for (let i = 0; i < 20000; i++) {
      const rx = Math.random() * ballCanvas.width;
      const ry = Math.random() * ballCanvas.height;
      const shade = Math.floor(240 + Math.random() * 15);
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.fillRect(rx, ry, 1, 1);
    }

    // Function to draw regular polygon
    function drawPolygon(x: number, y: number, radius: number, sides: number, fill: string, stroke: string) {
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
        const px = x + radius * Math.cos(angle);
        const py = y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = stroke;
      ctx.stroke();
      ctx.restore();
    }

    // Draw soccer ball pentagons & connecting seams
    const pentagonCoords = [
      [256, 128], [512, 128], [768, 128],
      [128, 256], [384, 256], [640, 256], [896, 256],
      [256, 384], [512, 384], [768, 384],
      [0, 128], [1024, 128], [0, 384], [1024, 384]
    ];

    // Seam lines between panels
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 3;
    pentagonCoords.forEach(([px, py]) => {
      drawPolygon(px, py, 42, 5, '#111827', '#1F2937');
      // Draw radiating seam guides
      for (let s = 0; s < 5; s++) {
        const a = (s * 2 * Math.PI) / 5 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(px + 42 * Math.cos(a), py + 42 * Math.sin(a));
        ctx.lineTo(px + 78 * Math.cos(a), py + 78 * Math.sin(a));
        ctx.strokeStyle = '#9CA3AF';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
    });

    const ballTexture = new THREE.CanvasTexture(ballCanvas);
    ballTexture.wrapS = THREE.RepeatWrapping;
    ballTexture.wrapT = THREE.ClampToEdgeWrapping;

    // Create Football Mesh
    const ballRadius = 0.52;
    const ballGeometry = new THREE.SphereGeometry(ballRadius, 48, 48);
    const ballMaterial = new THREE.MeshStandardMaterial({
      map: ballTexture,
      roughness: 0.35,
      metalness: 0.08,
      bumpMap: ballTexture,
      bumpScale: 0.02
    });

    const footballGroup = new THREE.Group();
    const footballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    footballMesh.castShadow = true;
    footballGroup.add(footballMesh);
    scene.add(footballGroup);

    // Subtle warm motion light attached near football
    const ballGlow = new THREE.PointLight(0xE05A1B, 0.8, 4);
    ballGlow.position.set(0, 0.2, 0.5);
    footballGroup.add(ballGlow);

    // --- Define 3D Spline Path Starting from Section 2 ---
    // The curve coordinates travel from Section 2 (Category) down to Goal at Footer
    const curvePoints = [
      new THREE.Vector3(-2.2, -1.4, -4.2),  // 0.00: Section 2 (Category entry point)
      new THREE.Vector3(-1.0, -2.6, -4.0),  // 0.12: Section 2 to Featured transition
      new THREE.Vector3(0.0, -4.2, -6.5),   // 0.25: Featured Articles (dives in deep center behind carousel)
      new THREE.Vector3(3.2, -5.8, -4.0),   // 0.38: Featured to Recent Articles (curves right)
      new THREE.Vector3(-2.0, -7.5, -5.2),  // 0.50: Recent Articles (diagonal background traverse)
      new THREE.Vector3(-3.5, -9.2, -3.2),  // 0.60: Discovery Engine (sweeps around left persona cards)
      new THREE.Vector3(1.8, -11.0, -6.0),  // 0.70: Featured Video (dives deep behind video container)
      new THREE.Vector3(2.5, -12.8, -4.5),  // 0.78: Financial Tools enter
      new THREE.Vector3(-2.2, -14.4, -4.0), // 0.84: Financial Tools (curves across calculator cards)
      new THREE.Vector3(1.5, -16.2, -3.0),  // 0.89: Newsletter / CTA (accelerating toward viewer)
      new THREE.Vector3(0.0, -18.0, -4.5),  // 0.93: Mountain Quote section (entering straight stadium corridor)
      new THREE.Vector3(0.0, -19.4, -6.0),  // 0.97: Footer / Approaching Goal post
      new THREE.Vector3(0.0, -19.9, -8.2),  // 0.99: Striking the goal line!
      new THREE.Vector3(0.0, -20.1, -9.6),  // 1.00: Inside the net! Bulging back
    ];

    const splineCurve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5);

    // --- Visual 3D Path Trail & Subtle Field Lines ---
    const pathGeometry = new THREE.TubeGeometry(splineCurve, 240, 0.03, 8, false);
    const pathMaterial = new THREE.MeshStandardMaterial({
      color: 0xE05A1B,
      emissive: 0xE05A1B,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.0, // Fades in smoothly when entering Section 2
      roughness: 0.4
    });
    const pathMesh = new THREE.Mesh(pathGeometry, pathMaterial);
    scene.add(pathMesh);

    // Abstract Field Arcs and Architectural Accent Rings along the path
    const arcsGroup = new THREE.Group();
    const ringGeo = new THREE.RingGeometry(0.8, 0.84, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0C2340,
      transparent: true,
      opacity: 0.0, // Fades in when entering Section 2
      side: THREE.DoubleSide
    });

    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const pt = splineCurve.getPointAt(t);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pt);
      ring.rotation.x = Math.PI / 2;
      arcsGroup.add(ring);
    }
    scene.add(arcsGroup);

    // Floating Dust / Atmospheric Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = 3 - Math.random() * 26;
      particlePositions[i * 3 + 2] = -2 - Math.random() * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xE05A1B,
      size: 0.08,
      transparent: true,
      opacity: 0.45
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- Goal Post and Net Assembly (at final destination) ---
    const goalGroup = new THREE.Group();
    goalGroup.position.set(0, -20.0, -9.0);

    const postMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.2,
      metalness: 0.3
    });

    const postRadius = 0.08;
    const goalWidth = 5.2;
    const goalHeight = 2.8;
    const goalDepth = 1.8;

    // Left post
    const leftPostGeo = new THREE.CylinderGeometry(postRadius, postRadius, goalHeight, 16);
    const leftPost = new THREE.Mesh(leftPostGeo, postMaterial);
    leftPost.position.set(-goalWidth / 2, goalHeight / 2, 0);
    goalGroup.add(leftPost);

    // Right post
    const rightPost = new THREE.Mesh(leftPostGeo, postMaterial);
    rightPost.position.set(goalWidth / 2, goalHeight / 2, 0);
    goalGroup.add(rightPost);

    // Crossbar
    const crossbarGeo = new THREE.CylinderGeometry(postRadius, postRadius, goalWidth, 16);
    const crossbar = new THREE.Mesh(crossbarGeo, postMaterial);
    crossbar.rotation.z = Math.PI / 2;
    crossbar.position.set(0, goalHeight, 0);
    goalGroup.add(crossbar);

    // Back Goal Supports
    const supportGeo = new THREE.CylinderGeometry(0.04, 0.04, goalDepth, 12);
    const leftTopSupport = new THREE.Mesh(supportGeo, postMaterial);
    leftTopSupport.rotation.x = Math.PI / 2;
    leftTopSupport.position.set(-goalWidth / 2, goalHeight, -goalDepth / 2);
    goalGroup.add(leftTopSupport);

    const rightTopSupport = new THREE.Mesh(supportGeo, postMaterial);
    rightTopSupport.rotation.x = Math.PI / 2;
    rightTopSupport.position.set(goalWidth / 2, goalHeight, -goalDepth / 2);
    goalGroup.add(rightTopSupport);

    // Dynamic Reactive Net (Plane with customizable vertex deformation)
    const netSegmentsX = 36;
    const netSegmentsY = 24;
    const netGeo = new THREE.PlaneGeometry(goalWidth, goalHeight, netSegmentsX, netSegmentsY);
    const netMat = new THREE.MeshBasicMaterial({
      color: 0x94A3B8,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const netMesh = new THREE.Mesh(netGeo, netMat);
    netMesh.position.set(0, goalHeight / 2, -goalDepth);
    goalGroup.add(netMesh);

    // Side Net Planes
    const sideNetGeo = new THREE.PlaneGeometry(goalDepth, goalHeight, 12, 16);
    const leftSideNet = new THREE.Mesh(sideNetGeo, netMat);
    leftSideNet.rotation.y = Math.PI / 2;
    leftSideNet.position.set(-goalWidth / 2, goalHeight / 2, -goalDepth / 2);
    goalGroup.add(leftSideNet);

    const rightSideNet = new THREE.Mesh(sideNetGeo, netMat);
    rightSideNet.rotation.y = -Math.PI / 2;
    rightSideNet.position.set(goalWidth / 2, goalHeight / 2, -goalDepth / 2);
    goalGroup.add(rightSideNet);

    // Goal Top Net
    const topNetGeo = new THREE.PlaneGeometry(goalWidth, goalDepth, 24, 12);
    const topNet = new THREE.Mesh(topNetGeo, netMat);
    topNet.rotation.x = Math.PI / 2;
    topNet.position.set(0, goalHeight, -goalDepth / 2);
    goalGroup.add(topNet);

    // Goal spotlight
    const goalSpot = new THREE.SpotLight(0xFFFFFF, 3.0, 20, Math.PI / 3, 0.5);
    goalSpot.position.set(0, 4, 3);
    goalSpot.target = netMesh;
    goalGroup.add(goalSpot);

    scene.add(goalGroup);

    // Original position buffer of net for reversible deformation
    const originalNetPositions = new Float32Array(netGeo.attributes.position.array);

    // --- State variables for smooth animation & velocity rotation ---
    let currentT = 0;
    let prevPosition = splineCurve.getPointAt(0);
    let animationFrameId: number;
    let isGoalScoredNotified = false;

    // Initial position setup - Section 1 (Hero) is 100% clean
    const initialPos = splineCurve.getPointAt(0);
    footballGroup.position.copy(initialPos);
    footballGroup.visible = false;
    footballGroup.scale.setScalar(0);
    camera.position.set(0, 0, 6);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Render Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Damped interpolation of scroll progress (single source of truth)
      const targetT = Math.min(Math.max(scrollRef.current, 0), 1);
      const lerpSpeed = 0.085;
      currentT += (targetT - currentT) * lerpSpeed;

      // Ensure clamped value
      const clampedT = Math.min(Math.max(currentT, 0), 0.9999);

      // Current 3D position along spline
      const newPos = splineCurve.getPointAt(clampedT);
      const tangent = splineCurve.getTangentAt(clampedT);

      // Velocity-based rotation
      const moveDelta = newPos.clone().sub(prevPosition);
      const distanceMoved = moveDelta.length();

      if (distanceMoved > 0.0001) {
        // Axis perpendicular to movement and global Y
        const moveDir = moveDelta.clone().normalize();
        const rotationAxis = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), moveDir).normalize();
        if (rotationAxis.lengthSq() > 0.001) {
          const rotationAngle = distanceMoved / ballRadius;
          const q = new THREE.Quaternion().setFromAxisAngle(rotationAxis, rotationAngle);
          footballMesh.quaternion.premultiply(q);
        }
      }
      prevPosition.copy(newPos);
      footballGroup.position.copy(newPos);

      // Dynamic Perspective Scale
      // Far away in background -> slightly smaller; close at hero/newsletter/goal -> prominent
      const zDepth = newPos.z;
      const targetScale = THREE.MathUtils.lerp(0.85, 1.25, Math.min(Math.max((zDepth + 8) / 7, 0), 1));

      // Section 1 (Hero) Protection:
      // Ball must start from Section 2 so Hero is fully visible without any background disturbance.
      const heroThreshold = 0.07;
      const emergenceFactor = Math.min(Math.max((clampedT - heroThreshold) / 0.06, 0), 1);

      // Hide or show football smoothly
      footballGroup.visible = emergenceFactor > 0.001;
      footballGroup.scale.setScalar(targetScale * emergenceFactor);

      // Fade in path lines and accent rings smoothly starting at Section 2
      pathMaterial.opacity = 0.28 * emergenceFactor;
      ringMat.opacity = 0.12 * emergenceFactor;

      // Dynamic Camera Choreography: Follow the ball smoothly
      // When approaching goal (t > 0.93), camera centers and moves behind ball for cinematic final shot
      let targetCamX = newPos.x - 0.2;
      let targetCamY = newPos.y + 0.6;
      let targetCamZ = newPos.z + 5.0;
      let targetLookAt = newPos.clone();

      if (emergenceFactor <= 0.01) {
        // While user is in Hero section, keep camera tranquil and focused on clean background
        targetCamX = 0;
        targetCamY = 0;
        targetCamZ = 6;
        targetLookAt = new THREE.Vector3(0, 0, 0);
      } else if (clampedT > 0.92) {
        // Tight cinematic chase cam aligned with the goal corridor
        const goalBlend = (clampedT - 0.92) / 0.08;
        targetCamX = THREE.MathUtils.lerp(newPos.x, 0, goalBlend);
        targetCamY = THREE.MathUtils.lerp(newPos.y + 0.6, -19.2, goalBlend);
        targetCamZ = THREE.MathUtils.lerp(newPos.z + 5.0, -3.5, goalBlend);
        targetLookAt = new THREE.Vector3(0, -20.0, -9.5);
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.07;
      camera.position.y += (targetCamY - camera.position.y) * 0.07;
      camera.position.z += (targetCamZ - camera.position.z) * 0.07;
      camera.lookAt(targetLookAt);

      // Reactive Net Bulge Simulation & Reversible deformation
      const netPositions = netGeo.attributes.position.array as Float32Array;
      const ballInGoalLocal = footballGroup.position.clone().sub(goalGroup.position);

      // Net is at local z = -goalDepth (-1.8)
      // Check penetration
      const isHittingNet = ballInGoalLocal.z <= -goalDepth + ballRadius && clampedT > 0.96;
      const hitDepth = isHittingNet ? Math.min((-goalDepth + ballRadius) - ballInGoalLocal.z, 1.4) : 0;

      for (let i = 0; i < netPositions.length; i += 3) {
        const ox = originalNetPositions[i];
        const oy = originalNetPositions[i + 1];
        const oz = originalNetPositions[i + 2];

        if (hitDepth > 0) {
          // Distance from ball impact point (x, y)
          const dx = ox - ballInGoalLocal.x;
          const dy = oy - (ballInGoalLocal.y - goalHeight / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radiusOfEffect = 1.6;

          if (dist < radiusOfEffect) {
            const factor = Math.cos((dist / radiusOfEffect) * (Math.PI / 2));
            netPositions[i + 2] = oz - hitDepth * factor * 1.3;
          } else {
            netPositions[i + 2] = oz;
          }
        } else {
          // Return to original flat position (reversible!)
          netPositions[i + 2] = oz;
        }
      }
      netGeo.attributes.position.needsUpdate = true;
      netGeo.computeVertexNormals();

      // Goal notification callback to parent UI
      const isGoalScored = clampedT >= 0.975;
      if (onGoalProgressRef.current) {
        onGoalProgressRef.current(clampedT, isGoalScored);
      }

      if (isGoalScored && !isGoalScoredNotified) {
        isGoalScoredNotified = true;
      } else if (!isGoalScored && isGoalScoredNotified) {
        isGoalScoredNotified = false;
      }

      // Gentle floating of ambient dust particles
      const particlePosArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particlePositions.length; i += 3) {
        particlePosArray[i] -= delta * 0.2;
        if (particlePosArray[i] < -25) {
          particlePosArray[i] = 4;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ballGeometry.dispose();
      ballMaterial.dispose();
      ballTexture.dispose();
      pathGeometry.dispose();
      pathMaterial.dispose();
      netGeo.dispose();
      netMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};
