import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, Linking } from 'react-native';
import SaldoBackend from './SaldoBackend';
import Principal from '../../classes/principal';


const Saldo = ({ navigation }) => {
    const principal = new Principal();
    const url = 'https://www.cesupa.br/';
   
    const [saldo, setSaldo] = useState(0);
    const [creditoInput, setCreditoInput] = useState('');
    const [debitoInput, setDebitoInput] = useState('');
    const [fraseOperacao, setFraseOperacao] = useState('');
    const [data, setData] = useState('');
    const [saldoBackend, setSaldoBackend] = useState(() => new SaldoBackend(saldo, parseFloat(creditoInput), parseFloat(debitoInput)));
    const [poupança, setPoupança] = useState(0);


    saldoBackend.ordenarVetorExtrato();


    const abrirLink = () => {
        if (principal.cliquesLogo < 2) {
            principal.aumentarCliquesLogo();
        } else {
            Linking.openURL(url);
        }
    };


    const montarSaldoCredito = () => {
        const credito = parseFloat(creditoInput);
        if (saldoBackend.chequeEspecial == 2640) {
            const message = saldoBackend.gerarCredito(credito, data);
            const poupançaIncrement = credito * 0.10;
            setSaldo(saldoBackend.saldo);
            setSaldo((prevSaldo) => (prevSaldo - poupançaIncrement));
            setPoupança((prevPoupança) => prevPoupança + poupançaIncrement);
            saldoBackend.decrementarSaldo(poupançaIncrement);
            setFraseOperacao(message);
        } else {
            if (credito + saldoBackend.chequeEspecial <= 2640) {
                const message = saldoBackend.gerarCreditoMaisCheque(credito, credito, data);
                setSaldo(saldoBackend.saldo);
                setFraseOperacao(message);
            } else {
                const divida = 2640 - saldoBackend.chequeEspecial;
                const valorRestante = credito - divida;
                const message = saldoBackend.gerarCreditoMaisCheque(credito, divida, data);
                const poupançaIncrement = valorRestante * 0.10;
                setSaldo(saldoBackend.saldo);
                setSaldo((prevSaldo) => (prevSaldo - poupançaIncrement));
                setPoupança((prevPoupança) => prevPoupança + poupançaIncrement);
                saldoBackend.decrementarSaldo(poupançaIncrement);
                setFraseOperacao(message);
            }
        }
    };


    const montarSaldoDebito = () => {
        var writeMessage;
        if (saldo - debitoInput >= 0) {
            writeMessage = saldoBackend.gerarDebito(debitoInput, data);
        } else {
            writeMessage = saldoBackend.gerarDebitoComCheque(debitoInput, data);
        }
        const message = writeMessage;
        setSaldo(saldoBackend.saldo);
        setFraseOperacao(message);
    };


    function mudarTela() {
        principal.resetCliquesLogo();
        navigation.navigate('telaExtrato', { creditoInput, debitoInput, saldo, extrato: saldoBackend.extrato, extratoOrdenado: saldoBackend.extratoOrdenado });
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={abrirLink}>
                <Image source={require('./logoBanco.png')} style={styles.image} />
            </TouchableOpacity>
            <Text>Saldo disponível: {saldo} </Text>
            <Text>Poupança: {poupança}</Text>
            <Text>Cheque Especial: {saldoBackend.chequeEspecial}</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite a data"
                onChangeText={(value) => setData(value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Digite o valor de crédito"
                keyboardType="numeric"
                onChangeText={(value) => setCreditoInput(value)}
            />
            <Button title="Gerar crédito" onPress={montarSaldoCredito} />
            <TextInput
                style={styles.input}
                placeholder="Digite o valor de débito"
                keyboardType="numeric"
                onChangeText={(value) => setDebitoInput(value)}
            />
            <Button title="Gerar débito" onPress={montarSaldoDebito} />
            <Text>{fraseOperacao}</Text>
            <View style={{ marginBottom: 10 }} />
            <TouchableOpacity
                style={styles.button}
                onPress={mudarTela}
            >
                <Text style={styles.buttonText}>Extrato</Text>
            </TouchableOpacity>
        </View>
    );
};


export default Saldo;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },


    input: {
        width: '48%',
        height: 30,
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
    },


    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },


    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },


    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});



