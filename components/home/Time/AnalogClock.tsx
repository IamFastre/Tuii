import { useEffect, useState } from 'react';
import { View, StyleSheet, ColorValue } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Circle, G, Line, Path, Rect, Svg, SvgProps } from 'react-native-svg';

import { useColors } from '@/constants/colors';
import { C, T } from '@/components/basics';
import { ClockBGStyle, ClockDHStyle, ClockFGColors, getTime, ITime } from '@/src/general';

export interface ClockProps {
  time: ITime;
  scale: number;
  color: ClockFGColors;
  margin?: number;
  dashes: ClockDHStyle;
  background: ClockBGStyle;
  showDigital: boolean;
  showDigitalBackground: boolean;
  showIcon: boolean;
  showNumbers: boolean;
  backgroundAffected: boolean;
}

const Background = ({ type, fill, stroke }:{ type:ClockBGStyle; fill:ColorValue; stroke:ColorValue; }) => {
  return type !== "none" ? (
    type === "circle"
    ? <Circle
        r={40}
        cx={50} cy={50}
        fill={fill}
        stroke={stroke}
        strokeWidth={0.5}
      /> :
    type === "square"
    ? <Rect
        x={10} y={10}
        height={80}
        width={80}
        fill={fill}
        stroke={stroke}
        strokeWidth={0.5}
        rx={7.5} ry={7.5}
      /> :
    type === "hexagon"
    ? <Path
        fill={fill}
        stroke={stroke}
        strokeWidth={0.5}
        d="M68.75,10l-37.49,0c-2.68,0-5.16,1.43-6.5,3.75L6,46.25c-1.34,2.32-1.34,5.18,0,7.5l18.75,32.5
        c1.34,2.32,3.82,3.75,6.5,3.75l37.49,0c2.68,0,5.16-1.43,6.5-3.75L94,53.75c1.34-2.32,1.34-5.18,0-7.5l-18.75-32.5
        C73.9,11.43,71.43,10,68.75,10z"
      />
    : <G/>
  ) : null;
}

