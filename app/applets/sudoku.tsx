import React from 'react';
import { View } from 'react-native';
import { Section } from '@/components/basics';
import { Header } from '@/components/applets/Header';
import { Board } from '@/components/applets/sudoku/Board';

export default function Applets() : React.JSX.Element {
  return (
    <View style={{ flex:1 }}>
      <Header title='SUDOKU' />
      <Section style={{ flex:1 }}>
        <Board />
      </Section>
    </View>
  );
}