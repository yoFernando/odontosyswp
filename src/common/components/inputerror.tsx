import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Theme } from '../../paper/config';

const InputError = ({error}: {error:string | boolean | number}) =>
  error ? (
    <View style={style.container}>
      <Text style={style.text}>{error}</Text>
    </View>
  ) : null;

const style = StyleSheet.create({
  container: {flex: 1, maxHeight: 20},
  text: {color: Theme.colors.danger},
});

export default InputError;