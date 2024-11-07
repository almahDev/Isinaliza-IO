import React, { useState, useEffect } from 'react';
import "./global.css";

const ContadorRegressivo: React.FC = () => {
  // Definir a data futura para a contagem regressiva
  const dataFutura = new Date("2024-11-08T23:59:59").getTime();

  const [tempoRestante, setTempoRestante] = useState({
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    // Função para atualizar o tempo restante
    const atualizarContador = () => {
      const agora = new Date().getTime();
      const diferenca = dataFutura - agora;

      if (diferenca < 0) {
        // Quando o tempo expira, não continua a contagem
        return;
      }

      const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

      setTempoRestante({ horas, minutos, segundos });
    };

    // Atualizar o contador a cada 1 segundo
    const intervalo = setInterval(atualizarContador, 1000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalo);
  }, [dataFutura]);

  return (
    <div id="contador">
      {tempoRestante.horas === 0 && tempoRestante.minutos === 0 && tempoRestante.segundos === 0 ? (
        <p>Tempo expirado!</p>
      ) : (
        <div className='time-ofertas'>
          <div>
            <h1>Oferta Relâmpago </h1>
          </div>
          <div className='time-ofertas-horas'>
          <p><span id="horas">{tempoRestante.horas}</span>HORAS{' '}</p>
          <p><span id="minutos">{tempoRestante.minutos}</span>MINUTOS{' '}</p>
         <p> <span id="segundos">{tempoRestante.segundos}</span>SEGUNDOS</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContadorRegressivo;
