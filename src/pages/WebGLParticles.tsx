'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WebGLParticles = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced particle system
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x3b82f6), // blue-500
      new THREE.Color(0x60a5fa), // blue-400
      new THREE.Color(0x93c5fd), // blue-300
      new THREE.Color(0x8b5cf6), // violet-500
      new THREE.Color(0xa855f7), // violet-400
      new THREE.Color(0xc084fc), // violet-300
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Spherical distribution
      const radius = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction
    const mouse = new THREE.Vector2(0, 0);
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    camera.position.z = 25;
    const clock = new THREE.Clock();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      const positions = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Multi-frequency wave motion
        const wave1 = Math.sin(elapsedTime * 0.3 + positions[i3] * 0.1);
        const wave2 = Math.cos(elapsedTime * 0.5 + positions[i3 + 1] * 0.1);
        const wave3 = Math.sin(elapsedTime * 0.7 + positions[i3 + 2] * 0.1);
        
        positions[i3] += velocities[i3] + wave1 * 0.01;
        positions[i3 + 1] += velocities[i3 + 1] + wave2 * 0.01;
        positions[i3 + 2] += velocities[i3 + 2] + wave3 * 0.005;

        // Mouse interaction - particles are attracted to mouse
        const particlePos = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]);
        const mousePos = new THREE.Vector3(mouse.x * 30, mouse.y * 30, 0);
        const distanceToMouse = particlePos.distanceTo(mousePos);
        
        if (distanceToMouse < 15) {
          const direction = mousePos.clone().sub(particlePos).normalize();
          const force = (15 - distanceToMouse) / 15 * 0.1;
          positions[i3] += direction.x * force;
          positions[i3 + 1] += direction.y * force;
          positions[i3 + 2] += direction.z * force;
        }

        // Boundary check - wrap around
        if (Math.abs(positions[i3]) > 25) velocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > 25) velocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > 25) velocities[i3 + 2] *= -1;
      }
      
      geometry.attributes.position.needsUpdate = true;

      // Smooth rotation
      particles.rotation.x = elapsedTime * 0.05;
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default WebGLParticles;