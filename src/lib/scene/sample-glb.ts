import { BufferGeometry, Mesh, Vector3 } from "three";
import type { Mesh as ThreeMesh } from "three";
import {
  GLTFLoader,
  MeshSurfaceSampler,
  mergeBufferGeometries,
} from "three-stdlib";

/** Max dimension the sampled model is scaled to (matches the bloom/settle radius). */
const TARGET_SIZE = 2.8;

/**
 * Load a GLB and sample `count` points evenly across its surface, returned as a
 * flat Float32Array (count * 3) centred at the origin and scaled to the scene.
 * Used to build the centerpiece's "settle" morph target so the petals reassemble
 * into the model. Geometry only — materials/textures are ignored.
 */
export const sampleGlbSurface = async (
  url: string,
  count: number,
): Promise<Float32Array> => {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(url);
  gltf.scene.updateMatrixWorld(true);

  const geometries: BufferGeometry[] = [];
  gltf.scene.traverse((obj) => {
    const mesh = obj as ThreeMesh;
    if (!mesh.isMesh || !mesh.geometry) return;
    const g = mesh.geometry.clone();
    g.applyMatrix4(mesh.matrixWorld);
    const posOnly = new BufferGeometry();
    posOnly.setAttribute("position", g.getAttribute("position").clone());
    if (g.index) posOnly.setIndex(g.index.clone());
    geometries.push(posOnly.index ? posOnly.toNonIndexed() : posOnly);
    g.dispose();
  });

  if (geometries.length === 0) throw new Error("GLB contains no meshes to sample");

  const merged =
    geometries.length === 1
      ? geometries[0]
      : mergeBufferGeometries(geometries, false);
  if (!merged) throw new Error("Failed to merge GLB geometries for sampling");

  merged.computeBoundingBox();
  const box = merged.boundingBox;
  if (!box) throw new Error("GLB geometry has no bounding box");
  const center = new Vector3();
  const size = new Vector3();
  box.getCenter(center);
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = TARGET_SIZE / maxDim;

  const sampler = new MeshSurfaceSampler(new Mesh(merged)).build();
  const out = new Float32Array(count * 3);
  const p = new Vector3();
  for (let i = 0; i < count; i++) {
    sampler.sample(p);
    out[i * 3] = (p.x - center.x) * scale;
    out[i * 3 + 1] = (p.y - center.y) * scale;
    out[i * 3 + 2] = (p.z - center.z) * scale;
  }

  merged.dispose();
  return out;
};