const Dashes = ({ type, fill }:{ type:ClockDHStyle; fill:ColorValue; }) => {
  return type !== "none" ? (
    <G
      x={13} y={13}
      scale={0.74}
      fill={fill}
    >
      <Path 
        d={
          type === "12-dashes" ?
            "M10.6 71.3 6 73.8c.2.4.4.8.7 1.2.2.4.5.8.7 1.2l4.4-2.7c-.2-.3-.4-.7-.6-1.1-.2-.4-.4-.7-.6-1.1zM27.6 11.2c.4-.2.7-.4 1.1-.6L26.2 6c-.4.2-.8.4-1.2.7-.4.2-.8.5-1.2.7l2.7 4.4c.4-.2.8-.4 1.1-.6zM89.4 28.7l4.6-2.5c-.2-.4-.4-.8-.7-1.2-.2-.4-.5-.8-.7-1.2l-4.4 2.7c.2.3.4.7.6 1.1.2.4.4.7.6 1.1zM50 9.2h1.2l.2-9.2h-2.8l.1 9.2H50zM6.7 25c-.2.4-.5.8-.7 1.2l4.6 2.5c.2-.4.4-.7.6-1.1.2-.4.4-.7.6-1.1l-4.5-2.7c-.1.4-.4.8-.6 1.2zM73.5 11.9l2.7-4.5c-.4-.2-.8-.5-1.2-.7-.4-.2-.8-.5-1.2-.7l-2.5 4.6c.4.2.7.4 1.1.6.3.2.7.4 1.1.7zM0 48.6v2.8l9.2-.1v-2.4L0 48.6zM100 48.6l-9.2.1v2.4l9.2.1V48.6zM88.8 72.4c-.2.4-.4.7-.6 1.1l4.5 2.7c.2-.4.5-.8.7-1.2.2-.4.5-.8.7-1.2l-4.6-2.5c-.3.4-.5.7-.7 1.1zM26.6 88.1l-2.7 4.5c.4.2.8.5 1.2.7.4.2.8.5 1.2.7l2.5-4.6c-.4-.2-.7-.4-1.1-.6-.4-.2-.8-.4-1.1-.7zM50 90.8h-1.2l-.1 9.2h2.8l-.1-9.2H50zM72.4 88.8c-.4.2-.7.4-1.1.6l2.5 4.6c.4-.2.8-.4 1.2-.7.4-.2.8-.5 1.2-.7l-2.7-4.4c-.4.2-.8.4-1.1.6z" :
          type === "60-dashes" ?
            "M92.3 49.1v1.8h7.7v-1.8h-7.7zM93.6 75.8l.7-1.2-5.2-3c-.2.4-.5.8-.7 1.2l5.2 3zM74.8 94l1.2-.7-3-5.1c-.4.2-.8.5-1.2.7l3 5.1zM49.2 92.3l.1 7.7h1.8l-.1-7.7h-1.8zM24.3 93.6l1.2.7 2.9-5.2c-.4-.2-.8-.4-1.2-.7l-2.9 5.2zM5.9 74.9l.7 1.2 5.1-3c-.2-.4-.5-.8-.7-1.2l-5.1 3zM7.7 49.3l-7.7.1v1.8l7.7-.1v-1.8zM96.9 55.2l2.9.3v-.8l-2.8-.3zM96.2 60l2.7.6.2-.8-2.8-.6zM94.8 64.7l2.7.8.3-.7-2.7-.9zM93.1 69.2l2.6 1.2.3-.8-2.6-1.1zM88 78.2l2.3 1.6.5-.6-2.3-1.7zM84.9 81.9l2.1 1.9.6-.6-2.1-1.9zM81.5 85.4l1.9 2.1.6-.6-1.9-2.1zM77.8 88.4l1.7 2.3.6-.5-1.7-2.3zM68.9 93.5l1.1 2.6.7-.4-1.1-2.6zM64.3 95.1l.9 2.8.7-.3-.9-2.7zM59.7 96.4l.6 2.8.8-.2-.6-2.8zM54.8 97.1l.4 2.9.7-.1-.3-2.9zM44.3 99.9l.8.1.3-2.8-.8-.1zM39.3 99l.8.2.6-2.8-.8-.2zM34.3 97.6l.8.3.9-2.7-.8-.3zM29.5 95.8l.8.3 1.1-2.6-.7-.3zM22 87.9l-1.7 2.3.6.5 1.7-2.3zM18.2 84.8l-1.9 2.1.6.6 1.9-2.1zM14.8 81.5l-2.1 1.9.6.6 2.1-1.9zM11.8 77.5l-2.2 1.7.4.6 2.3-1.7zM6.8 68.7l-2.6 1.1.3.8 2.6-1.2zM5.1 64l-2.7.9.3.7 2.7-.8zM4 59.3l-2.8.6.2.7 2.7-.5zM.371 54.848l2.786-.286.081.796-2.785.285zM6.5 24.2l-.7 1.2 5.1 2.9c.2-.4.5-.8.7-1.2l-5.1-2.9zM25.3 5.9l-1.2.7 3 5.1c.4-.2.8-.5 1.2-.7l-3-5.1zM50.9 7.7 50.8 0H49l.1 7.7h1.8zM75.8 6.4l-1.2-.7-3 5.3c.4.2.8.5 1.2.7l3-5.3zM94.2 25.1l-.7-1.2-5.1 3.1c.2.4.5.8.7 1.2l5.1-3.1zM3.2 44.7l-2.8-.3-.1.8 2.8.3zM3.9 40l-2.8-.6-.1.8 2.8.6zM5.2 35.3l-2.7-.9-.2.8 2.7.9zM6.9 30.7l-2.6-1.1-.3.7 2.6 1.1zM12.1 21.9l-2.3-1.7-.5.7 2.3 1.6zM15.2 18l-2.1-1.9-.6.6 2.1 1.9zM18.6 14.7l-1.9-2.1-.6.5 1.9 2.1zM22.3 11.7l-1.6-2.3-.7.4 1.7 2.3zM31.2 6.5l-1.1-2.6-.8.3 1.2 2.6zM35.8 4.8l-.9-2.7-.8.3.9 2.7zM40.4 3.6 39.8.8l-.8.1.6 2.8zM45.2 2.9 44.9 0l-.8.1.4 2.8zM55.8.1 55 0l-.3 2.8.8.1zM60.8 1 60 .8l-.6 2.8.8.1zM65.7 2.4l-.7-.3-.9 2.7.8.3zM70.5 4.2l-.7-.3-1.2 2.6.8.3zM78.1 12l1.7-2.3-.6-.4-1.7 2.3zM81.9 15.1l1.9-2.1-.6-.5-1.9 2.1zM85.3 18.6l2.1-1.9-.5-.6-2.1 1.9zM88.3 22.4l2.2-1.7-.4-.6-2.3 1.6zM93.3 31.3l2.6-1.1-.3-.7-2.6 1.1zM94.9 35.9l2.8-.9-.3-.7-2.7.8zM96.2 40.7l2.7-.6-.1-.8-2.8.6zM96.9 45.5l2.8-.3-.1-.8-2.8.3z" :
          type === "12-dots" ?
            "M50 8.7c-1.6 0-2.9-1.3-2.9-2.9V2.9C47.1 1.3 48.4 0 50 0c1.6 0 2.9 1.3 2.9 2.9v2.9c0 1.6-1.3 2.9-2.9 2.9zM50 100c-1.6 0-2.9-1.3-2.9-2.9v-2.9c0-1.6 1.3-2.9 2.9-2.9 1.6 0 2.9 1.3 2.9 2.9v2.9c0 1.6-1.3 2.9-2.9 2.9zM97.1 52.9h-3.4c-1.6 0-2.9-1.3-2.9-2.9s1.3-2.9 2.9-2.9h3.4c1.6 0 2.9 1.3 2.9 2.9 0 1.6-1.3 2.9-2.9 2.9zM6.2 52.9H2.9C1.3 52.9 0 51.6 0 50s1.3-2.9 2.9-2.9h3.4c1.6 0 2.9 1.3 2.9 2.9s-1.4 2.9-3 2.9zM70.7,8.8a2.9,2.9 0 1,0 5.8,0a2.9,2.9 0 1,0 -5.8,0M88,26.2a2.9,2.9 0 1,0 5.8,0a2.9,2.9 0 1,0 -5.8,0M88,73.8a2.9,2.9 0 1,0 5.8,0a2.9,2.9 0 1,0 -5.8,0M70.7,91.2a2.9,2.9 0 1,0 5.8,0a2.9,2.9 0 1,0 -5.8,0M23.5,91.2a2.9,2.9 0 1,0 5.8,0a2.9,2.9 0 1,0 -5.8,0M6.2,73.8a2.9,2.9 0 1,0 5.8,0a2.9,2.9 0 1,0 -5.8,0M6.2,26.2a2.9,2.9 0 1,0 5.8,0a2.9,2.9 0 1,0 -5.8,0M23.5,8.8a2.9,2.9 0 1,0 5.8,0a2.9,2.9 0 1,0 -5.8,0" :
          type === "8-circle" ?
            "M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm48.3 51.9c-.4 11.5-5 22.6-12.8 31l-.7.8-4.6-4.6c-.3-.3-.8-.3-1.1 0-.3.3-.3.8 0 1.1l4.6 4.6-.8.7c-8.5 7.8-19.5 12.4-31 12.8h-1.1v-6.5c0-.4-.4-.8-.8-.8s-.8.4-.8.8v6.5h-1.1c-11.5-.4-22.5-5-31-12.8l-.8-.7 4.6-4.6c.3-.3.3-.8 0-1.1-.3-.3-.8-.3-1.1 0l-4.6 4.6-.7-.8c-7.8-8.5-12.4-19.5-12.8-31v-1.1h6.5c.4 0 .8-.4.8-.8s-.4-.8-.8-.8H1.6v-1.1c.4-11.5 5-22.5 12.8-31l.7-.8 4.6 4.6c.3.3.8.3 1.1 0 .3-.3.3-.8 0-1.1l-4.6-4.6.8-.7C25.5 6.7 36.5 2.1 48 1.7h1.1v6.5c0 .4.4.8.8.8s.8-.4.8-.8V1.6h1.1c11.5.4 22.6 5 31 12.8l.8.7-4.6 4.6c-.2.2-.2.4-.2.6 0 .2.1.4.2.6.3.3.8.3 1.1 0l4.6-4.6.7.8c7.8 8.5 12.4 19.5 12.8 31v1.1h-6.5c-.4 0-.8.4-.8.8s.4.8.8.8h6.5l.1 1.1z" :
          ""
        }
      />
    </G>
  ) : null;
};

