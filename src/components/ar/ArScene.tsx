import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
} from 'react-native-gesture-handler';

type Props = {
  modelKey: string;
};

const ArScene: React.FC<Props> = ({ modelKey }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  // Map model keys to asset registry (OBJ/GLB/etc.)
  const { MODEL_REGISTRY } = require('../../assets/models');

  const onPanGestureEvent = (e: any) => {
    const { translationX, translationY } = e.nativeEvent;
    setTranslate({ x: translationX, y: translationY });
  };

  const onPinchGestureEvent = (e: any) => {
    const { scale: s } = e.nativeEvent;
    setScale(Math.max(0.2, Math.min(3, s)));
  };

  const onRotateGestureEvent = (e: any) => {
    const { rotation: r } = e.nativeEvent;
    setRotation(r);
  };

  const modelLabel = useMemo(() => {
    switch (modelKey) {
      case 'modelA':
        // Indicate that modelA uses local OBJ asset
        return 'box.obj';
      case 'modelB':
        return 'Model B';
      case 'modelC':
        return 'Model C';
      case 'modelD':
        return 'Model D';
      default:
        return 'Model';
    }
  }, [modelKey]);

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill} pointerEvents="auto">
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <RotationGestureHandler onGestureEvent={onRotateGestureEvent}>
          <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
            <View style={StyleSheet.absoluteFill}>
              <View
                style={[
                  styles.object,
                  {
                    transform: [
                      { translateX: translate.x },
                      { translateY: translate.y },
                      { rotate: `${rotation}rad` },
                      { scale },
                    ],
                  },
                ]}
                accessibilityLabel="3D object placeholder"
              >
                <Text style={styles.objectText}>{modelLabel}</Text>
                {/* Ensure bundler registers the asset when modelA is selected */}
                {modelKey === 'modelA' && MODEL_REGISTRY.modelA ? (
                  <View accessibilityLabel="box.obj-registered" />
                ) : null}
              </View>
            </View>
          </PinchGestureHandler>
        </RotationGestureHandler>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  object: {
    position: 'absolute',
    top: '40%',
    left: '25%',
    width: 180,
    height: 180,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  objectText: { color: '#fff', fontWeight: '700' },
});

export default ArScene;
