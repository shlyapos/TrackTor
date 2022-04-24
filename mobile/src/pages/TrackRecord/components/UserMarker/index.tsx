import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';

const UserMarker: React.FC = () => {
  return (
    <Svg width={32} height={32} fill='none' xmlns='http://www.w3.org/2000/svg'>
      <Circle cx={16} cy={16} r={16} fill='#03FF90' fillOpacity={0.4} />
      <Circle cx={16} cy={16} r={12} fill='#fff' fillOpacity={0.8} />
      <Circle cx={16} cy={16} r={8} fill='#03FF90' />
    </Svg>
  );
};

export default UserMarker;
