
export function CalculoBaseInss (salario) {
    salario = parseFloat(salario);
    return (salario.toLocaleString('pt-BR'));
}
 
export function  CalculoDescontoInss (salario) {
    /*
        TABELA INSS 2019
        até 1.830,29 = 8%
        de 1.830,30 até 3.050,52 = 9%
        de 3.050,53 até 6.101,06 = 11%
    */

    salario = parseFloat(salario);

    if(salario <= 1830.29){
        return (salario * 8/100);
    }else if(salario > 1830.29 && salario < 3050.52){
        return (salario * 9/100);
    }else if(salario > 3050.53){
        return (salario * 11/100);
    }
}

export function CalculoBaseIprf (salario, descontoInss) {
    salario = parseFloat(salario);
    descontoInss = parseFloat(descontoInss);
    return ((salario-descontoInss).toFixed(2));
}

export function CalculoDescontoIprf(baseIprf){
    /*
        TABELA IPRF 2019
        Base de cálculo	Alíquota        (%)	    Parcela a deduzir do IRPF
        De R$1.903,99 até R$2.826,65	7,5%	R$142,80
        De R$2.826,66 até R$3.751,05	15%	    R$354,80
        De R$3.751,06 até R$4.664,68	22,5%	R$636,13
        Acima de R$4.664,68	            27,5%   R$869,36
    */

    if(baseIprf < 1903.99  ){
        return ( 0 );
    } else if(baseIprf >= 1903.99 && baseIprf <= 2826.65 ){
        return ( (baseIprf * 7.5/100) - 142.80 ).toFixed(2);
    }else if(baseIprf >= 2826.66 && baseIprf <= 3751.05 ){
        return ( (baseIprf * 15/100) - 354.80 ).toFixed(2);
    }else if(baseIprf >= 3751.06 && baseIprf <= 4664.68 ){
        return ( (baseIprf * 22.5/100) - 636.13 ).toFixed(2);
    }else if(baseIprf > 4664.68	){
        return ( (baseIprf * 27.5/100) - 869.36 ).toFixed(2);
    }

}

export function CalculoSalarioLiquido(salarioBruto, descontoInss, descontoIprf){
    return ( (salarioBruto - descontoInss) - descontoIprf).toFixed(2);
}
