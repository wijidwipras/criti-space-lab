const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const { resolver: { assetExts } } = defaultConfig;

const config = {
  resolver: {
    // Allow bundling of 3D model assets used by AR overlay
    assetExts: [...assetExts, 'obj', 'mtl', 'gltf', 'glb'],
  },
};
module.exports = mergeConfig(defaultConfig, config);
