import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
} from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';

type Props = {
  modelKey: string;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const ArSceneWeb: React.FC<Props> = ({ modelKey }) => {
  const webRef = useRef<WebView>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const onPanGestureEvent = (e: any) => {
    const { translationX, translationY } = e.nativeEvent;
    setTranslate({ x: translationX, y: translationY });
  };

  const onPinchGestureEvent = (e: any) => {
    const { scale: s } = e.nativeEvent;
    setScale(clamp(s, 0.2, 3));
  };

  const onRotateGestureEvent = (e: any) => {
    const { rotation: r } = e.nativeEvent;
    setRotation(r);
  };

  useEffect(() => {
    // Send transforms to WebView renderer
    const message = JSON.stringify({ type: 'transform', payload: { scale, rotation, translate } });
    webRef.current?.postMessage(message);
  }, [scale, rotation, translate]);

  // Resolve local asset URI for selected model
  const model = useMemo(() => {
    try {
      const { MODEL_REGISTRY } = require('../../assets/models');
      const asset = MODEL_REGISTRY?.[modelKey as any];
      if (asset) {
        const src = (Image as any).resolveAssetSource
          ? (Image as any).resolveAssetSource(asset)
          : null;
        const uri = src?.uri || null;
        // Heuristic: pick format from filename extension
        const format = typeof src?.uri === 'string' && src.uri.toLowerCase().endsWith('.glb') ? 'glb' : 'obj';
        return { uri, format } as { uri: string | null; format: 'glb' | 'obj' };
      }
    } catch (e) {}
    return { uri: null, format: 'obj' as const };
  }, [modelKey]);

  // Notify WebView to load model when modelUri changes
  useEffect(() => {
    if (model?.uri && webRef.current) {
      const msg = JSON.stringify({ type: 'loadModel', payload: { uri: model.uri, format: model.format } });
      webRef.current.postMessage(msg);
    }
  }, [model]);

  const html = useMemo(() => {
    // Basic Three.js scene with transparent background
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <style>
      html, body { margin: 0; padding: 0; overflow: hidden; background: transparent; }
      canvas { display: block; }
    </style>
  </head>
  <body>
    <!-- NOTE: CDN used for development; inline/local fallback can replace these later. -->
    <script src="https://unpkg.com/three@0.158.0/build/three.min.js"></script>
    <script src="https://unpkg.com/three@0.158.0/examples/js/loaders/OBJLoader.js"></script>
    <script src="https://unpkg.com/three@0.158.0/examples/js/loaders/GLTFLoader.js"></script>
    <script>
      (function () {
        const DPR = Math.min(2, window.devicePixelRatio || 1);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(DPR);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        document.body.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
        camera.position.z = 2;

        const ambient = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambient);
        const dir = new THREE.DirectionalLight(0xffffff, 0.6);
        dir.position.set(2, 2, 3);
        scene.add(dir);

        const group = new THREE.Group();
        scene.add(group);

        // Simple cube placeholder; will be replaced when model loads
        const geo = new THREE.BoxGeometry(1, 1, 1);
        const mat = new THREE.MeshStandardMaterial({ color: 0x44aa88, metalness: 0.1, roughness: 0.6 });
        const placeholder = new THREE.Mesh(geo, mat);
        group.add(placeholder);

        function onResize() {
          const w = window.innerWidth; const h = window.innerHeight;
          renderer.setSize(w, h);
          camera.aspect = w / h; camera.updateProjectionMatrix();
        }
        window.addEventListener('resize', onResize);

        // Transform coming from React Native gestures
        function applyTransform(msg) {
          const { scale = 1, rotation = 0, translate = {x:0, y:0} } = msg || {};
          // Map pixel translation to NDC-ish range; assume ~200px is 1 world unit
          const k = 1 / 200;
          group.position.x = translate.x * k;
          group.position.y = -translate.y * k;
          group.rotation.z = rotation;
          group.scale.setScalar(Math.max(0.2, Math.min(3, scale)));
        }

        function clearGroup() {
          for (let i = group.children.length - 1; i >= 0; i--) {
            const child = group.children[i];
            group.remove(child);
            if (child.geometry) child.geometry.dispose?.();
            if (child.material) {
              const m = child.material;
              if (Array.isArray(m)) m.forEach(mm => mm.dispose?.());
              else m.dispose?.();
            }
          }
        }

        function loadOBJ(url) {
          try {
            const loader = new THREE.OBJLoader();
            if (loader.setCrossOrigin) loader.setCrossOrigin('anonymous');
            loader.load(
              url,
              function (obj) {
                clearGroup();
                group.add(obj);
                // Attempt to normalize scale
                const box = new THREE.Box3().setFromObject(obj);
                const size = new THREE.Vector3();
                box.getSize(size);
                const maxDim = Math.max(size.x, size.y, size.z) || 1;
                const target = 1.2; // world units
                const s = target / maxDim;
                obj.scale.setScalar(s);
                // Center
                const center = new THREE.Vector3();
                box.getCenter(center);
                obj.position.sub(center);
              },
              undefined,
              function (err) {
                // keep placeholder on failure
              }
            );
          } catch (e) {
            // ignore
          }
        }

        function loadGLB(url) {
          try {
            const loader = new THREE.GLTFLoader();
            loader.load(
              url,
              function (gltf) {
                clearGroup();
                const obj = gltf.scene || gltf.scenes?.[0];
                if (!obj) return;
                group.add(obj);
                // Normalize scale and center
                const box = new THREE.Box3().setFromObject(obj);
                const size = new THREE.Vector3();
                box.getSize(size);
                const maxDim = Math.max(size.x, size.y, size.z) || 1;
                const target = 1.2;
                const s = target / maxDim;
                obj.scale.setScalar(s);
                const center = new THREE.Vector3();
                box.getCenter(center);
                obj.position.sub(center);
              },
              undefined,
              function (err) {
                // keep placeholder on failure
              }
            );
          } catch (e) {}
        }

        // Message bridge
        window.document.addEventListener('message', function (e) {
          try {
            const data = JSON.parse(e.data);
            if (data && data.type === 'transform') {
              applyTransform(data.payload);
            } else if (data && data.type === 'loadModel' && data.payload && data.payload.uri) {
              if (data.payload.format === 'glb') loadGLB(data.payload.uri); else loadOBJ(data.payload.uri);
            }
          } catch (err) {}
        });

        // Android postMessage bridge
        window.addEventListener('message', function (e) {
          try {
            const data = JSON.parse(e.data);
            if (data && data.type === 'transform') {
              applyTransform(data.payload);
            } else if (data && data.type === 'loadModel' && data.payload && data.payload.uri) {
              if (data.payload.format === 'glb') loadGLB(data.payload.uri); else loadOBJ(data.payload.uri);
            }
          } catch (err) {}
        });

        function animate() {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        }
        animate();
      })();
    </script>
  </body>
  </html>`;
  }, []);

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill} pointerEvents="auto">
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <RotationGestureHandler onGestureEvent={onRotateGestureEvent}>
          <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
            {/* Wrap WebView in a native View so gesture handlers receive a proper React element */}
            <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
              {/* WebView must be transparent and not capture touches so gestures work */}
              <WebView
                ref={webRef}
                originWhitelist={["*"]}
                source={{ html }}
                style={[StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]}
                javaScriptEnabled
                domStorageEnabled
                allowFileAccess
                allowFileAccessFromFileURLs
                allowingReadAccessToURL="*"
                androidHardwareAccelerationDisabled={false}
                automaticallyAdjustContentInsets={false}
                pointerEvents="none"
              />
            </View>
          </PinchGestureHandler>
        </RotationGestureHandler>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ArSceneWeb;
