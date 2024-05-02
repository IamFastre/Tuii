import { ITheme } from "./interfaces";

export const grades = {
  primary: "#121212",
  secondary: "#575757",
  tertiary: "#dddddd",
};

export const special = {
  accent: "#1ed760",
  highlight: "#5c14e3",
}

export const temps = {
  hot: "#d71e1e",
  cold: "#2054ff",
}

export const RBG = {
  red: "#d71e1e",
  green: "#00c43b",
  blue: "#3a7aff",
};

export const CYM = {
  cyan: "#27d4ff",
  yellow: "#ffea29",
  magenta: "#eb16c7",
};

export const no_brackets = {
  brackets: {
    left: {
      curly: "",
      square: "",
      angle: "",
    },
    right: {
      curly: "",
      square: "",
      angle: "",
    },
  },
};

export default {
  ...grades,
  ...special,
  ...temps,
  ...RBG,
  ...CYM,

  opacity: {
    translucent: "20",
    faint: "45",
    mid: "65",
    most: "d0",
  },

  theme: "dark",
  icon: "moon-outline",
  statusbar: "light",

  others: {
    weather_icon_pack: "ascii-art",
    section_radius: 0,
    fonts: {
      L: 'Cascadia Code Light',
      R: 'Cascadia Code',
      B: 'Cascadia Code Bold',
      LI: 'Cascadia Code LightItalic',
      I : 'Cascadia Code Italic',
      BI: 'Cascadia Code BoldItalic',

      S: 'Kode Bold',
    },
    background: () => null,
  },

  brackets: {
    left: {
      curly: "•-{ ",
      square: "•-[ ",
      angle: "•-< ",
    },
    right: {
      curly: " }-•",
      square: " ]-•",
      angle: " >-•",
    },
  },
} as ITheme;
