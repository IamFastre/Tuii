import { TouchableOpacity, StyleSheet } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { T, Section, C, B } from '@/components/basics';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/constants/colors';

export function Header({title, back, options}:{title:string, back?:string, options:string}) : React.JSX.Element {
  const colors = useColors();

  return (
    <Section style={styles.header} containerStyle={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.canGoBack() ? router.back() : router.canDismiss() ? router.dismiss() : router.replace('/')}>
        <Ionicons name='chevron-back-sharp' size={35} color={colors.hot} />
      </TouchableOpacity>
      <T style={styles.titleText}>
        <C.ACCENT>•-{'{ '}</C.ACCENT>
        <B>{title}</B>
        <C.ACCENT>{' }'}-•</C.ACCENT>
      </T>
      <TouchableOpacity style={styles.settingsButton} onPress={() => router.push(options as any)}>
        <Ionicons name='options' size={30} color={colors.accent} />
      </TouchableOpacity>
    </Section>
  );
}

export function MiniHeader({title, subtitle}:{title:string, subtitle:string}) : React.JSX.Element {
  const colors = useColors();

  return (
    <Section style={styles.header} containerStyle={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.canGoBack() ? router.back() : router.canDismiss() ? router.dismiss() : router.replace('/')}>
        <Ionicons name='close' size={35} color={colors.hot} />
      </TouchableOpacity>
      <T style={styles.titleText}>
        <C.ACCENT>[</C.ACCENT>
        <B> {title} </B>
        <C.ACCENT>]</C.ACCENT>
      </T>
      <T>
        <C.SECONDARY>
          {subtitle}
        </C.SECONDARY>
      </T>
    </Section>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100
  },

  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  
  backButton: {
    position: "absolute",
    left: 20
  },

  titleText: {
    fontSize: 26,
  },

  settingsButton: {
    position: "absolute",
    right: 22.5
  },
});
