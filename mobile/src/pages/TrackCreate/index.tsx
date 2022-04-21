import React from 'react';
import TrackCreatePage from './TrackCreatePage';

import { Transport } from '../../models/tracks';

const TrackCreate = () => {
  const [name, setName] = React.useState('');
  const [transport, setTransport] = React.useState<string | Transport>(
    'Пешком'
  ); // TODO: после замены TextInput на Select, надо будет убрать string

  const onChangeName = (value: string) => setName(value); // TODO: после замены TextInput на Select, изменить логику

  const onChangeTransport = (value: string) =>
    setTransport(value as unknown as Transport);

  const onPressStart = () => {};

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
