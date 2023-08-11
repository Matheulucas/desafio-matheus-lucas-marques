const cardapio = {
    cafe: 3.00,
    chantily: 1.50,
    suco: 6.20,
    sanduiche: 6.50,
    queijo: 2.00,
    salgado: 7.25,
    combo1: 9.50,
    combo2: 7.50
};
const extras = {
    chantily: "cafe",
    queijo: "sanduiche"
};
class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        let total = this.calcularTotal(itens);
        if (typeof total === "string") return total;

        const erroExtras = this.verificarExtras(itens);
        if (erroExtras) return erroExtras;

        const totalFinal = this.aplicarDescontosOuTaxas(total, metodoDePagamento);
        if (typeof totalFinal === "string") return totalFinal;

        return `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;
    }
     verificarExtras(pedidos) {
    const contarQuantidades = (codigoItem) => {
        let quantidadeTotal = 0;
        for (let pedido of pedidos) {
            let [codigo, quantidade] = pedido.split(',');
            quantidade = parseInt(quantidade);
            if (codigo === codigoItem) {
                quantidadeTotal += quantidade;
            }
        }
        return quantidadeTotal;
    };

    for (let pedido of pedidos) {
        let [codigo, quantidade] = pedido.split(',');
        quantidade = parseInt(quantidade);

        if (isNaN(quantidade) || quantidade <= 0) {
            return "Quantidade inválida!";
        }

        if (extras[codigo]) {
            const quantidadePrincipal = contarQuantidades(extras[codigo]);
            if (quantidade > quantidadePrincipal) {
                return "Item extra não pode ser pedido sem o principal"
            }
        }
    }
    return null;
    }
    calcularTotal(pedidos) {
        if (pedidos.length === 0) return "Não há itens no carrinho de compra!";
        let total = 0;
        for (let pedido of pedidos) {
            let [codigo, quantidade] = pedido.split(',');
            quantidade = parseInt(quantidade);

            if (cardapio[codigo]) {
                total += cardapio[codigo] * quantidade;
            } else {
                return "Item inválido!";
            }
        }
        return total;
    }
    aplicarDescontosOuTaxas(total, formaPagamento) {
        const formasValidas = ["dinheiro", "debito", "credito"];
        if (!formasValidas.includes(formaPagamento)) {
            return "Forma de pagamento inválida!";
        }
        switch(formaPagamento) {
            case "dinheiro":
                return total - total * 0.05;
            case "credito":
                return total + total * 0.03;
            default:
                return total;
        }
    }

}

export { CaixaDaLanchonete };
