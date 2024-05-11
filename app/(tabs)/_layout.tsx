import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SplashScreen, Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { Section } from '@/components/basics';
import { Exit } from '@/src/general/funcs';
import { useColors } from '@/constants/colors';
import { TabsContext } from '@/components/Contexts';

SplashScreen.preventAutoHideAsync();

interface TabIconProps {
  icon:string;
  selected:boolean;
  path:string;
  other?:string;
  reclick?: () => void;
}

const HOME     = 'home';
const APPLETS  = 'applet-list';
const SETTINGS = 'settings'

const TabIcon = ({icon, selected, path, other, reclick}:TabIconProps) => {
  const colors = useColors();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.tab}
      onPress={() => {
        if (selected)
          reclick ? reclick() : null;
        else
          router.navigate(path as any);
      }}

      delayLongPress={750}
      onLongPress={() => {
        if (other) {
          router.navigate(other as any);
          Platform.OS !== "web" ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) : null;
        }
      }}
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
  const [isClicked, setIsClicked] = useState(false);

  const handleReclick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 350);
  };

  return (
    <TabsContext.Provider value={{ isClicked }}>
      <Tabs
        tabBar={({ state }) => {
          if (state.index > 2)
            return null;
          
          return (
            <Section title="Tabs" style={styles.tabs} containerStyle={styles.tabsContainer}>
              <TabIcon icon="home"     selected={state.routes[state.index].name === HOME}     path="/(tabs)/home"        reclick={handleReclick} other="/others/ILYB" />
              <TabIcon icon="apps"     selected={state.routes[state.index].name === APPLETS}  path="/(tabs)/applet-list" reclick={handleReclick} />
              <TabIcon icon="settings" selected={state.routes[state.index].name === SETTINGS} path="/(tabs)/settings"    reclick={handleReclick} />

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
    </TabsContext.Provider>
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
