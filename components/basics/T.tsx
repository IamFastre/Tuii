import { Text, TextProps } from 'react-native';

import general from '@/constants/general';
import { useColors } from '@/constants/colors';


export const T = (props: TextProps & { plain?:boolean }) : React.JSX.Element => {
  const colors = useColors();
  return (
    <Text
      {...props}
      selectable={props.selectable ?? false}
      selectionColor={colors.highlight}
      style={[props.plain ? { } : { color: colors.tertiary, fontSize: general.text.fontSize, fontFamily: colors.others.fonts.R }, props.style]}
    />
  );
};


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
  NONE: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: "transparent" }]} />
  ),

  PRIMARY: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().primary }]} />
  ),
  SECONDARY: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().secondary }]} />
  ),
  TERTIARY: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().tertiary }]} />
  ),

  ACCENT: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().accent }]} />
  ),
  HIGHLIGHT: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().highlight }]} />
  ),

  HOT: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().hot }]} />
  ),
  COLD: (props: TextProps) : React.JSX.Element => (
    <Text {...props} style={[props.style, { color: useColors().cold }]} />
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
