import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  async function handleAddRepository() {
    api.post('repositories',{
        title:"Repositorio de teste 44",
        url:"https://github.com/danielkoepp/conceitos-nodejs",
        techs:["nodejs","php"]
    }).then(response => {
      setRepositories([...repositories, response.data]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      setRepositories(repositories.filter(
        repository => repository.id !== id
      ));
    });
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);
  

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>

        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
