import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Box3, Group, Mesh, Vector3 } from "three";
import type { Material } from "three";
import { stageProgressFromP, smoothstep } from "@/lib/scene/beats";

/** Base-aware URL for the brain-flower model shown at the settle beat. */
const MODEL_URL = `${import.meta.env.BASE_URL}models/brain-flower.glb`;
useGLTF.preload(MODEL_URL);

/** Max dimension the model is scaled to (matches the bloom/settle footprint). */
const TARGET_SIZE = 2.8;

interface CenterpieceModelProps {
  progress: MutableRefObject<number>;
}

/**
 * The actual brain-flower mesh, revealed at the final beat as the petal particles
 * dissolve. Rides the camera's look-at point to stay framed, fades in over beats
 * 4→5, and turns slowly so it feels alive.
 */
const CenterpieceModel = ({ progress }: CenterpieceModelProps) => {
  const { scene } = useGLTF(MODEL_URL);
  const camera = useThree((s) => s.camera);
  const outer = useRef<Group>(null);
  const spin = useRef<Group>(null);

  // Center + scale the model once, and make its materials fade-able.
  const { object, scale, offset, materials } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new Box3().setFromObject(clone);
    const center = new Vector3();
    const size = new Vector3();
    box.getCenter(center);
    box.getSize(size);
    const s = TARGET_SIZE / (Math.max(size.x, size.y, size.z) || 1);
    const mats: Material[] = [];
    clone.traverse((obj) => {
      const mesh = obj as Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as Material | Material[];
      for (const m of Array.isArray(mat) ? mat : [mat]) {
        m.transparent = true;
        m.depthWrite = false;
        mats.push(m);
      }
    });
    return { object: clone, scale: s, offset: center, materials: mats };
  }, [scene]);

  useLayoutEffect(() => {
    return () => {
      for (const m of materials) m.dispose();
    };
  }, [materials]);

  useFrame((_, delta) => {
    const g = outer.current;
    if (!g) return;
    g.position.set(0, camera.position.y - 1.5, 0);

    const sp = stageProgressFromP(progress.current);
    const opacity = smoothstep(4.3, 5.0, sp);
    g.visible = opacity > 0.01;
    for (const m of materials) m.opacity = opacity;

    if (spin.current) spin.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={outer}>
      <group ref={spin} scale={scale}>
        <primitive object={object} position={[-offset.x, -offset.y, -offset.z]} />
      </group>
    </group>
  );
};

export default CenterpieceModel;
