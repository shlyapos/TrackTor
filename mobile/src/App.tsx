import * as React from 'react';
import Constants from 'expo-constants';
import { BottomNavigation } from 'react-native-paper';

import TrackList from './pages/TrackList/TrackListPage';
import TrackCreate from './pages/TrackCreate/TrackCreatePage';

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'list', title: 'Список треков', icon: 'format-list-text' },
    { key: 'create', title: 'Создать трек', icon: 'pencil-outline' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    list: TrackList,
    create: TrackCreate
  })

  return (
    <BottomNavigation
      style={{ marginTop: Constants.statusBarHeight }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default App;