import React, { useState, useEffect } from 'react';
import './global.css';

// Definindo o tipo da prop dataFutura
interface ContadorRegressivoProps {
  dataFutura: string; // Tipo string, já que é uma data no formato ISO 8601
}

// Tipagem para o componente que inclui a propriedade schema
interface ContadorRegressivoComponent extends React.FC<ContadorRegressivoProps> {
  schema?: object;
}

const ContadorRegressivo: ContadorRegressivoComponent = ({ dataFutura }) => {
  // Estado para armazenar o tempo restante
  const [tempoRestante, setTempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    // Função para atualizar o contador
    const atualizarContador = () => {
      const agora = new Date().getTime();
      const diferenca = new Date(dataFutura).getTime() - agora;

      if (diferenca <= 0) {
        setTempoRestante({
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
        });
        return;
      }

      // Calcular o tempo restante
      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24)); 
      const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

      // Atualizar o estado com os valores calculados
      setTempoRestante({
        dias,
        horas,
        minutos,
        segundos,
      });
    };

    // Atualizar o contador a cada segundo
    const intervalo = setInterval(atualizarContador, 1000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalo);
  }, [dataFutura]); // Dependência de dataFutura

  return (
    <div id="contador">
      {tempoRestante.dias === 0 && tempoRestante.horas === 0 && tempoRestante.minutos === 0 && tempoRestante.segundos === 0 ? (
        <p>Tempo expirado!</p>
      ) : (
        <div className="time-ofertas">
          <div>
          <h1 className="title-contador">Oferta Relâmpago</h1>
          </div>
          <div className="time-ofertas-horas">
            {tempoRestante.dias > 0 && (
              <p>
                <span id="dias">{tempoRestante.dias}</span> DIAS
              </p>
            )}
            <p>
              <span id="horas">{tempoRestante.horas}</span> HORAS
            </p>
            <p>
              <span id="minutos">{tempoRestante.minutos}</span> MINUTOS
            </p>
            <p>
              <span id="segundos">{tempoRestante.segundos}</span> SEGUNDOS
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Definindo o schema para o componente (caso esteja usando VTEX)
ContadorRegressivo.schema = {
  "title": "Contador Regressivo",
  "description": "Exibe um contador regressivo para ofertas",
  "type": "object",
  "properties": {
    "dataFutura": {
      "title": "Data da Oferta",
      "type": "string",
      "format": "date-time",
      "default": "2024-11-20T23:59:59"
    }
  }
};

export default ContadorRegressivo;
