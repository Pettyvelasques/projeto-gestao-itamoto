import { useState, useEffect } from "react";
import ClientsCard from "../../project/cards/ClientsCard";
import Container from "../../layout/Container";
import LinkButton from "../../layout/LinkButton";

import styles from './index.module.css'

function Clientes() {
  const [clients, setClients] = useState({})
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    setTimeout(
      () => {
        fetch("http://localhost:5000/clientes", {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        })
          .then(resp => resp.json())
          .then(data => {
            setClients(data)
            setFilteredData(data)
          })
          .catch((err) => console.log(err))
      }, 300)
  }, [])

  const handleOnChange = (e) => {
    const searchWord = e.target.value
    setWordEntered(searchWord)
    const newFilter = clients.filter((value) => {
      return value.nome.toLowerCase().includes(searchWord.toLowerCase())
    })

    if (searchWord === "") {
      setFilteredData(clients)
    } else {
      setFilteredData(newFilter)
    }
  }

  return (
    <Container customClass="start">
      <div className={styles.search_container}>
        <input type="search"
          placeholder="Digite para pesquisar"
          onChange={handleOnChange}
          value={wordEntered}
        />
        <LinkButton to="/newclient" text="+" />
      </div>
      <div className={styles.index_result}>
        <p> Nome </p>
        <p> Sobrenome </p>
        <p> Telefone </p>
        <p> Marca </p>
        <p> Modelo </p>
        <p> Cilindrada </p>
        <p> Ano </p>
        <p> Editar </p>
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.search_result}>
          {filteredData.slice().map((value) => {
            return (
              <ClientsCard
                id={value.id}
                nome={value.nome}
                sobrenome={value.sobrenome}
                telefone={value.telefone}
                marca={value.marca.nome}
                modelo={value.modelo}
                cilindrada={value.cilindrada}
                ano={value.ano}
                key={value.id}
              />
            );
          })}
        </div>
      )
      }
      {clients.length === 0 && (
        <p>Não há clientes cadastrados!</p>
      )}
    </Container>
  )
}

export default Clientes;