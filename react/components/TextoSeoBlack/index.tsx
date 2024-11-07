import React, { useState } from 'react';
import "./global.css";

const VerMaisTexto: React.FC = () => {
  const [mostrarMais, setMostrarMais] = useState(false);

  const textoCompleto = `Lorem ipsum dolor sit amet, deadipiscing eli Lorem ipsum dolor sit amet, deadipiscing eli
    Lorem ipsum dolor sit amet, deadipiscing eli Lorem ipsum dolor sit amet, deadipiscing eli Lorem ipsum dolor sit amet, 
    deadipiscing eli Lorem ipsum dolor sit amet, deadipiscing eli Lorem ipsum dolor sit amet, deadipiscing eli Lorem ipsum dolor sit amet,
    deadipiscing eli Lorem ipsum dolor sit amet, deadipiscing eli.`;
    
  const textoCurto = textoCompleto.substring(0, 370);

  const handleVerMais = () => {
    setMostrarMais(!mostrarMais);
  };

  return (
    <div className='container-seo'>
      <div className="col-text">
      <p className='texto-seo'>{mostrarMais ? textoCompleto : `${textoCurto}...`}</p>
      <button className='button-seo' onClick={handleVerMais}>
        {mostrarMais ? 'Ver Menos' : 'Ver Mais'}
      </button>
      </div>
    </div>
  );
};

export default VerMaisTexto;
