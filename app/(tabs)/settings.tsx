import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { C, L, Section, T, Button } from '@/components/basics';
import { ThemeOptions, UnitsOptions, UserGenderOptions } from '@/src/general/interfaces';
import { ToggleSetting, TextInputSetting, Title, Sep, BoolSetting } from '@/components/settings';
import { resetSettings, setStored } from '@/src/general/storage';
import consts from '@/constants/consts';
import { useColors } from '@/constants/colors';
import { updateFullscreen } from '@/src/general/funcs';
import { SettingsContext } from '@/components/Contexts';
import themes from '@/constants/themes';

const move = (toNext:boolean) => toNext ? next : prev;
const next = <T,>(list:T[], current:T) => list[((list.indexOf(current)+1) % list.length)];
const prev = <T,>(list:T[], current:T) => list[((list.length + list.indexOf(current) - 1) % list.length)];

export default function SettingsPage() {
  const colors = useColors();
  
  const [fullscreen, setFullscreen]  = useState<boolean>(false);

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
    setStored('user', {...user, name});
    updateData();
  };

  const onSubmitAge = () => {
    setStored('user', {...user, age:parseInt(age)});
    updateData();
  };

  const onSubmitGender = (forward:boolean = true) => {
    setStored('user', {...user, gender: move(forward)(UserGenderOptions, user.gender)});
    updateData();
  };


  /* ======================================================================== */
  /*                            { Weather Options }                           */
  /* ======================================================================== */

  const [city, setCity] = useState<string>("");

  const onSubmitCity = () => {
    setStored('metrics', {...metrics, city});
    updateData();
  };

  const onSubmitUnits = (forward:boolean = true) => {
    setStored('metrics', {...metrics, units: move(forward)(UnitsOptions, metrics.units)});
    updateData();
  };


  /* ======================================================================== */
  /*                               Other Options                              */
  /* ======================================================================== */

  const onSubmitTheme = (forward:boolean = true) => {
    setStored('options', {...options, theme: move(forward)(ThemeOptions, options.theme)});
    updateData();
  };

  const onSubmitRefreshButton = () => {
    setStored('options', {...options, show_refresh_button: !options.show_refresh_button});
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
          <ToggleSetting
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
          <ToggleSetting
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
          <ToggleSetting
            title="Color Theme"
            description={`The color palette used throughout the app.\nAvailable: ${Object.keys(themes).join(", ")}`}
            index={ThemeOptions.indexOf(options.theme)}
            options={ThemeOptions}
            onSubmit={onSubmitTheme}
            icon={options.theme === "system" ? "cog" : colors.icon}
            size='small'
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
            size='small'
          />

          {/* Full screen */}
          <BoolSetting
            title="Full screen"
            description={"Hide both navigation (android only) and status bar."}
            experimental
            current={fullscreen}
            onSubmit={onSubmitFullscreen}
            size='small'
          />


          {/* Reset Button */}
          <Button
            title={"Rest all"}
            style={{...styles.reset, borderColor: colors.other_hot}}
            onPress={() => {
              resetSettings();
              updateFullscreen(false);
              setFullscreen(false);
              updateData();
            }}
            icon={{ name: "reload-circle-outline", size: 12 }}
          />

          <T style={styles.footer}>
            <C.ACCENT>{'•-{ '}</C.ACCENT>
              Tuii
            <C.ACCENT>{' }-•'}</C.ACCENT>
            {'\n'}
            <L style={{ fontSize: 10 }}>
              (v{consts.version})
            </L>
            {'\n'}
            <C.MAIN2>
              by
              {' '}
              <C.ACCENT2>
                IamFastre
              </C.ACCENT2>
            </C.MAIN2>
          </T>

      </ScrollView>
    </Section>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    paddingTop: 5,
    alignItems: "center"
  },

  reset: {
    marginTop: 60,
  },

  footer: {
    marginTop: 50,
    marginBottom: 20,
    opacity: 0.4,
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center'
  } 
});
