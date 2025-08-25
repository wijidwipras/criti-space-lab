import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }: any) => {
  return (
    <Layout style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View pointerEvents="none" style={styles.blobs}>
        <View style={styles.blobTopLeft} />
        <View style={styles.blobBottomRight} />
      </View>
      <View style={styles.centerArea}>
        <View style={styles.welcome}>
          <LottieView
            style={styles.lottie}
            source={require('../assets/images/cube.json')}
            autoPlay
            loop
            resizeMode="contain"
          />
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
    backgroundColor: '#F5F5F5',
  },
  blobs: {
    ...StyleSheet.absoluteFillObject,
  },
  blobTopLeft: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: 260,
    height: 260,
    backgroundColor: '#FFBF1B',
    borderRadius: 180,
    opacity: 0.25,
    transform: [{ rotate: '15deg' }, { scaleX: 1.3 }],
  },
  blobBottomRight: {
    position: 'absolute',
    bottom: -140,
    right: -100,
    width: 320,
    height: 320,
    backgroundColor: '#FFBF1B',
    borderRadius: 200,
    opacity: 0.2,
    transform: [{ rotate: '-12deg' }, { scaleX: 1.2 }],
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
    borderRadius: 12,
  },
  welcome: {
    width: '70%',
    maxWidth: 360,
    aspectRatio: 1,
    overflow: 'visible',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
