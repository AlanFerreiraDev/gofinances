import React from 'react';
import AppLoading from 'expo-app-loading';

import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';

// Import das rotas
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes'

//Fonts
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export default function App() {
  // Para fazer o carregamento da fonte no celular do usuário
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  // Enquanto não carregar a fonte, ele carrega o AppLoading que é um component do expo
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
