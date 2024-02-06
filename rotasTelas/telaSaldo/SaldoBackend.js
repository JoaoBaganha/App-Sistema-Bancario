export default class SaldoBackend {
        constructor(initialSaldo, initialCredito, initialDebito, initialSavings) {
                this.saldo = initialSaldo;
                this.credito = initialCredito;
                this.debito = initialDebito;
                this.savings = initialSavings;
                this.extrato = [];
        }

        gerarCredito(credito, data, percentualPoupanca) {
                this.credito = parseFloat(credito) || 0; // Certifica-se de que credito seja um número válido
                this.saldo += this.credito;

                const percentual = parseFloat(percentualPoupanca) || 0; // Certifica-se de que percentualPoupanca seja um número válido
                const poupancaIncrement = (this.credito * percentual) / 100;
                this.savings += poupancaIncrement;

                const message = `Crédito: +${this.credito} reais (${data})\n`;
                this.extrato.push(message);

                return message;
        }

        gerarDebito(debito, data) {
                this.debito = parseFloat(debito);
                this.saldo -= this.debito;
                const message = `Débito: -${this.debito} reais (${data})\n`;
                this.extrato.push(message);

                return message;
        }

        ordenarVetorExtrato() {
                const creditos = this.extrato.filter((item) => item.includes("Crédito"));
                const debitos = this.extrato.filter((item) => item.includes("Débito"));

                creditos.sort((a, b) => {
                        const valorA = parseFloat(a.split(" ")[1]);
                        const valorB = parseFloat(b.split(" ")[1]);
                        return valorB - valorA;
                });

                debitos.sort((a, b) => {
                        const valorA = parseFloat(a.split(" ")[1]);
                        const valorB = parseFloat(b.split(" ")[1]);
                        return valorA - valorB;
                });

                this.extrato = creditos.concat(debitos);
        }
}
