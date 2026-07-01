import { EffectComposer, Bloom, Vignette, DepthOfField } from "@react-three/postprocessing";

interface PostFXProps {
  /** Depth of field is expensive — off on the mobile tier. */
  dof: boolean;
}

/**
 * Soft, premium post-processing: a gentle bloom so light motes glow, a light
 * vignette to focus the centre, and (desktop only) a shallow depth of field for
 * dreamy depth. Kept subtle — the mood is serene, not cinematic-heavy.
 */
const PostFX = ({ dof }: PostFXProps) => (
  <EffectComposer disableNormalPass>
    <Bloom
      intensity={0.32}
      luminanceThreshold={0.85}
      luminanceSmoothing={0.2}
      radius={0.5}
      mipmapBlur
    />
    {dof ? (
      <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={1.3} />
    ) : (
      <></>
    )}
    <Vignette offset={0.3} darkness={0.45} />
  </EffectComposer>
);

export default PostFX;