const Digit = ({ time, degree, dashes, color }:{ time:string; degree:number; dashes?:boolean; color:ColorValue; }) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        padding: dashes ? 105 : 70,
        transform: [{ rotate: `${degree}deg` }]
      }}
    >
      <T
        style={{
          fontSize: dashes ? 20 : 28,
          color: color,
          fontFamily: useColors().others.fonts.S,
          transform: [{ rotate: `-${degree}deg` }]
        }}
      >
        {time}
      </T>
    </View>
  );
};

const Digits = ({ show, dashes, color }:{ show:boolean; dashes?:boolean; color:ColorValue; }) => {
  return show ? (
    <>
      <Digit time={"1"}  degree={30}  dashes={dashes} color={color} />
      <Digit time={"2"}  degree={60}  dashes={dashes} color={color} />
      <Digit time={"3"}  degree={90}  dashes={dashes} color={color} />
      <Digit time={"4"}  degree={120} dashes={dashes} color={color} />
      <Digit time={"5"}  degree={150} dashes={dashes} color={color} />
      <Digit time={"6"}  degree={180} dashes={dashes} color={color} />
      <Digit time={"7"}  degree={210} dashes={dashes} color={color} />
      <Digit time={"8"}  degree={240} dashes={dashes} color={color} />
      <Digit time={"9"}  degree={270} dashes={dashes} color={color} />
      <Digit time={"10"} degree={300} dashes={dashes} color={color} />
      <Digit time={"11"} degree={330} dashes={dashes} color={color} />
      <Digit time={"12"} degree={0}   dashes={dashes} color={color} />
    </>
  ) : null;
};

