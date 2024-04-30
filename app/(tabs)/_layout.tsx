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
  other?:Href;
}

const HOME     = 'home';
const APPLETS  = 'applet-list';
const SETTINGS = 'settings'

const TabIcon = ({icon, selected, path, other}:TabIconProps) => {
  const colors = useColors();

  let router = useRouter();
  return (
    <TouchableOpacity
      style={styles.tab}
      onPress={() => router.navigate(path as any)}
      onLongPress={other ? () => router.navigate(other as any) : undefined}
      delayLongPress={1000}
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
      tabBar={({ state }) => {
        if (state.index > 2)
          return null;
        
        return (
          <Section title="Tabs" style={styles.tabs} containerStyle={styles.tabsContainer}>
            <TabIcon icon="home"     selected={state.routes[state.index].name === HOME}     path="/(tabs)/home" other="/others/clock" />
            <TabIcon icon="apps"     selected={state.routes[state.index].name === APPLETS}  path="/(tabs)/applet-list" />
            <TabIcon icon="settings" selected={state.routes[state.index].name === SETTINGS} path="/(tabs)/settings" />

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
      <Tabs.Screen name={HOME} options={{ title: "Home" }} />
      <Tabs.Screen name={APPLETS} options={{ title: "Applets" }} />
      <Tabs.Screen name={SETTINGS} options={{ title: "Settings" }} />
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
