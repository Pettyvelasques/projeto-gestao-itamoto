import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react";

import styles from './index.module.css'
import SearchCard from "../../../form/SearchCard";
import Container from "../../../layout/Container";
import LinkButton from "../../../layout/LinkButton";
import Message from "../../../layout/Message";

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

  const handleOnChange = (a) => {
    const searchWord = a.target.value
    setWordEntered(searchWord)
    const newFilter = clients.filter((value) => {
      return (
        value.nome.toLowerCase().includes(searchWord.toLowerCase())
        || value.sobrenome.toLowerCase().includes(searchWord.toLowerCase())
        || value.marca.nome.toLowerCase().includes(searchWord.toLowerCase())
        || value.modelo.toLowerCase().includes(searchWord.toLowerCase())
        || value.cilindrada.toLowerCase().includes(searchWord.toLowerCase())
        || value.ano.toLowerCase().includes(searchWord.toLowerCase())
      )
    })

    if (searchWord === "") {
      setFilteredData(clients)
    } else {
      setFilteredData(newFilter)
    }
  }

  const setOrderName = (x, y) => {
    let a = x.nome.toUpperCase(),
    b = y.nome.toUpperCase();

    return a === b ? 0 : a > b ? 1 : -1;
  }

  function capitalizeFirstLetter(b) {
    return b.charAt(0).toUpperCase() + b.slice(1).toLowerCase();
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
              <SearchCard
                id_place="clientes"
                id_item={value.id}
                a={value.nome.split(' ').map(capitalizeFirstLetter).join(' ')}
                b={value.sobrenome.split(' ').map(capitalizeFirstLetter).join(' ')}
                c={value.marca.nome}
                d={value.modelo.split(' ').map(capitalizeFirstLetter).join(' ')}
                e={value.cilindrada}
                f={value.ano}
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