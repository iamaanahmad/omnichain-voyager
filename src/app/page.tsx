
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Link from 'next/link';

export default function LandingPage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1a202c');

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Crystal Geometry
    const geometry = new THREE.IcosahedronGeometry(1.5, 0);

    // Crystal Material
    const material = new THREE.MeshStandardMaterial({
      color: '#9f7aea',
      metalness: 0.5,
      roughness: 0.2,
    });

    // Crystal Mesh (Solid Core)
    const crystal = new THREE.Mesh(geometry, material);
    scene.add(crystal);

    // Wireframe
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.51, 0);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: '#8A2BE2',
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    crystal.add(wireframe);

    // Lights
    const light1 = new THREE.PointLight(0x8A2BE2, 20, 100);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x00ffff, 15, 100); // cyan light
    light2.position.set(-10, -10, -5);
    scene.add(light2);
    
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    // Mouse tracking
    const mouse = new THREE.Vector2();
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow rotation
      crystal.rotation.x = 0.1 * elapsedTime;
      crystal.rotation.y = 0.1 * elapsedTime;
      
      // Mouse follow effect
      const targetX = mouse.x * 0.5;
      const targetY = mouse.y * 0.5;
      crystal.position.x += (targetX - crystal.position.x) * 0.05;
      crystal.position.y += (targetY - crystal.position.y) * 0.05;


      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const onResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="bg-[#1a202c] font-body">
        <div className="relative w-full h-screen overflow-hidden">
            <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white text-center p-4">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-wider mb-4" style={{ textShadow: '0 0 15px rgba(138, 43, 226, 0.5)' }}>
                OmniChain <span className="text-[#8A2BE2]">Voyager</span>
                </h1>
                <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-8">
                The future of gaming is interoperable. Forge your hero, traverse blockchains, and engage in a truly cross-chain economy.
                </p>
                <Link href="/voyager" className="bg-[#8A2BE2] text-white font-bold py-3 px-8 rounded-lg text-lg transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-purple-500/50">
                    Begin Your Journey
                </Link>
            </div>
        </div>
    </div>
  );
}
