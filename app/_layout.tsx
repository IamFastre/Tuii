import { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, View, StyleSheet, Platform } from "react-native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack/src/types";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavBar from "expo-navigation-bar";

import { useColors } from "@/constants/colors";
import { SettingsContext } from "@/components/Contexts";
import { DefaultSettings, getStored } from "@/src/general/storage";

const Container = Platform.OS === 'android' ? View : KeyboardAvoidingView;

export default () => {
  const [dataReady, setDataReady] = useState<boolean>(false);
  
  const [fontsLoaded, fontError] = useFonts({
    'Cascadia Code Light': require('@/assets/fonts/CascadiaCode-ExtraLight.ttf'),
    'Cascadia Code':       require('@/assets/fonts/CascadiaCode.ttf'),
    'Cascadia Code Bold':  require('@/assets/fonts/CascadiaCode-Bold.ttf'),

    'Cascadia Code LightItalic': require('@/assets/fonts/CascadiaCode-ExtraLightItalic.ttf'),
    'Cascadia Code Italic':      require('@/assets/fonts/CascadiaCode-Italic.ttf'),
    'Cascadia Code BoldItalic':  require('@/assets/fonts/CascadiaCode-BoldItalic.ttf'),

    'Ubuntu':       require('@/assets/fonts/UbuntuMono.ttf'),
    'Ubuntu Bold':  require('@/assets/fonts/UbuntuMono-Bold.ttf'),
    
    'Ubuntu Italic':     require('@/assets/fonts/UbuntuMono-Italic.ttf'),
    'Ubuntu BoldItalic': require('@/assets/fonts/UbuntuMono-BoldItalic.ttf'),

    'Digital-7 Light': require('@/assets/fonts/Tuii-Digital-7 Light.ttf'),
    'Digital-7':       require('@/assets/fonts/Tuii-Digital-7.ttf'),
    'Digital-7 Bold':  require('@/assets/fonts/Tuii-Digital-7 Bold.ttf'),

    'Digital-7 LightItalic': require('@/assets/fonts/Tuii-Digital-7 LightItalic.ttf'),
    'Digital-7 Italic':      require('@/assets/fonts/Tuii-Digital-7 Italic.ttf'),
    'Digital-7 BoldItalic':  require('@/assets/fonts/Tuii-Digital-7 BoldItalic.ttf'),

    'Soria': require('@/assets/fonts/Soria.ttf'),
    'Kode Bold': require('@/assets/fonts/KodeMono-Bold.ttf'),

    'DSEGWeather': require('@/assets/fonts/Tuii-DSEGWeather.ttf'),
  });
  
  const [settings, setSettings] = useState(DefaultSettings);
  const colors = useColors(settings);

  const updateSettings = async () => {
    setSettings({
      user: await getStored('user'),
      metrics: await getStored('metrics'),
      options: await getStored('options'),
      sudoku: await getStored('sudoku'),
      tictactoe: await getStored('tictactoe'),
    })
  };

  useEffect(() => {
    updateSettings().then(() => {
      setDataReady(true);
    });
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if ((fontsLoaded || fontError) && dataReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, dataReady]);

  if ((!fontsLoaded && !fontError) || !dataReady) {
    return null;
  }

  if (Platform.OS === "android") {
    NavBar.setBackgroundColorAsync("transparent");
  NavBar.setPositionAsync("absolute");
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary }]} onLayout={onLayoutRootView} mode="padding">
        <Container style={{ flex: 1 }} behavior="padding">

          {/* ================================================================== */}
          {/*                           Main app stack                           */}
          {/* ================================================================== */}

          <Stack
            screenOptions={{
              headerShown: false,
              freezeOnBlur: true,
              orientation: 'all',
            }}
            >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="applets/sudoku" options={screenOptions.applets} />
          </Stack>
          <StatusBar style={colors.statusbar}/>
        </Container>
      </SafeAreaView>
    </SettingsContext.Provider>
  );
}

const screenOptions:{ [P:string]: NativeStackNavigationOptions } = {
  applets: {
    animation: 'slide_from_right',
    orientation: 'portrait',
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});