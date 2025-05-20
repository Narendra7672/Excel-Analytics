import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeDChart = ({ data = [] }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current || data.length === 0) return;

    // Clear existing canvas
    mountRef.current.innerHTML = "";

    const width = 600;
    const height = 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 20, 50);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 20, 10).normalize();
    scene.add(light);

    data.forEach((item, i) => {
      const value = parseFloat(item.value);
      if (isNaN(value)) return;

      const geometry = new THREE.BoxGeometry(1, value, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
      const cube = new THREE.Mesh(geometry, material);

      cube.position.x = i * 2 - data.length;
      cube.position.y = value / 2;
      scene.add(cube);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
    };
  }, [data]);

  return (
    <div className="my-4">
      <h2 className="text-lg font-bold mb-2">3D Chart</h2>
      <div ref={mountRef} />
    </div>
  );
};

export default ThreeDChart;
