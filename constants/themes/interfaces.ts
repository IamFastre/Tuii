import React from "react";

export interface ITheme {
  main: `#${string}`;
  main_2: `#${string}`;
  main_3: `#${string}`;
  
  accent: `#${string}`;
  accent_2: `#${string}`;

  other_hot: `#${string}`;
  other_cold: `#${string}`;
  
  red: `#${string}`;
  blue: `#${string}`;
  green: `#${string}`;
  cyan: `#${string}`;
  yellow: `#${string}`;
  magenta: `#${string}`;

  icon: string;
  statusbar: "light" | "dark";
  mode: "light" | "dark",

  others: {
    section_radius: number;
    fonts: {
      clock: string;
      L: string;
      R: string;
      B: string;
      LI: string;
      I: string;
      BI: string;
    },
    background: () => React.JSX.Element | null,
  }
};
