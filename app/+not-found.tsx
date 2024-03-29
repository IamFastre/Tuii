import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useColors } from '@/constants/colors';
import { Section, T, Button } from '@/components/basics';
import { router } from 'expo-router';

export default function NotFound() : React.JSX.Element {
  const colors = useColors();

  return (
    <View style={{ flex:1 }}>
      <Section title="??????" style={{ flex:1 }} titleStyle={{ color: colors.hot }} containerStyle={{...styles.homeContainer, borderColor: colors.hot}}>
        <Ionicons name='warning' size={100} color={colors.hot} style={styles.qIcon}/>
        <T style={styles.paraText}>
          Page Not Found.
        </T>
        <Button
          style={styles.button}
          textStyle={styles.buttonText}
          title="Home"
          icon={ {name:"home-sharp", size: 16} }
          onPress={() => router.replace("/(tabs)")}
        />
        <T style={[styles.qmark, { color: colors.secondary }]}>?</T>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  qIcon: {
    marginVertical: 15,
    padding: 7.5,
  },

  paraText: {
    marginBottom: 10,
    fontSize: 20
  },

  button: {
    marginTop: 20,
    padding: 10,
  },

  buttonText: {
    fontSize: 18,
  },

  qmark: {
    marginTop: 50,
    fontSize: 300,
    opacity: 0.15,
  }
});
