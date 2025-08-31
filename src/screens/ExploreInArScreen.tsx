import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
// AR overlay sementara dinonaktifkan saat fokus validasi kamera
// import ArSceneWeb from '../components/ar/ArSceneWeb';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

const ExploreInArScreen: React.FC = () => {
  const navigation = useNavigation();
  const backDevice = useCameraDevice('back');
  const frontDevice = useCameraDevice('front');
  const device = backDevice ?? frontDevice ?? null;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  // AR overlay ditunda; state model dinonaktifkan agar tidak memicu lint error
  // const [currentModelKey, setCurrentModelKey] = useState<'modelA' | 'modelB' | 'modelC' | 'modelD'>('modelA');
  const ENABLE_AR_OVERLAY = false;
  const isFocused = useIsFocused();
  const [permStatus, setPermStatus] = useState<string>('unknown');

  useEffect(() => {
    (async () => {
      try {
        const current = await (Camera as any).getCameraPermissionStatus?.();
        if (typeof current === 'string') setPermStatus(current);
      } catch {}
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted' || (status as any) === 'authorized');
      try {
        const after = await (Camera as any).getCameraPermissionStatus?.();
        if (typeof after === 'string') setPermStatus(after);
      } catch {}
    })();
  }, []);

  const Header = (
    <View style={styles.header} pointerEvents="box-none">
      <View style={styles.headerRow} pointerEvents="box-none">
        <TouchableOpacity
          onPress={() => {
            // Back behavior: goBack if possible, else navigate to MainTabs (Home)
            // @ts-ignore
            if (typeof (navigation as any)?.canGoBack === 'function' && (navigation as any).canGoBack()) {
              // @ts-ignore
              (navigation as any).goBack();
            } else {
              // @ts-ignore
              (navigation as any).navigate('MainTabs', { tab: 0 });
            }
          }}
          style={styles.backBtn}
          accessibilityLabel="Kembali"
          testID="ar-back"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ChevronLeftIcon size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} accessibilityLabel="Judul Explore in AR" testID="ar-title">Explore in AR</Text>
      </View>
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
        <Text style={{ color: '#fff', marginBottom: 12 }}>Izin kamera ditolak ({permStatus})</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={async () => {
          const status = await Camera.requestCameraPermission();
          setHasPermission(status === 'granted' || (status as any) === 'authorized');
        }}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Coba lagi</Text>
        </TouchableOpacity>
        <View style={{ height: 8 }} />
        <TouchableOpacity style={styles.retryBtn} onPress={async () => {
          try { await Linking.openSettings(); } catch {}
        }}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Buka Pengaturan</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {device ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={Boolean(isFocused && hasPermission && device)}
          photo={false}
          video={false}
          onError={(e) => {
            console.warn('Camera error', e?.nativeEvent || e);
          }}
        />
      ) : (
        <View style={styles.center}><Text style={{ color: '#fff' }}>Menyiapkan kamera…</Text></View>
      )}
      {/* Header transparan */}
      {Header}
      {/* Debug badge: status permission & device yang aktif */}
      <View style={styles.debugBadge} pointerEvents="none">
        <Text style={styles.debugText}>
          {`perm:${permStatus} | focus:${isFocused ? '1' : '0'} | dev:${device ? `${device.position}/${device.id}` : 'none'}`}
        </Text>
      </View>
      {/* AR/3D overlay dinonaktifkan sementara untuk fokus validasi kamera */}
      {ENABLE_AR_OVERLAY ? ModelSwitchers : null}
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
    paddingHorizontal: 12,
    zIndex: 1000,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 12,
  },

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
  debugBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 6,
  },
  debugText: { color: '#fff', fontSize: 12 },
});

export default ExploreInArScreen;
