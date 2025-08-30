export type ModelKey = 'modelA' | 'modelB' | 'modelC' | 'modelD';

// Registry for 3D assets. Rendering is handled elsewhere.
export const MODEL_REGISTRY: Partial<Record<ModelKey, any>> = {
  modelA: require('./box.obj'),
};

