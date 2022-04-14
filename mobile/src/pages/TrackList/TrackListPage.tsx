import { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import TopMenu from '../../components/TopMenu';
import { IFrontendTrack } from '../../models/tracks';
import TrackListItem from './components/TrackListItem';

import styles from './TrackListStyle';

interface ITrackListPageProps {
  tracks: IFrontendTrack[];
  searchValue: string;
  onPress: (id: string) => void; // TODO: во время реализации навигации, поменять переменные
  onChangeSearch: (value: string) => void;
}

export default class TrackListPage extends PureComponent<ITrackListPageProps> {
  render() {
    const { tracks, searchValue, onChangeSearch, onPress } = this.props;

    return (
      <View style={styles.container}>
        <TopMenu
          isSearch
          searchValue={searchValue}
          onChangeSearch={onChangeSearch}
        />

        <ScrollView style={styles.list}>
          {tracks.map((track) => (
            <TrackListItem
              key={track.id}
              id={track.id}
              name={track.name}
              region={track.region}
              transport={track.transport}
              distance={track.distance}
              time={track.time}
              onPress={onPress}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
