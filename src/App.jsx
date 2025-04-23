
import React, { useState } from 'react';
import header from "./assets/header.png";


function App() {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [cargando, setCargando] = useState(false);

  const hacerPregunta = async () => {
    if (!pregunta.trim()) return;
    setCargando(true);
    setRespuesta('');
    try {
      const res = await fetch(`https://chatbot-backend-vwig.onrender.com/ask?q=${encodeURIComponent(pregunta)}`);
      const data = await res.json();
      setRespuesta(data.respuesta || 'No se pudo obtener respuesta.');
    } catch (err) {
      setRespuesta('❌ Error al conectar con el backend.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#0b1d3a',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      <header style={{
        width: '100%',
        height: '180px',
        backgroundColor: '#0b1d3a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={header}
          alt="SEI Logo"
          style={{
            maxHeight: '100%',
            objectFit: 'contain',
            padding: '10px',
            width: 'auto'
          }}
        />
      </header>

      <main style={{
        maxWidth: '640px',
        margin: '40px auto',
        padding: '30px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '24px', color: '#222', fontSize: '26px' }}>Chat con tu PDF</h2>

        <textarea
          placeholder="Escribe tu pregunta..."
          rows="4"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '18px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '20px',
            resize: 'vertical'
          }}
        />

        <button
          onClick={hacerPregunta}
          disabled={cargando}
          style={{
            padding: '12px 30px',
            fontSize: '18px',
            borderRadius: '8px',
            backgroundColor: '#0056d2',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {cargando ? 'Consultando...' : 'Preguntar'}
        </button>

        {respuesta && (
          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f6f8fa',
            borderRadius: '12px',
            textAlign: 'left',
            whiteSpace: 'pre-wrap',
            border: '1px solid #e1e4e8',
            fontSize: '17px',
            lineHeight: '1.6'
          }}>
            <strong style={{ fontSize: '18px' }}>Respuesta:</strong>
            <p>{respuesta}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
