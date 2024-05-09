import { T, C } from "@/components/basics";
import { useColors } from "@/constants/colors";
import { ITime } from "@/src/general";
import { useState, useEffect } from "react";

export const DigitalClock = ({ time }: { time: ITime; }) => {
  const colors = useColors();
  const [colonBlink, setColonBlink] = useState<boolean>(false);

  useEffect(() => {
    setColonBlink(!colonBlink);
  }, [Math.floor(time.stamp / 500)]);

  return (
    <T style={{ fontFamily: colors.others.fonts.S, fontSize: 45 }}>
      <C.HIGHLIGHT>{time.hour < 10 ? `0${time.hour}` : time.hour}</C.HIGHLIGHT>
      <T style={{ opacity: colonBlink ? 1 : 0.25 }} plain>:</T>
      <C.HIGHLIGHT>{time.minute < 10 ? `0${time.minute}` : time.minute}</C.HIGHLIGHT>
    </T>
  );
};
