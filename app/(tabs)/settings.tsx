import{ useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { C, L, Section, T, Button, Sep } from '@/components/basics';
import { ThemeOptions, UnitsOptions, UserGenderOptions, WeatherIPsOptions } from '@/src/general/interfaces';
import { OptionsSetting, TextInputSetting, Title, BoolSetting } from '@/components/settings';
import { resetSettings, setStored } from '@/src/general/storage';
import consts from '@/constants/consts';
import { useColors } from '@/constants/colors';
import { updateFullscreen, move } from '@/src/general/funcs';
import { SettingsContext } from '@/components/Contexts';
import themes from '@/constants/themes';
import { iconPacks } from '@/components/weather/WeatherIcons';

export default function SettingsPage() {
  const colors = useColors();
  
  const [fullscreen, setFullscreen]  = useState<boolean>(false);
  const [resetPressed, setResetPressed]  = useState<boolean>(false);

  const updateData = useContext(SettingsContext).updateSettings;
  const { user, metrics, options } = useContext(SettingsContext).settings;

  const onMount = () => {
    updateData();
  };

  const onUnmount = () => {
    updateFullscreen(fullscreen);
  };

  useEffect(() => {
    onMount();
    return onUnmount;
  }, []);

  /* ======================================================================== */
  /*                             { User Options }                             */
  /* ======================================================================== */

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const onSubmitUsername = () => {
    setStored('user', { ...user, name });
    updateData();
  };

  const onSubmitAge = () => {
    setStored('user', { ...user, age:parseInt(age) });
    updateData();
  };

  const onSubmitGender = (forward:boolean = true) => {
    setStored('user', { ...user, gender: move(forward)(UserGenderOptions, user.gender) });
    updateData();
  };


  /* ======================================================================== */
  /*                            { Weather Options }                           */
  /* ======================================================================== */

  const [city, setCity] = useState<string>("");

  const onSubmitCity = () => {
    setStored('metrics', { ...metrics, city });
    updateData();
  };

  const onSubmitUnits = (forward:boolean = true) => {
    setStored('metrics', { ...metrics, units: move(forward)(UnitsOptions, metrics.units) });
    updateData();
  };


  /* ======================================================================== */
  /*                             { Other Options }                            */
  /* ======================================================================== */

  const onSubmitTheme = (forward:boolean = true) => {
    setStored('options', { ...options, theme: move(forward)(ThemeOptions, options.theme) });
    updateData();
  };

  const onSubmitWordClass = () => {
    setStored('options', { ...options, short_word_class: !options.short_word_class });
    updateData();
  };

  const onSubmitWeatherIP = (forward:boolean = true) => {
    setStored('options', { ...options, weather_icon_pack: move(forward)(WeatherIPsOptions, options.weather_icon_pack) });
    updateData();
  };

  const onSubmitRefreshButton = () => {
    setStored('options', { ...options, show_refresh_button: !options.show_refresh_button });
    updateData();
  };

  const onSubmitTimezoneButton = () => {
    setStored('options', { ...options, show_timezone: !options.show_timezone });
    updateData();
  };

  const onSubmitFullscreen = () => {
    updateFullscreen(!fullscreen);
    setFullscreen(!fullscreen);
  };

  /* ======================================================================== */
  /* ======================================================================== */

  return (
    <Section title="Settings" style={{ flex:1 }}>
        <ScrollView style={{ flex:1 }} contentContainerStyle={styles.homeContainer}>
          {/* ========= User settings ========= */}
          <Title title='User'/>

          {/* Username */}
          <TextInputSetting
            title="Username"
            state={name}
            setState={setName}
            placeholder={user.name}
            onSubmit={onSubmitUsername}
          />
          {/* Age */}
          <TextInputSetting
            title="Age"
            state={age}
            setState={setAge}
            placeholder={user.age?.toString()}
            onSubmit={onSubmitAge}
            keyboardType='numeric'
          />
          {/* Gender */}
          <OptionsSetting
            title="Gender"
            index={UserGenderOptions.indexOf(user.gender)}
            options={UserGenderOptions}
            onSubmit={onSubmitGender}
            icon={user.gender === "male" ? "male" : user.gender === "female" ? "female" : "build-outline"}
          />

          <Sep />

          {/* ========= Weather settings ========= */}
          <Title title='Weather'/>

          {/* City */}
          <TextInputSetting
            title="City"
            state={city}
            setState={setCity}
            placeholder={metrics.city}
            onSubmit={onSubmitCity}
          />
          {/* Units */}
          <OptionsSetting
            title="Units"
            index={UnitsOptions.indexOf(metrics.units)}
            options={UnitsOptions}
            onSubmit={onSubmitUnits}
            icon={metrics.units === "metric" ? "flask-outline" : "footsteps-outline"}
          />

          <Sep />

          {/* ========= Appearance ========= */}
          <Title title='Appearance'/>

          {/* Theme */}
          <OptionsSetting
            title="Color Theme"
            description={`The color palette used throughout the app.\nAvailable: ${Object.keys(themes).join(", ")}`}
            index={ThemeOptions.indexOf(options.theme)}
            options={ThemeOptions}
            onSubmit={onSubmitTheme}
            icon={options.theme === "system" ? "cog" : colors.icon}
            size='medium'
          />

          <OptionsSetting
            title="Weather Icons"
            description={`The icon pack used the weather conditions.\nAvailable: ${Object.keys(iconPacks).join(", ")}`}
            index={WeatherIPsOptions.indexOf(options.weather_icon_pack)}
            options={WeatherIPsOptions}
            onSubmit={onSubmitWeatherIP}
            icon={options.weather_icon_pack === "theme-default" ? "color-palette-outline" : options.weather_icon_pack === "ascii" ? "code-slash" : "calculator-outline"}
            size='medium'
          />

          {/* Word class button */}
          <BoolSetting
            title="Short Word Class"
            description={"Uses short word class in word of the day.\neg. verb → v."}
            current={options.short_word_class}
            onSubmit={onSubmitWordClass}
            size='medium'
          />

          <Sep />

          {/* ========= Other settings ========= */}
          <Title title='Others'/>

          {/* Refresh button */}
          <BoolSetting
            title="Refresh Button"
            description="Show weather refresh button anyway."
            current={options.show_refresh_button}
            onSubmit={onSubmitRefreshButton}
            size='medium'
          />

          <BoolSetting
            title="Timezone"
            description="Show timezone offset under current time."
            current={options.show_timezone}
            onSubmit={onSubmitTimezoneButton}
            size='medium'
          />

          {/* Full screen */}
          <BoolSetting
            title="Full screen"
            description={"Hide both navigation (android only) and status bar."}
            experimental
            current={fullscreen}
            onSubmit={onSubmitFullscreen}
            size='medium'
          />

          <Sep margin={30} noThickness/>

          {/* Reset Button */}
          <View style={styles.resetContainer}>
            {resetPressed ? <T style={styles.resetAssure}>Are you sure?</T> : null}
            <View style={styles.reset}>
              { !resetPressed ?
                <Button
                  title={"Rest all"}
                  style={{ flex: 1, borderColor: colors.hot, marginVertical: 7.5 }}
                  onPress={() => {
                      setResetPressed(true);
                    }}
                    icon={{ name: "reload-circle" }}
                /> : <>
                <Button
                  title={"Yes"}
                  style={{ flex: 1, borderColor: colors.green, marginRight: "1.5%" }}
                  onPress={() => {
                    resetSettings();
                    updateFullscreen(false);
                    setFullscreen(false);
                    updateData();
                    setResetPressed(false);
                  }}
                  icon={{ name: "checkmark-circle" }}
                />
                <Button
                  title={"No"}
                  style={{ flex: 1, borderColor: colors.red, marginLeft: "1.5%" }}
                  onPress={() => {
                      setResetPressed(false);
                    }}
                    icon={{ name: "close-circle" }}
                />
                </>
              }
            </View>
          </View>

          <T style={styles.resetDisclaimer}>
            <C.SECONDARY>This resets everything, including applets' settings and these settings.</C.SECONDARY>
          </T>

          <T style={styles.footer}>
            <C.ACCENT>{'•-{ '}</C.ACCENT>
              Tuii
            <C.ACCENT>{' }-•'}</C.ACCENT>
            {'\n'}
            <L style={{ fontSize: 11 }}>
              (v{consts.version})
            </L>
            {'\n'}
            <C.SECONDARY style={{ fontSize: 12 }}>
              by
              {' '}
              <C.HIGHLIGHT>
                @IamFastre
              </C.HIGHLIGHT>
            </C.SECONDARY>
          </T>
          {/* <View style={styles.logos}>
            <T style={{ fontSize: 10, color: colors.secondary }}>on</T>
            <Ionicons name='logo-github' size={15} color={colors.secondary}/>
            <Ionicons name='logo-instagram' size={15} color={colors.secondary}/>
            <Ionicons name='logo-discord' size={15} color={colors.secondary}/>
          </View> */}

      </ScrollView>
    </Section>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    paddingTop: 5,
    alignItems: "stretch"
  },

  resetContainer: {
    height: 60,
    alignSelf: 'center',
    width: "60%",
  },

  resetAssure: {
    flex: 1,
    textAlign: 'center',
    marginBottom: 7.5
  },

  reset: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  resetDisclaimer: {
    alignSelf: "center",
    marginHorizontal: "20%",
    marginTop: 10,
    fontSize: 10,
    textAlign: "center",
    textAlignVertical: "center",
  },

  footer: {
    marginTop: 50,
    marginBottom: 20,
    opacity: 0.4,
    lineHeight: 15,
    textAlign: 'center'
  },

  // logos: {
  //   opacity: 0.4,
  //   marginTop: 1,
  //   marginBottom: 20,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   gap: 5,
  // },
});
