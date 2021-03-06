import React, { useState, useEffect } from 'react';
import { 
  Modal,
  TouchableWithoutFeedback, // Junto com o keyboard.dismiss permite que o usuário clique fora do campo de texto para esconder o teclado
  Keyboard, // Permite que o usuário clique fora do campo de texto para esconder o teclado
  Alert,
} from 'react-native';

// Validação de formulário
import * as Yup from 'yup'; 
import { yupResolver } from '@hookform/resolvers/yup'; // Permite validar o formulário

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
// Chave do AsyncStorage
const dataKey = '@gofinances:transactions';

import { useForm } from 'react-hook-form';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

interface FormData { 
  name: string;
  amount: string;
}

// Schema de Validação
const schema = Yup.object().shape({ 
  name: Yup
    .string()
    .required('O nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('o Valor não pode ser negativo ou zerado')
});

export function Register() {
  // Armazenar qual botão está selecionado
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  // Desestruturando do useForm para pegar os dados do formulário
  const {
    control, // Controla os dados do formulário
    handleSubmit, // Função para submeter o formulário
    formState: { errors }, // Armazena os dados do formulário
  } = useForm({
    resolver: yupResolver(schema), // Validação do formulário, com schema
  });


  function handleTransactionsTypeSelect(type: 'up' | 'down') { // Função para selecionar o tipo de transação
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() { // Função para abrir o modal de seleção de categoria
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() { // Função para fechar o modal de seleção de categoria
    setCategoryModalOpen(false);
  }

  async function handleRegister(form : FormData) { // Função para enviar os dados do form
    // Validação do transactionType
    if (!transactionType) 
      return Alert.alert('Erro', 'Selecione um tipo de transação');
      
    // Validação do category
    if (category.key === 'category')
      return Alert.alert('Erro', 'Selecione uma categoria');

    const newTransaction = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    }

    // Tratativa de erro
    try {
      // Armazenar mais de um dado no AsyncStorage
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : []; // Se não existir, cria um array vazio

      // Pego os dados do formulário e adiciono ao array
      const dataFormatted = [
        ...currentData,
        newTransaction,
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar');
    }
  }

  // Verifica Async Storage
  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey);
      console.log(JSON.parse(data!)); // O exclamação na frente do data é do TS para dizer que sempre terá um valor ali
    }
    loadData();

    // Limpar o AsyncStorage para garantir que não haverá dados duplicados
    // async function removeAll() {
    //   await AsyncStorage.removeItem(dataKey);
    // }
    // removeAll();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm 
              name="name" 
              control={control}
              placeholder="Nome" 
              autoCapitalize="sentences" 
              autoCorrect={false} // Desabilita correção automática
              error={errors.name && errors.name.message} // Mensagem do schema do yup
            />

            <InputForm 
              name="amount" 
              control={control} 
              placeholder="Preço" 
              keyboardType="numeric" // Verificar se está disponivel no Android e IOS, na doc. do React Native
              error={errors.amount && errors.amount.message} // Mensagem do schema do yup

            />

            <TransactionsTypes>
              <TransactionTypeButton
                title="Income"
                type="up"
                onPress={() => handleTransactionsTypeSelect('up')}
                isActive={transactionType === 'up'} // true ou false
              />

              <TransactionTypeButton
                title="Outcome"
                type="down"
                onPress={() => handleTransactionsTypeSelect('down')}
                isActive={transactionType === 'down'} // true ou false
              />
            </TransactionsTypes>

            <CategorySelectButton 
              title={category.name}
              onPress={handleOpenSelectCategoryModal} // Função para abrir o modal
              />
          </Fields>
          <Button 
            title="Enviar"
            onPress={handleSubmit(handleRegister)} // Função para submeter o formulário
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
