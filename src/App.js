import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);

  useEffect(()  =>  {
    listRepositories();
  },[]);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title,
      url,
      techs,
    })

    if (response.status === 200) {
      setRepositories([...repositories, response.data]);
      setTitle('');
      setUrl('');
      setTechs('');
    }

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    if (response.status === 204) {

      const newList = [...repositories];
      const index = newList.filter(repo => repo.id !== id);

      newList.splice(index,1);

      setRepositories(newList);

    } 

  }

  async function listRepositories() {
    const response = await api.get('repositories');

    setRepositories(response.data);
  }

  
  return (
    <div>
      <ul data-testid="repository-list">
       {repositories.length > 0 
       ?
       repositories.map(repository => (         
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
          Remover
          </button>
        </li>
      ))
    : ''
    }
      </ul>
      
    <label htmlFor="url">URL</label>
    <input 
    placeholder="URL"
    value={url}
    onChange={e => setUrl(e.target.value)}
    type="text"
    />

    <label htmlFor="title">Title</label>
    <input 
    placeholder="Title"
    value={title}
    onChange={e => setTitle(e.target.value)}
    type="text"
    />

    <label htmlFor="Techs">Techs</label>
    
    <input 
    placeholder="Techs"
    value={techs}
    onChange={e => setTechs(e.target.value.split(','))}
    type="text"
    />

      <button onClick={handleAddRepository}>Adicionar</button>
     </div>
  );
}

export default App;
