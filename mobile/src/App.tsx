import * as React from 'react';
import { Text, View } from 'react-native';
import TrackList from './pages/TrackList/TrackListPage';

import styles from './styles/index.module.css';

const App = () => {
  return (
    <View style={styles.container}>
      <TrackList />
    </View>
  );
};

export default App;