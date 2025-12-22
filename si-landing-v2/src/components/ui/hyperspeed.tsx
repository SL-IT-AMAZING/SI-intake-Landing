import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';

interface Colors {
  roadColor: number;
  islandColor: number;
  background: number;
  shoulderLines: number;
  brokenLines: number;
  leftCars: [number, number, number];
  rightCars: [number, number, number];
  sticks: number;
}

interface Distortion {
  uniforms: {
    uDistortionX?: { value: number };
    uDistortionY?: { value: number };
  };
  getDistortion(p: THREE.Vector4): THREE.Vector4;
  getJS(x: number, y: number): { x: number; y: number };
  vertexShader?: string;
  fragmentShader?: string;
}

interface HyperspeedOptions {
  onSpeedUp?: (ev: MouseEvent | TouchEvent) => void;
  onSlowDown?: (ev: MouseEvent | TouchEvent) => void;
  distortion?: string | Distortion;
  length: number;
  roadWidth: number;
  islandWidth: number;
  lanesPerRoad: number;
  fov: number;
  fovSpeedUp: number;
  speedUp: number;
  carLightsFade: number;
  totalSideLightSticks: number;
  lightPairsPerRoadWay: number;
  shoulderLinesWidthPercentage: number;
  brokenLinesWidthPercentage: number;
  brokenLinesLengthPercentage: number;
  lightStickWidth: number[];
  lightStickHeight: number[];
  movingAwaySpeed: number[];
  movingCloserSpeed: number[];
  carLightsLength: number[];
  carLightsRadius: number[];
  carWidthPercentage: number[];
  carShiftX: number[];
  carFloorSeparation: number[];
  colors: Colors;
  isHyper?: boolean;
}

const distortion_uniforms = {
  uDistortionX: { value: 0 },
  uDistortionY: { value: 0 }
};

const distortion_vertex_shader = `
#define PI 3.14159265358979
  uniform float uDistortionX;
  uniform float uDistortionY;

    float nsin(float val){
    return sin(val) * 0.5+0.5;
    }

    vec3 getDistortion(float progress){
        progress = clamp(progress, 0.,1.);
        float xAmp = uDistortionX;
        float yAmp = uDistortionY;
        return vec3(
            xAmp * nsin(progress* PI * 8. ) ,
            yAmp * nsin(progress * PI *16. ) ,
            0.
        );
    }
`;

const distortion_fragment_shader = `
#define PI 3.14159265358979
  uniform float uDistortionX;
  uniform float uDistortionY;

    float nsin(float val){
    return sin(val) * 0.5+0.5;
    }

    vec3 getDistortion(float progress){
        progress = clamp(progress, 0.,1.);
        float xAmp = uDistortionX;
        float yAmp = uDistortionY;
        return vec3(
            xAmp * nsin(progress* PI * 8. ) ,
            yAmp * nsin(progress * PI *16. ) ,
            0.
        );
    }
`;

const distortions: Record<string, Distortion> = {
  turbulent: {
    uniforms: distortion_uniforms,
    vertexShader: distortion_vertex_shader,
    fragmentShader: distortion_fragment_shader,
    getDistortion(progress: THREE.Vector4) {
      const uDistortionX = distortion_uniforms.uDistortionX.value;
      const uDistortionY = distortion_uniforms.uDistortionY.value;
      const nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;
      const p = Math.min(Math.max(progress.x, 0), 1);
      const xAmp = uDistortionX;
      const yAmp = uDistortionY;
      return new THREE.Vector4(
        xAmp * nsin(p * Math.PI * 8),
        yAmp * nsin(p * Math.PI * 16),
        0,
        0
      );
    },
    getJS(x: number, y: number) {
      const uDistortionX = distortion_uniforms.uDistortionX.value;
      const uDistortionY = distortion_uniforms.uDistortionY.value;
      const nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;
      return {
        x: uDistortionX * nsin(x * Math.PI * 8),
        y: uDistortionY * nsin(y * Math.PI * 16)
      };
    }
  }
};

