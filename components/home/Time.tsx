import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useColors } from "@/constants/colors";
import { C, T } from '@/components/basics';
import { ClockStyle, ITime } from "@/src/general";
import { AnalogClock, ClockProps } from "@/app/others/clock";

const DigitalClock = ({ time }:{ time:ITime }) => {
  const colors = useColors();
  const [colonBlink, setColonBlink] = useState<boolean>(false);

  useEffect(() => {
    setColonBlink(!colonBlink);
  }, [Math.floor(time.stamp / 500)])

  return (
    <T style={{ fontFamily: colors.others.fonts.S, fontSize: 45 }}>
      <C.HIGHLIGHT>{time.hour < 10 ? `0${time.hour}` : time.hour}</C.HIGHLIGHT>
      <T style={{ opacity: colonBlink ? 1 : 0.25 }} plain>:</T>
      <C.HIGHLIGHT>{time.minute < 10 ? `0${time.minute}` : time.minute}</C.HIGHLIGHT>
    </T>
  );
}

export const Time = ({ time, type, showTimezone, analogOptions }:{ time:ITime; type:ClockStyle; showTimezone:boolean; analogOptions:Omit<ClockProps, "time">; }) => {

  return (
    <View style={styles.timeContainer}>
      { type === "digital" ?
        <DigitalClock time={time} />
      : type === "analog" ?
        <AnalogClock time={time} {...analogOptions as any} />
      : null
      }
      <T style={[styles.timezone, { display: showTimezone ? "flex" : "none" }]}>
        <C.SECONDARY>
          UTC
          {time.offset > 0 ? '-' : '+'}{Math.abs(time.offsetH) < 10 ? `0${Math.abs(time.offsetH)}` : Math.abs(time.offsetH)}
          :
          {time.offsetM < 10 ? `0${time.offsetM}` : time.offsetM}
        </C.SECONDARY>
      </T>
    </View>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    alignSelf: "center",
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  timezone: {
    fontSize: 10,
  },

});