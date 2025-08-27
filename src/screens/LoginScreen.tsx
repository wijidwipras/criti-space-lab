import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Layout, Text, Input } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShadowButton from '../components/common/ShadowButton';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    // TODO: wire authentication
    navigation.navigate('Next');
  };

  return (
    <Layout style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding', android: undefined })}
          style={styles.kav}
        >
          <View style={styles.header}>
            <Image
              source={require('../assets/images/logo-criti-space.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.content}>
            <Text category="h3" style={styles.title}>Hai</Text>
            <Text appearance="hint" style={styles.subtitle}>
              Masuk untuk melanjutkan eksplorasi ruang kreatif Anda.
            </Text>

            <Input
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <ShadowButton size="large" onPress={onLogin}>
              Login
            </ShadowButton>
          </View>

          <View style={styles.footer}>
            <Text appearance="hint">
              Dengan masuk, Anda menyetujui ketentuan penggunaan dan kebijakan privasi.
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  safe: { flex: 1 },
  kav: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 8 },
  headerLogo: { height: 28, width: 120 },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  title: { marginBottom: 6 },
  subtitle: { marginBottom: 24 },
  input: { marginBottom: 16 },
  footer: { paddingHorizontal: 24, paddingVertical: 16 },
});

export default LoginScreen;

