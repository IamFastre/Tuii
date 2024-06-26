import { useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl, Platform } from 'react-native';
import { AxiosError } from 'axios';

import { B, Button, C, Section, T, Sep } from '@/components/basics';
import { getTime, getGreet, removeAt } from '@/src/general/funcs';
import { ITime } from "@/src/general/interfaces";
import { IForecast, WeatherIconID, fetchWeather } from '@/src/weather';
import { WeatherIcon } from '@/components/weather/WeatherIcons';

import { SettingsContext, TabsContext } from '@/components/Contexts';
import { Time, TodaysQuote, TodaysWord } from '@/components/home';
import { useColors } from '@/constants/colors';
import consts from '@/constants/consts';
 
export default function HomePage() : React.JSX.Element {
  const colors = useColors();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("loading...");

  const [greet, setGreet] = useState<string>(getGreet());
  const [time, setTime] = useState<ITime>(getTime());

  const updateData = useContext(SettingsContext).updateSettings;
  const { user, metrics, options } = useContext(SettingsContext).settings;
  const { isClicked } = useContext(TabsContext);
  
  const [weather, updateWeather] = useState<IForecast | null>(null);

  const onRefresh = useCallback(() => {
    setMsg("Loading...")
    setRefreshing(true);
    updateData();
    fetchWeather(metrics.city, metrics.units, updateWeather)
      .catch((e:AxiosError) => {
        setRefreshing(false);
        setTimeout(() =>
        setMsg(e.response?.status === 404
          ? "Wrong input"
          : "No connection..."
          )
          , 250)
      });

    setTimeout(() => {
      setRefreshing(false);
    }, 750);

  }, [metrics.city, metrics.units]);

  useEffect(() => {
    onRefresh();
  }, [metrics.city, metrics.units])

  useEffect(() => {
    const int = setInterval(() => {
      setGreet(getGreet());
      setTime(getTime());
    }, 200);
    return () => clearInterval(int);
  }, [greet, time]);


  const l = colors.brackets.left.curly;
  const r = colors.brackets.right.curly;

  return (
    <>
    <Section title="Home Page" style={{ flex:1 }} containerStyle={isClicked ? { borderColor: colors.accent } : { }}>
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
            <WeatherIcon id={weather?.weather[0].icon as WeatherIconID} size={12} theme={colors.others.weather_icon_pack} pack={options.weather_icon_pack} />
  
            {/* Weather description */}
            <View style={styles.weatherTexts}>
              {/* Temperature */}
              <View style={{ flexDirection: 'row' }}>
                <T style={styles.weatherTempT} selectable>
                  <B>{Math.round((weather?.main.temp ?? 0)).toString()}</B>°
                </T>
                {/* Feels like */}
                <View style={styles.weatherFeelsContainer}>
                  <T style={[styles.weatherSubtextT, styles.weatherFeels, { color: colors.secondary }]}>
                    {(weather?.main.feels_like_difference ?? 0) >= 0 ? "+" : ""}
                    {weather?.main.feels_like_difference ?? 0}
                  </T>
                </View>
                {/* Temperature unit */}
                <View style={styles.weatherUnitContainer}>
                  <T style={[styles.weatherSubtextT, styles.weatherUnit, { color: colors.secondary }]}>
                    <B>
                      <C.TERTIARY>
                        {weather?.units === "imperial" ? "F" : "C"}
                      </C.TERTIARY>
                    </B>
                  </T>
                </View>
              </View>
              {/* Weather status */}
              <T style={styles.weatherMainT}>
                <C.ACCENT>{l[0]}</C.ACCENT>
                <C.SECONDARY>{removeAt(l, 0)}</C.SECONDARY>
                {weather?.weather[0].main ?? msg}
                <C.SECONDARY>{removeAt(r, r.length-1)}</C.SECONDARY>
                <C.ACCENT>{r[r.length-1]}</C.ACCENT>
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

        <Time
          time={time}
          type={options.clock_style}
          showTimezone={options.show_timezone}
          analogOptions={{
            scale: 0.6,
            margin: 10,
            color: options.clock_foreground_color,
            dashes: options.clock_dashes_style,
            background: options.clock_background_style,
            numerals: options.clock_numerals_style,
            showIcon: options.clock_show_icons,
            showDigital: options.clock_show_digital,
            showDigitalBackground: options.clock_show_digital_background,
            backgroundAffected: options.clock_background_affected,
          }}
        />

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
  
        <View style={styles.cardsContainer}>
          <TodaysWord date={time} shortClass={options.short_word_class} />
          <TodaysQuote date={time} />
        </View>

      </ScrollView>

    </Section>
    <Button
      title={refreshing ? "Refreshing" : ""}
      style={{
        display: options.show_refresh_button ? "flex" : "none",
        alignSelf: "center",
        position: "absolute",
        bottom: 0,
        zIndex: 5,
        aspectRatio: refreshing ? 5 : 1,
      }}
      icon={{ name: "reload-circle" }}
      onPress={onRefresh}
      radiusFactor={2}
      opaque
    />
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

  weatherUnitContainer: {
    alignSelf: 'flex-start',
    width: 0,
    height: 0,
    overflow: 'visible'
  },

  weatherUnit: {
    position: "absolute",
    left: 0,
    top: 0,
  },

  weatherFeelsContainer: {
    alignSelf: 'flex-end',
    width: 0,
    height: 0,
    overflow: 'visible'
  },

  weatherFeels: {
    position: "absolute",
    left: 0,
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

  greetT: {
    fontSize: 18,
    textAlign: 'center',
  },

  cardsContainer: {
    flexDirection: consts.height > consts.width ? 'column' : 'row',
    justifyContent: 'center',
    width: "100%"
  },
});
