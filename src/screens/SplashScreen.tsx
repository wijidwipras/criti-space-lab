import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }: any) => {
  return (
    <Layout style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.centerArea}>
        <View style={styles.welcome}>
          <LottieView style={{ flex: 1 }} source={require('../assets/images/cube.json')} autoPlay loop />
        </View>
        <Text category="h4" style={styles.title}>Creative Space Lab</Text>
        <Text appearance="hint" style={styles.tagline}>Explore. Create. Inspire.</Text>
      </View>
      <SafeAreaView edges={["bottom"]}>
        <View style={styles.bottomArea}>
          <Button size="large" style={styles.ctaButton} onPress={() => navigation.navigate('Next')}>
            Mulai
          </Button>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomArea: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    marginTop: 16,
  },
  tagline: {
    marginTop: 6,
    textAlign: 'center',
  },
  ctaButton: {
    width: '100%',
  },
  welcome: {
    height: 200,
    aspectRatio: 1,
  }
});

export default SplashScreen;
