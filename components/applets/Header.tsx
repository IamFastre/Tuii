import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { T, Section, C, B } from '@/components/basics';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/constants/colors';

export function Header({title}:{title:string}) : React.JSX.Element {
  const colors = useColors();

  return (
    <Section style={styles.header} containerStyle={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name='chevron-back-sharp' size={35} color={colors.hot} />
      </TouchableOpacity>
      <T style={styles.titleText}>
        <C.ACCENT>•-{'{ '}</C.ACCENT>
        <B>{title}</B>
        <C.ACCENT>{' }'}-•</C.ACCENT>
      </T>
    </Section>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  backButton: {
    position: "absolute",
    left: 20
  },

  titleText: {
    fontSize: 26,
  }
});
