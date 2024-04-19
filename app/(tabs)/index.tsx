import{ useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl, Platform } from 'react-native';

import { B, Button, C, Section, T, Sep } from '@/components/basics';
import { getTime, getGreet } from '@/src/general/funcs';
import { ITime } from "@/src/general/interfaces";
import { IForecast, WeatherIconID, fetchWeather } from '@/src/weather';
import { WeatherIcon } from '@/components/weather/ascii-art';
import { State } from '@/src/general/types';

import { TodaysQuote, TodaysWord } from '@/components/home';
import { useColors } from '@/constants/colors';
import consts from '@/constants/consts';
import { SettingsContext } from '@/components/Contexts';
import { AxiosError } from 'axios';
 
export default function HomePage() : React.JSX.Element {
  const colors = useColors();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [colonBlink, setColonBlink] = useState<boolean>(false);
  const [unitWidth, setUnitWidth] = useState<number>(13);
  const [feelsWidth, setFeelsWidth] = useState<number>(13);
  const [msg, setMsg] = useState<string>("loading...");

  const [greet, setGreet] = useState<string>(getGreet());
  const [time, setTime] = useState<ITime>(getTime());

  const updateData = useContext(SettingsContext).updateSettings;
  const { user, metrics, options } = useContext(SettingsContext).settings;
  
  const [weather, updateWeather] = useState<IForecast | null>(null);

  const onRefresh = useCallback(() => {
    setMsg("Loading...")
    setRefreshing(true);
    updateData();
    fetchWeather(metrics.city, metrics.units, updateWeather as State<IForecast>)
      .catch((e:AxiosError) => {
        updateWeather(null);
        setTimeout(() =>
        setMsg(e.response?.status === 404
          ? "Wrong input"
          : "No connection..."
          )
          , 250)
      });

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);

  }, [metrics.city, metrics.units]);

  useEffect(() => {
    onRefresh();
  }, [metrics.city, metrics.units])

  useEffect(() => {
    updateData();
    setColonBlink(!colonBlink);
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
            <T style={styles.weatherCity}>{weather?.name ?? `${metrics.city}?`}</T>
            <T style={[styles.weatherSubtextT, { color: colors.secondary }]}>{weather?.sys.country ?? "??"}</T>

            {/* Weather icon */}
            <WeatherIcon id={weather?.weather[0].icon as WeatherIconID} size={12} theme={colors.theme} />
  
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
                {weather?.weather[0].main ?? msg}
                <C.SECONDARY>{' }-'}</C.SECONDARY>
                <C.ACCENT>•</C.ACCENT>
              </T>
              <T style={[styles.weatherSubtextT, { color: colors.secondary }]}>
                ({weather?.weather[0].description ?? "..."})
              </T>
            </View>

            {/* High & low */}
            {/* <View style={styles.weatherMaxMinContainer}>
                <View style={styles.weatherMaxMin}>
                  <T style={styles.weatherOthersIcon}>
                    <C.HOT><B>H</B></C.HOT>:
                  </T>
                  <T style={[styles.weatherSubtextT, { color: colors.secondary }]}>
                    {Math.ceil(weather?.main.temp_max ?? 0)}°{weather?.units === "imperial" ? "F" : "C"}
                  </T>
                </View>

                <View style={{ height: "80%", width: 1, backgroundColor: colors.tertiary }} />

                <View style={styles.weatherMaxMin}>
                  <T style={styles.weatherOthersIcon}>
                    <C.COLD><B>L</B></C.COLD>:
                  </T>
                  <T style={[styles.weatherSubtextT, { color: colors.secondary }]}>
                    {Math.floor(weather?.main.temp_min ?? 0)}°{weather?.units === "imperial" ? "F" : "C"}
                  </T>
                </View>
            </View> */}

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

        <View style={styles.timeContainer}>
          <T style={{ fontFamily: colors.others.fonts.clock, fontSize: 45 }}>
            <C.HIGHLIGHT>{time.hour < 10 ? `0${time.hour}` : time.hour}</C.HIGHLIGHT>
            <T style={{ opacity: colonBlink ? 1 : 0.25 }} plain>:</T>
            <C.HIGHLIGHT>{time.minute < 10 ? `0${time.minute}` : time.minute}</C.HIGHLIGHT>
          </T>
          <T style={styles.timezone}>
            <C.SECONDARY>
              UTC
              {time.offset > 0 ? '-' : '+'}{Math.abs(time.offsetH) < 10 ? `0${Math.abs(time.offsetH)}` : Math.abs(time.offsetH)}
              :
              {time.offsetM < 10 ? `0${time.offsetM}` : time.offsetM}
            </C.SECONDARY>
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
          <TodaysWord date={time} shortClass={options.short_word_class} />
          <TodaysQuote date={time} />
        </View>

      </ScrollView>

    </Section>
    {
      options.show_refresh_button
      ? <Button
          title={refreshing ? "Refreshing" : ""}
          style={{ position: "absolute", bottom: 0, alignSelf: 'center', zIndex: 5, width: "auto", paddingVertical: refreshing ? 0 : 5, paddingHorizontal: 5 }}
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

  // weatherMaxMinContainer: {
  //   flexDirection: "row",
  //   alignSelf: "center",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 5,
  // },

  // weatherMaxMin: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginHorizontal: 5,
  // },

  weatherOthers: {
    flexDirection: "row",
    width: "60%",
    flexWrap: 'wrap',
    paddingLeft: "10%",
    marginTop: 15,
  },

  weatherOthersCard: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },

  weatherOthersIcon: {
    width: 20,
    textAlign: 'center'
  },

  timeContainer: {
    alignSelf: "center",
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  timezone: {
    fontSize: 10,
    marginTop: -10
  },

  greetT: {
    fontSize: 18,
    textAlign: 'center',
  },
});
