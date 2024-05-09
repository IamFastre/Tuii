import { StyleSheet, View } from "react-native";

import { C, T } from '@/components/basics';
import { ClockStyle, ITime } from "@/src/general";

import { AnalogClock, ClockProps } from "./AnalogClock";
import { DigitalClock } from "./DigitalClock";

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