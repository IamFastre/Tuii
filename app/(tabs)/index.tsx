import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl, Platform } from 'react-native';

import { B, Button, C, Section, T } from '@/components/basics';
import { getTime, getGreet } from '@/src/general/funcs';
import { ITime } from "@/src/general/interfaces";
import { IWeatherResponse, WeatherIconID, fetchWeather } from '@/src/weather';
import { WeatherIcon } from '@/components/weather/ascii-art';
import { Sep } from '@/components/settings';
import { State } from '@/src/general/types';

import { TodaysQuote, TodaysWord } from '@/components/home';
import { useColors } from '@/constants/colors';
import consts from '@/constants/consts';
import { SettingsContext } from '@/components/Contexts';
 
export default function HomePage() : React.JSX.Element {
  const colors = useColors();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [unitWidth, setUnitWidth] = useState<number>(13);
  const [feelsWidth, setFeelsWidth] = useState<number>(13);

  const [greet, setGreet] = useState<string>(getGreet());
  const [time, setTime] = useState<ITime>(getTime());

  const updateData = useContext(SettingsContext).updateSettings;
  const { user, metrics, options } = useContext(SettingsContext).settings;
  
  const [weather, updateWeather] = useState<IWeatherResponse | null>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    updateData();
    fetchWeather(metrics.city, metrics.units, updateWeather as State<IWeatherResponse>);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);

  }, [metrics.city, metrics.units]);

  useEffect(() => {
    onRefresh();
  }, [metrics.city, metrics.units])

  useEffect(() => {
    updateData();
  }, [time.second])

  useEffect(() => {
    const int = setInterval(() => {
      setGreet(getGreet());
      setTime(getTime());
    }, 200);
    return () => clearInterval(int);
  }, [greet, time]);


  return (
    <>
    <Section title="Home Page" style={{ flex:1 }}>
      <colors.others.background />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.homeContainer}
        refreshControl={
          <RefreshControl
            progressViewOffset={Platform.OS === "android" ? 0 : 15}
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={colors.accent}
            tintColor={colors.accent}
          />
        }
      >
        {/* ================================================================== */}
        {/*                         { Weather Card }                           */}
        {/* ================================================================== */}

        <View style={styles.weather}>
          <View style={styles.weatherCard}>
            {/* City, country */}
            <T style={styles.weatherCity}>{weather?.name}</T>
            <T style={[styles.weatherSubtextT, { color: colors.secondary }]}>{weather?.sys.country}</T>

            {/* Weather icon */}
            <WeatherIcon id={weather?.weather[0].icon as WeatherIconID} size={12}/>
  
            {/* Weather description */}
            <View style={styles.weatherTexts}>
              {/* Temperature */}
              <View>
                <T style={styles.weatherTempT} selectable>
                  <B>{Math.round((weather?.main.temp ?? 0)).toString()}</B>°
                </T>
                {/* Temperature unit */}
                <T style={{...styles.weatherSubtextT, color: colors.secondary, ...styles.weatherUnit, right: -unitWidth}} onLayout={(event) => setUnitWidth(event.nativeEvent.layout.width)}>
                  <B>
                    <C.TERTIARY>
                      {weather?.units === "imperial" ? "F" : "C"}
                    </C.TERTIARY>
                  </B>
                </T>
                {/* Feels like */}
                <T style={{...styles.weatherSubtextT, color: colors.secondary, ...styles.weatherFeels, right: -feelsWidth}} onLayout={(event) => setFeelsWidth(Math.round(event.nativeEvent.layout.width * ((weather?.main.feels_like_difference ?? 0).toString().length / ((weather?.main.feels_like_difference ?? 0).toString().length + 1))) + 1)}>
                  {(weather?.main.feels_like_difference ?? 0) >= 0 ? "+" : ""}
                  {weather?.main.feels_like_difference ?? 0}
                </T>
              </View>
              {/* Weather status */}
              <T style={styles.weatherMainT}>
                <C.ACCENT>•</C.ACCENT>
                <C.SECONDARY>{'-{ '}</C.SECONDARY>
                {weather?.weather[0].main ?? "Loading..."}
                <C.SECONDARY>{' }-'}</C.SECONDARY>
                <C.ACCENT>•</C.ACCENT>
              </T>
              <T style={[styles.weatherSubtextT, { color: colors.secondary }]}>
                ({weather?.weather[0].description ?? "..."})
              </T>
            </View>
            {/* Others */}
            <View style={styles.weatherOthers}>
              {/* Wind */}
              <View style={styles.weatherOthersCard}>
                <T style={[styles.weatherOthersIcon, {transform: [{rotate: `${weather?.wind.deg ?? 0}deg`}]}]}>
                  <C.ACCENT><B>↑</B></C.ACCENT>
                </T>
                <T style={[styles.weatherSubtextT, { color: colors.secondary }]}>
                  {weather?.wind.speed ?? 0}{weather?.units === "imperial" ? "mph" : "m/s"}
                </T>
              </View>
              {/* Humidity */}
              <View style={styles.weatherOthersCard}>
                <T style={styles.weatherOthersIcon}>
                  <C.ACCENT><B>☵</B></C.ACCENT>
                </T>
                <T style={[styles.weatherSubtextT, { color: colors.secondary }]}>
                  {weather?.main.humidity ?? 0}%
                </T>
              </View>
              {/* Visibility */}
              <View style={styles.weatherOthersCard}>
                <T style={styles.weatherOthersIcon}>
                  <C.ACCENT><B>◎</B></C.ACCENT>
                </T>
                <T style={[styles.weatherSubtextT, { color: colors.secondary }]}>
                  {(weather?.visibility ?? 0) === 10000 ? ">" : ""}
                  {weather?.units === "imperial" ? Math.round(((weather?.visibility ?? 0))/160.9)/10 : Math.round((weather?.visibility ?? 0)/100)/10}
                  {weather?.units === "imperial" ? "mi" : "km"}
                </T>
              </View>
              {/* Pressure */}
              <View style={styles.weatherOthersCard}>
                <T style={styles.weatherOthersIcon}>
                  <C.ACCENT><B>▼</B></C.ACCENT>
                </T>
                <T style={[styles.weatherSubtextT, { color: colors.secondary }]}>
                  {weather?.main.pressure ?? 0}hPa
                </T>
              </View>
            </View>
          </View>
        </View>

        <Sep margin={50} />

        {/* ================================================================== */}
        {/*                              { Time }                              */}
        {/* ================================================================== */}

        <View style={{ alignSelf: "center", marginBottom: 20 }}>
          <T style={{ fontFamily: colors.others.fonts.clock, fontSize: 45 }}>
            {'{ '}
            <C.HIGHLIGHT>{time.hour < 10 ? `0${time.hour}` : time.hour}</C.HIGHLIGHT>
            :
            <C.HIGHLIGHT>{time.minute < 10 ? `0${time.minute}` : time.minute}</C.HIGHLIGHT>
            {' }'}
          </T>
        </View>

        {/* ================================================================== */}
        {/*                            { Greeting }                            */}
        {/* ================================================================== */}

        <T style={styles.greetT}>
          {getGreet()}, {user?.gender === "male" ? "Mr. " : user?.gender === "female" ? "Ms. " : ""}
          <B><C.SECONDARY>{user?.name ?? "???"}</C.SECONDARY></B>
          {user?.gender === "other" ? " thing" : ""}!
        </T>

        <Sep margin={50} />

        {/* ================================================================== */}
        {/*                         { Word of the day }                        */}
        {/* ================================================================== */}
  
        <View style={{ flexDirection: consts.height > consts.width ? 'column' : 'row', justifyContent: 'center', width: "100%"}}>
          <TodaysWord date={time} />
          <TodaysQuote date={time} />
        </View>

      </ScrollView>

    </Section>
    {
      Platform.OS === 'web' || options.show_refresh_button
      ? <Button
          title={refreshing ? "Refreshing" : ""}
          style={{ position: "absolute", bottom: 0, alignSelf: 'center', zIndex: 5, width: "auto" }}
          icon={{ name: 'reload-circle' }}
          onPress={onRefresh}
        />
      : null
    }
    </>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },

  weather: {
    marginTop: 30,
    width: "100%",
  },
  
  weatherCity: {
    fontSize: 18,
    alignSelf: "center"
  },
  
  weatherCard: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  weatherTexts: {
    alignItems: "center",
    justifyContent: "center",  
  },

  weatherTempT: {
    fontSize: 30,
    lineHeight: 30,
    paddingLeft: 16,
  },

  weatherUnit: {
    position: "absolute",
    right: 0,
    top: 0,
  },

  weatherFeels: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  weatherMainT: {
    fontSize: 22,
    marginVertical: 5,
  },

  weatherSubtextT: {
    fontSize: 12,
  },

  weatherOthers: {
    flexDirection: "row",
    width: "60%",
    flexWrap: 'wrap',
    paddingLeft: "10%",
    marginTop: 10,
  },

  weatherOthersCard: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },

  weatherOthersIcon: {
    marginRight: 5,
    width: 12,
    textAlign: 'center'
  },

  greetT: {
    fontSize: 18,
    textAlign: 'center',
  },
});
