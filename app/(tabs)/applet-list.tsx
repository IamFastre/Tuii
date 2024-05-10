import { useContext } from 'react';
import { ScrollView, View } from 'react-native';

import { useColors } from '@/constants/colors';
import { Section, Sep } from '@/components/basics';
import { Option } from '@/components/applets/Option';
import { TabsContext } from '@/components/Contexts';

const icons = {
  dark: {
    sudoku: require('@/assets/applet-icons/dark/Sudoku.png'),
    tictactoe: require('@/assets/applet-icons/dark/TicTacToe.png'),
  },

  light: {
    sudoku: require('@/assets/applet-icons/light/Sudoku.png'),
    tictactoe: require('@/assets/applet-icons/light/TicTacToe.png'),
  },

  scarlatta: {
    sudoku: require('@/assets/applet-icons/scarlatta/Sudoku.png'),
    tictactoe: require('@/assets/applet-icons/scarlatta/TicTacToe.png'),
  },

  e9999: {
    sudoku: require('@/assets/applet-icons/e9999/Sudoku.png'),
    tictactoe: require('@/assets/applet-icons/e9999/TicTacToe.png'),
  },
};

export default function AppletsPage() : React.JSX.Element {
  const colors = useColors();
  const { isClicked } = useContext(TabsContext);

  return (
    <View style={{ flex:1 }}>
      <Section title="Applets" style={{ flex:1 }} containerStyle={isClicked ? { borderColor: colors.accent } : { }}>
        <ScrollView style={{flex: 1}}>
          <Sep noThickness margin={10} />
          <Option
            title='TicTacToe'
            description={"Take turns marking grid with X's and O's. The first to get three in a row wins!"}
            path="applets/tictactoe"
            icon={icons[colors.theme].tictactoe}
          />
          <Option
            title='Sudoku'
            description={'Fill a 9×9 grid with 1-9 with no copies in each row, column, and box.\nLogic, not guesswork, is key!'}
            path="applets/sudoku"
            icon={icons[colors.theme].sudoku}
          />
          </ScrollView>
      </Section>
    </View>
  );
}
