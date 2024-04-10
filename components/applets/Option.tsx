import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { T } from '@/components/basics';
import { router } from 'expo-router';
import { Href } from 'expo-router/build/link/href';
import { useColors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

export interface OptionProps {
  title: string;
  description: string;
  path: Href;
  icon: any;
  style?: ViewStyle;
}

export const Option = ({ title, description, path, icon, style }:OptionProps) => {
  const colors = useColors();

  return (
    <TouchableOpacity onPress={() => router.push(path as any)}>
      <View style={[styles.option, { borderColor: colors.secondary, borderRadius: colors.others.section_radius }, style]}>
        <Image
          source={icon}
          transition={500}
          style={styles.optionIcon} />
        <View style={[styles.optionSep, { backgroundColor: colors.secondary }]} />
        <View style={styles.optionText}>
          <T style={[styles.optionParaText, { color: colors.accent }]}>
            {title}
          </T>
          <T style={[styles.optionDesc, { color: colors.secondary }]}>
            {description}
          </T>
        </View>
        <TouchableOpacity onPress={() => router.push(path + '/settings' as any)} hitSlop={10}>
          <Ionicons name='options' color={colors.secondary} size={28} style={styles.optionSettings}/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 100,
    borderWidth: 1,
    paddingRight: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },

  optionIcon: {
    width: 80,
    margin: 10,
    aspectRatio: 1,
  },

  optionSep: {
    height: "60%",
    width: 1,
  },

  optionText: {
    flex: 1,
    paddingLeft: 10,
    alignItems: "flex-start",
  },

  optionParaText: {
    fontSize: 20,
  },

  optionDesc: {
    fontSize: 8,
    lineHeight: 12,
  },

  optionSettings: {
    padding: 10,
  }
});
