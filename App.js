import React from 'react';
import Contas from './rotasTelas/telaMenu/Menu';
import Saldo from './rotasTelas/telaSaldo/Saldo';
import Extrato from './rotasTelas/telaExtrato/Extrato';
import MarcoPolo from './rotasTelas/telaMarcoPolo/MarcoPolo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";


export default function App() {
  const PilhaTelas = createStackNavigator();




  return (
    <NavigationContainer>
      <PilhaTelas.Navigator>
        <PilhaTelas.Screen name='telaMenu' component={Contas} />
        <PilhaTelas.Screen name='telaSaldo' component={Saldo} />
        <PilhaTelas.Screen name='telaExtrato' component={Extrato} />
        <PilhaTelas.Screen name='telaMarcoPolo' component={MarcoPolo} />
      </PilhaTelas.Navigator>
    </NavigationContainer>
  );
}

