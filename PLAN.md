% AR Experiment (Android) — Implementation Plan

Dokumen ini memandu penambahan fitur eksperimen Augmented Reality (AR) berbasis React Native di Android menggunakan ViroReact (viro-community). Fitur dibuat terisolasi, tidak menyentuh kode lama (yang saat ini masih error), dan ditautkan melalui sebuah kartu (card) eksperimen di layar utama.

## Ringkasan
- Android-only: iOS di luar scope.
- Menggunakan ViroReact (viro-community) di atas ARCore.
- Menambahkan layar eksperimen AR + kartu navigasi di beranda.
- Kode lama dibiarkan apa adanya; implementasi terpisah/aman untuk dibuang.

## Tujuan & Ruang Lingkup
- Tujuan: Proof-of-Concept AR sederhana (image tracking → render 3D) di Android.
- Scope: dependensi, konfigurasi Android, scaffold scene AR, 1 layar eksperimen, 1 kartu navigasi, aset contoh, dan panduan QA manual.
- Out of scope: perbaikan kode lama, integrasi iOS, optimasi model 3D lanjut.

## Deliverables
- `src/screens/ARExperimentScreen.tsx` — layar RN untuk AR (host `ViroARSceneNavigator`).
- `src/components/ar/` — komponen scene AR (mis. `ARImageTrackingScene.tsx`).
- `src/assets/ar/` — aset contoh (gambar target + model 3D ringan).
- Rute navigasi stack: `ARExperiment`.
- Kartu/entry point di beranda untuk membuka `ARExperiment` (Android).
- Konfigurasi Android (manifest izin kamera, minSdk jika perlu).

## Prasyarat
- Android Studio + SDK dan emulator/perangkat yang mendukung ARCore.
- JDK 17 (sesuai versi RN repo ini).
- RN versi kompatibel dengan ViroReact (lihat dokumentasi viro-community untuk versi terkini).
- Koneksi internet untuk instal dependensi.

## Rencana Bertahap (Checklist)
1) Setup Dependensi & Konfigurasi Android
- [ ] Tambah paket ViroReact komunitas (lihat docs viro-community, contoh: `npm i react-viro`).
- [ ] Validasi `minSdkVersion >= 24` di `android/build.gradle`/`android/app/build.gradle`.
- [ ] Tambah izin kamera di `android/app/src/main/AndroidManifest.xml`:
  - `<uses-permission android:name="android.permission.CAMERA" />`
- [ ] Pastikan perangkat/emulator mendukung ARCore atau sediakan fallback UI.

2) Struktur Folder & Aset
- [ ] Buat folder `src/components/ar/` dan `src/assets/ar/{images,models}`.
- [ ] Tambah 1 gambar target (mis. `pug_target.jpg`) dan 1 model 3D ringan (OBJ/GLTF + tekstur).

3) Scene AR (Image Tracking → 3D Object)
- [ ] Buat `src/components/ar/ARImageTrackingScene.tsx` yang mengekspor `ViroARScene` dengan:
  - `ViroARImageMarker` + `ViroARTrackingTargets.createTargets(...)` (target mengacu ke `pug_target.jpg`).
  - `Viro3DObject` dengan `source`, `scale`, `position`, `rotation`, `animation` sederhana.
  - `ViroAmbientLight`/`ViroDirectionalLight` secukupnya.

4) Layar RN & Navigasi
- [ ] Buat `src/screens/ARExperimentScreen.tsx` yang merender `ViroARSceneNavigator` menunjuk ke `ARImageTrackingScene`.
- [ ] Tambah route `ARExperiment` di `src/navigation/` (stack navigator), Android-only guard jika diperlukan.
- [ ] Bungkus tampilan dengan UI Kitten (`Layout`) untuk konsistensi tema; AR view fullscreen.

5) Entry Point via Card (Eksperimen)
- [ ] Tambah kartu baru di layar beranda (mis. `HomeScreen.tsx` di `src/screens/`) bernama "AR Experiment (Android)".
- [ ] Klik kartu → navigasi ke route `ARExperiment`.
- [ ] Tampilkan badge "Experimental" dan cek dukungan ARCore sebelum navigasi; jika tidak didukung, tampilkan dialog/info.

6) Isolasi, Feature Flag, dan Safety
- [ ] Pastikan tidak ada perubahan di kode lama (hanya penambahan file/route/kartu baru).
- [ ] Gunakan flag sederhana (mis. konstanta di `src/state/flags.ts`) untuk mengaktifkan/menonaktifkan fitur eksperimen.

7) Verifikasi & Perawatan
- [ ] `npm run android` di perangkat/emulator yang mendukung ARCore.
- [ ] Uji: izin kamera, stabilitas tracking, interaksi dasar (drag/double-tap jika diaktifkan).
- [ ] `npm run lint` → pastikan lulus lint.
- [ ] Dokumentasikan screenshot hasil di PR.

## Detail Implementasi

### Instalasi Dependensi
> Catatan: Ikuti versi yang direkomendasikan dokumentasi viro-community untuk RN yang Anda gunakan.
- npm: `npm i react-viro`
- Jika ada langkah tambahan (Gradle settings, maven, dll.), ikuti petunjuk resmi viro-community.

### Android Manifest (izin kamera)
`android/app/src/main/AndroidManifest.xml`
```
<uses-permission android:name="android.permission.CAMERA" />
```
Pastikan juga kamera tidak dibatasi oleh fitur lain. Viro akan mengelola sesi AR menggunakan ARCore jika tersedia.

