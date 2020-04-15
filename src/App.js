import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { CalculoBaseInss, CalculoDescontoInss, CalculoBaseIprf, CalculoDescontoIprf, CalculoSalarioLiquido } from './Calculos.js';


const App = () => {

  const [salarioBruto, setSalarioBruto] = useState('');
  const [baseInss, setBaseInss] = useState('R$ 0,00');
  const [descontoInss, setDescontoInss] = useState('');
  const [baseIprf, setBaseIprf] = useState('R$ 0,00');
  const [descontoIprf, setDescontoIprf] = useState('R$ 0,00');
  const [salarioLiquido, setSalarioLiquido] = useState('R$ 0,00');
  const [salarioLiquidoReverso, setSalarioLiquidoReverso] = useState('');

  useEffect(() => {
    if(salarioBruto !== '' && salarioBruto > 0){
      setBaseInss(CalculoBaseInss(salarioBruto));
      setDescontoInss(CalculoDescontoInss(salarioBruto));
    }else{
      setBaseInss('0.00');
      setDescontoInss('0.00');
    }
  },[salarioBruto]);

  useEffect(() => {
    if(salarioBruto !== ''){
      setBaseIprf(CalculoBaseIprf(salarioBruto, descontoInss));
    }else{
      setBaseIprf('0.00');
    }
  },[salarioBruto, descontoInss]);

  useEffect(() => {
    if(salarioBruto !== ''){
      setDescontoIprf(CalculoDescontoIprf(baseIprf));
    }else{
      setDescontoIprf('0.00');
    }
  },[salarioBruto, baseIprf]);

  useEffect(() => {
    if(salarioBruto !== ''){
      setSalarioLiquido(CalculoSalarioLiquido(salarioBruto, descontoInss, descontoIprf));
    }else{
      setSalarioLiquido('0.00');
    }
  },[salarioBruto, descontoInss, descontoIprf]);

  function calcularSalarioLiquido(){
    setSalarioBruto(salarioLiquidoReverso);
  }
  
  return (
    <>
      {/* TITULO */}
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
        <h2>Cálculo de salário com React JS</h2>
      </div>
      <div className="cards">
        
        {/* CALCULO EM TEMPO REAL */}
        <div className="left">
          <h3>Cálculo em tempo real</h3>
          <br/>
          <label>Salário bruto:</label>
          <br/>
          <input value={salarioBruto} type="number" onChange={e => setSalarioBruto(e.target.value)} />
          <br/>
          <label>Base INSS:</label>
          <br/>
          <input value={baseInss} type="text" disabled onChange={e => setBaseInss(e.target.value)} />
          <br/>
          <label>Desconto INSS:</label>
          <br/>
          <input value={descontoInss} type="text" disabled onChange={e => setDescontoInss(e.target.value)} />
          <br/>
          <label>Base IPRF:</label>
          <br/>
          <input value={baseIprf} type="text" disabled onChange={e => setBaseIprf(e.target.value)} />
          <br/>
          <label>Desconto IPRF:</label>
          <br/>
          <input value={descontoIprf} type="text" disabled onChange={e => setDescontoIprf(e.target.value)} />
          <br/>
          <label>Salário líquido:</label>
          <br/>
          <input value={salarioLiquido} type="text" disabled onChange={e => setSalarioLiquido(e.target.value)} />
        </div>
        
        {/* CALCULO REVERSO */}
        <div className="right">
          <h3>Cálculo reverso com Observables</h3>
          <br/>
          <label>Salário líquido desejado:</label>
          <input value={salarioLiquidoReverso} type="number" onChange={e => setSalarioLiquidoReverso(e.target.value)} />
          <br/>
          <button onClick={calcularSalarioLiquido}>Calcular salário bruto correspondente</button>
        </div>
      </div>
    </>
    
  );
}
 
export default App;
