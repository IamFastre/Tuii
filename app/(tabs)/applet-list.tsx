import { ScrollView, StyleSheet, View } from 'react-native';
import { Section } from '@/components/basics';
import { Option } from '../../components/applets/Option';
import { useColors } from '@/constants/colors';

const icons = {
  dark: {
    sudoku: require('@/assets/applet-icons/SudokuDark.png'),
  },

  light: {
    sudoku: require('@/assets/applet-icons/SudokuLight.png'),
  },

  scarlatta: {
    sudoku: require('@/assets/applet-icons/SudokuScarlatta.png'),
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
            description={'Fill a 9×9 grid with 1-9 with no copies in each row, column, and subgrid.\nLogic, not guesswork, is key!'}
            path="applets/sudoku"
            icon={icons[colors.theme].sudoku}
            style={styles.topOption}
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
