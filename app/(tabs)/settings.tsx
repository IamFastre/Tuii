import{ useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { C, L, Section, T, Button, Sep } from '@/components/basics';
import { ClockBGOptions, ClockDHOptions, ClockFGOptions, ClockNROptions, ClockStyleOptions, ThemeOptions, UnitsOptions, UserGenderOptions, WeatherIPsOptions } from '@/src/general/interfaces';
import { OptionsSetting, TextInputSetting, Title, BoolSetting, Group } from '@/components/settings';
import { resetSettings, setStored } from '@/src/general/storage';
import appConsts from '@/constants/consts';
import { useColors } from '@/constants/colors';
import { updateFullscreen, move } from '@/src/general/funcs';
import { SettingsContext, TabsContext } from '@/components/Contexts';
import { Feather } from '@expo/vector-icons';

export default function SettingsPage() {
  const colors = useColors();
  
  const [fullscreen, setFullscreen]  = useState<boolean>(false);
  const [resetPressed, setResetPressed]  = useState<boolean>(false);

  const updateData = useContext(SettingsContext).updateSettings;
  const { user, metrics, options } = useContext(SettingsContext).settings;
  const { isClicked } = useContext(TabsContext);

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

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [city, setCity] = useState<string>("");


  /* ======================================================================== */
  /* ======================================================================== */

  return (
    <Section title="Settings" style={{ flex:1 }} containerStyle={isClicked ? { borderColor: colors.accent } : { }}>
        <ScrollView style={{ flex:1 }} contentContainerStyle={styles.homeContainer} showsVerticalScrollIndicator={false}>
          {/* ========= User settings ========= */}
          <Sep margin={7.5} noThickness />
          <Title title='User'/>

          {/* Username */}
          <TextInputSetting
            title="Username"
            state={name}
            setState={setName}
            placeholder={user.name}
            onSubmit={() => {
              setStored('user', { ...user, name });
              updateData();
            }}
          />
          {/* Age */}
          <TextInputSetting
            title="Age"
            state={age}
            setState={setAge}
            placeholder={user.age?.toString()}
            onSubmit={() => {
              setStored('user', { ...user, age: parseInt(age) });
              updateData();
            }}
            keyboardType='numeric'
          />
          {/* Gender */}
          <OptionsSetting
            title="Gender"
            index={UserGenderOptions.indexOf(user.gender)}
            options={UserGenderOptions}
            onSubmit={(forward: boolean = true) => {
              setStored('user', { ...user, gender: move(forward)(UserGenderOptions, user.gender) });
              updateData();
            }}
            icon={user.gender === "male" ? "male" : user.gender === "female" ? "female" : "build-outline"}
            color={user.gender === "male" ? colors.blue : user.gender === "female" ? colors.magenta : colors.yellow}
          />


          {/* ========= Weather settings ========= */}
          <Sep margin={consts.margin} />
          <Title title='Weather'/>

          {/* City */}
          <TextInputSetting
            title="City"
            state={city}
            setState={setCity}
            placeholder={metrics.city}
            onSubmit={() => {
              setStored('metrics', { ...metrics, city });
              updateData();
            }}
          />
          {/* Units */}
          <OptionsSetting
            title="Units"
            index={UnitsOptions.indexOf(metrics.units)}
            options={UnitsOptions}
            onSubmit={(forward: boolean = true) => {
              setStored('metrics', { ...metrics, units: move(forward)(UnitsOptions, metrics.units) });
              updateData();
            }}
            icon={metrics.units === "metric" ? "flask-outline" : "footsteps-outline"}
            color={metrics.units === "metric" ? colors.highlight : colors.accent}
          />


          {/* ========= Appearance ========= */}
          <Sep margin={consts.margin} />
          <Title title='Appearance'/>

          {/* Theme */}
          <OptionsSetting
            title="Theme"
            description="The style used throughout the app."
            index={ThemeOptions.indexOf(options.theme)}
            options={ThemeOptions}
            onSubmit={(forward: boolean = true) => {
              setStored('options', { ...options, theme: move(forward)(ThemeOptions, options.theme) });
              updateData();
            }}
            icon={options.theme === "system" ? "cog" : colors.icon}
            size='medium'
            showOptions
          />

          {/* Weather icons */}
          <OptionsSetting
            title="Weather Icons"
            description="The icon pack used for weather."
            index={WeatherIPsOptions.indexOf(options.weather_icon_pack)}
            options={WeatherIPsOptions}
            onSubmit={(forward: boolean = true) => {
              setStored('options', { ...options, weather_icon_pack: move(forward)(WeatherIPsOptions, options.weather_icon_pack) });
              updateData();
            }}
            icon={options.weather_icon_pack === "theme-default" ? "color-palette-outline" : options.weather_icon_pack === "ascii-art" ? "code-slash" : options.weather_icon_pack === "segments" ? "calculator-outline" : "partly-sunny-outline"}
            size='medium'
            showOptions
          />

          {/* Word class button */}
          <BoolSetting
            title="Short Word Class"
            description={"Use abbreviation in word of the day.\nExample: verb → v."}
            current={options.short_word_class}
            onSubmit={() => {
              setStored('options', { ...options, short_word_class: !options.short_word_class });
              updateData();
            }}
            size='medium'
          />

          <Group
            title='Clock'
            children={
              <>
                {/* Timezone */}
                <OptionsSetting
                  title="Clock Style"
                  description="Choose which clock type you prefer."
                  index={ClockStyleOptions.indexOf(options.clock_style)}
                  options={ClockStyleOptions}
                  onSubmit={(forward: boolean = true) => {
                    setStored('options', { ...options, clock_style: move(forward)(ClockStyleOptions, options.clock_style) });
                    updateData();
                  }}
                  icon={options.clock_style === "digital" ? "watch-outline" : "time-outline" }
                  size='medium'
                  showOptions
                  />
                {/* Timezone */}
                <BoolSetting
                  title="Timezone"
                  description="Show timezone offset under current time."
                  current={options.show_timezone}
                  onSubmit={() => {
                    setStored('options', { ...options, show_timezone: !options.show_timezone });
                    updateData();
                  }}
                  size='medium'
                  />
        
                { options.clock_style === "analog" ?
                  <>
                    {/* Clock foreground color */}
                    <OptionsSetting
                      title="Foreground Color"
                      description="The color used for dashes and numbers."
                      index={ClockFGOptions.indexOf(options.clock_foreground_color)}
                      options={ClockFGOptions}
                      onSubmit={(forward: boolean = true) => {
                        setStored('options', { ...options, clock_foreground_color: move(forward)(ClockFGOptions, options.clock_foreground_color) });
                        updateData();
                      }}
                      icon={'color-filter-outline'}
                      color={options.clock_foreground_color === 'accent' ? colors.accent : options.clock_foreground_color === "highlight" ? colors.highlight : colors.tertiary}
                      size='medium'
                      showOptions
                      />
                    {/* Clock background style */}
                    <OptionsSetting
                      title="Background Style"
                      description="The style of the clock body itself."
                      index={ClockBGOptions.indexOf(options.clock_background_style)}
                      options={ClockBGOptions}
                      onSubmit={(forward: boolean = true) => {
                        setStored('options', { ...options, clock_background_style: move(forward)(ClockBGOptions, options.clock_background_style) });
                        updateData();
                      }}
                      icon={options.clock_background_style === "square" ? "square" : options.clock_background_style === "circle" ? "circle" : options.clock_background_style === "hexagon" ? "hexagon" : "x" }
                      pack={Feather}
                      size='medium'
                      showOptions
                      />
                    {/* Clock dashes style */}
                    <OptionsSetting
                      title="Dashes Style"
                      description="The style used for dashes around the clock."
                      index={ClockDHOptions.indexOf(options.clock_dashes_style)}
                      options={ClockDHOptions}
                      onSubmit={(forward: boolean = true) => {
                        setStored('options', { ...options, clock_dashes_style: move(forward)(ClockDHOptions, options.clock_dashes_style) });
                        updateData();
                      }}
                      size='medium'
                      showOptions
                    />
                    {/* Clock numerals style */}
                    <OptionsSetting
                      title="Numerals Style"
                      description="The numerals used around the clock."
                      index={ClockNROptions.indexOf(options.clock_numerals_style)}
                      options={ClockNROptions}
                      onSubmit={(forward: boolean = true) => {
                        setStored('options', { ...options, clock_numerals_style: move(forward)(ClockNROptions, options.clock_numerals_style) });
                        updateData();
                      }}
                      size='medium'
                      showOptions
                      />
                    {/* Clock day/night icon */}
                    <BoolSetting
                      title="Show Icon"
                      description={"Show the current period of the day icon (day/night)."}
                      current={options.clock_show_icons}
                      onSubmit={() => {
                        setStored('options', { ...options, clock_show_icons: !options.clock_show_icons });
                        updateData();
                      }}
                      size='medium'
                    />
                    {/* Clock inner digital clock */}
                    <BoolSetting
                      title="Show Digital"
                      description={"Show the digital clock beneath the analogs."}
                      current={options.clock_show_digital}
                      onSubmit={() => {
                        setStored('options', { ...options, clock_show_digital: !options.clock_show_digital });
                        updateData();
                      }}
                      size='medium'
                      />
                    {/* Clock inner digital clock background */}
                    <BoolSetting
                      title="Show Digital Background"
                      description={"Give the digital clock a background."}
                      current={options.clock_show_digital_background}
                      onSubmit={() => {
                        setStored('options', { ...options, clock_show_digital_background: !options.clock_show_digital_background });
                        updateData();
                      }}
                      size='medium'
                      disabled={!options.clock_show_digital}
                      />
                    {/* Clock timely background color */}
                    <BoolSetting
                      title="Timely Background Color"
                      description={"The clock's background goes dark at night and light at day."}
                      current={options.clock_background_style !== "none" && options.clock_background_affected}
                      onSubmit={() => {
                        setStored('options', { ...options, clock_background_affected: !options.clock_background_affected });
                        updateData();
                      }}
                      size='medium'
                      disabled={options.clock_background_style === "none"}
                      />
                  </>
                : null }
              </>
            }
          />
  
          {/* ========= Other settings ========= */}
          <Sep margin={consts.margin} />
          <Title title='Others'/>

          {/* Refresh button */}
          <BoolSetting
            title="Refresh Button"
            description="Show weather refresh button anyway."
            current={options.show_refresh_button}
            onSubmit={() => {
              setStored('options', { ...options, show_refresh_button: !options.show_refresh_button });
              updateData();
            }}
            size='medium'
          />
          {/* Full screen */}
          <BoolSetting
            title="Full screen"
            description={"Hide both navigation (android only) and status bar."}
            experimental
            current={fullscreen}
            onSubmit={() => {
              updateFullscreen(!fullscreen);
              setFullscreen(!fullscreen);
            }}
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
                    icon={{ name: "reload" }}
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
                  icon={{ name: "checkmark" }}
                />
                <Button
                  title={"No"}
                  style={{ flex: 1, borderColor: colors.red, marginLeft: "1.5%" }}
                  onPress={() => {
                      setResetPressed(false);
                    }}
                    icon={{ name: "close" }}
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
              (v{appConsts.version})
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

const consts = {
  margin: 20
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
