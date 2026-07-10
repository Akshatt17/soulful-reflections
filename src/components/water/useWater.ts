import { createContext, useContext } from "react";

export interface WaterApi {
  /** Spawn a circular ripple. x/y are 0..1 with y pointing up (UV space). */
  spawnRipple: (x: number, y: number, strength?: number) => void;
}

const noop: WaterApi = { spawnRipple: () => undefined };

export const WaterContext = createContext<WaterApi>(noop);

export const useWater = (): WaterApi => useContext(WaterContext);
