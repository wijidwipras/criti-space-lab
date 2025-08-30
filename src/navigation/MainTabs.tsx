import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Layout } from '@ui-kitten/components';
import HomeScreen from '../screens/HomeScreen';
import HelpScreen from '../screens/HelpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { HomeIcon, QuestionMarkCircleIcon, UserIcon } from 'react-native-heroicons/outline';

const MainTabs = ({ navigation }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <HomeScreen navigation={navigation} />;
      case 1:
        return <HelpScreen />;
      case 2:
      default:
        return <ProfileScreen />;
    }
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>
      <BottomNavigation
        style={styles.bottomNav}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <BottomNavigationTab title='Home' icon={(props) => <HomeIcon size={22} color={selectedIndex === 0 ? '#FFBF1B' : '#8F9BB3'} />} />
        <BottomNavigationTab title='Help' icon={(props) => <QuestionMarkCircleIcon size={22} color={selectedIndex === 1 ? '#FFBF1B' : '#8F9BB3'} />} />
        <BottomNavigationTab title='Profile' icon={(props) => <UserIcon size={22} color={selectedIndex === 2 ? '#FFBF1B' : '#8F9BB3'} />} />
      </BottomNavigation>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  bottomNav: {},
});

export default MainTabs;
