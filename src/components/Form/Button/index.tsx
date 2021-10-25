import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Title } from './styles';

// Aqui tenho todas as caracteristicas do ToachableOpacity, mais o title
interface Props extends RectButtonProps {
  title: string;
  onPress: () => void; // Tipei para ele entender que o onPress é um função, chamada no Register
}

export function Button({ title, onPress, ...rest }: Props) {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
