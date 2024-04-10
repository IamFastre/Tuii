import { ScrollView, StyleSheet, View } from 'react-native';
import { Section } from '@/components/basics';
import { Option } from '../../components/applets/Option';
import { useColors } from '@/constants/colors';

const icons = {
  dark: {
    sudoku: require('@/assets/applet-icons/SudokuDark.png'),
    tictactoe: require('@/assets/applet-icons/TicTacToeDark.png'),
  },

  light: {
    sudoku: require('@/assets/applet-icons/SudokuLight.png'),
    tictactoe: require('@/assets/applet-icons/TicTacToeLight.png'),
  },

  scarlatta: {
    sudoku: require('@/assets/applet-icons/SudokuScarlatta.png'),
    tictactoe: require('@/assets/applet-icons/TicTacToeScarlatta.png'),
  },
};

export default function AppletsPage() : React.JSX.Element {
  const colors = useColors();

  return (
    <View style={{ flex:1 }}>
      <Section title="Applets" style={{ flex:1 }}>
        <ScrollView style={{flex: 1}}>
          <Option
            title='Sudoku'
            description={'Fill a 9×9 grid with 1-9 with no copies in each row, column, and box.\nLogic, not guesswork, is key!'}
            path="applets/sudoku"
            icon={icons[colors.theme].sudoku}
            style={styles.topOption}
          />
          <Option
            title='TicTacToe'
            description={"Take turns marking grid with X's and O's. The first to get three in a row wins!"}
            path="applets/tictactoe"
            icon={icons[colors.theme].tictactoe}
          />
          </ScrollView>
      </Section>
    </View>
  );
}

export const styles = StyleSheet.create({
  topOption: {
    marginTop: 30
  }
});
