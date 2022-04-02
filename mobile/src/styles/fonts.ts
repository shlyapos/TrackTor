import * as React from 'react';
import { StyleSheet } from 'react-native';

import Colors from './Colors';

const Fonts = StyleSheet.create({
  header3: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.15,
    color: Colors.colorWhiteText,
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.15,
    color: Colors.colorWhiteText,
  },
  addText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontsize: 14,
    lineHeight: 16,
    letterSpacing: 0.15,
    color: Colors.colorAdditionalText,
  },
});
