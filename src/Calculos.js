
/* 
    TABELA INSS 2019
    até 1.830,29 = 8%
    de 1.830,30 até 3.050,52 = 9%
    de 3.050,53 até 6.101,06 = 11%
*/
const inssGrupoUm = { aliquota: 8, ate: 1830.29 }
const inssGrupoDois = { aliquota: 9, de: 1830.30, ate: 3050.52 }
const inssGrupoTres = { aliquota: 11, de: 3050.53, ate: 6101.06 }

/*
    TABELA IPRF 2019
    Base de cálculo	Alíquota        (%)	    Parcela a deduzir do IRPF
    De R$1.903,99 até R$2.826,65	7,5%	R$142,80
    De R$2.826,66 até R$3.751,05	15%	    R$354,80
    De R$3.751,06 até R$4.664,68	22,5%	R$636,13
    Acima de R$4.664,68	            27,5%   R$869,36
*/

const iprfGrupoUm = { aliquota: 7.5, de: 1903.99, ate: 2826.65, deducao: 142.80 }
const iprfGrupoDois = { aliquota: 15, de: 2826.66, ate: 3751.05, deducao: 354.80 }
const iprfGrupoTres = { aliquota: 22.5, de: 3751.06, ate: 4664.68, deducao: 636.13 }
const iprfGrupoQuatro = { aliquota: 27.5, de: 4664.68,  deducao: 869.36}

export function CalculoBaseInss (salario) {
    salario = parseFloat(salario);
    return (salario);
}
 
export function CalculoDescontoInss (salario) {
    salario = parseFloat(salario);
    if(salario <= inssGrupoUm.ate){
        return (salario * inssGrupoUm.aliquota / 100);
    }else if(salario > inssGrupoDois.de && salario < inssGrupoDois.ate){
        return (salario * inssGrupoDois.aliquota / 100);
    }else if(salario > inssGrupoTres.de){
        return (salario * inssGrupoTres.aliquota / 100);
    }
}

export function CalculoBaseIprf (salario, descontoInss) {
    salario = parseFloat(salario);
    descontoInss = parseFloat(descontoInss);
    return ((salario-descontoInss).toFixed(2));
}

export function CalculoDescontoIprf(baseIprf){
    if(baseIprf < iprfGrupoUm.de  ){
        return ( 0 );
    } else if(baseIprf >= iprfGrupoUm.de && baseIprf <= iprfGrupoUm.ate){
        return ( (baseIprf * iprfGrupoUm.aliquota / 100) - iprfGrupoUm.deducao ).toFixed(2);
    }else if(baseIprf >= iprfGrupoDois.de && baseIprf <= iprfGrupoDois.ate ){
        return ( (baseIprf * iprfGrupoDois.aliquota / 100) - iprfGrupoDois.deducao ).toFixed(2);
    }else if(baseIprf >= iprfGrupoTres.de && baseIprf <= iprfGrupoTres.ate ){
        return ( (baseIprf * iprfGrupoTres.aliquota / 100) - iprfGrupoTres.deducao ).toFixed(2);
    }else if(baseIprf > iprfGrupoQuatro.de ){
        return ( (baseIprf * iprfGrupoQuatro.aliquota / 100) - iprfGrupoQuatro.deducao ).toFixed(2);
    }

}

export function CalculoSalarioLiquido(salarioBruto, descontoInss, descontoIprf){
    return ( (salarioBruto - descontoInss) - descontoIprf).toFixed(2);
}
