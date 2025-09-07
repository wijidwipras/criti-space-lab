# Slicing UI Checklist

- [ ] Node/npm sesuai requirement proyek; dependencies terpasang (`npm i`).
- [ ] Metro bundler berjalan (`npm start`).

## Theme & Providers
- [ ] `ApplicationProvider` membungkus app dengan tema Eva.
- [ ] `IconRegistry` + `EvaIconsPack` tersedia jika ikon digunakan.
- [ ] Mapping/tema kustom di `src/theme/` tidak ditimpa.

## Components (Atoms)
- [ ] `Text` memiliki varian: heading, subtitle, body, caption.
- [ ] `Button` memiliki varian: primary, ghost, outline.
- [ ] `Input` mendukung status, error, dan helper text (jika ada).
- [ ] `Spacer` berfungsi (horizontal/vertical, ukuran konsisten token spacing).
- [ ] Ikuti gaya TypeScript: 2 spasi, single quotes, trailing commas.

## Components (Molecules)
- [ ] `AppHeader` menampilkan title; aksi back opsional; actions konsisten.
- [ ] `Card`, `ListItem`, `FormField`, `Chip`, `Toolbar` sesuai kebutuhan fitur.

## Components (Organisms)
- [ ] `ListView` memakai `FlatList` dengan `keyExtractor` dan memoized renderer.
- [ ] `EmptyState`, `ErrorState`, `ConfirmDialog`, `ModalSheet` tersedia bila diperlukan.

## Screens
- [ ] `HomeScreen` tersusun dari atoms/molecules, layout dan spacing konsisten.
- [ ] Setiap layar mendukung state: loading, data, empty, error.
- [ ] Aksesibilitas dasar: `accessibilityLabel`, `testID`, area sentuh >= 44x44dp.

## Daftar Screen & Status
- Legenda status:
  - `[ok]` selesai
  - `[on-progress]` sedang dikerjakan
  - `[ ]` belum dikerjakan

- [ok] SplashScreen
- [ok] LoginScreen
- [ok] HomeScreen
- [on-progress] ExploreInArScreen
- [ ] TutorialPenggunaanScreen
- [ ] ProfileScreen
- [ ] GeogebraLabScreen
- [ ] ProblemChallengeScreen
- [ ] CanvasProblemChallengeScreen
- [ ] ResultProblemChallengeScreen
- [ ] PostTestSyaratKetentuanScreen
- [ ] PostTestSoal1Screen
- [ ] PostTestSoal2Screen
- [ ] PostTestSoal3Screen
- [ ] PostTestSoal4Screen
- [ ] PostTestSoal5Screen
- [ ] PostTestKirimJawabanScreen
- [ ] PostTestKirimJawabanResultScreen
- [ ] MyProgressScreen

## Navigation
- [ ] `RootNavigator` (stack) terpasang; header sistem dinonaktifkan jika memakai `AppHeader`.
- [ ] (Opsional) `AppTabs` terpasang jika ada bottom tabs.
- [ ] Tipe route (`RootStackParamList`, dst.) terdefinisi (TypeScript).

## Testing (Opsional)
- [ ] Verifikasi manual di Android pada alur utama untuk tiap layar.
- [ ] Tidak ada redbox/error; interaksi inti berfungsi.

## Lint & Format
- [ ] `npm run lint` lulus tanpa error penting.
- [ ] Prettier diterapkan pada file baru/berubah.

## Docs
- [ ] `AGENTS.md` mencantumkan “Tujuan Agen Saat Ini: Slicing UI”.
- [ ] Tidak ada mojibake/karakter aneh pada bullet perintah.

## Verification
- [ ] Android: `npm run android` menampilkan Home tanpa error.
- [ ] UI mendekati desain (pixel-approx), spacing/typografi konsisten.

## Optional Polish
- [ ] Dark mode sinkron dengan token tema.
- [ ] Kinerja list besar baik (FPS stabil; tidak ada jank signifikan).
 
