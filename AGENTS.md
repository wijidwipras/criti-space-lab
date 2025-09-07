# Panduan Repositori

## Tujuan Agen Saat Ini
- Slicing UI: fokus pada pemecahan desain menjadi komponen UI reusable, menjaga konsistensi tema (UI Kitten/Eva), dan mencapai kesesuaian visual dengan desain (pixel-perfect) di seluruh layar.

## Struktur Proyek & Organisasi Modul
- Sumber: `src/` dengan folder fitur: `components/`, `screens/`, `navigation/`, `hooks/`, `services/`, `api/`, `utils/`, `state/`, `styles/`, `theme/`, dan `assets/` (font/gambar/animasi).
- Titik masuk: `index.js` (registri) dan `App.tsx` (providers + navigasi).
- Test: `__tests__/` (Jest). Contoh: `__tests__/App.test.tsx`.
- Proyek native: `android/`, `ios/`. Konfigurasi Metro: `metro.config.js`.

## Perintah Build, Test, dan uDevelopment
- Mulai Metro: `npm start` - menjalankan bundler.
- Android (utama): `npm run android` - membangun dan memasang di perangkat/emulator.
- Release Android (APK): `cd android && ./gradlew assembleRelease` (Windows: `gradlew.bat`).
- Bundle Android (AAB): `cd android && ./gradlew bundleRelease`.
- iOS (opsional, macOS): `npm run ios` - membangun dan menjalankan di Simulator.
 
- Lint: `npm run lint` - menjalankan ESLint di seluruh repo.
- Format (sesuai kebutuhan): `npx prettier --write .`.
- Tautkan aset (font): `npx react-native-asset` (menggunakan `react-native.config.js`).

## Gaya Kode & Konvensi Penamaan
- TypeScript: `.ts`/`.tsx`; indentasi 2 spasi, tanda petik tunggal, koma di akhir (konfigurasi Prettier).
- Linting: mewarisi `@react-native` via `.eslintrc.js`; perbaiki dengan `npx eslint . --fix`.
- Komponen/Layar: berkas PascalCase (mis., `NextScreen.tsx`).
- Hooks: `useX.ts` (ekspor camelCase). Konstanta: UPPER_SNAKE_CASE. Utilitas: lowerCamelCase.

## Panduan Pengujian
- Fokus saat ini: verifikasi manual di Android (emulator/perangkat) pada alur utama.
- Jest/unit test: opsional; tidak diwajibkan pada tahap slicing UI ini.
- Prioritas: stabilitas di Android, konsistensi visual, dan aksesibilitas dasar.

## Panduan Commit & Pull Request
- Gaya commit (yang digunakan): `[type] pesan imperatif singkat`, mis. `[add] splash screen and lottie`, `[setup] project`.
- Jaga commit tetap fokus; referensikan issue di body (mis., `Fixes #123`).
- PR harus menyertakan: ringkasan jelas, screenshot untuk perubahan UI, langkah verifikasi, dan tautan ke issue terkait.
 - Pastikan CI sehat: jalankan `npm run lint` secara lokal sebelum meminta review.

## Gambaran Arsitektur & Tips
- UI: UI Kitten (`@ui-kitten/components`) dengan tema Eva; tema/pemetaan kustom di `src/theme/`.
- Navigasi: `@react-navigation/native` + stack di `src/navigation/`.
- Aset: font di `src/assets/fonts` (dikonfigurasi di `react-native.config.js`). Hindari meng-commit rahasia; simpan konfigurasi spesifik lingkungan di luar sumber.
# Panduan Repositori

## Tujuan Agen Saat Ini
- Slicing UI untuk Android: fokus pada pemecahan desain menjadi komponen UI reusable, menjaga konsistensi tema (UI Kitten/Eva), memastikan performa baik di perangkat Android, dan kesesuaian visual (pixel-perfect) lintas densitas layar.

## Target Platform: Android
- Prasyarat: Android Studio (SDK, Platform-Tools), emulator atau perangkat USB, JDK sesuai versi React Native (umumnya JDK 17).
- Jalankan debug: `npm run android` - membangun dan memasang ke emulator/perangkat.
- Build release (APK): `cd android && ./gradlew assembleRelease` (Windows: `gradlew.bat`).
- Build bundle (AAB): `cd android && ./gradlew bundleRelease` untuk distribusi Play Store.
- Penandatanganan: atur `signingConfigs` di `android/app/build.gradle` dan simpan keystore di luar VCS (jangan commit rahasia).
- Opsional performa: aktifkan Hermes dan ProGuard/minify untuk release.

## Struktur Proyek & Organisasi Modul
- Sumber: `src/` dengan folder fitur: `components/`, `screens/`, `navigation/`, `hooks/`, `services/`, `api/`, `utils/`, `state/`, `styles/`, `theme/`, dan `assets/` (font/gambar/animasi).
- Titik masuk: `index.js` (registri) dan `App.tsx` (providers + navigasi).
- Test: `__tests__/` (Jest). Contoh: `__tests__/App.test.tsx`.
- Proyek native: `android/`, `ios/`. Konfigurasi Metro: `metro.config.js`.

## Perintah Build, Test, dan Development
- Mulai Metro: `npm start` - menjalankan bundler.
- Android (utama): `npm run android` - membangun dan memasang di perangkat/emulator.
- Release Android (APK): `cd android && ./gradlew assembleRelease` (Windows: `gradlew.bat`).
- Bundle Android (AAB): `cd android && ./gradlew bundleRelease`.
- iOS (opsional, macOS): `npm run ios` - membangun dan menjalankan di Simulator.
 
- Lint: `npm run lint` - menjalankan ESLint di seluruh repo.
- Format (sesuai kebutuhan): `npx prettier --write .`.
- Tautkan aset (font): `npx react-native-asset` (menggunakan `react-native.config.js`).

## Gaya Kode & Konvensi Penamaan
- TypeScript: `.ts`/`.tsx`; indentasi 2 spasi, tanda petik tunggal, koma di akhir (konfigurasi Prettier).
- Linting: mewarisi `@react-native` via `.eslintrc.js`; perbaiki dengan `npx eslint . --fix`.
- Komponen/Layar: berkas PascalCase (mis., `NextScreen.tsx`).
- Hooks: `useX.ts` (ekspor camelCase). Konstanta: UPPER_SNAKE_CASE. Utilitas: lowerCamelCase.

## Panduan Pengujian
- Fokus saat ini: verifikasi manual di Android (emulator/perangkat) pada alur utama.
- Jest/unit test: opsional; tidak diwajibkan pada tahap slicing UI ini.
- Prioritas: stabilitas di Android, konsistensi visual, dan aksesibilitas dasar.

## Panduan Commit & Pull Request
- Gaya commit (yang digunakan): `[type] pesan imperatif singkat`, mis. `[add] splash screen and lottie`, `[setup] project`.
- Jaga commit tetap fokus; referensikan issue di body (mis., `Fixes #123`).
- PR harus menyertakan: ringkasan jelas, screenshot untuk perubahan UI, langkah verifikasi, dan tautan ke issue terkait.
 - Pastikan CI sehat: jalankan `npm run lint` secara lokal sebelum meminta review.

## Gambaran Arsitektur & Tips
- UI: UI Kitten (`@ui-kitten/components`) dengan tema Eva; tema/pemetaan kustom di `src/theme/`.
- Navigasi: `@react-navigation/native` + stack di `src/navigation/`.
- Aset: font di `src/assets/fonts` (dikonfigurasi di `react-native.config.js`). Hindari meng-commit rahasia; simpan konfigurasi spesifik lingkungan di luar sumber.
