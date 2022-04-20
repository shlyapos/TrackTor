import React from 'react';
import TrackCreatePage from './TrackCreatePage';

import { Transport } from '../../models/tracks';

const TrackCreate = () => {
  const [name, setName] = React.useState('');
  const [transport, setTransport] = React.useState<Transport>();

  const onPressBack = () => {};

  const onChangeName = (value: string) => setName(value);

  const onChangeTransport = (value: Transport) => setTransport(value);

  const onPressStart = () => {};

  return (
    <TrackCreatePage
      onChangeName={onChangeName}
      onChangeTransport={onChangeTransport}
      onPressBack={onPressBack}
      onPressStart={onPressStart}
    />
  );
};

export default TrackCreate;
