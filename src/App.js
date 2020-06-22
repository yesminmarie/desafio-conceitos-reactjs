import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Repositório1",
      url: "www.teste.com",
      techs: ["ReactJS", "NodeJS"],
    })

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    //faz um filtro para buscar o respositório com mesmo id passado por parâmetro
    const repositoryIndex = repositories.findIndex(repository => repository.id === id)

    //se encontrar
    if (repositoryIndex >= 0) {
      //faz uma cópia de repositories em updatedRepositories
      const updatedRepositories = [...repositories]

      //remove de updatedRepositories o repositorio da posição respositoryIndex
      updatedRepositories.splice(repositoryIndex, 1)

      //atualiza a lista
      setRepositories(updatedRepositories);

      //remove o repositório no backend
      await api.delete(`repositories/${id}`)
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>{repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>
            </li>
          )
        }
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
