import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import Principal from '../../classes/principal';
import { useNavigation } from '@react-navigation/native';




const Contas = () => {
    const principal = new Principal();
    const url = 'https://www.cesupa.br/'
    const navigation = useNavigation();




    const abrirLink = () => {
        if (principal.cliquesLogo < 2) {
            principal.aumentarCliquesLogo();
        } else {
            Linking.openURL(url);
        }
    };




    function mudarTela() {
        principal.resetCliquesLogo();
        navigation.navigate('telaSaldo');
    }


    function marcoPolo() {
        if (principal.cliquesMarcoPolo < 12) {
            principal.aumentarCliquesMarcoPolo();
        } else {
            navigation.navigate('telaMarcoPolo');
        }
    }




    return (
        <TouchableOpacity onPress={marcoPolo} style={styles.container}>
            <Text style={styles.text}>{`Saldo: R$ ${principal.getSaldo()}`}</Text>
            <TouchableOpacity onPress={abrirLink}>
                <Image source={require('./logoBanco.png')} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity onPress={mudarTela} style={styles.button}>
                <Text>Sua Conta</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};




    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 18,
            marginVertical: 10,
        },
        image: {
            width: 200,
            height: 200,
            marginBottom: 10,
        },
        button: {
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
        },
    });


export default Contas;



