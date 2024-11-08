import React, { useState } from 'react';
import './global.css';

const FormularioOrcamento: React.FC = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      telefone: '',
      cnpj: '',
      mensagem: '',
    });
  
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const dataToSend = {
        Email: formData.email,
        Nome: formData.name,
        Telefone: formData.telefone,
        CNPJ: formData.cnpj,
        Mensagem: formData.mensagem,
      };

      try {
        const response = await fetch('/api/dataentities/OC/documents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-VTEX-API-AppKey': 'vtexappkey-isinaliza-NSCJZG',
            'X-VTEX-API-AppToken': 'SJUEWPRUTLOFOCVKTKUMRJZFLIHKDVGPVYNZPOKPORSIZUPEEUGWVMHUSXCJTBPDNGTJLQVQPICNRGHRGNONVRNVBWZCBUINJGNKYWLGBCMCLREJLLNKXSZTYTPCTFVM',
          },
          body: JSON.stringify(dataToSend),
        });
  
        if (!response.ok) {
          throw new Error('Erro ao enviar dados');
        }
  
        const result = await response.json();
        alert("Dados enviados com sucesso")
        console.log('Dados enviados com sucesso:', result);
        
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          telefone: '',
          cnpj: '',
          mensagem: '',
        });
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    };
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Cadastre-se e Aproveite os Descontos!</h2>
      
    <div className="col01">
    <div className="form-group">
        <label htmlFor="name">Nome*</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Digite seu nome"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail*</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>

     <div className="col02">
     <div className="form-group">
        <label htmlFor="telefone">Celular*</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          placeholder="(00) 00000-0000"
          value={formData.telefone}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cnpj">CNPJ*</label>
        <input
          type="text"
          id="cnpj"
          name="cnpj"
          placeholder="00.000.000/0000-00"
          value={formData.cnpj}
          onChange={handleInputChange}
          required
        />
      </div>
     </div>

      <div className="form-group">
        <label htmlFor="mensagem">Descreva seu pedido de orçamento</label>
        <textarea
          id="mensagem"
          name="mensagem"
          placeholder="Exemplo: Sinalização para loja com 3 placas e 2 banners. Detalhe as quantidades e tamanhos."
          value={formData.mensagem}
          onChange={handleInputChange}
        />
      </div>

      <button className="submit-btn" type="submit">Enviar</button>
    </form>
  );
};

export default FormularioOrcamento;
