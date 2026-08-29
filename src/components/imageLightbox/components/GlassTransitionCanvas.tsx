"use client";

import { cn } from "@/lib/cn";
import { animate } from "motion/react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  GLASS_TRANSITION_DURATION_S,
  GLASS_UNIFORM_DEFAULTS,
} from "../constants/imageLightbox.constants";
import {
  GLASS_FRAGMENT_SHADER,
  GLASS_VERTEX_SHADER,
} from "../constants/glassShader";
import type { GlassTransitionCanvasProps } from "../types/imageLightbox.types";

const loadTexture = (
  loader: THREE.TextureLoader,
  src: string,
): Promise<THREE.Texture> =>
  new Promise((resolve, reject) => {
    loader.load(
      src,
      (texture) => {
        texture.minFilter = texture.magFilter = THREE.LinearFilter;
        texture.userData.size = new THREE.Vector2(
          texture.image.width,
          texture.image.height,
        );
        resolve(texture);
      },
      undefined,
      reject,
    );
  });

interface SceneRefs {
  material: THREE.ShaderMaterial;
  loader: THREE.TextureLoader;
  currentSrc: string | null;
  stopTween: (() => void) | null;
}

/** Displays `src` on a Three.js quad, crossfading to it with the glass
 *  refraction shader whenever it changes instead of cutting directly. Sized
 *  to whatever box its wrapping element occupies, not the viewport. */
const GlassTransitionCanvas: React.FC<GlassTransitionCanvasProps> = ({
  src,
  alt,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<SceneRefs | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrame = 0;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: null },
        uTexture2: { value: null },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTexture1Size: { value: new THREE.Vector2(1, 1) },
        uTexture2Size: { value: new THREE.Vector2(1, 1) },
        uRefractionStrength: {
          value: GLASS_UNIFORM_DEFAULTS.refractionStrength,
        },
        uChromaticAberration: {
          value: GLASS_UNIFORM_DEFAULTS.chromaticAberration,
        },
        uBubbleClarity: { value: GLASS_UNIFORM_DEFAULTS.bubbleClarity },
        uEdgeGlow: { value: GLASS_UNIFORM_DEFAULTS.edgeGlow },
        uLiquidFlow: { value: GLASS_UNIFORM_DEFAULTS.liquidFlow },
      },
      vertexShader: GLASS_VERTEX_SHADER,
      fragmentShader: GLASS_FRAGMENT_SHADER,
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    sceneRef.current = {
      material,
      loader: new THREE.TextureLoader(),
      currentSrc: null,
      stopTween: null,
    };

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      renderer.setSize(clientWidth, clientHeight, false);
      material.uniforms.uResolution.value.set(clientWidth, clientHeight);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const render = () => {
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      sceneRef.current?.stopTween?.();
      sceneRef.current = null;
      resizeObserver.disconnect();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || scene.currentSrc === src) return;

    let isCancelled = false;
    const { material, loader } = scene;

    loadTexture(loader, src).then((texture) => {
      if (isCancelled || !sceneRef.current) return;

      if (scene.currentSrc === null) {
        material.uniforms.uTexture1.value = texture;
        material.uniforms.uTexture2.value = texture;
        material.uniforms.uTexture1Size.value = texture.userData.size;
        material.uniforms.uTexture2Size.value = texture.userData.size;
        scene.currentSrc = src;
        return;
      }

      material.uniforms.uTexture2.value = texture;
      material.uniforms.uTexture2Size.value = texture.userData.size;
      material.uniforms.uProgress.value = 0;

      scene.stopTween?.();
      const controls = animate(0, 1, {
        duration: GLASS_TRANSITION_DURATION_S,
        ease: "easeInOut",
        onUpdate: (value) => {
          material.uniforms.uProgress.value = value;
        },
        onComplete: () => {
          material.uniforms.uTexture1.value = texture;
          material.uniforms.uTexture1Size.value = texture.userData.size;
          material.uniforms.uProgress.value = 0;
          scene.currentSrc = src;
        },
      });
      scene.stopTween = () => controls.stop();
    });

    return () => {
      isCancelled = true;
    };
  }, [src]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className="size-full"
      />
    </div>
  );
};

export default GlassTransitionCanvas;
