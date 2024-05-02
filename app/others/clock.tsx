import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Circle, G, Line, Path, Rect, Svg } from 'react-native-svg';

import { useColors } from '@/constants/colors';
import { Page } from '@/components/screens';
import { Button, C, T } from '@/components/basics';
import { getTime, ITime } from '@/src/general';

export interface ClockProps {
  isCircle?: boolean;
  showDashes?: boolean;
  showDigital?: boolean;
  showIcon?: boolean;
}

export const Clock = ({ isCircle, showDashes, showDigital, showIcon }:ClockProps) => {
  const colors = useColors();
  const [time, setTime] = useState<ITime>(getTime());
  const [colonBlink, setColonBlink] = useState<boolean>(false);

  const isDay  = (18 > time.hour && time.hour >= 6);
  const bgclr  = isDay ? colors.tertiary : colors.primary;
  const analog = isDay ? colors.primary : colors.tertiary;

  useEffect(() => {
    setColonBlink(!colonBlink);
  }, [Math.floor(time.stamp / 500)])

  useEffect(() => {
    const int = setInterval(() => {
      setTime(getTime());
    }, 200);
    return () => clearInterval(int);
  }, [time]);

  return (
    <View style={{ aspectRatio: 1, width: 400 }}>
      <Svg
        height="100%"
        width="100%"
        style={{ position: "absolute" }}
        viewBox={`0 0 ${consts.width} ${consts.height}`}
      >
        {isCircle
        ? <Circle
            r={40}
            cx={50} cy={50}
            fill={bgclr}
            stroke={analog}
            strokeWidth={0.5}
          />
        : <Rect
            x={10} y={10}
            height={80}
            width={80}
            fill={bgclr}
            stroke={analog}
            strokeWidth={0.5}
            rx={7.5}
            ry={7.5}
          />}
        <G
          x={14} y={14}
          scale={0.72}
          fill={showDashes ? colors.accent : "transparent"}
        >
          <Path 
            d="M10.6 71.3 6 73.8c.2.4.4.8.7 1.2.2.4.5.8.7 1.2l4.4-2.7c-.2-.3-.4-.7-.6-1.1-.2-.4-.4-.7-.6-1.1zM27.6 11.2c.4-.2.7-.4 1.1-.6L26.2 6c-.4.2-.8.4-1.2.7-.4.2-.8.5-1.2.7l2.7 4.4c.4-.2.8-.4 1.1-.6zM89.4 28.7l4.6-2.5c-.2-.4-.4-.8-.7-1.2-.2-.4-.5-.8-.7-1.2l-4.4 2.7c.2.3.4.7.6 1.1.2.4.4.7.6 1.1zM50 9.2h1.2l.2-9.2h-2.8l.1 9.2H50zM6.7 25c-.2.4-.5.8-.7 1.2l4.6 2.5c.2-.4.4-.7.6-1.1.2-.4.4-.7.6-1.1l-4.5-2.7c-.1.4-.4.8-.6 1.2zM73.5 11.9l2.7-4.5c-.4-.2-.8-.5-1.2-.7-.4-.2-.8-.5-1.2-.7l-2.5 4.6c.4.2.7.4 1.1.6.3.2.7.4 1.1.7zM0 48.6v2.8l9.2-.1v-2.4L0 48.6zM100 48.6l-9.2.1v2.4l9.2.1V48.6zM88.8 72.4c-.2.4-.4.7-.6 1.1l4.5 2.7c.2-.4.5-.8.7-1.2.2-.4.5-.8.7-1.2l-4.6-2.5c-.3.4-.5.7-.7 1.1zM26.6 88.1l-2.7 4.5c.4.2.8.5 1.2.7.4.2.8.5 1.2.7l2.5-4.6c-.4-.2-.7-.4-1.1-.6-.4-.2-.8-.4-1.1-.7zM50 90.8h-1.2l-.1 9.2h2.8l-.1-9.2H50zM72.4 88.8c-.4.2-.7.4-1.1.6l2.5 4.6c.4-.2.8-.4 1.2-.7.4-.2.8-.5 1.2-.7l-2.7-4.4c-.4.2-.8.4-1.1.6z"
          />
        </G>
      </Svg>    
      {
        showIcon ?
        <Ionicons
          name={isDay ? 'sunny-outline' : 'moon'}
          color={isDay ? colors.yellow : colors.cold}
          size={35}
          style={{
            position: "absolute",
            alignSelf: "center",
            top: showDashes ? 100 : 70,
          }}
        />
        : null
      }
      {
        showDigital ?
        <T
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: showDashes ? 130 : 115,
            fontSize: 22,
            fontFamily: colors.others.fonts.S,
            opacity: 0.6,
            color: analog
          }}
        >
          {time.hour < 10 ? `0${time.hour}` : time.hour}
          <C.HOT style={{ opacity: colonBlink ? 1 : 0.25 }}>:</C.HOT>
          {time.minute < 10 ? `0${time.minute}` : time.minute}
        </T>
        : null
      }
      <Svg
        height="100%"
        width="100%"
        style={{ position: "absolute" }}
        viewBox={`0 0 ${consts.width} ${consts.height}`}
      >
        <Line
          x1={50} y1={50}
          x2={50} y2={32}
          origin={[50, 50]}
          rotation={(time.hour + time.minute/60)*30}
          stroke={analog}
          strokeLinecap='square'
          strokeWidth={1.5}
        />
        <Line
          x1={50} y1={50}
          x2={50} y2={27.5}
          origin={[50, 50]}
          rotation={time.minute*6}
          stroke={analog}
          strokeLinecap='square'
          strokeWidth={1}
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
        <Circle cx={50} cy={50} r={1.5} stroke={colors.hot} strokeWidth={0.75} />
      </Svg>
    </View>
  );
};


export default function ClockPage() : React.JSX.Element {
  const colors = useColors();
  const [isCircle, setIsCircle] = useState<boolean>(true);
  const [showDashes, setShowDashes] = useState<boolean>(true);
  const [showDigital, setShowDigital] = useState<boolean>(true);
  const [showIcon, setShowIcon] = useState<boolean>(true);


  return (
    <View style={{ flex:1 }}>
      <Page title="CLOCK" containerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
        <Clock isCircle={isCircle} showDashes={showDashes} showDigital={showDigital} showIcon={showIcon} />

        <View style={{ gap: 15, paddingHorizontal: 50 }}>
          <Button
            title='Toggle Circle/Square'
            pressableStyle={{ padding: 10 }}
            color={isCircle ? colors.cold : colors.hot}
            onPress={() => setIsCircle(!isCircle)}
          />
          <Button
            title='Toggle Show Dashes'
            pressableStyle={{ padding: 10 }}
            color={showDashes ? colors.cold : colors.hot}
            onPress={() => setShowDashes(!showDashes)}
          />
          <Button
            title='Toggle Show Digital'
            pressableStyle={{ padding: 10 }}
            color={showDigital ? colors.cold : colors.hot}
            onPress={() => setShowDigital(!showDigital)}
          />
          <Button
            title='Toggle Show Icon'
            pressableStyle={{ padding: 10 }}
            color={showIcon ? colors.cold : colors.hot}
            onPress={() => setShowIcon(!showIcon)}
          />
        </View>
      </Page>
    </View>
  );
}

const consts = {
  width: 100,
  height: 100,
}