export interface HyperspeedProps {
  className?: string;
}

export function Hyperspeed({ className = '' }: HyperspeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const options: HyperspeedOptions = {
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5],
      lightStickHeight: [1.3, 1.7],
      movingAwaySpeed: [60, 80],
      movingCloserSpeed: [-120, -160],
      carLightsLength: [400 * 0.03, 400 * 0.2],
      carLightsRadius: [0.05, 0.14],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.8, 0.8],
      carFloorSeparation: [0, 5],
      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0xFFFFFF,
        brokenLines: 0xFFFFFF,
        leftCars: [0x8B5CF6, 0xA855F7, 0xC084FC],
        rightCars: [0x17DB4E, 0x10B981, 0x34D399],
        sticks: 0x8B5CF6
      },
      distortion: 'turbulent'
    };

    const w = containerRef.current.offsetWidth;
    const h = containerRef.current.offsetHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(options.fov, w / h, 0.1, options.length * 2);
    camera.position.z = -5;
    camera.position.y = 8;
    camera.rotation.x = -Math.PI / 20;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(w, h),
      1.5,
      0.4,
      0.85
    );
    composer.addPass(bloomPass);

    const smaaPass = new SMAAPass(w, h);
    composer.addPass(smaaPass);
    composerRef.current = composer;

    // Create road with distortion
    const roadGeometry = new THREE.PlaneGeometry(
      options.islandWidth + options.roadWidth * 2,
      options.length,
      20,
      200
    );
    const roadMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(options.colors.roadColor) },
        uTime: { value: 0 },
        uDistortionX: { value: 0.5 },
        uDistortionY: { value: 0.8 }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uDistortionX;
        uniform float uDistortionY;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 pos = position;

          float progress = (pos.y + ${options.length / 2}.0) / ${options.length}.0;
          float xDisplacement = sin(progress * 3.14159 * 8.0 + uTime * 0.5) * uDistortionX;
          float yDisplacement = sin(progress * 3.14159 * 16.0 + uTime * 0.3) * uDistortionY;

          pos.x += xDisplacement;
          pos.y += yDisplacement;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec2 vUv;

        void main() {
          gl_FragColor = vec4(uColor, 1.0);
        }
      `
    });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.z = -options.length / 2;
    scene.add(road);
    (road as any).material = roadMaterial;

    // Create island with distortion
    const islandGeometry = new THREE.PlaneGeometry(
      options.islandWidth,
      options.length,
      20,
      200
    );
    const islandMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(options.colors.islandColor) },
        uTime: { value: 0 },
        uDistortionX: { value: 0.5 },
        uDistortionY: { value: 0.8 }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uDistortionX;
        uniform float uDistortionY;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 pos = position;

          float progress = (pos.y + ${options.length / 2}.0) / ${options.length}.0;
          float xDisplacement = sin(progress * 3.14159 * 8.0 + uTime * 0.5) * uDistortionX;
          float yDisplacement = sin(progress * 3.14159 * 16.0 + uTime * 0.3) * uDistortionY;

          pos.x += xDisplacement;
          pos.y += yDisplacement;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec2 vUv;

        void main() {
          gl_FragColor = vec4(uColor, 1.0);
        }
      `
    });
    const island = new THREE.Mesh(islandGeometry, islandMaterial);
    island.rotation.x = -Math.PI / 2;
    island.position.z = -options.length / 2;
    island.position.y = 0.01;
    scene.add(island);
    (island as any).material = islandMaterial;

    // Create car lights
    const leftCarLights = createCarLights(
      options,
      { x: -options.roadWidth / 2 - options.islandWidth / 2, y: 0, z: 0 },
      options.colors.leftCars,
      options.movingCloserSpeed
    );
    scene.add(leftCarLights);

    const rightCarLights = createCarLights(
      options,
      { x: options.roadWidth / 2 + options.islandWidth / 2, y: 0, z: 0 },
      options.colors.rightCars,
      options.movingAwaySpeed
    );
    scene.add(rightCarLights);

    // Create light sticks
    const sticks = createLightSticks(options);
    scene.add(sticks);

    // Animation
    const clock = new THREE.Clock();
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Update distortion uniforms
      if (roadMaterial.uniforms.uTime) {
        roadMaterial.uniforms.uTime.value = elapsed;
      }
      if (islandMaterial.uniforms.uTime) {
        islandMaterial.uniforms.uTime.value = elapsed;
      }

      // Update car lights
      leftCarLights.children.forEach((mesh) => {
        const speed = (mesh as any).speed || -100;
        mesh.position.z += speed * delta;
        if (mesh.position.z < -options.length / 2) {
          mesh.position.z = options.length / 2;
        }
      });

      rightCarLights.children.forEach((mesh) => {
        const speed = (mesh as any).speed || 70;
        mesh.position.z += speed * delta;
        if (mesh.position.z > options.length / 2) {
          mesh.position.z = -options.length / 2;
        }
      });

      composerRef.current?.render();
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      renderer.dispose();
      composer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}

