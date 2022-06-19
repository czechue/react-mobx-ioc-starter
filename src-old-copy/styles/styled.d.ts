// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    space: {
      measure_1: string;
      measure: string;
      ratio: string;
      s_5: string;
      s_4: string;
      s_3: string;
      s_2: string;
      s_1: string;
      s0: string;
      s1: string;
      s2: string;
      s3: string;
      s4: string;
      s5: string;
    };

    color: {
      primary: string;
      primaryLight: string;
      primaryDark: string;
      primaryText: string;
      secondary: string;
      secondaryLight: string;
      secondaryDark: string;
      secondaryText: string;
    };

    border: {
      thin: string;
    };
  }
}
