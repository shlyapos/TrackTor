import * as React from 'react';
import { StatusBar } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import TrackList from './pages/TrackList';
import TrackCreate from './pages/TrackCreate';

import styles from './AppStyle';

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'list', title: 'Список треков', icon: 'format-list-text' },
    { key: 'create', title: 'Создать трек', icon: 'pencil-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    list: TrackList,
    create: TrackCreate,
  });

  return (
    <React.Fragment>
      <StatusBar backgroundColor={styles.statusBar.backgroundColor} />

      <BottomNavigation
        barStyle={styles.navigation}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </React.Fragment>
  );
};

export default App;
