import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Platform } from 'react-native';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// Já vem instalada no expo
import { Feather } from '@expo/vector-icons';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

import { DataListProps } from '.';

const plataforma = Platform.OS;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  /*  Aqui funciona como o rem,porém já convertendo em pixels, por isso coloco o px na frente */
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};

  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
`;

export const UserWrapper = styled.View`
  width: 100%;

  padding: 0 24px;
  margin-top: ${plataforma === 'ios'
    ? getStatusBarHeight() + `${RFValue(28)}px`
    : `${RFValue(52)}px`};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  /* RFValue, tbm faz a comparação e devolve em px, mas independente da densidade de pixels, ele já faz a comparação correta e devolve as imagens no mesmo tamanho em diferentes dispositivos */
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

// ScrollView,pois são apenas 03 elementos
// Assim pego sempre os atributos e props dos componentes pelo styled-components
export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }, // o mesmo que style, e garanto com o horizontal que el vaio ter o mesmo padding do lado direito e esquerdo
})`
  width: 100%;

  position: absolute;
  /* Quando eu quiser o valor em percentual, uso p percentage */
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-bottom: 16px;
`;

export const TransactionList = styled(
  FlatList as new () => FlatList<DataListProps>
) // crio uma nova tipagem personalizada para a FlatList, tudo isso para conseguir usar no index
  .attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      paddingBottom: getBottomSpace(), // espaço para iphone embaixo dos cards
    },
  })``;
