import { StyleSheet, TouchableOpacity } from 'react-native';
import { SplashScreen, Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Section } from '@/components/basics';
import { Exit } from '@/src/general/funcs';
import { Href } from 'expo-router/build/link/href';
import { useColors } from '@/constants/colors';

SplashScreen.preventAutoHideAsync();

interface TabIconProps {
  icon:string;
  selected:boolean;
  path:Href;
}

const TabIcon = ({icon, selected, path}:TabIconProps) => {
  const colors = useColors();

  let router = useRouter();
  return (
    <TouchableOpacity
      style={styles.tab}
      onPress={() => router.navigate(path as any)}
    >
      <Ionicons
        name={(icon + (selected ? "" : "-outline")) as any}
        color={selected ? colors.accent : colors.secondary}
        size={30}
      />
    </TouchableOpacity>
  );
}

export default function HomeLayout() {
  const colors = useColors();

  return (
    <Tabs
      tabBar={(props) => {
        if (props.state.index > 2)
          return null;
        
        return (
          <Section title="Tabs" style={styles.tabs} containerStyle={styles.tabsContainer}>
            <TabIcon icon="home"     selected={props.state.index === 0} path="/(tabs)/" />
            <TabIcon icon="apps"     selected={props.state.index === 1} path="/(tabs)/applet-list" />
            <TabIcon icon="settings" selected={props.state.index === 2} path="/(tabs)/settings" />

            <TouchableOpacity style={styles.tab} onPress={() => Exit()}>
              <Ionicons name='exit-outline' size={30} color={colors.hot} />
            </TouchableOpacity>
          </Section>
        );
      }}

      screenOptions={{
        headerShown: false,
        freezeOnBlur: true,
      }}

      backBehavior='history'
    >
      <Tabs.Screen name='index' options={{ title: "Home", unmountOnBlur: false }} />
      <Tabs.Screen name='applet-list' options={{ title: "Applets" }} />
      <Tabs.Screen name='settings' options={{ title: "Settings" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabs: {
    height: 95
  },
  
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  tab: {
    height: "100%",
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
