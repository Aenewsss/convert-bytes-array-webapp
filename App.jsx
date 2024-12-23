import React, { useState } from 'react';
import './styles.css';

function App() {
  const [byteArray, setByteArray] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const handleInputChange = (e) => {
    setByteArray(e.target.value);
  };

  const convertToImage = () => {
    try {
      // Converte a string de bytes para um Uint8Array
      
      const byteNumbers = byteArray.replace(/[\[\]]/g, '').split(',').map(Number);
      const uint8Array = new Uint8Array(byteNumbers);

      // Cria um blob e converte para URL
      const blob = new Blob([uint8Array], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);

      setImageSrc(imageUrl);
    } catch (error) {
      console.error('Erro ao converter array de bytes:', error);
      alert('Erro ao converter array de bytes. Certifique-se de que o formato está correto.');
    }
  };

  return (
    <div className="container">
      <h1>Array de Bytes para Imagem</h1>
      <div className="content">
        <div className="input-section">
          <label htmlFor="byteArray">Insira o Array de Bytes:</label>
          <textarea
            id="byteArray"
            rows="5"
            placeholder="Ex: 255,216,255,224,0,16,74,70..."
            value={byteArray}
            onChange={handleInputChange}
          ></textarea>
          <button onClick={convertToImage}>Converter para Imagem</button>
        </div>
        <div className="image-section">
          {imageSrc ? (
            <img style={{objectFit: 'cover'}} src={imageSrc} alt="Imagem convertida" />
          ) : (
            <p>Nenhuma imagem disponível</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;