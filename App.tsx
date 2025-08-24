import React from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';

const App = () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <Layout style={styles.container}>
      <Text category="h5">Welcome to creativeSpaceLab</Text>
      <Button style={styles.button} onPress={() => {}}>
        Get Started
      </Button>
    </Layout>
  </ApplicationProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  button: {
    marginTop: 16,
  },
});

export default App;