function createCarLights(
  options: HyperspeedOptions,
  position: { x: number; y: number; z: number },
  colors: [number, number, number],
  speedRange: number[]
): THREE.Group {
  const group = new THREE.Group();
  group.position.set(position.x, position.y, position.z);

  const count = options.lightPairsPerRoadWay;
  for (let i = 0; i < count; i++) {
    const laneIndex = Math.floor(Math.random() * options.lanesPerRoad);
    const laneWidth = options.roadWidth / options.lanesPerRoad;
    const xOffset = (laneIndex - (options.lanesPerRoad - 1) / 2) * laneWidth;

    const length =
      options.carLightsLength[0] +
      Math.random() * (options.carLightsLength[1] - options.carLightsLength[0]);
    const radius =
      options.carLightsRadius[0] +
      Math.random() * (options.carLightsRadius[1] - options.carLightsRadius[0]);

    const geometry = new THREE.CylinderGeometry(radius, radius, length, 8);
    const colorIndex = Math.floor(Math.random() * colors.length);
    const material = new THREE.MeshBasicMaterial({
      color: colors[colorIndex]
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = xOffset + (Math.random() - 0.5) * laneWidth * 0.5;
    mesh.position.y = options.carFloorSeparation[0] + Math.random() *
      (options.carFloorSeparation[1] - options.carFloorSeparation[0]);
    mesh.position.z = (Math.random() - 0.5) * options.length;
    mesh.rotation.x = Math.PI / 2;

    (mesh as any).speed = speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]);

    group.add(mesh);
  }

  return group;
}

function createLightSticks(options: HyperspeedOptions): THREE.Group {
  const group = new THREE.Group();

  const stickWidth =
    options.lightStickWidth[0] +
    Math.random() * (options.lightStickWidth[1] - options.lightStickWidth[0]);
  const stickHeight =
    options.lightStickHeight[0] +
    Math.random() * (options.lightStickHeight[1] - options.lightStickHeight[0]);

  const geometry = new THREE.BoxGeometry(stickWidth, stickHeight, stickWidth);
  const material = new THREE.MeshBasicMaterial({
    color: options.colors.sticks
  });

  for (let i = 0; i < options.totalSideLightSticks; i++) {
    const zPos = (i / options.totalSideLightSticks) * options.length - options.length / 2;

    // Left side
    const leftStick = new THREE.Mesh(geometry, material);
    leftStick.position.set(
      -(options.roadWidth / 2 + options.islandWidth / 2) - options.roadWidth / 2 - 1,
      stickHeight / 2,
      zPos
    );
    group.add(leftStick);

    // Right side
    const rightStick = new THREE.Mesh(geometry, material);
    rightStick.position.set(
      options.roadWidth / 2 + options.islandWidth / 2 + options.roadWidth / 2 + 1,
      stickHeight / 2,
      zPos
    );
    group.add(rightStick);
  }

  return group;
}
