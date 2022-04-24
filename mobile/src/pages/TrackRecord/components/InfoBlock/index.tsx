import React from 'react';
import { View, Text } from 'react-native';

import styles from './InfoBlockStyle';

interface IInfoBlockProps {
  time: string;
  distance: string;
}

const InfoBlock: React.FC<IInfoBlockProps> = ({ time, distance }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.distance}>{distance}</Text>
    </View>
  );
};

export default InfoBlock;
