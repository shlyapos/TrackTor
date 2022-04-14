import React from 'react';
import TrackListPage from './TrackListPage';
import { IFrontendTrack, serializeBackendTrack } from '../../models/tracks';

// Временное решение, Дима не обращай внимание))
const data: IFrontendTrack[] = []; // TODO: подключение стора MobX???

const TrackList: React.FC = () => {
  const [trackData, setTrackData] = React.useState(data);
  const [searchValue, setSearchValue] = React.useState('');

  const onPress = (id: string) => {}; // TODO: во время реализации навигации, поменять переменные и логику

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
