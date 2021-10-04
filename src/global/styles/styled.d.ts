import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
  // Aqui eu falo que o ThemeType será igual ao theme, em relação aos tipos
  type ThemeType = typeof theme;

  // E aqi em baixo eu faço o export da Nossa Prop e acrescentando ao tema o ThemeType
  export interface DefaultTheme extends ThemeType {}
}
