import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import ArSceneWeb from '../components/ar/ArSceneWeb';

const ExploreInArScreen: React.FC = () => {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.back;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [currentModelKey, setCurrentModelKey] = useState<'modelA' | 'modelB' | 'modelC' | 'modelD'>('modelA');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const Header = (
    <View style={styles.header} pointerEvents="box-none">
      <TouchableOpacity
        onPress={() => {
          // Ensure back goes to Home (MainTabs, Home tab)
          // @ts-ignore
          navigation.navigate('MainTabs', { tab: 0 });
        }}
        style={[styles.headerBtn, styles.headerLeft]}
        accessibilityLabel="Kembali ke Home"
        testID="ar-back"
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Text style={styles.headerBtnText}>{'<'} Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Explore in AR</Text>
    </View>
  );

  const ModelSwitchers = (
    <>
      <TouchableOpacity
        style={[styles.fab, styles.fabLeftTop]}
        onPress={() => setCurrentModelKey('modelA')}
        accessibilityLabel="Model A"
        testID="fab-model-a"
      >
        <Text style={styles.fabText}>A</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.fab, styles.fabLeftBottom]}
        onPress={() => setCurrentModelKey('modelB')}
        accessibilityLabel="Model B"
        testID="fab-model-b"
      >
        <Text style={styles.fabText}>B</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.fab, styles.fabRightTop]}
        onPress={() => setCurrentModelKey('modelC')}
        accessibilityLabel="Model C"
        testID="fab-model-c"
      >
        <Text style={styles.fabText}>C</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.fab, styles.fabRightBottom]}
        onPress={() => setCurrentModelKey('modelD')}
        accessibilityLabel="Model D"
        testID="fab-model-d"
      >
        <Text style={styles.fabText}>D</Text>
      </TouchableOpacity>
    </>
  );

  if (hasPermission === null) {
    return (
      <View style={styles.center}><Text style={{ color: '#fff' }}>Meminta izin kamera…</Text></View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#fff', marginBottom: 12 }}>Izin kamera ditolak</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={async () => {
          const status = await Camera.requestCameraPermission();
          setHasPermission(status === 'granted');
        }}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Coba lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={false}
          video={false}
        />
      )}
      {/* Header transparan */}
      {Header}
      {/* AR/3D overlay (WebView + Three.js) dengan gesture */}
      <ArSceneWeb modelKey={currentModelKey} />
      {/* 4 tombol melayang untuk ganti model */}
      {ModelSwitchers}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  header: {
    position: 'absolute',
    top: Platform.select({ ios: 54, android: 20 }),
    left: 0,
    right: 0,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  headerBtn: {
    position: 'absolute',
    width: 90,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLeft: { left: 12 },
  headerBtnText: { color: '#fff', fontWeight: '700' },
  headerTitle: { color: '#fff', fontWeight: '700' },

  fab: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { color: '#fff', fontWeight: '700' },
  fabLeftTop: { left: 16, top: 120 },
  fabLeftBottom: { left: 16, bottom: 120 },
  fabRightTop: { right: 16, top: 120 },
  fabRightBottom: { right: 16, bottom: 120 },

  retryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
});

export default ExploreInArScreen;
