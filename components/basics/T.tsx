import React from 'react';
import { Text, TextProps } from 'react-native';
import general from '@/constants/general';
import { useColors } from '@/constants/colors';

export const T = (props: TextProps & { plain?:boolean }) : React.JSX.Element => {
  const colors = useColors();

  return (
    <Text
      {...props}
      selectable={props.selectable ?? false}
      selectionColor={colors.accent_2}
      style={[props.plain ? { } : { color: colors.main_3, fontSize: general.text.fontSize, fontFamily: colors.others.fonts.R }, props.style]}
    />
  );
}
export const L = (props: TextProps) : React.JSX.Element => (
  <Text {...props} style={[props.style, { fontFamily:useColors().others.fonts.L }]} />
);

export const R = (props: TextProps) : React.JSX.Element => (
  <Text {...props} style={[props.style, { fontFamily:useColors().others.fonts.R }]} />
);

export const B = (props: TextProps) : React.JSX.Element => (
  <Text {...props} style={[props.style, { fontFamily:useColors().others.fonts.B }]} />
);

export const LI = (props: TextProps) : React.JSX.Element => (
  <Text {...props} style={[props.style, { fontFamily:useColors().others.fonts.LI }]} />
);

export const I = (props: TextProps) : React.JSX.Element => (
  <Text {...props} style={[props.style, { fontFamily:useColors().others.fonts.I }]} />
);

export const BI = (props: TextProps) : React.JSX.Element => (
  <Text {...props} style={[props.style, { fontFamily:useColors().others.fonts.BI }]} />
);


export const C = {
  MAIN: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().main }]} />
  ),
  MAIN2: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().main_2 }]} />
  ),
  MAIN3: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().main_3 }]} />
  ),

  ACCENT: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().accent }]} />
  ),
  
  ACCENT2: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().accent_2 }]} />
  ),

  HOT: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().other_hot }]} />
  ),
  COLD: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().other_cold }]} />
  ),

  RED: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().red }]} />
  ),
  GREEN: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().green }]} />
  ),
  BLUE: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().blue }]} />
  ),

  CYAN: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().cyan }]} />
  ),
  YELLOW: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().yellow }]} />
  ),
  MAGENTA: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().magenta }]} />
  ),
};
