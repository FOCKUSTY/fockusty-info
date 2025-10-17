"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

const SpaceAnimation = ({
  children,
  enabled,
}: {
  children: React.ReactNode;
  enabled: boolean;
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const background = new THREE.TextureLoader().load("/background.png");
    background.colorSpace = THREE.SRGBColorSpace;

    scene.background = background;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      reversedDepthBuffer: true,
    });
    renderer.setClearColor(0x000000, 0);

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const stars: any[] = [];

    for (let i = 0; i < 1000; i++) {
      const starsGeometry = new THREE.SphereGeometry(0.1, 4, 4);
      const starsMaterial = new THREE.MeshBasicMaterial({
        color: getRandomColor(),
      });

      const star = new THREE.Mesh(starsGeometry, starsMaterial);

      star.position.x = (Math.random() - 0.5) * 100;
      star.position.y = (Math.random() - 0.5) * 100;
      star.position.z = -50;

      star.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.001,
      );

      if (!enabled) {
        starsGeometry.dispose();
        starsMaterial.dispose();
      } else {
        scene.add(star);
        stars.push(star);
      }
    }

    const asteroids: any[] = [];

    for (let i = 0; i < 50; i++) {
      const asteroidGeometry = new THREE.SphereGeometry(
        (0.5 * (i + 1)) / 5,
        16,
        16,
      );
      const asteroidMaterial = new THREE.MeshBasicMaterial({
        color: getRandomColor(),
      });

      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      asteroid.position.x = (Math.random() - 0.5) * 100;
      asteroid.position.y = (Math.random() - 0.5) * 100;
      asteroid.position.z = (Math.random() - 0.5) * 100;

      asteroid.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
      );

      if (!enabled) {
        asteroidGeometry.dispose();
        asteroidMaterial.dispose();
      } else {
        scene.add(asteroid);
        asteroids.push(asteroid);
      }
    }

    camera.position.z = 5;

    let animationFrame = 0;

    const animate = () => {
      if (!enabled) return;

      animationFrame = requestAnimationFrame(animate);

      stars.forEach((star) => {
        star.position.add(star.userData.velocity);

        ["x", "y"].forEach((axis) => {
          if (Math.abs(star.position[axis]) > 50) {
            star.userData.velocity[axis] *= -1;
          }
        });
      });

      asteroids.forEach((asteroid) => {
        asteroid.position.add(asteroid.userData.velocity);

        ["x", "y", "z"].forEach((axis) => {
          if (Math.abs(asteroid.position[axis]) > 50) {
            asteroid.userData.velocity[axis] *= -1;
          }
        });
      });

      renderer.render(scene, camera);
    };

    if (!enabled) {
      renderer.dispose();
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enabled) return;
      if (!mountRef.current) return;
      if (!childrenRef.current) return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      mountRef.current.style.transform = `scale(1.1) translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`;
      childrenRef.current.style.transform = `translate(-50%, -50%) translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`;
    };

    if (!enabled) {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
    } else {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [enabled, mountRef, childrenRef]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          scale: "1.1",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      <div
        ref={childrenRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SpaceAnimation;
