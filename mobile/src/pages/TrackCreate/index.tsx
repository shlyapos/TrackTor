import React from 'react';
import TrackCreatePage from './TrackCreatePage';
import { Transport } from '../../models/tracks';
import { HomeScreenNavigationProp } from '../../stack';

interface ITrackCreateProps {
  navigation: HomeScreenNavigationProp;
}

const TrackCreate: React.FC<ITrackCreateProps> = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [transport, setTransport] = React.useState<string | Transport>(
    'Пешком'
  ); // TODO: после замены TextInput на Select, надо будет убрать string

  const onChangeName = (value: string) => setName(value); // TODO: нужна проверка, если пусто, то не можем нажать кнопку старта

  const onChangeTransport = (value: string) =>
    setTransport(value as unknown as Transport); // TODO: после замены TextInput на Select, изменить логику

  const onPressStart = () => {
    navigation.navigate('TrackRecord', {
      name,
      transport,
    });
  };

  return (
    <TrackCreatePage
      name={name}
      transport={transport}
      onChangeName={onChangeName}
      onChangeTransport={onChangeTransport}
      onPressStart={onPressStart}
    />
  );
};

export default TrackCreate;
