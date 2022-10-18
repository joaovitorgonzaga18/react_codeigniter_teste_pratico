import React from 'react';

import './App.css';

import CRUD from './CRUD.js'

import Atividades from './Atividades.js';
import Projetos from './Projetos.js';

function App() {

  return (
    <div className="App">
      <div style={ContentStyle}>
        <h1 className="title">Teste Prático React/CodeIgniter</h1>
        <h2 className="title">CRUD de Atividades e Projetos</h2>
      </div>
      <div style={ContentStyle}>
        <CRUD></CRUD>
        <Atividades></Atividades>
        <Projetos></Projetos>
      </div>
    </div>
  );
}

export default App;

const ContentStyle = {
  padding: '20px',
  margin: '20px',
  outline: 'solid'
}
