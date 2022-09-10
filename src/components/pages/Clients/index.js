import { useLocation } from "react-router-dom"

import { useState, useEffect } from "react";

import styles from './index.module.css'
import Message from "../../layout/Message";
import ClientsCard from "../../project/Cards/ClientsCard";
import Container from "../../layout/Container";
import LinkButton from "../../layout/LinkButton";


function Clientes() {
  const [clients, setClients] = useState({})
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const location = useLocation()
  let message = ''
  let type = ''
  if (location.state) {
    message = location.state.message
    type = location.state.type
  }

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

  const setOrderName = (x , y) => {
    let a = x.nome.toUpperCase(),
    b = y.nome.toUpperCase();

    return a === b ? 0 : a > b ? 1 : -1 ;
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
      {message && <Message type={type} msg={message} />}

      <div className={styles.index_result}>
        <p> Nome </p>
        <p> Sobrenome </p>
        <p> Telefone </p>
        <p> Marca </p>
        <p> Modelo </p>
        <p> Cilindrada </p>
        <p> Ano </p>
        <p>  </p>
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.search_result}>
          {filteredData.slice().sort(setOrderName).map((value) => {
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