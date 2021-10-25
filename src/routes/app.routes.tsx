import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator();

// Screens  
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';

export function AppRoutes() {
  const theme = useTheme(); // Get the theme from styled-components

  return (
    <Navigator
      screenOptions={{
        headerShown: false, // Esconde o header padrão do react-navigation
        tabBarActiveTintColor: theme.colors.secondary, // Cor do texto quando o item está selecionado
        tabBarInactiveTintColor: theme.colors.text, // Cor do texto quando o item não está selecionado
        tabBarLabelPosition: 'beside-icon', // Posição do texto do item
        tabBarStyle: { // Estilização do item
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0, // Aplica padding no iOS
        } 
      }}
    >
      <Screen 
        name='Listagem'
        component={Dashboard}  
        options={{
          tabBarIcon: (({ size, color }) => // size e color, desestruturados para pegar dinamico, quando selecionado e quando não
            <MaterialIcons // Icon do item
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen 
        name='Cadastrar'
        component={Register}  
        options={{
          tabBarIcon: (({ size, color }) => // size e color, desestruturados para pegar dinamico, quando selecionado e quando não
            <MaterialIcons // Icon do item
              name='attach-money'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen 
        name='Resumo'
        component={Register} 
        options={{
          tabBarIcon: (({ size, color }) => // size e color, desestruturados para pegar dinamico, quando selecionado e quando não
            <MaterialIcons // Icon do item
              name='pie-chart'
              size={size}
              color={color}
            />
          )
        }} 
      />
    </Navigator>
  );
}