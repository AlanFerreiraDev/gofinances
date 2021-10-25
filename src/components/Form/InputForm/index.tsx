import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
// Vou reutilizar o componente de Input para criar o Inpuit com o React-Hook-Form
import { Input } from '../Input';

import { Container, Error } from './styles';

interface Props extends TextInputProps {
  control: Control; // Propriedade que vem do react-hook-form
  name: string;
  error: string;
}

export function InputForm({ 
  control, // Propriedade que vem do react-hook-form
  name, 
  error, 
  ...rest 
} : Props) {
  return (
    <Container>
      <Controller  
        control={control}
        render={({ field: { onChange, value}}) => (
          <Input 
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        name={name} 
      />
      {/* Se existir um erro, mostra o erro */}
      { error && <Error>{ error }</Error> } 
    </Container> 
  );
}