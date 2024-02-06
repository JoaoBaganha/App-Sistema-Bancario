import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Linking } from 'react-native';
import Principal from '../../classes/principal';
import { useNavigation } from '@react-navigation/native';




const Extrato = ({ navigation, route }) => {
    const principal = new Principal();
    const url = 'https://www.bing.com/ck/a?!&&p=7c31b4129ad37f2bJmltdHM9MTcwMTQ3NTIwMCZpZ3UaWQ9MTAyNjgwNWEtMTY5Yi02ZTlhLTNlMmQtOTJlMzE3Y2M2ZmJjJmluc2lkPTUyMjUmbnRiPTEmcHNxPWNlc3VwYSthcmdvJnU9YTEaJm50Yj0xJmtvYmplY3R5cGU9cmVkcmV3JnN0YXI9MCZ2ZXI9MiZoc2g9MyZmY2xpZD0xMDI2ODA1YS0xNjliLTZlOWEtM2UyZC05MmUzMTdjYzZmYmMmcHNxcT1jZXN1cGErYXJnbyp8d2lkdGg9MCZuYnQ9MA';


    const { creditoInput, debitoInput, saldo, extrato, extratoOrdenado } = route.params;


    const [ordem, setOrdem] = useState(extrato);


    const abrirLink = () => {
        if (principal.cliquesLogo < 2) {
            principal.aumentarCliquesLogo();
        } else {
            Linking.openURL(url);
        }
    };
   
    function mudarTela() {
        principal.resetCliquesLogo();
        navigation.navigate('telaSaldo', { saldo });
    }




    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={abrirLink}>
                <Image source={require('./logoBanco.png')} style={styles.image} />
            </TouchableOpacity>




            <Text style={styles.text}>Crédito: {creditoInput}</Text>
            <Text style={styles.text}>Débito: {debitoInput}</Text>
            <Text style={styles.text}>Saldo: {saldo}</Text>
            <Button title="Extrato por Ordem de Criação" onPress={() => setOrdem(extrato)} />
            <Button title="Extrato por Tamanho e Tipo de Transação" onPress={() => setOrdem(extratoOrdenado)} />
            <Text style={styles.text}>{ordem}</Text>




            <Button
                onPress={mudarTela}
                title="Saldo"
                color="#4CAF50"
                style={styles.menuButton}
            />
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },




    text: {
        fontSize: 18,
        marginVertical: 10,
    },




    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },




    menuButton: {
        marginTop: 20,
    },
});




export default Extrato;