const Icon = ({ show, isDay, margin }:{ show?:boolean; isDay:boolean; margin:number; }) => {
  const colors = useColors();
  return show ? (
    <MaterialCommunityIcons
      name={isDay ? 'white-balance-sunny' : 'moon-waning-crescent'}
      color={isDay ? colors.yellow : colors.cold}
      size={isDay ? 40 : 35}
      style={{
        position: "absolute",
        alignSelf: "center",
        top: margin,
      }}
    />
  ) : null;
};

const DigitalClock = ({ show, time, hasBackground, color, other, margin }:{ show?:boolean; time:ITime; hasBackground?:boolean; color:ColorValue; other:ColorValue; margin:number; }) => {
  const colors = useColors();
  const [colonBlink, setColonBlink] = useState<boolean>(false);

  useEffect(() => {
    setColonBlink(!colonBlink);
  }, [Math.floor(time.stamp / 500)])

  return show ? (
    <View
      style={{
        position: "absolute",
        alignSelf: "center",
        bottom: margin,
        opacity: hasBackground ? 0.9 : 0.75,
        backgroundColor: hasBackground ? color : "transparent",
        padding: 5,
        borderRadius: 10,
      }}
    >
      <T
        style={{
          fontSize: hasBackground ? 28 : 32,
          fontFamily: colors.others.fonts.S,
          color: hasBackground ? other : color,
        }}
      >
        {time.hour < 10 ? `0${time.hour}` : time.hour}
        <C.HOT style={{ opacity: colonBlink ? 1 : 0.25 }}>:</C.HOT>
        {time.minute < 10 ? `0${time.minute}` : time.minute}
      </T>
    </View>
  ) : null;
};

const Analogs = ({ time, color, other }:{ time:ITime; color:ColorValue; other:ColorValue; }) => {
  const colors = useColors();
  return (
    <>
      <Line
        x1={50} y1={50}
        x2={50} y2={32}
        origin={[50, 50]}
        rotation={(time.hour + time.minute/60)*30}
        stroke={color}
        strokeLinecap='square'
        strokeWidth={2}
      />
      <Line
        x1={50} y1={50}
        x2={50} y2={27.5}
        origin={[50, 50]}
        rotation={time.minute*6}
        stroke={color}
        strokeLinecap='square'
        strokeWidth={1.25}
      />
      <Line
        x1={50} y1={55}
        x2={50} y2={22.5}
        origin={[50, 50]}
        rotation={time.second*6}
        stroke={colors.hot}
        strokeLinecap='round'
        strokeWidth={0.75}
      />
      <Circle
        r={1.5}
        cx={50} cy={50}
        fill={other}
        stroke={colors.hot}
        strokeWidth={0.75}
      />
    </>
  );
};

export const AnalogClock = ({ time, scale, color, margin, dashes, background, showDigital, showDigitalBackground, showIcon, showNumbers, backgroundAffected }:ClockProps) => {
  const colors = useColors();

  const showDashes = dashes !== "none";
  const innerObjectsMargin  = showDashes && showNumbers ? 150 : showDashes || showNumbers ? 130 : 100;

  backgroundAffected = background !== "none" && backgroundAffected;

  const isDay  = (18 > time.hour && time.hour >= 6);
  const light  = colors.statusbar === "light" ? colors.tertiary : colors.primary;
  const dark   = colors.statusbar !== "light" ? colors.tertiary : colors.primary;
  const bgclr  = !backgroundAffected ? colors.primary  : isDay ? light : dark;
  const analog = !backgroundAffected ? colors.tertiary : isDay ? dark : light;
  const high   = color === "analogs" ? analog : color === "accent" ? colors.accent : colors.highlight;

  const props:SvgProps = {
    style: { position: "absolute" },
    viewBox: `0 0 100 100`,
    height: "100%",
    width: "100%",
  }

  return (
    <View style={{ aspectRatio: 1, width: 500, margin: -(500 * (1-scale) / 2 + (250 * scale * 0.2)) + (margin ?? 0), transform: [{ scale }] }}>
      <Svg {...props}>
        <Background type={background} fill={bgclr} stroke={analog} />
        <Dashes type={dashes} fill={high} />
      </Svg>

      <Digits
        show={showNumbers}
        color={high}
        dashes={showDashes}
      />
      <Icon
        show={showIcon}
        isDay={isDay}
        margin={innerObjectsMargin}
      />
      <DigitalClock
        show={showDigital}
        time={time}
        color={analog}
        other={bgclr}
        hasBackground={showDigitalBackground}
        margin={innerObjectsMargin}
      />

      <Svg {...props}>
        <Analogs time={time} color={analog} other={bgclr} />
      </Svg>
    </View>
  );
};
