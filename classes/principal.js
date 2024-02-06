export default class Principal {
    constructor() {
        this.saldo = 0;
        this.chequeEspecial = 2630;
        this.valor = 0;
        this.retirar = 0;
        this.cliquesLogo = 0;
        this.cliquesMarcoPolo = 0;
    }
   
    adicionarValor() {
        if (this.valor > 0) {
            this.saldo += this.valor;
        }
    }
 
    retirarValor() {
        const valor = this.valor;
   
        if (this.saldo>= valor) {
            this.chequeEspecial -= valor;
        } else {
            this.saldo -= valor;
        }
    }
 
    setValor(novoValor) {
        this.valor = novoValor;
    }
 
    getSaldo() {
        return this.saldo;
    }
 
    getRetirada() {
        return this.retirar;
    }
    getChequeEspecial(){
        return this.chequeEspecial
    }


    aumentarCliquesLogo() {
        this.cliquesLogo += 1
    }


    resetCliquesLogo() {
        this.cliquesLogo = 0
    }
   
    aumentarCliquesMarcoPolo() {
        this.cliquesMarcoPolo += 1
    }
}

