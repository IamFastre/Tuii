import { iconPacks } from "@/components/weather/WeatherIcons";

export type Themes = "dark" | "light" | "scarlatta" | "e9999";

export interface ITheme {
  primary: `#${string}`;
  secondary: `#${string}`;
  tertiary: `#${string}`;
  
  accent: `#${string}`;
  highlight: `#${string}`;

  hot: `#${string}`;
  cold: `#${string}`;
  
  red: `#${string}`;
  blue: `#${string}`;
  green: `#${string}`;

  cyan: `#${string}`;
  yellow: `#${string}`;
  magenta: `#${string}`;

  opacity: {
    faint: string;
    mid: string;
    most: string;
  },

  theme: Themes;
  icon: string;
  statusbar: "light" | "dark";

  others: {
    weather_icon_pack: keyof typeof iconPacks;
    section_radius: number;
    fonts: {
      L: string;
      R: string;
      B: string;
      LI: string;
      I: string;
      BI: string;

      S: string;
    };
    background: () => React.JSX.Element | null;
  };

  brackets: {
    left: {
      curly: string;
      square: string;
      angle: string;
    },
    right: {
      curly: string;
      square: string;
      angle: string;
    },
  };
};
