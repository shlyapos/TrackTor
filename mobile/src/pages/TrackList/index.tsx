import React from 'react';
import TrackListPage from './TrackListPage';
import { IFrontendTrack } from '../../models/tracks';
import { TrackListScreenNavigationProp } from '../../stack';

interface ITrackListProps {
  navigation: TrackListScreenNavigationProp;
}

// Временное решение, Дима не обращай внимание))
const data: IFrontendTrack[] = []; // TODO: подключение стора MobX???

const TrackList: React.FC<ITrackListProps> = ({ navigation }) => {
  const [trackData, setTrackData] = React.useState(data);
  const [searchValue, setSearchValue] = React.useState('');

  const onPress = (id: string) => {
    const track = trackData.find((track) => track.id === id)!;

    navigation.navigate('TrackInfo', {
      track,
    });
  };

  React.useEffect(() => {
    searchValue
      ? setTrackData(data.filter((item) => item.name.indexOf(searchValue) > -1))
      : setTrackData(data);
  }, [searchValue]);

  const onChangeSearch = (value: string) => setSearchValue(value);

  return (
    <TrackListPage
      tracks={trackData}
      searchValue={searchValue}
      onPress={onPress}
      onChangeSearch={onChangeSearch}
    />
  );
};

export default TrackList;
