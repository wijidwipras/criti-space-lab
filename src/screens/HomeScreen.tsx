import React from 'react';
import { Image, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

const FeatureCard = ({ title, image, onPress }: { title: string; image: any; onPress: () => void }) => (
  <TouchableOpacity style={styles.featureWrap} onPress={onPress} activeOpacity={0.85}>
    <Card style={styles.featureCard} onPress={onPress}>
      <Text category="s1" style={styles.featureTitle}>{title}</Text>
      <Image source={image} style={styles.featureImage} resizeMode="contain" />
    </Card>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }: any) => {
  return (
    <Layout style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Card style={styles.headerCard}>
            <View style={styles.headerLogoWrap}>
              <Image
                source={require('../assets/images/logo-criti-space.png')}
                style={styles.headerLogo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.headerTextWrap}>
              <Text category="h5" style={styles.headerTitle}>Hai, User</Text>
              <Text style={styles.headerSubtitle}>Selamat datang di Creative Space Lab.</Text>
            </View>
          </Card>

          <View style={styles.grid}>
            <FeatureCard
              title="Eksplorasi 3D"
              image={require('../assets/images/cek.png')}
              onPress={() => navigation.navigate('Next')}
            />
            <FeatureCard
              title="Latihan"
              image={require('../assets/images/cek.png')}
              onPress={() => navigation.navigate('Next')}
            />
            <FeatureCard
              title="Kelas"
              image={require('../assets/images/cek.png')}
              onPress={() => navigation.navigate('Next')}
            />
            <FeatureCard
              title="Tentang"
              image={require('../assets/images/cek.png')}
              onPress={() => navigation.navigate('Next')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  safe: { flex: 1 },
  scroll: { padding: 16 },
  headerCard: { marginBottom: 16, borderRadius: 16, backgroundColor: '#FFBF1B', borderColor: 'transparent' },
  headerLogoWrap: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 4, alignItems: 'flex-start' },
  headerLogo: { height: 40, aspectRatio: 3, },
  headerTextWrap: { paddingHorizontal: 12, paddingBottom: 12 },
  headerTitle: { color: '#FFFFFF' },
  headerSubtitle: { color: '#FFFFFF' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureWrap: { width: '48%', marginBottom: 12 },
  featureCard: { borderRadius: 16, overflow: 'hidden' },
  featureTitle: { marginBottom: 8 },
  featureImage: { width: '100%', height: 90 },
});

export default HomeScreen;
