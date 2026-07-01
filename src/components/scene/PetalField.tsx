import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import {
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  PlaneGeometry,
  ShaderMaterial,
  Vector3,
} from "three";
import { petalVertexShader, petalFragmentShader } from "@/lib/scene/petal-shader";
import { PETAL_COLORS } from "@/lib/scene/scene-config";

interface PetalFieldProps {
  count: number;
}

/**
 * A cloud of instanced petal quads filling the water column the camera descends
 * through. Each petal drifts perpetually on curl noise so the scene is alive even
 * when scroll is idle.
 */
const PetalField = ({ count }: PetalFieldProps) => {
  const { geometry, material } = useMemo(() => {
    const plane = new PlaneGeometry(1, 1);
    const geo = new InstancedBufferGeometry();
    geo.setIndex(plane.getIndex());
    geo.setAttribute("position", plane.getAttribute("position"));
    geo.setAttribute("uv", plane.getAttribute("uv"));

    const base = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      base[i * 3] = (Math.random() * 2 - 1) * 4.5;
      base[i * 3 + 1] = Math.random() * 11 - 6;
      base[i * 3 + 2] = (Math.random() * 2 - 1) * 4.0;
      seed[i] = Math.random();
    }
    geo.setAttribute("aBasePos", new InstancedBufferAttribute(base, 3));
    geo.setAttribute("aSeed", new InstancedBufferAttribute(seed, 1));
    geo.instanceCount = count;

    const mat = new ShaderMaterial({
      vertexShader: petalVertexShader,
      fragmentShader: petalFragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uDriftAmp: { value: 0.5 },
        uDriftFreq: { value: 0.18 },
        uDriftSpeed: { value: 0.05 },
        uOpacity: { value: 0.6 },
        uPalette: { value: PETAL_COLORS.map((c) => new Vector3(c[0], c[1], c[2])) },
      },
    });

    return { geometry: geo, material: mat };
  }, [count]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
  });

  return <mesh geometry={geometry} material={material} frustumCulled={false} />;
};

export default PetalField;
