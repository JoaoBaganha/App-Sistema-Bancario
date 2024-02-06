import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking, TextInput, Button } from 'react-native';
import Principal from '../../classes/principal';


const MarcoPolo = () => {
    const principal = new Principal();
    const url = 'https://www.cesupa.br/';
   
    const [numeroSorteado, setNumeroSorteado] = useState(parseInt(Math.random()*11));
    const [numero, setNumero] = useState(0);
    const [rodada, setRodada] = useState(1);
    const [palpite, setPalpite] = useState("");
    const [resposta, setResposta] = useState("-");
    const [vitoria, setVitoria] = useState(false);


    function calcular() {
        var rod = rodada;
        if (numero >= 0 && numero <= 10) {
            if (numero != numeroSorteado && !vitoria) {
                rod++;
                if (rod < 4) {
                    setRodada(rod);
                    if (numero < numeroSorteado) {
                        setPalpite("Número sorteado é maior");
                    } else {
                        setPalpite("Número sorteado é menor");
                    }
                }
                if (rod == 4) {
                    setPalpite("Game Over");
                    setResposta(numeroSorteado);
                }
            } else {
                setPalpite("Vitória");
                setResposta(numeroSorteado);
                setVitoria(true)
            }
        }
    }


    function reiniciar() {
        setNumeroSorteado(parseInt(Math.random()*11));
        setVitoria(false);
        setRodada(1);
        setPalpite("");
        setResposta("-");
    }


    const abrirLink = () => {
        if (principal.cliquesLogo < 2) {
            principal.aumentarCliquesLogo();
        } else {
            Linking.openURL(url);
        }
    };


    function mudarTela() {
        principal.resetCliquesLogo();
        navigation.navigate('telaMenu');
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Marco Polo</Text>
            <br/>
            <TouchableOpacity onPress={abrirLink}>
                <Image source={require('./logoBanco.png')} style={styles.image} />
            </TouchableOpacity>
            <Text>Você tem 3 chances para adivinhar um número de 0 a 10</Text>
            <br/>
            <TextInput style={styles.textInput} placeholder='Digite seu número' onChangeText={(numero) => setNumero(numero)}/>
            <Button title='Adivinhar' onPress={calcular}/>
            <br/>
            <Text>{palpite}</Text>
            <br/>
            <Text>- {resposta} -</Text>
            <br/>
            <Text>{rodada}ª tentativa</Text>
            <br/>
            <Button title='Reiniciar' onPress={reiniciar}/>
            <br/>
            <Button title='Voltar ao Menu' color="#4CAF50" style={styles.menuButton} onPress={mudarTela}/>
        </View>
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
    textInput: {
        width: 230,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
    },
    menuButton: {
        marginTop: 20,
    },
});


export default MarcoPolo;

