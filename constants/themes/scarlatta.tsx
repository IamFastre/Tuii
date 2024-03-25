import React from "react";
import { ITheme } from "./interfaces";
import { Ionicons } from '@expo/vector-icons';
import defaults from "./defaults";

const theme = {
  ...defaults,
  main: "#341411",
  main_2: "#bd3478",
  main_3: "#dddddd",

  accent: "#5c14e3",
  accent_2: "#1F8870",

  other_hot: "#2fa02f",
  other_cold: "#2B6788",

  icon: "flower-outline",
  statusbar: "light",
  mode: "dark",

  others: {
    section_radius: 15,
    fonts: {
      clock: "Soria",
      L: "Ubuntu",
      R: "Ubuntu",
      B: "Ubuntu Bold",
      LI: "Ubuntu Italic",
      I: "Ubuntu Italic",
      BI: "Ubuntu BoldItalic",
    },
    background: function() {
      return (<>
        <Ionicons
          name='rose'
          size={200}
          color={theme.main_2}
          style={{
            top: -30,
            left: -40,
            opacity: 0.33,
            position: "absolute",
            transform: [{ rotate: "135deg" }],
          }}
        />
        <Ionicons
          name='rose-outline'
          size={225}
          color={theme.main_2}
          style={{
            bottom: -50,
            right: -40,
            opacity: 0.33,
            position: "absolute",
            transform: [{ rotate: "-37.5deg" }],
          }}
        />
        <Ionicons
          name='flower-outline'
          size={150}
          color={theme.main_2}
          style={{
            top: "30%",
            right: -60,
            opacity: 0.33,
            position: "absolute",
            transform: [{ rotate: "15deg" }],
          }}
        />
        <Ionicons
          name='leaf-outline'
          size={150}
          color={theme.main_2}
          style={{
            bottom: "30%",
            left: -30,
            opacity: 0.33,
            position: "absolute",
            transform: [{ rotate: "-15deg" }, { rotateY: "180deg" }],
          }}
        />
      </>)
    },
  }
} as ITheme;

export default theme;