### Contoh Kerangka Scene
`src/components/ar/ARImageTrackingScene.tsx`
- Membuat target tracking:
```
ViroARTrackingTargets.createTargets({
  pug2D_img: {
    source: require('../../assets/ar/images/pug_target.jpg'),
    orientation: 'Up',
    physicalWidth: 0.12, // meter
  },
});
```
- Menggunakan marker + objek 3D:
```
<ViroARImageMarker target={'pug2D_img'}>
  <Viro3DObject
    source={require('../../assets/ar/models/pug_animated.obj')}
    resources={[/* tekstur */]}
    type="OBJ"
    position={[0, 0, 0]}
    scale={[0.1, 0.1, 0.1]}
    rotation={[0, 0, 0]}
    animation={{name: 'idle', run: true}}
  />
  <ViroAmbientLight color="#FFFFFF" intensity={1000} />
</ViroARImageMarker>
```

### Layar AR
`src/screens/ARExperimentScreen.tsx`
```
export const ARExperimentScreen = () => (
  <Layout style={{flex: 1}}>
    <ViroARSceneNavigator
      autofocus
      initialScene={{ scene: ARImageTrackingScene }}
      style={{ flex: 1 }}
    />
  </Layout>
);
```

### Navigasi
- Tambah ke stack: `ARExperiment: { component: ARExperimentScreen }`.
- Tampilkan hanya di Android jika diinginkan: `Platform.OS === 'android'`.

### Kartu Eksperimen (Home)
- Tambah komponen kartu UI Kitten (mis. `Card`) dengan judul "AR Experiment (Android)".
- Badge/Caption: "Experimental".
- OnPress: `navigation.navigate('ARExperiment')` jika perangkat mendukung ARCore; jika tidak, tampilkan alert.

### Dukungan ARCore
- Opsi sederhana: coba inisialisasi `ViroARSceneNavigator` dan tangani error/unsupported callback.
- Alternatif: gunakan deteksi dukungan ARCore via Play Services for AR (jika menambahkan util native/JS tambahan).

## QA Manual (Android)
- Buka aplikasi dan klik kartu "AR Experiment (Android)".
- Izinkan akses kamera saat diminta.
- Arahkan kamera ke gambar target (`pug_target.jpg`) → objek 3D muncul stabil di atas gambar.
- Cek performa (FPS stabil), pencahayaan, dan respons rotasi/pergerakan perangkat.
- Uji perangkat yang tidak mendukung ARCore → pastikan fallback/alert muncul.

## Risiko & Mitigasi
- Kompatibilitas ARCore perangkat: sediakan fallback dan komunikasi UX yang jelas.
- Ukuran aset: gunakan model/tekstur ringan untuk menjaga ukuran APK dan memori.
- Konflik Gradle/RN: ikuti versi yang disarankan docs; jika perlu, kunci versi.
- Hermes/ProGuard: verifikasi build release; matikan sementara jika ada crash dan laporkan di PR.

## Estimasi Waktu
- Setup & konfigurasi: 0.5–1 hari.
- Scaffold scene + layar + navigasi: 0.5 hari.
- Kartu UI + fallback + QA: 0.5 hari.
- Total: ~1.5–2 hari (tergantung kompleksitas aset & lingkungan).

---

# Card Baru — AR Experiment (Android)
- Title: AR Experiment (Android) — ViroReact PoC
- Type: Feature (Experimental)
- Description:
  - Tambah PoC AR (image tracking → 3D object) menggunakan ViroReact untuk Android saja. Fitur terisolasi, tidak menyentuh kode lama yang masih error. Navigasi melalui kartu baru di beranda.
- Acceptance Criteria:
  - Terdapat layar `ARExperiment` yang merender `ViroARSceneNavigator` dengan image tracking.
  - Kartu "AR Experiment (Android)" muncul di beranda dan menavigasi ke layar tersebut.
  - Jika perangkat tidak mendukung ARCore, tampilkan pesan dukungan tidak tersedia.
  - Build Android debug berjalan (`npm run android`) dan lint lulus.
- Tasks:
  1. Install dan konfigurasi `react-viro` (komunitas) untuk Android.
  2. Tambahkan izin kamera di AndroidManifest.
  3. Tambahkan aset contoh (target image + model 3D).
  4. Buat `ARImageTrackingScene.tsx` dan `ARExperimentScreen.tsx`.
  5. Tambah route `ARExperiment` di navigasi.
  6. Tambah kartu "AR Experiment (Android)" di beranda (UI Kitten).
  7. Tambah fallback ARCore unsupported.
  8. QA manual dan dokumentasikan screenshot.
- Notes:
  - Jangan ubah/bersihkan kode lama pada tugas ini.
  - Screenshot hasil + langkah verifikasi wajib di PR.

---

# Prompt Diperbaiki (untuk Issue/PR)
"Mohon tambahkan fitur eksperimen AR untuk Android menggunakan ViroReact (viro-community) tanpa mengubah kode lama yang saat ini masih error. Buat satu layar baru `ARExperiment` yang menampilkan scene AR (image tracking → render objek 3D), dan tampilkan sebuah kartu \"AR Experiment (Android)\" di beranda untuk menavigasi ke layar tersebut. Sertakan fallback jika perangkat tidak mendukung ARCore, serta pastikan lint lulus. Fokus hanya Android pada tahap ini."

Alternatif ringkas (commit/PR title):
"[add] android-only AR experiment via ViroReact (isolated)"

